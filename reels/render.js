// Render an HTML reel (window.render(t), window.DURATION) to a 1080x1920 30fps MP4.
// usage: node render.js <page.html> <out.mp4> [audio.wav]
// Without an audio file the MP4 gets a silent track. With one, the audio is loudness-normalised to -14 LUFS.
const {chromium}=require('playwright');
const {spawn}=require('child_process');
const path=require('path');
(async()=>{
  const [src,out,audio]=process.argv.slice(2);
  const fps=30;
  const b=await chromium.launch();
  const p=await b.newPage({viewport:{width:1080,height:1920}});
  await p.goto('file://'+path.resolve(src),{waitUntil:'networkidle'});
  await p.evaluate(()=>document.fonts.ready);
  const dur=await p.evaluate(()=>window.DURATION);
  const n=Math.round(dur*fps);
  const aIn=audio?['-i',audio]:['-f','lavfi','-i','anullsrc=r=44100:cl=stereo'];
  const aFx=audio?['-af','loudnorm=I=-14:TP=-1.5:LRA=11']:[];
  const ff=spawn('ffmpeg',['-v','error','-y','-f','image2pipe','-framerate',String(fps),'-i','-',...aIn,'-shortest',
    '-c:v','libx264','-preset','slow','-crf','20','-pix_fmt','yuv420p',...aFx,'-c:a','aac','-b:a','160k','-ar','44100','-movflags','+faststart',out],{stdio:['pipe','inherit','inherit']});
  for(let i=0;i<n;i++){
    await p.evaluate(t=>window.render(t),i/fps);
    const buf=await p.screenshot({type:'jpeg',quality:92});
    if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));
  }
  ff.stdin.end();
  await new Promise(r=>ff.on('close',r));
  await b.close();
  console.log('frames',n,'duration',dur);
})();
