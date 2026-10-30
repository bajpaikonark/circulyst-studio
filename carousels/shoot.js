const {chromium}=require('playwright');const path=require('path');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
for(const d of process.argv.slice(2)){await p.goto('file://'+path.resolve(__dirname,'carousel.html')+'?deck='+d,{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
const n=await p.locator('.slide').count();for(let i=0;i<n;i++)await p.locator('.slide').nth(i).screenshot({path:path.join(__dirname,`${d}_${i+1}.png`)});console.log(d,n)}
console.log('errors',errs);await b.close()})();
