# Behavioral proof for issue #92 (run: python tests/wizard_bundle_csp_behavior.py
# with a static server on :8899 at repo root). Requires Playwright.
import sys, re, pathlib
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
BASE = "http://localhost:8899"

def main():
    with sync_playwright() as p:
        b = p.chromium.launch(headless=True)
        pg = b.new_page()
        pg.goto(f"{BASE}/trust-safety/wizard/index.html", wait_until="load", timeout=30000)
        pg.wait_for_timeout(1500)
        # Generate a real bundle by driving the component directly.
        bundle = pg.evaluate("""async () => {
            const app = Alpine.$data(document.querySelector('#main'));
            app.cryptoKey = await WizardCrypto.deriveKey('unittestpass123', WizardCrypto.generateSalt());
            const secs = WizardContent.getAllSections();
            app.bundleIncludeSections = {}; secs.forEach(s => app.bundleIncludeSections[s.id] = true);
            app.bundlePassphrase = 'bundlepass12345';
            app.bundlePassphraseConfirm = 'bundlepass12345';
            let captured = null;
            app._downloadFile = (content, filename) => { if (filename.indexOf('digital-estate-bundle') === 0) captured = content; };
            await app.generateSecureBundle();
            return captured;
        }""")
        assert bundle, "no bundle produced"
        # --- source assertions ---
        assert "Content-Security-Policy" in bundle, "bundle missing CSP"
        m = re.search(r'Content-Security-Policy" content="([^"]+)"', bundle)
        csp = m.group(1)
        assert "script-src 'sha256-" in csp, "no script hash in CSP"
        # ensure no unsafe-inline in the script-src directive specifically
        script_src = [d for d in csp.split(';') if d.strip().startswith('script-src')][0]
        assert 'unsafe-inline' not in script_src, f"script-src allows unsafe-inline: {script_src}"
        assert 'onclick=' not in bundle, "inline onclick present"
        print("[source] CSP present, hashed script-src, no unsafe-inline, no onclick  OK")

        # --- behavioral: write bundle into served dir, open it, round-trip + XSS ---
        out = ROOT / "trust-safety" / "wizard" / "_test_bundle.html"
        out.write_text(bundle, encoding="utf-8")
        try:
            pg2 = b.new_page()
            blocked = []
            pg2.on("console", lambda msg: blocked.append(msg.text) if "Content Security Policy" in msg.text else None)
            pg2.goto(f"{BASE}/trust-safety/wizard/_test_bundle.html", wait_until="load", timeout=20000)
            pg2.fill("#pp", "bundlepass12345")
            pg2.click("#go")
            pg2.wait_for_timeout(1200)
            content_visible = pg2.eval_on_selector("#content", "e => e.style.display !== 'none' && e.innerText.length > 0")
            has_plan = "Digital Estate Plan" in pg2.inner_text("#content")
            print(f"[round-trip] decrypt+render works: visible={content_visible} has_plan={has_plan}  {'OK' if content_visible and has_plan else 'FAIL'}")
            # Now exercise the exact sink with a malicious payload under the real bundle CSP.
            fired = pg2.evaluate("""async () => {
                window.__xss = 0; window.__xss2 = 0;
                const c = document.getElementById('content');
                c.innerHTML = '<img src=x onerror="window.__xss=1">' + '<scr'+'ipt>window.__xss2=1</scr'+'ipt>';
                await new Promise(r => setTimeout(r, 400));
                return {onerror: window.__xss, injected_script: window.__xss2};
            }""")
            print(f"[xss] injected onerror fired={fired['onerror']} injected script ran={fired['injected_script']}  "
                  f"{'OK (both blocked)' if fired['onerror']==0 and fired['injected_script']==0 else 'FAIL'}")
            ok = content_visible and has_plan and fired['onerror']==0 and fired['injected_script']==0
        finally:
            out.unlink(missing_ok=True)
        b.close()
        print("RESULT:", "PASS" if ok else "FAIL")
        sys.exit(0 if ok else 1)

main()
