'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const crack = document.getElementById('heroCrack');
  const hero = document.querySelector('.hero');
  const replayButton = document.getElementById('replayCrack');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const languagePicker = document.querySelector('.lang-picker');
  const languageButton = document.querySelector('.lang-button');
  const languageOptions = document.querySelectorAll('.lang-option');
  const homeMm = {
    '.development-notice__eyebrow': 'QUAKE မှ အသိပေးချက်',
    '.development-notice__copy strong': 'ခရစ္စမတ်နှင့် နှစ်သစ်ကူး အားလပ်ရက် နီးလာပါပြီ။',
    '.development-notice__message': 'လုံခြုံအေးချမ်းသော အားလပ်ရက်ဖြစ်ပါစေ။',
    '.hero-eyebrow': 'မြန်မာနိုင်ငံ ငလျင်အသိပညာ',
    '.display-heading': 'ငလျင်များ<br/><span class="orange-text">လှုပ်တတ်သည်။</span>',
    '.hero-description': 'ငလျင်ကို မတားဆီးနိုင်သော်လည်း ကြိုတင်ပြင်ဆင်နိုင်ပါသည်။ မြန်မာနိုင်ငံ၏ ပြင်းထန်သော ငလျင်သမိုင်း၊ သက်ရောက်မှုများနှင့် ပိုမိုလုံခြုံစေရန် နည်းလမ်းများကို လေ့လာပါ။',
    '.hero-actions .btn-primary-custom': 'ပိုမိုလေ့လာရန် <span aria-hidden="true">↗</span>',
    '.hero-actions .btn-outline-custom': 'ဘယ်လိုပြင်ဆင်မလဲ <span aria-hidden="true">↗</span>',
    '.hero-keywords': '<span>လေ့လာပါ</span><span>ပြင်ဆင်ပါ</span><span>လုပ်ဆောင်ပါ</span>',
    '.replay-button': '↻   အက်ကွဲမှုကို ပြန်ပြရန်',
    '.about-section .section-eyebrow': 'အန္တရာယ်ကို သိရှိပါ',
    '#about-heading': 'ငလျင်များသည် <span class="orange-text">အရေးကြီးသည်။</span>',
    '.about-section .content-copy': [
      'မြန်မာနိုင်ငံသည် ငလျင်လှုပ်ရှားမှုများသော ဒေသတွင် တည်ရှိပြီး စစ်ကိုင်းပြတ်ရွေ့ကြောသည် နိုင်ငံ၏ အစိတ်အပိုင်းများကို ဖြတ်သန်းသွားသည်။ ငလျင်ကြောင့် အဆောက်အအုံများ၊ တံတားများ၊ လမ်းများ၊ ကျောင်းများနှင့် သမိုင်းဝင်နေရာများ ပျက်စီးကာ လူမှုအသိုင်းအဝိုင်းများအပေါ် ပြင်းထန်သော သက်ရောက်မှုများ ဖြစ်ပေါ်နိုင်ပါသည်။',
      'QUAKE သည် ငလျင်သမိုင်းအချက်အလက်များကို ပိုမိုလက်လှမ်းမီစေရန်နှင့် ဘေးအန္တရာယ်မဖြစ်မီ <strong>ကြိုတင်ပြင်ဆင်ရန်</strong> အားပေးသည့် ကျောင်းသားများ ဖန်တီးထားသော ICT PBL ဝက်ဘ်ဆိုက်ဖြစ်သည်။'
    ],
    '.about-photo-frame figcaption': 'ငလျင်ပျက်စီးမှု / ရန်ကုန်–မန္တလေး အမြန်လမ်း',
    '.preparedness-section .section-eyebrow': 'ကြိုတင်ပြင်ဆင်ပါ',
    '#preparedness-heading': '<span class="orange-text">မလှုပ်မီ</span> အသင့်ပြင်ထားပါ။',
    '.preparedness-section > .site-container > .section-description': 'ငလျင်မလှုပ်မီ လုပ်ဆောင်ထားသော အဆင့်ငယ်များသည် သင်၊ သင့်မိသားစုနှင့် ကျောင်းအသိုင်းအဝိုင်းကို ကာကွယ်ရန် အထောက်အကူပြုနိုင်သည်။ ကြိုတင်ပြင်ဆင်နည်း သုံးမျိုးကို လေ့လာပါ။',
    '.readiness-kicker': 'မြေပြင်တုန်ခါလာသောအခါ',
    '#shaking-guide-heading': 'ဤအချက်သုံးချက်ကို မှတ်ထားပါ။',
    '.guide-steps p span': [
      'လက်နှင့် ဒူးများကို မြေပြင်ပေါ်ချပါ။',
      'ဖြစ်နိုင်ပါက ခိုင်ခံ့သော ပရိဘောဂအောက်တွင် ဦးခေါင်းနှင့် လည်ပင်းကို ကာကွယ်ပါ။',
      'တုန်ခါမှုရပ်သည်အထိ ခိုကိုးရာကို ကိုင်ထားပြီး အတွင်း၌နေပါ။'
    ],
    '.guide-note': 'အပြင်ဘက်တွင် ရှိနေပါက အန္တရာယ်ကင်းချိန်တွင် အဆောက်အအုံများ၊ သစ်ပင်များနှင့် လျှပ်စစ်ကြိုးများမှ ဝေးရာသို့ ရွှေ့ပါ။',
    '.picture-number': ['၀၁ / ပစ္စည်းထည့်ပါ', '၀၂ / လေ့ကျင့်ပါ', '၀၃ / အစီအစဉ်ဆွဲပါ'],
    '.preparedness-body h3': [
      'အရေးပေါ် <span class="orange-text">အသုံးအဆောင်အိတ်။</span>',
      'ဝပ်ပါ၊ အကာအကွယ်ယူပါ၊ <span class="orange-text">ကိုင်ထားပါ။</span>',
      'ဘေးကင်းရေး <span class="orange-text">အစီအစဉ်။</span>'
    ],
    '.preparedness-body > p': [
      'သောက်ရေ၊ ကြာရှည်ခံအစားအစာ၊ ဆေးဝါး၊ ဓာတ်မီး၊ ဘက်ထရီနှင့် အရေးပေါ်ဆက်သွယ်ရန် ဖုန်းနံပါတ်များကို ပြင်ဆင်ထားပါ။',
      'မြေပြင်တုန်ခါလာသောအခါ ဦးခေါင်းနှင့် လည်ပင်းကို ကာကွယ်ရန် နည်းလမ်းကို သိရှိပြီး လုံခြုံစွာ တုံ့ပြန်ရန် လေ့ကျင့်ပါ။',
      'လုံခြုံသောနေရာများကို သတ်မှတ်ပါ၊ အရေးပေါ်ဆက်သွယ်ရန် အချက်အလက်များကို စီစဉ်ပါ၊ ငလျင်ပြီးနောက် မိသားစုတွေ့ဆုံမည့်နေရာကို သဘောတူထားပါ။'
    ],
    '.tips-toggle': 'လုံခြုံရေးအကြံပြုချက်များကို ကြည့်ရန် <span aria-hidden="true">↗</span>',
    '.tips-content p': [
      'ပစ္စည်းများကို အလွယ်တကူ ရယူနိုင်သည့်နေရာတွင် ထားပါ။ ရှေးဦးသူနာပြုအိတ်၊ ခိုင်ခံ့သောဖိနပ်နှင့် အရေးကြီးစာရွက်စာတမ်း မိတ္တူများ ထည့်ပါ။ အိတ်ကို ပုံမှန်စစ်ဆေးပါ။',
      'လက်နှင့် ဒူးများကို မြေပြင်ပေါ်ချပါ။ ရနိုင်ပါက ခိုင်ခံ့သောစားပွဲအောက်တွင် ဦးခေါင်းနှင့် လည်ပင်းကို ကာကွယ်ပြီး တုန်ခါမှုရပ်သည်အထိ ကိုင်ထားပါ။ တုန်ခါနေစဉ် အပြင်သို့ မပြေးပါနှင့်။',
      'လေးလံသော ပရိဘောဂများကို မြဲမြံစွာ တပ်ဆင်ပါ။ အခန်းတိုင်းရှိ ခိုကိုးရာနေရာများကို သိရှိထားပါ။ အရေးပေါ်ဆက်သွယ်ရေးအစီအစဉ်ကို ပြုလုပ်ပြီး ကျောင်းနှင့် အိမ်တွင် လေ့ကျင့်ခန်းများတွင် ပါဝင်ပါ။'
    ],
    '.history-heading-row .section-eyebrow': 'မြန်မာနိုင်ငံ ငလျင်သမိုင်း',
    '#history-heading': 'မြန်မာနိုင်ငံ၏ <span class="orange-text">သမိုင်းဝင်ငလျင်များ။</span>',
    '.history-heading-row .section-description': 'မကြာသေးမီက မြန်မာနိုင်ငံတွင် အပြင်းထန်ဆုံး ငလျင်များထဲမှ တစ်ခု၏ သက်ရောက်မှုကို လေ့လာပါ။ ထို့နောက် ငလျင်ဖြစ်စဉ် အချိန်ဇယားအပြည့်အစုံကို ကြည့်ရှုပါ။',
    '.history-heading-link': 'သမိုင်းအပြည့်အစုံကို ကြည့်ရန် <span aria-hidden="true">↗</span>',
    '.image-tag': 'အထူးဖော်ပြချက် / ၂၀၂၅',
    '.featured-meta .date-badge': '၂၀၂၅ မတ် ၂၈',
    '.featured-meta > span:last-child': 'မန္တလေးနှင့် စစ်ကိုင်း၊ မြန်မာနိုင်ငံ',
    '.featured-content h3': 'မန္တလေး–စစ်ကိုင်း<br/><span class="orange-text">ငလျင်ကြီး</span>',
    '.featured-content > p:first-of-type': '၂၀၂၅ ခုနှစ် မတ်လ ၂၈ ရက်တွင် စစ်ကိုင်းနှင့် မန္တလေးအနီး မြန်မာနိုင်ငံအလယ်ပိုင်း၌ ပြင်းအား ၇.၇ ရှိသော ငလျင်တစ်ခု လှုပ်ခတ်ခဲ့သည်။ အဆောက်အအုံများ၊ နေအိမ်များ၊ အများပြည်သူဆိုင်ရာ အဆောက်အအုံများနှင့် အရေးပါသော အခြေခံအဆောက်အအုံများ ပြင်းထန်စွာ ပျက်စီးခဲ့သည်။ ဤဘေးအန္တရာယ်က ပိုမိုလုံခြုံသော အဆောက်အအုံများနှင့် ငလျင်ကြိုတင်ပြင်ဆင်မှု၏ အရေးပါမှုကို ဖော်ပြခဲ့သည်။',
    '.feature-stat span': ['ပြင်းအား', 'သတင်းပို့ထားသော သေဆုံးသူ¹', 'ခန့်မှန်းပျက်စီးအဆောက်အအုံ²'],
    '.featured-annotation': '¹ UNICEF ၏ ၂၀၂၅ ဇွန် ၁၃ ရက် အစီရင်ခံချက်အရ သေဆုံးသူ အနည်းဆုံး ၃,၇၄၅ ဦးရှိသည်။ ² UNU ၏ ခန့်မှန်းချက်သည် မန္တလေးတစ်မြို့တည်းမဟုတ်ဘဲ စစ်တမ်းကောက်ယူထားသော မြို့ ၇ မြို့ကို လွှမ်းခြုံသည်။',
    '.featured-actions .btn-primary-custom': 'ကြိုတင်ပြင်ဆင်ပါ <span aria-hidden="true">↗</span>',
    '.featured-actions .source-link': ['အချိန်ဇယားအပြည့်အစုံကို ကြည့်ရန် ↗', 'သုတေသနရင်းမြစ်ကို ကြည့်ရန် ↗'],
    '.cta-layout h2': 'အတိတ်မှ <span>သင်ယူပါ။ အနာဂတ်အတွက် ပြင်ဆင်ပါ။</span>',
    '.cta-layout p': 'ငလျင်ဖြစ်မည့် ရက်စွဲနှင့် အချိန်ကို ယုံကြည်စိတ်ချစွာ ကြိုတင်ခန့်မှန်း၍ မရပါ။ ကြိုတင်ပြင်ဆင်ခြင်းနှင့် ပိုမိုလုံခြုံသော အဆောက်အအုံများက အန္တရာယ်ကို လျှော့ချပေးနိုင်သည်။',
    '.cta-layout a': 'စတင်ပြင်ဆင်ရန် <span aria-hidden="true">↗</span>',
    '#site-footer .footer-columns p': 'QUAKE သည် မြန်မာနိုင်ငံရှိ ငလျင်သမိုင်းနှင့် ဘေးအန္တရာယ်လျှော့ချရေးအကြောင်း ကျောင်းသားများ ဦးဆောင်ဖန်တီးထားသော ပညာပေးဝက်ဘ်ဆိုက်ဖြစ်သည်။',
    '.footer-bottom > span:first-child': 'မူပိုင်ခွင့် © ၂၀၂၆ QUAKE။ မူပိုင်ခွင့်အားလုံး ရယူထားသည်။ QUAKE ဖန်တီးရေးအဖွဲ့က ကျောင်းသား ICT PBL ပရောဂျက်အဖြစ် ဖန်တီးထားသည်။'
  };
  const originalContent = new Map();
  const originalAttributes = new Map();
  const homeMmAttributes = {
    '.hero-keywords': { 'aria-label': 'ကျွန်ုပ်တို့၏ လုပ်ဆောင်ပုံ' },
    '#replayCrack': { 'aria-label': 'ငလျင်အက်ကွဲမှု လှုပ်ရှားမှုကို ပြန်ပြရန်' },
    '.about-photo-frame img': { alt: '၂၀၂၅ မြန်မာနိုင်ငံ ငလျင်ပြီးနောက် ရန်ကုန်–မန္တလေး အမြန်လမ်းပေါ်ရှိ တံတားပျက်စီးမှု' },
    '.preparedness-picture img': { alt: [
      'အရေးပေါ်ကြိုတင်ပြင်ဆင်ရေးအိတ်နှင့် အတွင်းရှိပစ္စည်းများ၏ ဓာတ်ပုံ',
      'စာသင်ခန်း စားပွဲအောက်တွင် ငလျင်ဘေးကင်းရေး လေ့ကျင့်နေသော ကျောင်းသားများ',
      'အရေးပေါ်ရွှေ့ပြောင်းလေ့ကျင့်မှုတွင် ပါဝင်နေသူများ'
    ] },
    '#closeDevelopmentNotice': { 'aria-label': 'အားလပ်ရက်အသိပေးချက်ကို ပိတ်ရန်' }
  };
  let currentLanguage = 'en';
  try {
    currentLanguage = localStorage.getItem('quake-language') === 'mm' ? 'mm' : 'en';
  } catch (error) {
    currentLanguage = document.documentElement.lang === 'my' ? 'mm' : 'en';
  }

  function applyLanguage(language) {
    currentLanguage = language === 'mm' ? 'mm' : 'en';
    document.documentElement.lang = currentLanguage === 'mm' ? 'my' : 'en';
    document.title = currentLanguage === 'mm'
      ? 'မြန်မာနိုင်ငံ ငလျင်အသိပညာနှင့် ကြိုတင်ပြင်ဆင်မှု | QUAKE'
      : 'QUAKE | Myanmar Earthquake Awareness';
    const description = document.querySelector('meta[name="description"]');
    if (description && currentLanguage === 'mm') {
      if (!originalContent.has('description')) originalContent.set('description', description.content);
      description.content = 'မြန်မာနိုင်ငံ၏ ငလျင်သမိုင်းနှင့် သက်ရောက်မှုများကို လေ့လာပြီး ဘေးအန္တရာယ်အတွက် ကြိုတင်ပြင်ဆင်ပါ။';
    } else if (description && originalContent.has('description')) {
      description.content = originalContent.get('description');
    }

    Object.entries(homeMm).forEach(([selector, values]) => {
      const elements = [...document.querySelectorAll(selector)];
      const translations = Array.isArray(values) ? values : Array(elements.length).fill(values);
      if (elements.length !== translations.length) {
        throw new Error(`Homepage translation count mismatch for "${selector}".`);
      }
      elements.forEach((element, index) => {
        if (!originalContent.has(element)) originalContent.set(element, element.innerHTML);
        element.innerHTML = currentLanguage === 'mm'
          ? translations[index]
          : originalContent.get(element);
      });
    });
    Object.entries(homeMmAttributes).forEach(([selector, attributes]) => {
      const elements = [...document.querySelectorAll(selector)];
      Object.entries(attributes).forEach(([attribute, values]) => {
        const items = Array.isArray(values) ? values : Array(elements.length).fill(values);
        if (items.length !== elements.length) {
          throw new Error(`Homepage attribute translation count mismatch for "${selector}".`);
        }
        elements.forEach((element, index) => {
          const key = `${selector}:${attribute}:${index}`;
          if (!originalAttributes.has(key)) originalAttributes.set(key, element.getAttribute(attribute));
          element.setAttribute(attribute, currentLanguage === 'mm' ? items[index] : originalAttributes.get(key));
        });
      });
    });

    document.querySelectorAll('.lang-option').forEach((option) => {
      const active = option.dataset.lang === currentLanguage;
      option.classList.toggle('active', active);
      option.setAttribute('aria-checked', String(active));
    });
    if (languageButton) {
      languageButton.setAttribute(
        'aria-label',
        currentLanguage === 'mm' ? 'ဘာသာစကား ပြောင်းရန်: မြန်မာ' : 'Change language: English'
      );
    }
    document.querySelectorAll('.tips-toggle').forEach((button) => {
      const isOpen = button.getAttribute('aria-expanded') === 'true';
      button.innerHTML = isOpen
        ? (currentLanguage === 'mm' ? 'လုံခြုံရေးအကြံပြုချက်များကို ပိတ်ရန် <span aria-hidden="true">−</span>' : 'HIDE SAFETY TIPS <span aria-hidden="true">−</span>')
        : (currentLanguage === 'mm' ? homeMm['.tips-toggle'] : originalContent.get(button));
    });
  }

  let shakeTimer;
  let cleanupTimer;

  function replayCrack() {
    if (!crack || !hero) return;

    clearTimeout(shakeTimer);
    clearTimeout(cleanupTimer);

    crack.classList.remove('animate');
    hero.classList.remove('quake-shake');
    void crack.getBoundingClientRect();
    crack.classList.add('animate');

    if (!reducedMotion.matches) {
      shakeTimer = setTimeout(() => {
        hero.classList.add('quake-shake');
        cleanupTimer = setTimeout(() => hero.classList.remove('quake-shake'), 420);
      }, 1160);
    }
  }

  if (replayButton) {
    replayButton.addEventListener('click', replayCrack);
  }

  replayCrack();

  document.querySelectorAll('.tips-toggle').forEach((button) => {
    const panel = document.getElementById(button.getAttribute('aria-controls'));
    if (!panel) return;

    button.addEventListener('click', () => {
      const isOpen = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!isOpen));
      panel.hidden = isOpen;
      button.innerHTML = isOpen
        ? (currentLanguage === 'mm' ? 'လုံခြုံရေးအကြံပြုချက်များကို ကြည့်ရန် <span aria-hidden="true">↗</span>' : 'VIEW SAFETY TIPS <span aria-hidden="true">↗</span>')
        : (currentLanguage === 'mm' ? 'လုံခြုံရေးအကြံပြုချက်များကို ပိတ်ရန် <span aria-hidden="true">−</span>' : 'HIDE SAFETY TIPS <span aria-hidden="true">−</span>');
    });
  });

  if (languagePicker && languageButton) {
    const toggleMenu = () => {
      const isOpen = languagePicker.classList.contains('is-open');
      languagePicker.classList.toggle('is-open', !isOpen);
      languageButton.setAttribute('aria-expanded', String(!isOpen));
    };

    languageButton.addEventListener('click', (event) => {
      event.stopPropagation();
      toggleMenu();
    });

    languageOptions.forEach((option) => {
      option.addEventListener('click', () => {
        languageOptions.forEach((item) => {
          const active = item === option;
          item.classList.toggle('active', active);
          item.setAttribute('aria-checked', String(active));
        });

        const selectedLanguage = option.dataset.lang || 'en';
        applyLanguage(selectedLanguage);
        languageButton.dataset.selectedLanguage = selectedLanguage;
        languagePicker.classList.remove('is-open');
        languageButton.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (event) => {
      if (!languagePicker.contains(event.target)) {
        languagePicker.classList.remove('is-open');
        languageButton.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && languagePicker.classList.contains('is-open')) {
        languagePicker.classList.remove('is-open');
        languageButton.setAttribute('aria-expanded', 'false');
        languageButton.focus();
      }
    });
  }

  applyLanguage(currentLanguage);

  document.querySelectorAll('#mainNavbar a[href^="#"]').forEach((link) => {
    link.addEventListener('click', () => {
      const menu = document.getElementById('mainNavbar');
      if (menu && menu.classList.contains('show') && window.bootstrap) {
        window.bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });
});
