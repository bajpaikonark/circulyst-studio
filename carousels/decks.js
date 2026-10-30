// Carousel decks. Each slide is 1080x1350 and is built from the Kabaad Gang kit (gang.js) in the website look.
const C = (inner, w = 520, h = 693) => `<svg viewBox="0 0 600 800" width="${w}" height="${h}">${inner}</svg>`;
const LOGO = `<div class="brand"><img src="circulyst-logo.png" alt="Circulyst" style="height:62px;display:block"></div>`;
const LOGO_W = `<div class="brand light"><img src="circulyst-logo-light.png" alt="Circulyst" style="height:62px;display:block"></div>`;
const raja2 = () => raja("KANPUR KI KHABAR");

function frame(i, n, body, opt = {}) {
  return `<section class="slide ${opt.cls || ""}" style="${opt.bg ? `background:${opt.bg};` : ""}">
    <div class="dots d1"></div><div class="dots d2"></div>
    <div class="count">${i}/${n}</div>
    ${body}
    <footer>${opt.light ? LOGO_W : LOGO}${opt.foot ? `<span class="foot">${opt.foot}</span>` : `<span class="foot">@circulyst</span>`}</footer>
  </section>`;
}

const GANG_CARD = (i, n, o) => frame(i, n, `
  <div class="tag" style="background:${o.tagBg};color:${o.tagFg}">${o.material}</div>
  <h1 class="name">${o.name}</h1>
  <div class="charstage" style="background:${o.stage}">${C(o.art, 450, 600)}</div>
  <div class="quote" style="border-color:${o.tagBg}"><span>&ldquo;</span>${o.quote}</div>
  <div class="tip"><b>Inhe kaise rakhein:</b> ${o.tip}</div>`, { bg: o.bg });

