/* QUAKE / first-party Terms of Service agreement, saved in this browser only */
'use strict';
document.addEventListener('DOMContentLoaded', () => {
  const VERSION = '1.0';
  const KEY = 'quake_terms_agreement_v1';
  const $ = id => document.getElementById(id);
  const card = $('tosAgreement');
  if (!card) return;
  const checkbox = $('tosCheckbox');
  const accept = $('tosAccept');
  const revoke = $('tosRevoke');
  const pending = $('tosPending');
  const acceptedPanel = $('tosAccepted');
  const statusTitle = $('tosStatusTitle');
  const statusDescription = $('tosStatusDescription');
  const acceptanceDate = $('tosAcceptedOn');
  const errorNode = $('tosError');
  const translations = {
    en: {
      index:'07 / TERMS OF SERVICE', title:'Terms of Service',lead:'Please review how this educational site may be used. You can read these terms before choosing whether to agree.',version:'VERSION 1.0',
      section1title:'1. Educational purpose',section1body:'QUAKE is a student-created educational website about earthquakes and disaster risk reduction. The information is intended for learning and general preparedness, not professional engineering, medical, legal or emergency advice.',
      section2title:'2. Information and accuracy',section2body:'We aim to cite reputable sources. Earthquake damage and casualty figures may be preliminary estimates and can change. Always consult current official advice and emergency authorities when making safety decisions.',
      section3title:'3. Appropriate use',section3body:'You may browse and share links for educational purposes. Do not misuse the site, attempt to interfere with its operation, or present its material as official emergency instructions.',
      section4title:'4. Sources and external websites',section4body:'Photographs, fonts, frameworks and external research links may belong to other providers and have their own licenses or policies. Respect those terms when reusing content.',
      section5title:'5. Local agreement record',section5body:'If you accept, this browser stores only the terms version and your acceptance time in localStorage. QUAKE does not send this agreement record to a server. You may withdraw acceptance below or clear your browser\'s site data.',
      section6title:'6. Changes and availability',section6body:'Content and these terms may be revised as the school project develops. A new terms version will ask you to agree again. The site is provided on an educational, as-available basis.',
      pending:'Agreement not yet saved',pendingDescription:'You can read the terms above, then accept when you are ready.',checkbox:'I have read and agree to the QUAKE Terms of Service.',accept:'Agree & Save',revoke:'Withdraw agreement',localNote:'Saved on this browser only. Clearing site data removes the record.',sideLink:'Terms of Service',
      accepted:'Agreement saved',acceptedDescription:'You already agreed to this version of the Terms of Service.',date:'Accepted on',error:'This browser blocked local storage. Please enable site storage to remember your agreement.',withdrawn:'Your saved agreement was withdrawn.'
    },
    mm: {
      index:'၀၇ / အသုံးပြုမှု စည်းကမ်းချက်များ',title:'အသုံးပြုမှု စည်းကမ်းချက်များ',lead:'ဤပညာပေးဝက်ဘ်ဆိုက်ကို အသုံးပြုရာတွင် လိုက်နာရမည့် စည်းကမ်းချက်များကို ဖတ်ရှုပြီးမှ သဘောတူရန် ဆုံးဖြတ်နိုင်ပါသည်။',version:'ဗားရှင်း ၁.၀',
      section1title:'၁။ ပညာရေးဆိုင်ရာ ရည်ရွယ်ချက်',section1body:'QUAKE သည် ငလျင်နှင့် ဘေးအန္တရာယ်လျှော့ချရေးဆိုင်ရာ ကျောင်းသားများ ဖန်တီးထားသော ပညာပေးဝက်ဘ်ဆိုက်ဖြစ်သည်။ ဤအချက်အလက်များသည် လေ့လာရေးနှင့် အထွေထွေကြိုတင်ပြင်ဆင်ရေးအတွက်သာဖြစ်ပြီး အင်ဂျင်နီယာ၊ ဆေးဘက်၊ ဥပဒေ သို့မဟုတ် အရေးပေါ်အကြံဉာဏ်ကို အစားမထိုးပါ။',
      section2title:'၂။ အချက်အလက် တိကျမှု',section2body:'ယုံကြည်စိတ်ချရသော ရင်းမြစ်များကို ကိုးကားရန် ကြိုးပမ်းထားပါသည်။ ငလျင်ပျက်စီးမှုနှင့် သေဆုံးမှုကိန်းဂဏန်းများမှာ ကနဦးခန့်မှန်းချက်များ ဖြစ်နိုင်ပြီး ပြောင်းလဲနိုင်သည်။ လုံခြုံရေးဆုံးဖြတ်ချက်များအတွက် တရားဝင်အရေးပေါ်လမ်းညွှန်ချက်များကို အမြဲကြည့်ရှုပါ။',
      section3title:'၃။ သင့်လျော်သော အသုံးပြုမှု',section3body:'ပညာရေးရည်ရွယ်ချက်ဖြင့် ဝက်ဘ်ဆိုက်ကို ကြည့်ရှုပြီး လင့်ခ်များကို မျှဝေနိုင်ပါသည်။ ဝက်ဘ်ဆိုက်လုပ်ဆောင်မှုကို နှောင့်ယှက်ခြင်း သို့မဟုတ် ဤအကြောင်းအရာကို တရားဝင်အရေးပေါ်ညွှန်ကြားချက်အဖြစ် မဖော်ပြပါနှင့်။',
      section4title:'၄။ ရင်းမြစ်များနှင့် ပြင်ပဝက်ဘ်ဆိုက်များ',section4body:'ဓာတ်ပုံများ၊ ဖောင့်များ၊ framework များနှင့် သုတေသနလင့်ခ်များတွင် ပြင်ပပိုင်ရှင်များနှင့် မူပိုင်ခွင့်လိုင်စင်များ ရှိနိုင်ပါသည်။ ပြန်လည်အသုံးပြုရာတွင် သက်ဆိုင်ရာ စည်းမျဉ်းများကို လိုက်နာပါ။',
      section5title:'၅။ သဘောတူညီချက်ကို စက်အတွင်းသိမ်းဆည်းခြင်း',section5body:'သင်သဘောတူပါက ဤ browser ၏ localStorage တွင် စည်းကမ်းချက်ဗားရှင်းနှင့် သဘောတူသည့်အချိန်ကိုသာ သိမ်းဆည်းမည်ဖြစ်သည်။ QUAKE သည် ဤမှတ်တမ်းကို ဆာဗာသို့ မပို့ပါ။ အောက်တွင် သဘောတူညီချက်ကို ပြန်လည်ရုပ်သိမ်းနိုင်ပါသည်။',
      section6title:'၆။ ပြင်ဆင်မှုများနှင့် ဝန်ဆောင်မှု',section6body:'ကျောင်းစီမံကိန်း ဆက်လက်ဖွံ့ဖြိုးလာသည်နှင့်အမျှ အကြောင်းအရာနှင့် စည်းကမ်းချက်များကို ပြင်ဆင်နိုင်ပါသည်။ ဗားရှင်းအသစ်အတွက် ထပ်မံသဘောတူရန် တောင်းဆိုမည်ဖြစ်ပြီး ဝက်ဘ်ဆိုက်ကို ပညာရေးအတွက် လက်ရှိအခြေအနေအတိုင်း ပေးထားပါသည်။',
      pending:'သဘောတူညီချက် မသိမ်းရသေးပါ',pendingDescription:'အထက်ပါစည်းကမ်းချက်များကို ဖတ်ရှုပြီး သဘောတူရန် ရွေးချယ်နိုင်ပါသည်။',checkbox:'QUAKE အသုံးပြုမှုစည်းကမ်းချက်များကို ဖတ်ရှုပြီး သဘောတူပါသည်။',accept:'သဘောတူပြီး သိမ်းဆည်းရန်',revoke:'သဘောတူညီချက် ပြန်ရုပ်သိမ်းရန်',localNote:'ဤ browser တွင်သာ သိမ်းဆည်းထားပါသည်။ ဝက်ဘ်ဆိုက်ဒေတာရှင်းလင်းပါက မှတ်တမ်းပျက်သွားပါမည်။',sideLink:'အသုံးပြုမှု စည်းကမ်းချက်များ',
      accepted:'သဘောတူညီချက် သိမ်းဆည်းပြီး',acceptedDescription:'ဤစည်းကမ်းချက်ဗားရှင်းကို သင် သဘောတူပြီးဖြစ်ပါသည်။',date:'သဘောတူသည့်နေ့',error:'Browser က localStorage ကို ပိတ်ထားသောကြောင့် သဘောတူညီချက်ကို မမှတ်မိနိုင်ပါ။',withdrawn:'သင်၏ သဘောတူညီချက်ကို ပြန်လည်ရုပ်သိမ်းပြီးပါပြီ။'
    }
  };
  let lang = document.documentElement.lang === 'my' ? 'mm' : 'en';
  try { lang = localStorage.getItem('quake-language') || lang; } catch {}
  function getSaved() {
    try {const item = JSON.parse(localStorage.getItem(KEY) || 'null');return item && item.version === VERSION && item.accepted === true && typeof item.acceptedAt === 'string' ? item : null;} catch {return null;}
  }
  function showError(message) {errorNode.hidden = !message;errorNode.textContent = message || '';}
  function render() {
    const d = translations[lang];
    document.querySelectorAll('[data-tos]').forEach(node => {node.textContent = d[node.dataset.tos] || node.textContent;});
    const saved = getSaved();
    card.classList.toggle('is-accepted', Boolean(saved));
    pending.hidden = Boolean(saved);
    acceptedPanel.hidden = !saved;
    statusTitle.textContent = d[saved ? 'accepted' : 'pending'];
    statusDescription.textContent = d[saved ? 'acceptedDescription' : 'pendingDescription'];
    accept.disabled = !checkbox.checked;
    if(saved){const time = new Date(saved.acceptedAt); const pretty = Number.isNaN(time.getTime()) ? saved.acceptedAt : new Intl.DateTimeFormat(lang === 'mm' ? 'my-MM' : 'en-GB', {day:'numeric',month:'long',year:'numeric'}).format(time);acceptanceDate.textContent = `${d.date}: ${pretty}`;}
  }
  checkbox.addEventListener('change', () => {accept.disabled = !checkbox.checked;});
  accept.addEventListener('click', () => {
    if (!checkbox.checked) return;
    try {
      localStorage.setItem(KEY, JSON.stringify({accepted:true, version:VERSION, acceptedAt:new Date().toISOString()}));
      if (!getSaved()) throw new Error('Storage did not persist');
      showError(''); render();
    } catch { showError(translations[lang].error); }
  });
  revoke.addEventListener('click', () => {
    try {localStorage.removeItem(KEY);checkbox.checked=false;render();showError('');} catch {showError(translations[lang].error);}
  });
  document.querySelectorAll('#quakeHeader .lang-option').forEach(opt => opt.addEventListener('click', () => {
    lang = opt.dataset.lang === 'mm' ? 'mm' : 'en';render();
  }));
  render();
});
