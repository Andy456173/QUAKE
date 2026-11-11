'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const translations = {
    en: {
      title: 'Privacy & Policy | QUAKE — Earthquake Risk Reduction',
      description: 'Read the QUAKE website privacy policy and learn how this student-led earthquake education project handles information.',
      navLabel: 'Main navigation',
      homeLabel: 'QUAKE homepage',
      toggleNav: 'Toggle navigation',
      navHome: 'Home',
      navAbout: 'About Us',
      navHistory: 'Earthquake History',
      navPreparedness: 'Preparedness',
      navMore: 'More',
      navFaq: 'FAQ',
      navReferences: 'References',
      navPrivacy: 'Privacy & Policy',
      navProgress: 'Development Progress',
      languageSelector: 'Language selector',
      changeLanguage: 'Change language',
      languageOptions: 'Language options',
      languageEnglish: 'English',
      languageMyanmar: 'Myanmar',
      tickerLabel: 'Latest earthquake news',
      tickerDate: '28 MAR 2025',
      tickerNews: 'A magnitude 7.7 earthquake struck central Myanmar near Mandalay and Sagaing.',
      heroKicker: 'QUAKE / YOUR PRIVACY',
      heroOverline: 'A CLEAR, SIMPLE EXPLANATION',
      heroTitle: 'PRIVACY',
      heroTitleAccent: 'MATTERS.',
      heroDescription: 'This page explains what information may be involved when you visit QUAKE, how this educational website uses it, and what to know about external services.',
      readPolicy: 'READ THE POLICY',
      markLabel: 'INFORMATION / RESPECT',
      policyDetails: 'Privacy policy details',
      summaryLabel: 'In short:',
      summaryText: 'QUAKE is an educational project. The contact form is a demonstration and does not send or store messages.',
      lastUpdated: 'LAST UPDATED',
      updatedDate: 'OCTOBER 30, 2026',
      onThisPage: 'ON THIS PAGE',
      sideInformation: 'Information',
      sideUse: 'How it is used',
      sideExternal: 'External services',
      sideChildren: 'Young visitors',
      sideChoices: 'Your choices',
      sideChanges: 'Policy updates',
      section1Label: '01 / WHAT WE HANDLE',
      section1Title: 'Information we collect',
      section1Body1: 'QUAKE has no account sign-up or comment system. The contact form is a demonstration: entered details are not sent or stored. Some interactive pages save your language and preparedness checklist in browser local storage. If you agree to the Terms of Service, the terms version and acceptance time are saved in this browser only.',
      section1Body2: 'When a web page is requested, the hosting provider and services used to deliver page resources may process basic technical information, such as an IP address, browser details, and the requested file, as part of normal internet delivery and security. QUAKE does not use this information to identify visitors.',
      section2Label: '02 / WHY IT IS USED',
      section2Title: 'How information is used',
      section2Body: "The website is designed to provide earthquake education and preparedness information. It does not sell personal information, run user profiling, or use advertising trackers. Any technical request data handled by hosting or delivery providers is subject to those providers' own practices.",
      section3Label: '03 / SERVICES OUTSIDE QUAKE',
      section3Title: 'External services and links',
      section3Body1: 'Some page resources are delivered by third parties, including Google Fonts, the Bootstrap CDN, and an image hosted through Wikimedia Commons. Following external links may also take you to other websites. When your browser requests those resources or sites, their providers may receive technical request information and apply their own privacy policies.',
      section3Body2: 'QUAKE does not control third-party services or websites. Review their privacy information directly if you want to understand how they handle data.',
      section4Label: '04 / YOUNG VISITORS',
      section4Title: 'Information from children',
      section4Body: 'QUAKE is an educational website and does not knowingly collect personal information from children. Because the site does not provide forms or accounts, visitors should not send personal or sensitive information through any external service linked from this website.',
      section5Label: '05 / YOUR CHOICES',
      section5Title: 'Your choices and browser settings',
      section5Body: 'You can choose not to follow external links, withdraw a saved Terms of Service agreement below, and manage cookies or other site data through your browser settings. Blocking third-party resources may affect how some fonts or images appear, but the main educational content remains available.',
      section6Label: '06 / KEEPING THIS CURRENT',
      section6Title: 'Changes to this policy',
      section6Body: "This policy may be updated if the website's features or services change. The latest revision date is shown near the top of this page. Please check back when you want to review the current version.",
      contactTitle: 'Questions about this page?',
      contactBody: 'QUAKE is a student-led educational project. For questions, please contact the project team through your school or the teacher supervising the project.',
      footerDescription: 'QUAKE is a student-led educational website about historical earthquakes and disaster risk reduction in Myanmar.',
      footerQuickLinks: 'QUICK LINKS',
      footerAbout: 'About Us',
      footerHelpPrivacy: 'HELP & PRIVACY',
      footerFaq: 'FAQ',
      footerPrivacy: 'Privacy & Policy',
      footerCopyright: 'Copyright © 2026 QUAKE. All rights reserved. Student educational website developed by the QUAKE Development Team.',
      footerMotto: 'LEARN · PREPARE · TAKE ACTION'
    },
    mm: {
      title: 'ကိုယ်ရေးအချက်အလက် မူဝါဒ | QUAKE',
      description: 'QUAKE ဝက်ဘ်ဆိုက်၏ ကိုယ်ရေးအချက်အလက်မူဝါဒနှင့် အချက်အလက်များကို ကိုင်တွယ်ပုံကို ဖတ်ရှုပါ။',
      navLabel: 'အဓိက လမ်းညွှန်မီနူး',
      homeLabel: 'QUAKE ပင်မစာမျက်နှာ',
      toggleNav: 'လမ်းညွှန်မီနူး ဖွင့်ရန် သို့မဟုတ် ပိတ်ရန်',
      navHome: 'ပင်မစာမျက်နှာ',
      navAbout: 'ကျွန်ုပ်တို့အကြောင်း',
      navHistory: 'ငလျင်သမိုင်း',
      navPreparedness: 'ကြိုတင်ပြင်ဆင်မှု',
      navMore: 'နောက်ထပ်',
      navFaq: 'မေးလေ့ရှိသော မေးခွန်းများ',
      navReferences: 'ကိုးကားချက်များ',
      navPrivacy: 'ကိုယ်ရေးလုံခြုံမှု မူဝါဒ',
      navProgress: 'ဖန်တီးမှုအခြေအနေ',
      languageSelector: 'ဘာသာစကား ရွေးချယ်ရန်',
      changeLanguage: 'ဘာသာစကား ပြောင်းရန်',
      languageOptions: 'ဘာသာစကား ရွေးချယ်စရာများ',
      languageEnglish: 'အင်္ဂလိပ်',
      languageMyanmar: 'မြန်မာ',
      tickerLabel: 'နောက်ဆုံးရ ငလျင်သတင်း',
      tickerDate: '၂၀၂၅ မတ် ၂၈',
      tickerNews: '၂၀၂၅ ခုနှစ် မတ်လ ၂၈ ရက်နေ့တွင် မန္တလေးနှင့် စစ်ကိုင်းအနီး မြန်မာနိုင်ငံအလယ်ပိုင်း၌ ပြင်းအား ၇.၇ ရှိသော ငလျင်တစ်ခု လှုပ်ခတ်ခဲ့သည်။',
      heroKicker: 'QUAKE / သင့်ကိုယ်ရေးအချက်အလက်',
      heroOverline: 'ရှင်းလင်းလွယ်ကူစွာ ဖော်ပြထားပါသည်',
      heroTitle: 'ကိုယ်ရေးအချက်အလက်',
      heroTitleAccent: 'အရေးကြီးပါသည်။',
      heroDescription: 'ဤစာမျက်နှာတွင် QUAKE ကို လာရောက်ကြည့်ရှုသည့်အခါ ပါဝင်နိုင်သော အချက်အလက်များ၊ ဤပညာပေးဝက်ဘ်ဆိုက်က ၎င်းတို့ကို အသုံးပြုပုံနှင့် ပြင်ပဝန်ဆောင်မှုများအကြောင်း သိထားသင့်သည်များကို ရှင်းပြထားပါသည်။',
      readPolicy: 'မူဝါဒကို ဖတ်ရှုရန်',
      markLabel: 'အချက်အလက် / လေးစားမှု',
      policyDetails: 'ကိုယ်ရေးအချက်အလက်မူဝါဒ အသေးစိတ်',
      summaryLabel: 'အကျဉ်းချုပ် -',
      summaryText: 'QUAKE သည် ပညာပေးစီမံကိန်းဖြစ်ပါသည်။ ဆက်သွယ်ရန်ဖောင်သည် နမူနာသာဖြစ်ပြီး စာများကို ပေးပို့ခြင်း၊ သိမ်းဆည်းခြင်း မပြုပါ။',
      lastUpdated: 'နောက်ဆုံးပြင်ဆင်သည့်ရက်',
      updatedDate: '၂၀၂၆ ခုနှစ် အောက်တိုဘာ ၃၀ ရက်',
      onThisPage: 'ဤစာမျက်နှာတွင်',
      sideInformation: 'စုဆောင်းသည့် အချက်အလက်',
      sideUse: 'အချက်အလက် အသုံးပြုပုံ',
      sideExternal: 'ပြင်ပဝန်ဆောင်မှုများ',
      sideChildren: 'ကလေးငယ်များ',
      sideChoices: 'သင့်ရွေးချယ်ခွင့်များ',
      sideChanges: 'မူဝါဒ ပြင်ဆင်ချက်များ',
      section1Label: '၀၁ / ကိုင်တွယ်သည့် အချက်အလက်များ',
      section1Title: 'ကျွန်ုပ်တို့ စုဆောင်းသည့် အချက်အလက်များ',
      section1Body1: 'QUAKE တွင် အကောင့်ဖွင့်စနစ် သို့မဟုတ် မှတ်ချက်ပေးစနစ် မရှိပါ။ ဆက်သွယ်ရန်ဖောင်သည် နမူနာဖြစ်ပြီး ဖြည့်ထားသည့်အချက်အလက်များကို ပေးပို့ခြင်း၊ သိမ်းဆည်းခြင်း မပြုပါ။ စာမျက်နှာအချို့တွင် ဘာသာစကားရွေးချယ်မှုနှင့် ပြင်ဆင်မှုစာရင်းကို browser တွင် သိမ်းဆည်းနိုင်သည်။ စည်းကမ်းချက်များကို သဘောတူပါက ဗားရှင်းနှင့် အချိန်ကို ဤ browser တွင်သာ သိမ်းဆည်းပါမည်။',
      section1Body2: 'ဝက်ဘ်စာမျက်နှာတစ်ခုကို တောင်းဆိုသည့်အခါ ပုံမှန်အင်တာနက်ပေးပို့မှုနှင့် လုံခြုံရေးအတွက် hosting ပံ့ပိုးသူနှင့် စာမျက်နှာအရင်းအမြစ်များကို ပေးပို့သည့် ဝန်ဆောင်မှုများက IP လိပ်စာ၊ browser အချက်အလက်နှင့် တောင်းဆိုထားသော ဖိုင်ကဲ့သို့သော အခြေခံနည်းပညာဆိုင်ရာ အချက်အလက်များကို ကိုင်တွယ်နိုင်ပါသည်။ QUAKE သည် လာရောက်ကြည့်ရှုသူများကို ခွဲခြားသတ်မှတ်ရန် ထိုအချက်အလက်များကို အသုံးမပြုပါ။',
      section2Label: '၀၂ / အသုံးပြုပုံ',
      section2Title: 'အချက်အလက်များကို အသုံးပြုပုံ',
      section2Body: 'ဤဝက်ဘ်ဆိုက်ကို ငလျင်ပညာပေးခြင်းနှင့် ကြိုတင်ပြင်ဆင်ရေးဆိုင်ရာ အချက်အလက်များ ပေးရန် ဖန်တီးထားပါသည်။ ကိုယ်ရေးအချက်အလက်များကို ရောင်းချခြင်း၊ အသုံးပြုသူများ၏ အပြုအမူကို ခွဲခြမ်းစိတ်ဖြာခြင်း သို့မဟုတ် ကြော်ငြာခြေရာခံကိရိယာများ အသုံးပြုခြင်း မရှိပါ။ hosting သို့မဟုတ် ပေးပို့ရေးဝန်ဆောင်မှုပေးသူများ ကိုင်တွယ်သည့် နည်းပညာဆိုင်ရာ တောင်းဆိုမှုဒေတာများသည် ၎င်းတို့၏ ကိုယ်ပိုင်လုပ်ထုံးလုပ်နည်းများအောက်တွင် ရှိပါသည်။',
      section3Label: '၀၃ / QUAKE ပြင်ပ ဝန်ဆောင်မှုများ',
      section3Title: 'ပြင်ပဝန်ဆောင်မှုများနှင့် လင့်ခ်များ',
      section3Body1: 'စာမျက်နှာအရင်းအမြစ်အချို့ကို Google Fonts၊ Bootstrap CDN နှင့် Wikimedia Commons တွင် လက်ခံထားသော ပုံတစ်ပုံအပါအဝင် ပြင်ပဝန်ဆောင်မှုများမှ ရယူထားပါသည်။ ပြင်ပလင့်ခ်များကို နှိပ်ပါက အခြားဝက်ဘ်ဆိုက်များသို့ ရောက်ရှိနိုင်ပါသည်။ သင့် browser က ထိုအရင်းအမြစ်များ သို့မဟုတ် ဝက်ဘ်ဆိုက်များကို တောင်းဆိုသည့်အခါ ၎င်းတို့၏ ဝန်ဆောင်မှုပေးသူများသည် နည်းပညာဆိုင်ရာ တောင်းဆိုမှုအချက်အလက်များကို လက်ခံရရှိပြီး ကိုယ်ပိုင်ကိုယ်ရေးအချက်အလက်မူဝါဒများကို ကျင့်သုံးနိုင်ပါသည်။',
      section3Body2: 'QUAKE သည် ပြင်ပဝန်ဆောင်မှုများ သို့မဟုတ် ဝက်ဘ်ဆိုက်များကို ထိန်းချုပ်ခြင်း မရှိပါ။ ၎င်းတို့က အချက်အလက်များကို ကိုင်တွယ်ပုံ သိရှိလိုပါက သက်ဆိုင်ရာ ကိုယ်ရေးအချက်အလက်မူဝါဒများကို တိုက်ရိုက်ဖတ်ရှုပါ။',
      section4Label: '၀၄ / လူငယ်လာရောက်ကြည့်ရှုသူများ',
      section4Title: 'ကလေးငယ်များ၏ အချက်အလက်များ',
      section4Body: 'QUAKE သည် ပညာပေးဝက်ဘ်ဆိုက်ဖြစ်ပြီး ကလေးငယ်များ၏ ကိုယ်ရေးအချက်အလက်များကို သိလျက်နှင့် စုဆောင်းခြင်း မရှိပါ။ ဤဝက်ဘ်ဆိုက်တွင် ဖောင်များ သို့မဟုတ် အကောင့်များ မရှိသောကြောင့် လာရောက်ကြည့်ရှုသူများသည် ဤဝက်ဘ်ဆိုက်မှ ချိတ်ဆက်ထားသော ပြင်ပဝန်ဆောင်မှုများတွင် ကိုယ်ရေးကိုယ်တာ သို့မဟုတ် လျှို့ဝှက်အချက်အလက်များကို မပေးပို့သင့်ပါ။',
      section5Label: '၀၅ / သင့်ရွေးချယ်ခွင့်များ',
      section5Title: 'သင့်ရွေးချယ်ခွင့်များနှင့် browser ဆက်တင်များ',
      section5Body: 'ပြင်ပလင့်ခ်များကို မဖွင့်ရန် ရွေးချယ်နိုင်သလို စည်းကမ်းချက်သဘောတူညီချက်ကို အောက်တွင် ပြန်ရုပ်သိမ်းနိုင်ပြီး browser ဆက်တင်များမှတစ်ဆင့် cookie များ သို့မဟုတ် အခြားဝက်ဘ်ဆိုက်ဒေတာများကို စီမံနိုင်ပါသည်။ ပြင်ပအရင်းအမြစ်များကို ပိတ်ထားပါက ဖောင့် သို့မဟုတ် ပုံအချို့ ပေါ်လာပုံ ပြောင်းလဲနိုင်သော်လည်း အဓိကပညာပေးအကြောင်းအရာများကို ဆက်လက်ကြည့်ရှုနိုင်ပါသည်။',
      section6Label: '၀၆ / နောက်ဆုံးအချက်အလက်များ',
      section6Title: 'ဤမူဝါဒကို ပြင်ဆင်ခြင်း',
      section6Body: 'ဝက်ဘ်ဆိုက်၏ လုပ်ဆောင်ချက်များ သို့မဟုတ် ဝန်ဆောင်မှုများ ပြောင်းလဲပါက ဤမူဝါဒကို ပြင်ဆင်နိုင်ပါသည်။ နောက်ဆုံးပြင်ဆင်သည့်ရက်ကို စာမျက်နှာ၏ အပေါ်ပိုင်းတွင် ဖော်ပြထားပါသည်။ လက်ရှိမူဝါဒကို သိရှိလိုပါက ဤစာမျက်နှာကို ပြန်လည်ကြည့်ရှုပါ။',
      contactTitle: 'ဤစာမျက်နှာနှင့်ပတ်သက်၍ မေးခွန်းရှိပါသလား။',
      contactBody: 'QUAKE သည် ကျောင်းသားများ ဦးဆောင်သော ပညာပေးစီမံကိန်းဖြစ်ပါသည်။ မေးခွန်းများရှိပါက သင့်ကျောင်းမှတစ်ဆင့် သို့မဟုတ် စီမံကိန်းကို ကြီးကြပ်ပေးသော ဆရာ/ဆရာမထံ ဆက်သွယ်ပါ။',
      footerDescription: 'QUAKE သည် မြန်မာနိုင်ငံ၏ ငလျင်သမိုင်းနှင့် ဘေးအန္တရာယ်လျှော့ချရေးအကြောင်း ဖော်ပြသော ကျောင်းသားများ ဦးဆောင်သည့် ပညာပေးဝက်ဘ်ဆိုက်ဖြစ်ပါသည်။',
      footerQuickLinks: 'အမြန်လင့်ခ်များ',
      footerAbout: 'ကျွန်ုပ်တို့အကြောင်း',
      footerHelpPrivacy: 'အကူအညီနှင့် ကိုယ်ရေးအချက်အလက်',
      footerFaq: 'မေးလေ့ရှိသော မေးခွန်းများ',
      footerPrivacy: 'ကိုယ်ရေးအချက်အလက် မူဝါဒ',
      footerCopyright: 'မူပိုင်ခွင့် © ၂၀၂၆ QUAKE။ မူပိုင်ခွင့်အားလုံးကို ထိန်းသိမ်းထားသည်။ QUAKE ဖွံ့ဖြိုးရေးအဖွဲ့မှ ဖန်တီးထားသော ကျောင်းသားများ၏ ပညာပေးဝက်ဘ်ဆိုက်။',
      footerMotto: 'လေ့လာပါ · ပြင်ဆင်ပါ · လက်တွေ့လုပ်ဆောင်ပါ'
    }
  };

  const languageOptions = [...document.querySelectorAll('.lang-option')];
  const languageButton = document.querySelector('.lang-button');
  const languagePicker = document.querySelector('.lang-picker');

  function setLanguage(language) {
    const messages = translations[language];
    if (!messages) {
      throw new Error(`Unsupported privacy policy language: ${language}`);
    }

    document.documentElement.lang = language === 'mm' ? 'my' : 'en';
    try {
      localStorage.setItem('quake-language', language);
    } catch (error) {
      // Language switching remains available when browser storage is disabled.
    }
    document.title = messages.title;

    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.content = messages.description;
    }

    document.querySelectorAll('[data-i18n]').forEach((element) => {
      const key = element.dataset.i18n;
      const translation = messages[key];
      if (translation === undefined) {
        throw new Error(`Missing "${key}" translation for ${language}`);
      }
      element.textContent = translation;
    });

    document.querySelectorAll('[data-i18n-aria]').forEach((element) => {
      const key = element.dataset.i18nAria;
      const translation = messages[key];
      if (translation === undefined) {
        throw new Error(`Missing "${key}" accessibility translation for ${language}`);
      }
      element.setAttribute('aria-label', translation);
    });

    languageOptions.forEach((option) => {
      const active = option.dataset.lang === language;
      option.classList.toggle('active', active);
      option.setAttribute('aria-checked', String(active));
    });

    if (languageButton) {
      const selectedLanguage = language === 'mm' ? messages.languageMyanmar : messages.languageEnglish;
      languageButton.dataset.selectedLanguage = language;
      languageButton.setAttribute('aria-label', `${messages.changeLanguage}: ${selectedLanguage}`);
    }
  }

  languageOptions.forEach((option) => {
    option.addEventListener('click', () => {
      setLanguage(option.dataset.lang || 'en');
      if (languagePicker && languageButton) {
        languagePicker.classList.remove('is-open');
        languageButton.setAttribute('aria-expanded', 'false');
      }
    });
  });
  let initialLanguage = document.documentElement.lang === 'my' ? 'mm' : 'en';
  try {
    initialLanguage = localStorage.getItem('quake-language') || initialLanguage;
  } catch (error) {
  }
  setLanguage(initialLanguage);
});
