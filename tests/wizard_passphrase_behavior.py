# Behavioral proof for issue #93 (server on :8899 at repo root). Requires Playwright.
import sys, pathlib
from playwright.sync_api import sync_playwright
BASE="http://localhost:8899"
WEAK=["123456789012","aaaaaaaaaaaa","password1234","abcdefghijkl","letmeinplease","short"]
STRONG=["correct horse battery staple","MyDogRex2019!","Tr0ub4dour&3xtra9"]
def main():
    with sync_playwright() as p:
        b=p.chromium.launch(headless=True); pg=b.new_page()
        pg.goto(f"{BASE}/trust-safety/wizard/index.html", wait_until="load", timeout=30000)
        pg.wait_for_timeout(1200)
        res=pg.evaluate("""(cases)=>{const a=Alpine.$data(document.querySelector('#main'));
            const out={weak:{},strong:{}};
            cases.weak.forEach(x=>out.weak[x]=a._isWeakPassphrase(x));
            cases.strong.forEach(x=>out.strong[x]=a._isWeakPassphrase(x));
            return out;}""", {"weak":WEAK,"strong":STRONG})
        ok=True
        for x in WEAK:
            good=res["weak"][x] is True
            ok&=good; print(f"[weak]   {x!r:35} blocked={res['weak'][x]}  {'OK' if good else 'FAIL'}")
        for x in STRONG:
            good=res["strong"][x] is False
            ok&=good; print(f"[strong] {x!r:35} blocked={res['strong'][x]}  {'OK' if good else 'FAIL'}")
        # end-to-end: weak passphrase rejected at setup, strong accepted
        def try_setup(pw):
            pg.evaluate("""async(pw)=>{const a=Alpine.$data(document.querySelector('#main'));
                a.view='setup'; a.passphrase=pw; a.passphraseConfirm=pw; a.error='';
                await a.createPassphrase();}""", pw)
            return pg.evaluate("()=>{const a=Alpine.$data(document.querySelector('#main'));return {view:a.view,error:a.error};}")
        w=try_setup("123456789012")
        e2e_weak = w["view"]=="setup" and bool(w["error"])
        ok&=e2e_weak; print(f"[e2e] weak stays in setup w/ error: {e2e_weak}  view={w['view']}")
        s=try_setup("correct horse battery staple")
        e2e_strong = s["view"]!="setup"
        ok&=e2e_strong; print(f"[e2e] strong leaves setup: {e2e_strong}  view={s['view']}")
        b.close(); print("RESULT:", "PASS" if ok else "FAIL"); sys.exit(0 if ok else 1)
main()
