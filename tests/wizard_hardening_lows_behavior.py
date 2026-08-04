# Behavioral proof for #94/#95 (server on :8899 at repo root). Requires Playwright.
import sys
from playwright.sync_api import sync_playwright
BASE="http://localhost:8899"
def main():
    with sync_playwright() as p:
        b=p.chromium.launch(headless=True)
        ctx=b.new_context()   # shared storage across pages (same origin)
        pg=ctx.new_page()
        pg.goto(f"{BASE}/trust-safety/wizard/index.html", wait_until="load", timeout=30000)
        pg.wait_for_timeout(1200)
        # Set up a vault so 'auth' unlock path is active on reload.
        pg.evaluate("""async ()=>{const a=Alpine.$data(document.querySelector('#main'));
            a.passphrase='correct horse battery staple'; a.passphraseConfirm='correct horse battery staple';
            await a.createPassphrase(); a.lock();}""")
        # Cause failed unlock attempts -> lockout set + persisted
        state=pg.evaluate("""async ()=>{const a=Alpine.$data(document.querySelector('#main'));
            a.passphrase='wrongwrongwrong'; await a.unlock(); a.passphrase='wrongwrongwrong'; await a.unlock();
            return {fa:a._failedAttempts, lu:a._lockoutUntil};}""")
        print(f"[#95] after 2 bad attempts: failedAttempts={state['fa']} lockoutUntil>0={state['lu']>0}")
        # Reload the page -> new component instance must LOAD persisted lockout
        pg.reload(wait_until="load"); pg.wait_for_timeout(1200)
        after=pg.evaluate("()=>{const a=Alpine.$data(document.querySelector('#main'));return {fa:a._failedAttempts, lu:a._lockoutUntil};}")
        persisted = after['fa']>=1 and after['lu']>0
        print(f"[#95] after reload: failedAttempts={after['fa']} lockoutUntil>0={after['lu']>0}  {'OK (survived)' if persisted else 'FAIL'}")
        # #94: oversized bundle rejected
        big=pg.evaluate("""async ()=>{const a=Alpine.$data(document.querySelector('#main'));
            a.importError=''; const blob=new Blob(['x'], {type:'text/html'});
            Object.defineProperty(blob,'size',{value:11*1024*1024});
            a.onImportFileSelected({target:{files:[blob]}});
            return a.importError;}""")
        rejected = 'too large' in big.lower()
        print(f"[#94] oversized bundle rejected: {rejected}  msg={big[:60]!r}")
        ok = persisted and rejected
        b.close(); print("RESULT:", "PASS" if ok else "FAIL"); sys.exit(0 if ok else 1)
main()
