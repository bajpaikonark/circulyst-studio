// Swaps the old 2D SVG Kabaad Gang for the owner's 3D PNG characters (26 Oct).
(function(){
  const K=[["RADDI RAJA","raja"],["#heap","dumpasur"],["#pet","botal"],["#steel","tinku"],["#phone","mobile"]];
  const st=document.createElement("style");
  st.textContent=".c3{display:block;filter:drop-shadow(3px 0 0 #fff) drop-shadow(-3px 0 0 #fff) drop-shadow(0 3px 0 #fff) drop-shadow(0 -3px 0 #fff) drop-shadow(8px 14px 10px rgba(35,41,70,.28))!important}";
  document.head.appendChild(st);
  document.querySelectorAll('svg[viewBox="0 0 600 800"]').forEach(s=>{
    const html=s.innerHTML,hit=K.find(([sig])=>html.includes(sig));if(!hit)return;
    const h=parseFloat(s.getAttribute("height"))||600,n=hit[1];
    const img=new Image();img.className="c3";img.alt="";img.src="chars3d/"+n+".png";
    img.style.height=Math.round(h*(n==="tinku"?.8:.96))+"px";img.style.width="auto";
    s.replaceWith(img);
  });
})();