const DECKS = {
  C1: () => {
    const n = 7;
    return [
      frame(1, n, `
        <div class="kicker">Diwali safai special</div>
        <h1 class="big">Aapke ghar ke kone mein <span class="hl">5 kirdaar</span> chhupe hain</h1>
        <p class="lead">Inse milo. Inhe kachre mein phenkoge toh ye naraz ho jaate hain.</p>
        <div class="lineup">${["botal", "tinku", "mobile"].map(k => C(GANG[k]("happy"), 215, 287)).join("")}${C(raja2(), 260, 347)}${C(GANG.dump(), 250, 333)}</div>
        <div class="hand" style="left:600px;top:640px">inhe pehchaante ho?<svg width="140" height="90" viewBox="0 0 140 90"><path d="M10 10 C 50 20, 90 40, 118 74" stroke="#d3212c" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M96 70 L120 78 L116 52" stroke="#d3212c" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div class="swipe">Swipe karo &rarr;</div>`, { cls: "cover" }),
      GANG_CARD(2, n, { name: "Raddi Raja", material: "Paper · Gang ka leader", tagBg: "#c98b4f", tagFg: "#fff", bg: "#fff3e6", stage: "#fde7cf", art: raja2(),
        quote: "Guru, hum raddi nahi, Raddi Raja hain!", tip: "Akhbaar, copy-kitaab, gatte ke dibbe. Sukha rakho aur bundle bana ke baandh do." }),
      GANG_CARD(3, n, { name: "Botal Bhaiya", material: "Plastic", tagBg: "#2f86b8", tagFg: "#fff", bg: "#eef3ff", stage: "#dde8ff", art: GANG.botal("happy"),
        quote: "Ek baar use, phir bekaar? Na bhai, hum toh recycle hote hain.", tip: "Bottles aur dabbe dho ke sukhao, phir alag thaile mein." }),
      GANG_CARD(4, n, { name: "Tinku Tin", material: "Metal", tagBg: "#606a76", tagFg: "#fff", bg: "#eef1ea", stage: "#e1e6dc", art: GANG.tinku("happy"),
        quote: "Ek dent se kuch nahi hota, hum toh baar-baar bante hain.", tip: "Tin, purane bartan, taar. Sab ek thaile mein, sukha." }),
      GANG_CARD(5, n, { name: "Mobile Mama", material: "E-waste", tagBg: "#13711f", tagFg: "#fff", bg: "#ecfaf2", stage: "#d8f2e3", art: GANG.mobile("happy"),
        quote: "Battery alag rakhna beta, warna aag lag sakti hai.", tip: "Purana phone, charger, wire. Kabhi kachre mein nahi." }),
      frame(6, n, `
        <div class="tag" style="background:#f2c94c;color:#2b2b1c">Villain</div>
        <h1 class="name" style="color:#fff">Dumpasur</h1>
        <div class="charstage wide" style="background:#3a3a26">${C(GANG.dump(), 560, 747)}</div>
        <p class="lead" style="color:#e8e4cc;margin-top:auto;max-width:920px">Jab sab kuch ek hi bore mein bhar dete ho, ye bada hota jaata hai. Mila hua kabaad na tulta hai, na bikta hai.</p>
        <div class="tip" style="background:#f2c94c;color:#2b2b1c"><b>Iski kamzori:</b> 3 alag thaile. Paper, plastic, metal + e-waste.</div>`, { bg: "#2b2b1c", light: true }),
      frame(7, n, `
        <h1 class="big" style="margin-top:40px">Gang ko bachao.<br><span class="hl">Kabaad alag rakho.</span></h1><div class="hand" style="right:90px;top:560px">paper · plastic · metal</div>
        <div class="lineup tight">${C(GANG.botal("wink"), 230, 307)}${C(raja2(), 280, 373)}${C(GANG.tinku("happy"), 230, 307)}${C(GANG.mobile("wink"), 220, 293)}</div>
        <div class="ctaBox"><img src="circulyst-logo-light.png" alt="Circulyst" style="height:70px;align-self:flex-start;margin-bottom:6px"><p>Jald Kanpur mein aa raha hai</p><div class="cta">Comment <b>KANPUR</b></div><small>early access list ke liye</small></div>`, { cls: "end" }),
    ];
  },

  C2: () => {
    const n = 6;
    const scale = `<svg viewBox="0 0 420 300" width="520" height="371"><rect x="30" y="200" width="360" height="70" rx="18" fill="#d7dce2" stroke="#8a929c" stroke-width="4"/><rect x="60" y="150" width="300" height="70" rx="14" fill="#eef1f4" stroke="#8a929c" stroke-width="4"/>
      <rect x="110" y="40" width="200" height="110" rx="16" fill="#232946"/><rect x="124" y="54" width="172" height="62" rx="8" fill="#0c1810"/><text x="210" y="100" text-anchor="middle" font-family="Poppins" font-weight="800" font-size="42" fill="#5cf08f">12.4 kg</text>
      <circle cx="150" cy="134" r="7" fill="#3fae49"/><circle cx="210" cy="134" r="7" fill="#e5484d"/><circle cx="270" cy="134" r="7" fill="#f2c94c"/></svg>`;
    const receipt = `<div class="receipt"><div class="rhead">CIRCULYST · PICKUP RECEIPT</div>
      <div class="rrow"><span>Raddi</span><span>8.2 kg</span></div><div class="rrow"><span>Gatta</span><span>3.1 kg</span></div><div class="rrow"><span>Plastic</span><span>1.1 kg</span></div>
      <div class="rrow"><span>Rate</span><span>Example rate</span></div><div class="rline"></div><div class="rrow tot"><span>Kul vajan</span><span>12.4 kg</span></div>
      <div class="rfoot">Example receipt. Asli rate pickup ke din app mein.</div></div>`;
    const q = (i, num, title, body, art, bg, accent) => frame(i, n, `
      <div class="qnum" style="background:${accent}">${num}</div>
      <h1 class="qtitle" style="font-size:${title.length>18?82:96}px">${title}</h1>
      <div class="qart" style="background:${bg}">${art}</div>
      <p class="lead">${body}</p>`, { bg: "#f7f5ee" });
    return [
      frame(1, n, `
        <div class="kicker">Save kar lo · Diwali pe kaam aayega</div>
        <h1 class="big">Raddi bechne se pehle ye <span class="hl">4 sawaal</span> zaroor poochho</h1>
        <div class="coverArt">${C(raja2(), 520, 693)}<div class="bubble">Guru, bina pooche mat becho!</div></div><div class="hand" style="left:90px;top:1000px">Diwali se pehle<br>padh lena!</div>
        <div class="swipe">Swipe karo &rarr;</div>`, { cls: "cover" }),
      q(2, "1", "Rate pehle bataya?", "Tolne ke baad rate sunoge toh mol-bhaav ka khel shuru. Rate pehle pata ho, tab tolo.", C(raja2(), 360, 480), "#fff3e6", "#c98b4f"),
      q(3, "2", "Kaanta digital hai?", "Vajan aapki aankhon ke saamne screen pe dikhna chahiye. Andaaze wala kaanta nahi.", `<div class="pair">${C(GANG.tinku("wink"), 300, 400)}${scale}</div>`, "#eef1ea", "#606a76"),
      q(4, "3", "Receipt milegi?", "Kya diya, kitna tula, kis rate pe. Sab likha hua ho, taaki baad mein koi confusion na ho.", `<div class="pair">${C(GANG.mobile("happy"), 280, 373)}${receipt}</div>`, "#ecfaf2", "#13711f"),
      q(5, "4", "Paisa kab aur kaise?", "Circulyst mein: 70% wahin ke wahin, baaki verification ke baad. Dono receipt pe likha hoga.", `<div class="pair">${C(GANG.botal("happy"), 300, 400)}<div class="split"><div class="seg a"><b>70%</b><span>Turant</span></div><div class="seg b"><b>30%</b><span>Verification ke baad</span></div></div></div>`, "#eef3ff", "#2f86b8"),
      frame(6, n, `
        <h1 class="big" style="margin-top:20px;font-size:84px">Circulyst mein <span class="hl">chaaron</span> pakke</h1>
        <div class="checks">${["Rate pehle", "Digital kaanta", "Har pickup ki receipt", "70% turant, baaki verification ke baad"].map(x => `<div class="ck"><i></i>${x}</div>`).join("")}</div>
        <div class="ctaBox"><img src="circulyst-logo-light.png" alt="Circulyst" style="height:70px;align-self:flex-start;margin-bottom:6px"><p>Jald Kanpur mein aa raha hai</p><div class="cta">Comment <b>KANPUR</b></div><small>early access list ke liye</small></div>`, { cls: "end" }),
    ];
  },

  S1: () => {
    const orders = [["Raddi sukhi rakho.", "Geeli raddi kisi kaam ki nahi."], ["Gatta flat karo.", "Daba ke, bundle bana ke baandh do."], ["Plastic dho ke sukhao.", "Phir alag thaile mein."], ["Battery alag rakho.", "Phone, charger, wire. Kachre mein kabhi nahi."], ["Kuch bhi jalao mat.", "Na kachra, na patte. Dhuaan sabka nuksaan."]];
    return [frame(1, 1, `
      <div class="kicker">Shahi hukm · Kanpur ke liye</div>
      <h1 class="big" style="max-width:600px;font-size:96px">Raddi Raja ka <span class="hl">farmaan</span></h1>
      <div class="rajaS">${C(raja2(), 330, 440)}</div>
      <div class="decree"><div class="dhead">Aaj se is ghar mein ye 5 niyam laagu:</div>
        ${orders.map((o, i) => `<div class="ord"><b>${i + 1}</b><div><strong>${o[0]}</strong><span>${o[1]}</span></div></div>`).join("")}
        <div class="seal">RADDI<br>RAJA<small>shahi mohar</small></div></div>
      <div class="hand" style="left:90px;top:1172px;font-size:40px">save karke fridge pe chipka do!</div>`, { cls: "decreeS", foot: "Comment KANPUR · early access" })];
  },

  ST: () => {
    const fr = (kick, title, sub, art, gap, extra = "") => `<section class="slide story">
      <div class="kicker">${kick}</div>
      <h1 class="big" style="font-size:104px">${title}</h1>
      ${sub ? `<p class="lead" style="font-size:44px">${sub}</p>` : ""}
      <div class="stickerGap" style="height:${gap}px"></div>
      <div class="storyArt">${art}</div>${extra}
      <div class="brandS"><img src="circulyst-logo.png" alt="Circulyst" style="height:54px"></div></section>`;
    return [
      fr("Kanpur, sach batao", "Diwali ki <span class=\"hl\">safai</span> shuru hui?", "", C(raja2(), 430, 573), 300, `<div class="hand" style="right:90px;top:760px">yahan jawab do</div>`),
      fr("Quiz time", "Aapke ghar mein sabse zyada <span class=\"hl\">kya nikla?</span>", "", `<div class="lineup" style="margin:0">${["botal","tinku","mobile"].map(k=>C(GANG[k]("happy"),250,333)).join("")}${C(raja2(),300,400)}</div>`, 380),
      fr("Ek chhota sawaal", "Raddi kab <span class=\"hl\">bechte</span> ho?", "Kabhi nahi se har mahine tak, slide karke batao.", C(GANG.tinku("wink"), 430, 573), 260),
      fr("Aapki kahani chahiye", "Raddiwale ke saath sabse badi <span class=\"hl\">dikkat</span> kya hui?", "", C(GANG.mobile("happy"), 400, 533), 360),
      fr("Diwali challenge", "Aapke kitne <span class=\"hl\">thaile</span> bane?", "Paper, plastic, metal. Thailon ki photo DM karo, chehra nahi chahiye.", C(GANG.botal("wink"), 420, 560), 120),
      fr("Kanpur wale, suno", "Launch ki khabar sabse <span class=\"hl\">pehle</span> chahiye?", "Kisi bhi post pe <b>KANPUR</b> comment karo. Early access ka link DM mein aayega.", `<div class="lineup" style="margin:0">${C(GANG.botal("wink"),250,333)}${C(raja2(),300,400)}${C(GANG.tinku("happy"),250,333)}${C(GANG.mobile("wink"),240,320)}</div>`, 60),
    ];
  },
};
