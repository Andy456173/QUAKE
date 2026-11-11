'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const search = document.getElementById('refSearch');
  const filters = [...document.querySelectorAll('.ref-filter')];
  const groups = [...document.querySelectorAll('.ref-group')];
  const count = document.getElementById('refResultCount');
  const resetButton = document.getElementById('refReset');
  const noResults = document.getElementById('refNoResults');
  const noResultsReset = document.getElementById('refNoResultsReset');
  const copyAllButton = document.getElementById('refCopyAll');
  const toast = document.getElementById('refToast');
  const languageButton = document.querySelector('.lang-button');
  let activeCategory = 'all';
  let language = 'en';
  let toastTimer;
  const originalContent = new Map();
  const originalSearch = new Map();
  const mm = {
    '.ref-hero .ref-kicker': 'QUAKE / အသိပညာဗဟို',
    '.ref-hero-eyebrow': 'ယုံကြည်ရသော အချက်အလက်။ မူရင်းရင်းမြစ်များ။',
    '.ref-hero h1': 'ကိုးကား <span>ရင်းမြစ်များ။</span>',
    '.ref-hero-description': 'ယုံကြည်စိတ်ချရသော အချက်အလက်များမှ ကြိုတင်ပြင်ဆင်မှု စတင်ပါသည်။ QUAKE ၏ ငလျင်ပညာပေးအရင်းအမြစ်များအတွက် တရားဝင်သိပ္ပံအချက်အလက်၊ လုံခြုံရေးအကြံပြုချက်နှင့် သုတေသနများကို လေ့လာပါ။',
    '.ref-hero-anchor': 'ရင်းမြစ်စာကြည့်တိုက်ကို ကြည့်ရန် <i aria-hidden="true" data-lucide="arrow-down-right"></i>',
    '.ref-hero-art-label': 'ဖတ်ပါ / စစ်ဆေးပါ / ပြင်ဆင်ပါ',
    '.ref-stat-grid > div > span': ['ယုံကြည်စိတ်ချရသော ရင်းမြစ်များ', 'သုတေသနခေါင်းစဉ်များ', 'ရင်းမြစ်အဖွဲ့အစည်းများ', 'တရားဝင်အဖွဲ့အစည်းများ<br/>နှင့် အများပြည်သူလမ်းညွှန်ချက်များ'],
    '.ref-eyebrow': 'သုတေသနနှင့် ကိုးကားချက်များ',
    '.ref-intro-row h2': 'ရင်းမြစ် <span>စာကြည့်တိုက်။</span>',
    '.ref-intro-row p': 'ယုံကြည်ရသော ဝက်ဘ်ဆိုက်ကို ရှာဖွေပါ၊ မူရင်းအချက်အလက်ကို စစ်ဆေးပါ သို့မဟုတ် ကိုးကားချက်ကို ကူးယူပါ။',
    '.ref-search-wrap label': 'ကိုးကားရင်းမြစ်များကို ရှာရန်',
    '.ref-sidebar > h3': 'ရင်းမြစ်အလိုက် ကြည့်ရန်',
    '.ref-filter > span': ['ကိုးကားချက်အားလုံး', 'ကြိုတင်ပြင်ဆင်မှုနှင့် လုံခြုံရေး', 'ငလျင်သိပ္ပံ', 'မြန်မာနိုင်ငံ ငလျင်သုတေသန', 'ဘေးအန္တရာယ်လျှော့ချရေး'],
    '.ref-sidebar-card h4': 'အချက်အလက်ကို စစ်ဆေးပါ။',
    '.ref-sidebar-card p': 'ကိန်းဂဏန်း သို့မဟုတ် အကြံပြုချက်များကို မျှဝေမီ မူရင်းရင်းမြစ်ကို ဖတ်ပါ။ အချက်အလက်နှင့် လမ်းညွှန်ချက်များကို ပြင်ဆင်နိုင်သည်။',
    '.ref-sidebar-card a': 'မေးလေ့ရှိသော မေးခွန်းများသို့ ပြန်ရန် <i aria-hidden="true" data-lucide="arrow-up-right"></i>',
    '.ref-group-heading .ref-section-index': ['၀၁ / ရင်းမြစ်အုပ်စု', '၀၂ / ရင်းမြစ်အုပ်စု', '၀၃ / ရင်းမြစ်အုပ်စု', '၀၄ / ရင်းမြစ်အုပ်စု'],
    '.ref-group-heading h3': ['ကြိုတင်ပြင်ဆင်မှုနှင့် လုံခြုံရေး<span>.</span>', 'ငလျင်သိပ္ပံ<span>.</span>', 'မြန်မာနိုင်ငံ ငလျင်သုတေသန<span>.</span>', 'ဘေးအန္တရာယ်လျှော့ချရေး<span>.</span>'],
    '.ref-section-count': ['ရင်းမြစ် ၄ ခု', 'ရင်းမြစ် ၂ ခု', 'ရင်းမြစ် ၄ ခု', 'ရင်းမြစ် ၂ ခု'],
    '.ref-type': ['ကြိုတင်ပြင်ဆင်မှု', 'တုန်ခါနေစဉ်', 'တုန်ခါမှုပြီးနောက်', 'စစ်ဆေးရန်စာရင်း', 'ငလျင်သိပ္ပံ', 'ကြိုတင်ခန့်မှန်းမှု', '၂၀၂၅ ငလျင်ဖြစ်စဉ်', 'ငလျင်အချက်အလက်', 'လူသားချင်းစာနာမှုဆိုင်ရာ သက်ရောက်မှု', '၂၀၂၅ နှစ်ချုပ်သုံးသပ်ချက်', 'ဘေးအန္တရာယ်လျှော့ချရေး အဓိပ္ပာယ်', 'အသုံးအနှုန်းများ'],
    '.ref-description': [
      'ငလျင်မလှုပ်မီ အိမ်၊ အရေးပေါ်ပစ္စည်းများနှင့် မိသားစုအစီအစဉ်ကို ပြင်ဆင်ရန် လက်တွေ့လမ်းညွှန်ချက်။',
      'အခြေအနေနှင့် နေရာအမျိုးမျိုးအတွက် ဝပ်ပါ၊ အကာအကွယ်ယူပါ၊ ကိုင်ထားပါ နည်းလမ်းပါဝင်သည့် ရှင်းလင်းသော ညွှန်ကြားချက်များ။',
      'နောက်ဆက်တွဲငလျင်၊ မလုံခြုံသောအဆောက်အအုံ၊ ပျက်စီးသော အသုံးအဆောင်စနစ်၊ ဒဏ်ရာနှင့် ကမ်းရိုးတန်းဆူနာမီသတိပေးချက်များအကြောင်း အချက်အလက်။',
      'မြန်မာဘာသာဖြင့် ငလျင်စစ်ဆေးရန်စာရင်း အပါအဝင် ဘေးအန္တရာယ်အတွက် အသင့်ပြင်ဆင်ရန် အကြံပြုချက်များနှင့် ဒေါင်းလုဒ်လုပ်နိုင်သည့် စာရင်းများ။',
      'ငလျင်ဖြစ်ပေါ်ရသည့်အကြောင်းရင်း၊ ပြတ်ရွေ့ကြောရွေ့လျားမှု၊ အများတွေ့ရသော အယူအဆမှားများနှင့် ကြိုတင်ပြင်ဆင်ရန် အရေးကြီးပုံကို ရှင်းပြထားသည်။',
      'ငလျင်ကို ကြိုတင်ခန့်မှန်းရာတွင် ကန့်သတ်ချက်များနှင့် အန္တရာယ်ခန့်မှန်းခြင်း၊ ဖြစ်ရပ်တစ်ခုကို တိတိကျကျ ခန့်မှန်းခြင်းတို့၏ ကွာခြားချက်ကို ဖော်ပြထားသည်။',
      '၂၀၂၅ ခုနှစ် မတ်လ ၂၈ ရက် မန္တလေးငလျင်ကြီးနှင့် ၎င်း၏ ဘူမိဗေဒအခြေအနေကို သိပ္ပံနည်းကျ ခြုံငုံသုံးသပ်ထားသည်။',
      'အချိန်၊ တည်နေရာ၊ ပြင်းအားနှင့် ဆက်စပ်သိပ္ပံအချက်အလက်များ အပါအဝင် တရားဝင်ငလျင်ဖြစ်စဉ်မှတ်တမ်း။',
      '၂၀၂၅ မတ်လငလျင်ပြီးနောက် ဒဏ်ရာရမှု၊ နေရပ်စွန့်ခွာမှု၊ ကျောင်းများ၊ ကလေးများနှင့် လူမှုအသိုင်းအဝိုင်းလိုအပ်ချက်များကို ရက်စွဲဖြင့် ဖော်ပြထားသော အစီရင်ခံစာ။',
      'ကလေးများနှင့် မရှိမဖြစ်ဝန်ဆောင်မှုများအပေါ် ငလျင်၏သက်ရောက်မှု အပါအဝင် ၂၀၂၅ နှစ်ကုန်ပိုင်း လူသားချင်းစာနာမှုအခြေအနေ သုံးသပ်ချက်။',
      'ရှိပြီးသားအန္တရာယ်ကို လျှော့ချခြင်း၊ အန္တရာယ်အသစ်မဖြစ်စေရန် တားဆီးခြင်းနှင့် လူမှုအသိုင်းအဝိုင်း၏ ခံနိုင်ရည်ကို မြှင့်တင်ခြင်းအကြောင်း တရားဝင်ရှင်းလင်းချက်။',
      'အန္တရာယ်၊ ထိခိုက်လွယ်မှု၊ ခံနိုင်ရည်နှင့် ဘေးအန္တရာယ်စီမံခန့်ခွဲမှုတို့အကြောင်း ဆွေးနွေးရာတွင် နိုင်ငံတကာအသိအမှတ်ပြု အသုံးအနှုန်းများ။'
    ],
    '.ref-citation > span': 'APA ပုံစံ ကိုးကားချက်',
    '.ref-card-actions .ref-copy': 'ကိုးကားချက် ကူးယူရန် <i aria-hidden="true" data-lucide="copy"></i>',
    '.ref-card-actions .ref-visit': 'ရင်းမြစ်ကို ကြည့်ရန် <i aria-hidden="true" data-lucide="arrow-up-right"></i>',
    '.ref-no-results h3': 'ကိုက်ညီသော ရင်းမြစ် မတွေ့ပါ။',
    '.ref-no-results p': 'အခြားစကားလုံးဖြင့် ရှာပါ သို့မဟုတ် ရင်းမြစ်စာကြည့်တိုက်တစ်ခုလုံးကို ကြည့်ပါ။',
    '#refNoResultsReset': 'ကိုးကားရင်းမြစ်အားလုံးကို ကြည့်ရန် <i aria-hidden="true" data-lucide="arrow-right"></i>',
    '.ref-final .ref-kicker': 'ပွင့်လင်းမြင်သာသော သုတေသန',
    '.ref-final h2': 'ရင်းမြစ်ကို သိပါ။<br/><span>အချက်အလက်ကို ယုံကြည်ပါ။</span>',
    '.ref-final-layout > div:first-child > p': 'QUAKE သည် ကျောင်းသားများ၏ ပညာပေးပရောဂျက်ဖြစ်သည်။ ယုံကြည်စိတ်ချရသော အဖွဲ့အစည်းများ၏ အများပြည်သူရင်းမြစ်များကို ကိုးကားပြီး မူရင်းစာတမ်းများကို စစ်ဆေးဖတ်ရှုရန် တိုက်တွန်းပါသည်။',
    '.ref-final-panel > span': 'ကိုးကားစာရင်းကို ပြုစုပါ',
    '.ref-final-panel h3': 'ကိုးကားချက် လိုအပ်ပါသလား။',
    '.ref-final-panel p': 'ကိုးကားချက်တစ်ခုချင်းစီကို ကူးယူပါ သို့မဟုတ် တစ်ချက်နှိပ်၍ စာရင်းတစ်ခုလုံးကို ရယူပါ။',
    '#refCopyAll': 'ကိုးကားချက်အားလုံးကို ကူးယူရန် <i aria-hidden="true" data-lucide="copy"></i>',
    '#site-footer .footer-columns p': 'QUAKE သည် မြန်မာနိုင်ငံရှိ ငလျင်သမိုင်းနှင့် ဘေးအန္တရာယ်လျှော့ချရေးအကြောင်း ကျောင်းသားများ ဦးဆောင်ဖန်တီးထားသော ပညာပေးဝက်ဘ်ဆိုက်ဖြစ်သည်။',
    '.footer-bottom > span:first-child': 'မူပိုင်ခွင့် © ၂၀၂၆ QUAKE။ မူပိုင်ခွင့်အားလုံး ရယူထားသည်။ QUAKE ဖန်တီးရေးအဖွဲ့က ကျောင်းသား ICT PBL ပရောဂျက်အဖြစ် ဖန်တီးထားသည်။'
  };

  // Makes the search and category buttons work together.
  function updateReferences() {
    const query = search.value.trim().toLocaleLowerCase();
    let visibleCount = 0;

    groups.forEach((group) => {
      const matchesCategory = activeCategory === 'all' || group.dataset.category === activeCategory;
      let groupCount = 0;

      group.querySelectorAll('.ref-card').forEach((card) => {
        const searchableText = card.dataset.search.toLocaleLowerCase();
        const visible = matchesCategory && searchableText.includes(query);
        card.hidden = !visible;
        if (visible) groupCount++;
      });

      group.hidden = groupCount === 0;
      visibleCount += groupCount;
    });

    count.textContent = language === 'mm'
      ? `ရင်းမြစ် ${visibleCount} ခုကို ပြသနေသည်`
      : `SHOWING ${visibleCount} ${visibleCount === 1 ? 'SOURCE' : 'SOURCES'}`;
    noResults.hidden = visibleCount !== 0;
    resetButton.hidden = activeCategory === 'all' && query.length === 0;
  }

  function resetReferences() {
    search.value = '';
    activeCategory = 'all';

    filters.forEach((filter) => {
      const selected = filter.dataset.filter === 'all';
      filter.classList.toggle('is-active', selected);
      filter.setAttribute('aria-pressed', String(selected));
    });

    updateReferences();
    search.focus();
  }

  filters.forEach((filter) => {
    filter.addEventListener('click', () => {
      activeCategory = filter.dataset.filter;

      filters.forEach((button) => {
        const selected = button === filter;
        button.classList.toggle('is-active', selected);
        button.setAttribute('aria-pressed', String(selected));
      });

      updateReferences();
    });
  });

  search.addEventListener('input', updateReferences);
  resetButton.addEventListener('click', resetReferences);
  noResultsReset.addEventListener('click', resetReferences);

  // Copy a single APA-style citation or the entire reference list.
  async function copyText(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const helper = document.createElement('textarea');
        helper.value = text;
        helper.style.position = 'fixed';
        helper.style.opacity = '0';
        document.body.appendChild(helper);
        helper.select();
        const copied = document.execCommand('copy');
        helper.remove();
        if (!copied) throw new Error('Clipboard not available');
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  function showToast(message) {
    toast.querySelector('span').textContent = message;
    toast.hidden = false;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('is-visible');
      toast.hidden = true;
    }, 2600);
  }

  function applyLanguage(value) {
    language = value === 'mm' ? 'mm' : 'en';
    document.documentElement.lang = language === 'mm' ? 'my' : 'en';
    document.title = language === 'mm' ? 'ကိုးကားချက်များ | QUAKE' : 'References | QUAKE — Earthquake Risk Reduction';
    const description = document.querySelector('meta[name="description"]');
    if (description) {
      if (!originalContent.has(description)) originalContent.set(description, description.content);
      description.content = language === 'mm'
        ? 'QUAKE ဝက်ဘ်ဆိုက်တွင် အသုံးပြုထားသော ယုံကြည်စိတ်ချရသည့် ငလျင်၊ လုံခြုံရေးနှင့် ဘေးအန္တရာယ်လျှော့ချရေး ရင်းမြစ်များ။'
        : originalContent.get(description);
    }
    Object.entries(mm).forEach(([selector, values]) => {
      const elements = [...document.querySelectorAll(selector)];
      const items = Array.isArray(values) ? values : Array(elements.length).fill(values);
      if (elements.length !== items.length) {
        throw new Error(`References translation count mismatch for "${selector}".`);
      }
      elements.forEach((element, index) => {
        if (!originalContent.has(element)) originalContent.set(element, element.innerHTML);
        element.innerHTML = language === 'mm' ? items[index] : originalContent.get(element);
      });
    });
    document.querySelectorAll('.ref-card').forEach((card, index) => {
      if (!originalSearch.has(card)) originalSearch.set(card, card.dataset.search);
      card.dataset.search = language === 'mm'
        ? `${originalSearch.get(card)} ${document.querySelectorAll('.ref-description')[index]?.textContent || ''}`
        : originalSearch.get(card);
      const sourceTitle = card.querySelector('h4').textContent;
      card.querySelector('.ref-copy').setAttribute(
        'aria-label',
        language === 'mm' ? `ကိုးကားချက်ကို ကူးယူရန်: ${sourceTitle}` : `Copy citation for ${sourceTitle}`
      );
      card.querySelector('.ref-visit').setAttribute(
        'aria-label',
        language === 'mm' ? `ရင်းမြစ်ကို ကြည့်ရန်: ${sourceTitle}` : `Visit source: ${sourceTitle}`
      );
    });
    search.placeholder = language === 'mm'
      ? 'ဥပမာ - မန္တလေး၊ လုံခြုံရေး၊ USGS'
      : 'e.g. Mandalay, safety, USGS';
    if (languageButton) languageButton.setAttribute('aria-label', language === 'mm' ? 'ဘာသာစကား ပြောင်းရန်: မြန်မာ' : 'Change language: English');
    document.querySelectorAll('.lang-option').forEach((option) => {
      const active = option.dataset.lang === language;
      option.classList.toggle('active', active);
      option.setAttribute('aria-checked', String(active));
    });
    updateReferences();
  }

  const copyButtons = [...document.querySelectorAll('.ref-copy')];
  copyButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      const success = await copyText(button.dataset.citation);
      showToast(language === 'mm'
        ? (success ? 'ကိုးကားချက်ကို ကူးယူပြီးပါပြီ။' : 'ကူးယူ၍ မရပါ။ ကိုးကားစာသားကို ကိုယ်တိုင်ရွေးချယ်ပါ။')
        : (success ? 'Citation copied to clipboard!' : 'Could not copy. Please select the citation text.'));
    });
  });

  copyAllButton.addEventListener('click', async () => {
    const text = copyButtons.map((button) => button.dataset.citation).join('\n\n');
    const success = await copyText(text);
    showToast(language === 'mm'
      ? (success ? 'ကိုးကားချက်အားလုံးကို ကူးယူပြီးပါပြီ။' : 'ကူးယူ၍ မရပါ။ ကိုးကားချက်များကို ကိုယ်တိုင်ကူးယူပါ။')
      : (success ? 'All references copied!' : 'Could not copy. Please copy references manually.'));
  });

  document.querySelectorAll('.lang-option').forEach((option) => {
    option.addEventListener('click', () => applyLanguage(option.dataset.lang));
  });
  try {
    language = localStorage.getItem('quake-language') === 'mm' ? 'mm' : 'en';
  } catch (error) {
    language = document.documentElement.lang === 'my' ? 'mm' : 'en';
  }
  applyLanguage(language);
  updateReferences();
  if (window.lucide) window.lucide.createIcons();
});
