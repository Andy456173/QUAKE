'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('faqSearch');
  const filters = [...document.querySelectorAll('.faq-filter')];
  const groups = [...document.querySelectorAll('.faq-group')];
  const resultCount = document.getElementById('faqResultCount');
  const resetButton = document.getElementById('faqReset');
  const noResults = document.getElementById('faqNoResults');
  const noResultsReset = document.getElementById('faqNoResultsReset');
  const languageButton = document.querySelector('.lang-button');
  const translations = {
    mm: {
      static: {
        '.faq-hero .faq-kicker': 'QUAKE / အသိပညာဗဟို',
        '.faq-overline': 'မေးခွန်းများ။ အဖြေများ။ ကြိုတင်ပြင်ဆင်မှု။',
        '.faq-hero h1': 'မေးလေ့ရှိသော <span>မေးခွန်းများ။</span>',
        '.faq-hero-description': 'ငလျင်အန္တရာယ်များကို နားလည်ပါ၊ မြေပြင်မတုန်ခါမီ ကြိုတင်ပြင်ဆင်နည်းများကို လေ့လာပါ၊ မြန်မာနိုင်ငံရှိ မိသားစုများ၊ ကျောင်းသားများနှင့် လူမှုအသိုင်းအဝိုင်းများအတွက် လက်တွေ့ကျသော လုံခြုံရေးလမ်းညွှန်ချက်များကို ရှာဖွေပါ။',
        '.faq-hero-link': 'အဖြေများကို လေ့လာရန် <span aria-hidden="true">↗</span>',
        '.faq-hero-small-label': 'မေးပါ။ လေ့လာပါ။ ပြင်ဆင်ပါ။',
        '.faq-directory .section-eyebrow': 'အဖြေကို ရှာပါ',
        '.faq-intro-title': 'မေးခွန်းတိုင်း <span class="orange-text">အရေးကြီးသည်။</span>',
        '.faq-intro-row p': 'ခေါင်းစဉ်အလိုက် ရှာဖွေပါ သို့မဟုတ် သိလိုသည်ကို ရှာပါ။',
        '.faq-search-label': 'မေးလေ့ရှိသော မေးခွန်းများကို ရှာရန်',
        '.faq-sidebar > h3': 'ခေါင်းစဉ်အလိုက် ကြည့်ရန်',
        '.faq-filter > span:first-child': ['မေးခွန်းအားလုံး', 'ငလျင်မလှုပ်မီ', 'ငလျင်လှုပ်နေစဉ်', 'ငလျင်လှုပ်ပြီးနောက်', 'ငလျင်အကြောင်း သိကောင်းစရာ'],
        '.faq-sidebar-note h4': 'ကြိုတင်ပြင်ဆင်ထားပါ။',
        '.faq-sidebar-note p': 'ယခုလုပ်ဆောင်ထားသော အဆင့်ငယ်များက ငလျင်လှုပ်သည့်အခါ အန္တရာယ်ကို လျှော့ချနိုင်သည်။',
        '.faq-sidebar-note a': 'ကြိုတင်ပြင်ဆင်မှု လမ်းညွှန်ကို ကြည့်ရန် <span aria-hidden="true">↗</span>',
        '.faq-group-head .faq-section-index': ['၀၁ / မတိုင်မီ', '၀၂ / လှုပ်နေစဉ်', '၀၃ / လှုပ်ပြီးနောက်', '၀၄ / အန္တရာယ်ကို သိရှိပါ'],
        '.faq-group-head h3': ['ငလျင် <span>မလှုပ်မီ။</span>', 'ငလျင် <span>လှုပ်နေစဉ်။</span>', 'ငလျင် <span>လှုပ်ပြီးနောက်။</span>', 'ငလျင် <span>အကြောင်း။</span>'],
        '.faq-section-count': ['မေးခွန်း ၆ ခု', 'မေးခွန်း ၅ ခု', 'မေးခွန်း ၄ ခု', 'မေးခွန်း ၅ ခု'],
        '.faq-no-results h3': 'ကိုက်ညီသော မေးခွန်း မတွေ့ပါ။',
        '.faq-no-results p': 'အခြားစကားလုံးဖြင့် ရှာပါ သို့မဟုတ် ခေါင်းစဉ်အားလုံးကို ကြည့်ပါ။',
        '#faqNoResultsReset': 'မေးခွန်းအားလုံးကို ကြည့်ရန် <span aria-hidden="true">↗</span>',
        '.faq-next-header .faq-kicker': 'အသိပညာကို လက်တွေ့လုပ်ဆောင်ပါ',
        '#faq-next-title': 'ပိုမိုသိရှိပါ။ <span>ပိုမိုကောင်းမွန်စွာ ပြင်ဆင်ပါ။</span>',
        '.faq-next-header > a': 'လုံခြုံရေးအကြံပြုချက်များကို ကြည့်ရန် <span aria-hidden="true">↗</span>',
        '.faq-action-card > span': ['၀၁ / လုံခြုံအောင်ပြုလုပ်ပါ', '၀၂ / လေ့ကျင့်ပါ', '၀၃ / အစီအစဉ်ဆွဲပါ'],
        '.faq-action-card h3': ['နေရာကို ပိုမိုလုံခြုံအောင် ပြင်ဆင်ပါ။', 'တုံ့ပြန်ပုံကို လေ့ကျင့်ပါ။', 'ပြန်လည်ဆက်သွယ်နိုင်ရန် အသင့်ပြင်ပါ။'],
        '.faq-action-card p': [
          'ပြုတ်ကျနိုင်သော အန္တရာယ်များကို ရှာဖွေပြီး ငလျင်မလှုပ်မီ လေးလံသော ပရိဘောဂများကို မြဲမြံစွာ တပ်ဆင်ပါ။',
          'မိသားစု သို့မဟုတ် ကျောင်းနှင့်အတူ ဝပ်ပါ၊ အကာအကွယ်ယူပါ၊ ကိုင်ထားပါ နည်းလမ်းကို လေ့ကျင့်ပါ။',
          'အရေးပေါ်ပစ္စည်းများ၊ ဆက်သွယ်ရန်အချက်အလက်များနှင့် တွေ့ဆုံမည့်အစီအစဉ်ကို ပြင်ဆင်ပါ။'
        ],
        '.faq-sources': 'လုံခြုံရေးလမ်းညွှန်ရင်းမြစ်များ: '
      },
      questions: [
        ['ငလျင်မလှုပ်မီ အိမ်ကို ပိုမိုလုံခြုံအောင် ဘာလုပ်နိုင်သလဲ။', 'မြင့်သော ပရိဘောဂများ၊ စင်များ၊ ရုပ်မြင်သံကြားစက်များနှင့် လေးလံသောပစ္စည်းများ မပြုတ်ကျစေရန် မြဲမြံစွာတပ်ဆင်ပါ။ လေးလံသော သို့မဟုတ် ကွဲလွယ်သောပစ္စည်းများကို အောက်စင်များတွင်ထားပါ၊ အိပ်ရာကို ပြတင်းပေါက်များမှ ရွှေ့ထားပါ၊ ထွက်ပေါက်များကို ရှင်းလင်းထားပါ။ အဆောက်အအုံလုံခြုံရေးဆိုင်ရာ စိုးရိမ်ချက်များရှိပါက အရည်အချင်းပြည့်မီသူကို စစ်ဆေးခိုင်းပါ။'],
        ['ငလျင်အရေးပေါ်အိတ်ထဲ ဘာတွေထည့်သင့်သလဲ။', 'သောက်ရေ၊ ကြာရှည်ခံအစားအစာ၊ လိုအပ်သောဆေးဝါးများ၊ ရှေးဦးသူနာပြုပစ္စည်းများ၊ ဓာတ်မီး၊ အပိုဘက်ထရီ၊ ဝီစီ၊ ခိုင်ခံ့သောဖိနပ်၊ အားသွင်းဘက်ထရီနှင့် အရေးကြီးစာရွက်စာတမ်းမိတ္တူများ ထည့်ပါ။ ကလေးများ၊ သက်ကြီးရွယ်အိုများနှင့် ကျန်းမာရေးလိုအပ်ချက်ရှိသူများအတွက် လိုအပ်သောပစ္စည်းများပါ ထည့်ပြီး အိတ်ကို ပုံမှန်စစ်ဆေးပါ။'],
        ['ကျောင်းသားများနှင့် ကျောင်းများ ငလျင်အတွက် ဘယ်လိုပြင်ဆင်နိုင်သလဲ။', 'ကျောင်းများသည် ဝပ်ပါ၊ အကာအကွယ်ယူပါ၊ ကိုင်ထားပါ လေ့ကျင့်ခန်းများ ပြုလုပ်နိုင်သည်။ စာသင်ခန်းတွင်း ခိုကိုးရာနေရာများကို သတ်မှတ်ပါ၊ လေးလံသော ပရိဘောဂများကို တပ်ဆင်ပါ၊ တုန်ခါမှုပြီးနောက် အသုံးပြုမည့် ထွက်ခွာလမ်းကြောင်းများကို ရှင်းလင်းထားပါ။ စုဝေးရမည့်နေရာများကို သဘောတူပြီး အကူအညီလိုသူများအတွက် အစီအစဉ်ထည့်သွင်းပါ။'],
        ['မိသားစုအရေးပေါ်ဆက်သွယ်ရေးအစီအစဉ် ဘာကြောင့်အရေးကြီးသလဲ။', 'ငလျင်လှုပ်ချိန်တွင် မိသားစုဝင်များသည် နေရာကွဲပြားနေနိုင်သည်။ လုံခြုံသောတွေ့ဆုံရာနေရာ၊ အစားထိုးဆက်သွယ်မည့်သူနှင့် မိုဘိုင်းကွန်ရက်ပြတ်တောက်ပါက ဆက်သွယ်မည့်နည်းလမ်းကို သဘောတူထားပါ။ ကလေးများအပါအဝင် လူတိုင်း အစီအစဉ်နှင့် အရေးကြီးဖုန်းနံပါတ်များကို သိရှိကြောင်း သေချာပါစေ။'],
        ['အိမ် သို့မဟုတ် စာသင်ခန်းတွင် လုံခြုံသောနေရာကို ဘယ်မှာသတ်မှတ်သင့်သလဲ။', 'ခိုင်ခံ့သော စားပွဲ သို့မဟုတ် ခုံအောက်တွင် ခိုကိုးပြီး ဦးခေါင်းနှင့် လည်ပင်းကို ကာကွယ်နိုင်သည့် နေရာကို ရှာပါ။ ပြတင်းပေါက်များ၊ မြင့်သောစာအုပ်စင်များနှင့် ပြုတ်ကျနိုင်သောပစ္စည်းများမှ ဝေးရာကို ရွေးပါ။ တံခါးပေါက်ကို အလုံခြုံဆုံးနေရာဟု မယူဆပါနှင့်။'],
        ['ငလျင်မလှုပ်မီ အဆောက်အအုံများကို ပိုမိုလုံခြုံအောင် ပြုလုပ်နိုင်သလား။', 'ပြုလုပ်နိုင်ပါသည်။ သင့်လျော်သော ဒီဇိုင်း၊ ပြုပြင်ထိန်းသိမ်းမှု၊ စစ်ဆေးမှုနှင့် အားဖြည့်မှုများက ငလျင်ပျက်စီးမှုကို လျှော့ချနိုင်သည်။ အဆောက်အအုံဖွဲ့စည်းပုံ ပြောင်းလဲမှုများကို အရည်အချင်းပြည့်မီသော အင်ဂျင်နီယာ သို့မဟုတ် ဆောက်လုပ်ရေးပညာရှင်များက စစ်ဆေးလုပ်ဆောင်သင့်သည်။'],
        ['“ဝပ်ပါ၊ အကာအကွယ်ယူပါ၊ ကိုင်ထားပါ” ဆိုတာ ဘာကိုဆိုလိုသလဲ။', '<strong>ဝပ်ပါ</strong> — လက်နှင့် ဒူးများကို မြေပြင်ပေါ်ချပါ။ <strong>အကာအကွယ်ယူပါ</strong> — ခိုင်ခံ့သော စားပွဲအောက်တွင် ဦးခေါင်းနှင့် လည်ပင်းကို ကာကွယ်ပါ။ <strong>ကိုင်ထားပါ</strong> — တုန်ခါမှုရပ်သည်အထိ ခိုကိုးရာကို ကိုင်ထားပါ။ အနီးတွင် ခိုင်ခံ့သောခိုကိုးရာမရှိပါက နိမ့်နိမ့်နေပြီး လက်များဖြင့် ဦးခေါင်းနှင့် လည်ပင်းကို ကာကွယ်ပါ။'],
        ['မြေပြင်စတင်တုန်ခါသောအခါ အပြင်သို့ ပြေးသင့်သလား။', 'မပြေးသင့်ပါ။ အတွင်းတွင်ရှိပါက တုန်ခါနေစဉ် အတွင်း၌နေပြီး ဝပ်ပါ၊ အကာအကွယ်ယူပါ၊ ကိုင်ထားပါ။ ထွက်ပေါက်သို့ ပြေးခြင်းသည် မှန်ကွဲများ၊ အပျက်အစီးများ သို့မဟုတ် ဆောက်လုပ်ရေးပစ္စည်းများ ထိမှန်နိုင်ခြေကို တိုးစေသည်။ တုန်ခါမှုရပ်သည့်အခါ ဘေးကင်းစွာ ထွက်ခွာနိုင်မနိုင် စစ်ဆေးပါ။'],
        ['အပြင်ဘက် သို့မဟုတ် ယာဉ်ပေါ်တွင် ရှိနေပါက ဘာလုပ်သင့်သလဲ။', 'အပြင်ဘက်တွင် ရှိပါက အပြင်၌နေပြီး ဖြစ်နိုင်လျှင် အဆောက်အအုံ၊ သစ်ပင်နှင့် လျှပ်စစ်ကြိုးများမှ ဝေးသော လွတ်လပ်သည့်နေရာသို့ ရွှေ့ပါ။ ယာဉ်မောင်းနေပါက တံတားများနှင့် အပေါ်မှအန္တရာယ်များမှ ဝေးရာသို့ လုံခြုံစွာရပ်ပါ၊ တုန်ခါမှုရပ်သည်အထိ ယာဉ်အတွင်း၌နေပါ။'],
        ['အိပ်နေစဉ် ငလျင်လှုပ်ပါက ဘာလုပ်သင့်သလဲ။', 'အိပ်ရာပေါ်တွင် ရှိနေပါက ထိုနေရာတွင်နေပြီး ခေါင်းအုံးဖြင့် ဦးခေါင်းနှင့် လည်ပင်းကို ကာကွယ်ပါ။ မှန်ကွဲများ သို့မဟုတ် ပစ္စည်းများ ပြုတ်ကျနိုင်သော အခန်းကို ဖြတ်ပြေးခြင်း မပြုပါနှင့်။ တုန်ခါမှုရပ်ပြီးနောက် ရွှေ့မီ အန္တရာယ်များကို စစ်ဆေးပါ။'],
        ['ဘီးတပ်ကုလားထိုင်အသုံးပြုသူသည် တုန်ခါနေစဉ် ဘယ်လိုတုံ့ပြန်သင့်သလဲ။', 'ဖြစ်နိုင်ပါက ဘီးများကို သော့ခတ်ပြီး ထိုင်လျက်နေပါ။ လက်၊ စာအုပ် သို့မဟုတ် ကူရှင်ဖြင့် ဦးခေါင်းနှင့် လည်ပင်းကို ကာကွယ်ပါ။ ဘေးကင်းပြီး လက်တွေ့ကျသည့်အခါမှသာ ပြတင်းပေါက်များနှင့် အခြားအန္တရာယ်များမှ ဝေးရာသို့ ရွှေ့ပါ။'],
        ['တုန်ခါမှုရပ်သွားပြီးနောက် ချက်ချင်း ဘာလုပ်သင့်သလဲ။', 'မိမိနှင့် အခြားသူများ ထိခိုက်ဒဏ်ရာရမရ စစ်ဆေးပါ၊ ရနိုင်ပါက ခိုင်ခံ့သောဖိနပ်စီးပါ၊ မှန်ကွဲများနှင့် မတည်ငြိမ်သောပစ္စည်းများကို သတိပြုပါ။ ဘေးကင်းပါက ပျက်စီးသောအဆောက်အအုံမှ သတိထားထွက်ခွာပြီး ဒေသဆိုင်ရာ အရေးပေါ်အာဏာပိုင်များ၏ ညွှန်ကြားချက်ကို လိုက်နာပါ။ မလုံခြုံနိုင်သော အဆောက်အအုံများသို့ မဝင်ပါနှင့်။'],
        ['နောက်ဆက်တွဲငလျင်ဆိုတာ ဘာလဲ၊ အန္တရာယ်ရှိသလား။', 'နောက်ဆက်တွဲငလျင်များသည် အဓိကငလျင်တစ်ခုနောက်တွင် တူညီသောဒေသ၌ ဖြစ်ပွားသော ငလျင်ငယ်များဖြစ်သည်။ ရက်များ၊ သီတင်းပတ်များ သို့မဟုတ် ပိုကြာနိုင်ပြီး အားနည်းနေသော အဆောက်အအုံများကို ထပ်မံပျက်စီးစေနိုင်သည်။ ထပ်မံတုန်ခါပါက ဝပ်ရန်၊ အကာအကွယ်ယူရန်နှင့် ကိုင်ထားရန် အသင့်ပြင်ပါ။'],
        ['ငလျင်ပြီးနောက် အခြားသူများကို ဘေးကင်းစွာ ဘယ်လိုကူညီနိုင်သလဲ။', 'ဘေးကင်းပါက အနီးအနားရှိသူများကို စစ်ဆေးပါ၊ မိမိလေ့ကျင့်ထားသည့်အတိုင်းသာ ရှေးဦးသူနာပြုစုပါ၊ ပြင်းထန်သောဒဏ်ရာ သို့မဟုတ် အန္တရာယ်များကို အရေးပေါ်ကယ်ဆယ်ရေးအဖွဲ့ထံ အသိပေးပါ။ မတည်ငြိမ်သော အဆောက်အအုံထဲသို့ မဝင်ပါနှင့်၊ ချက်ချင်းအန္တရာယ်မရှိလျှင် ပြင်းထန်စွာဒဏ်ရာရသူများကို မရွှေ့ပါနှင့်။'],
        ['ကမ်းရိုးတန်းအနီး ပြင်းထန်သောငလျင်လှုပ်ပါက ဘာလုပ်သင့်သလဲ။', 'ကမ်းရိုးတန်းအနီး ပြင်းထန်သော သို့မဟုတ် ကြာရှည်သောငလျင်သည် ဆူနာမီသတိပေးချက်ဖြစ်နိုင်သည်။ တုန်ခါမှုရပ်ပြီးသည်နှင့် ဒေသဆိုင်ရာ ရွှေ့ပြောင်းလမ်းကြောင်းနှင့် တရားဝင်ညွှန်ကြားချက်များကို လိုက်နာကာ ကုန်းမြင့် သို့မဟုတ် ကုန်းတွင်းဘက်သို့ ချက်ချင်းရွှေ့ပါ။ လှိုင်းကိုကြည့်ရန် ကမ်းခြေတွင် မစောင့်ပါနှင့်။'],
        ['သိပ္ပံပညာရှင်များသည် ငလျင်လှုပ်မည့်အချိန်ကို တိတိကျကျ ခန့်မှန်းနိုင်သလား။', 'မခန့်မှန်းနိုင်ပါ။ ငလျင်ဖြစ်မည့် အချိန်၊ နေရာနှင့် ပြင်းအားကို သိပ္ပံပညာရှင်များက ယုံကြည်စိတ်ချစွာ ကြိုတင်မခန့်မှန်းနိုင်ပါ။ သို့သော် ငလျင်အန္တရာယ်များကို သတ်မှတ်ပြီး ရေရှည်ဖြစ်နိုင်ခြေကို ခန့်မှန်းနိုင်သည်။ ထို့ကြောင့် ကြိုတင်ပြင်ဆင်မှုသည် အလွန်အရေးကြီးပါသည်။'],
        ['မြန်မာနိုင်ငံသည် ဘာကြောင့် ငလျင်အန္တရာယ်များသလဲ။', 'မြန်မာနိုင်ငံသည် မြေထုလွှာလှုပ်ရှားမှုရှိသော ဒေသတွင် တည်ရှိပြီး စစ်ကိုင်းပြတ်ရွေ့ကြောအပါအဝင် အရေးပါသော ပြတ်ရွေ့ကြောများ ဖြတ်သန်းသွားသည်။ ငလျင်ပျက်စီးမှုသည် ဒေသမြေအနေအထား၊ အဆောက်အအုံအရည်အသွေး၊ လူဦးရေထိတွေ့မှုနှင့် ကြိုတင်ပြင်ဆင်မှုတို့အပေါ်လည်း မူတည်သည်။'],
        ['ငလျင်ဘေးအန္တရာယ် လျှော့ချရေးဆိုတာ ဘာလဲ။', 'ဘေးအန္တရာယ်မဖြစ်မီ ထိခိုက်နိုင်ခြေကို လျှော့ချရန် လုပ်ဆောင်ခြင်းဖြစ်သည်။ ဥပမာ အဆောက်အအုံလုံခြုံရေး မြှင့်တင်ခြင်း၊ ပရိဘောဂများကို မြဲမြံစွာတပ်ဆင်ခြင်း၊ အရေးပေါ်ပစ္စည်းများ ပြင်ဆင်ခြင်း၊ လေ့ကျင့်ခန်းပြုလုပ်ခြင်းနှင့် မိသားစု သို့မဟုတ် ကျောင်းအတွက် တုံ့ပြန်ရေးအစီအစဉ်ပြုလုပ်ခြင်းတို့ ပါဝင်သည်။'],
        ['ပြင်းအားနှင့် တုန်ခါမှုအဆင့် ကွာခြားချက်က ဘာလဲ။', '<strong>ပြင်းအား</strong> သည် ငလျင်၏ မူလအရွယ်အစားကို ဖော်ပြသည်။ <strong>တုန်ခါမှုအဆင့်</strong> သည် နေရာတစ်ခုတွင် တုန်ခါမှု ဘယ်လောက်ပြင်းထန်သည်နှင့် ဘယ်လိုသက်ရောက်မှုရှိသည်ကို ဖော်ပြသည်။ ငလျင်တစ်ခုတည်းပင် လူမှုအသိုင်းအဝိုင်းအလိုက် တုန်ခါမှုအဆင့် ကွဲပြားနိုင်သည်။'],
        ['ငလျင်လှုပ်နေစဉ် တံခါးပေါက်တွင် ရပ်ခြင်းက ပိုလုံခြုံသလား။', 'အများအားဖြင့် မလုံခြုံပါ။ ခေတ်မီအဆောက်အအုံများတွင် တံခါးပေါက်သည် အခြားနေရာများထက် ပိုလုံခြုံလေ့မရှိဘဲ တံခါးရွေ့လျားမှု သို့မဟုတ် ပြုတ်ကျသောပစ္စည်းများကြောင့် အန္တရာယ်ရှိနိုင်သည်။ ဖြစ်နိုင်ပါက ခိုင်ခံ့သော ပရိဘောဂအောက်တွင် ဝပ်ပါ၊ အကာအကွယ်ယူပါ၊ ကိုင်ထားပါ။']
      ]
    }
  };
  const originalContent = new Map();
  let language = 'en';
  try {
    language = localStorage.getItem('quake-language') === 'mm' ? 'mm' : 'en';
  } catch (error) {
    language = document.documentElement.lang === 'my' ? 'mm' : 'en';
  }

  if (!searchInput || !resultCount || !resetButton || !noResults || !noResultsReset || filters.length === 0 || groups.length === 0) {
    throw new Error('FAQ page is missing required search or filter controls.');
  }

  let selectedCategory = 'all';

  function updateFaqs() {
    const query = searchInput.value.trim().toLocaleLowerCase();
    let visibleCount = 0;

    groups.forEach((group) => {
      const categoryMatches = selectedCategory === 'all' || group.dataset.category === selectedCategory;
      let groupCount = 0;

      group.querySelectorAll('.faq-item').forEach((item) => {
        const matches = categoryMatches && (!query || item.textContent.toLocaleLowerCase().includes(query));
        item.hidden = !matches;

        if (matches) {
          groupCount += 1;
          visibleCount += 1;
        }
      });

      group.hidden = groupCount === 0;
    });

    resultCount.textContent = language === 'mm'
      ? `မေးခွန်း ${visibleCount} ခုကို ပြသနေသည်`
      : `SHOWING ${visibleCount} ${visibleCount === 1 ? 'QUESTION' : 'QUESTIONS'}`;
    resetButton.hidden = selectedCategory === 'all' && query.length === 0;
    noResults.hidden = visibleCount !== 0;
  }

  function resetFilters() {
    selectedCategory = 'all';
    searchInput.value = '';
    filters.forEach((filter) => {
      const active = filter.dataset.filter === 'all';
      filter.classList.toggle('is-active', active);
      filter.setAttribute('aria-pressed', String(active));
    });
    updateFaqs();
  }

  function applyLanguage(value) {
    const nextLanguage = value === 'mm' ? 'mm' : 'en';
    if (language !== nextLanguage) searchInput.value = '';
    language = nextLanguage;
    document.documentElement.lang = language === 'mm' ? 'my' : 'en';
    const dictionary = translations.mm;
    document.title = language === 'mm' ? 'မေးလေ့ရှိသော မေးခွန်းများ | QUAKE' : 'FAQ | QUAKE — Earthquake Risk Reduction';
    const description = document.querySelector('meta[name="description"]');
    if (description) {
      if (!originalContent.has(description)) originalContent.set(description, description.content);
      description.content = language === 'mm'
        ? 'မြန်မာနိုင်ငံရှိ ငလျင်အန္တရာယ် လျှော့ချရေး၊ ကြိုတင်ပြင်ဆင်မှုနှင့် လုံခြုံရေးဆိုင်ရာ မေးခွန်းများကို ဖတ်ရှုပါ။'
        : originalContent.get(description);
    }
    Object.entries(dictionary.static).forEach(([selector, values]) => {
      const elements = [...document.querySelectorAll(selector)];
      const items = Array.isArray(values) ? values : [values];
      if (elements.length !== items.length) {
        throw new Error(`FAQ translation count mismatch for "${selector}".`);
      }
      elements.forEach((element, index) => {
        if (!originalContent.has(element)) originalContent.set(element, element.innerHTML);
        if (selector === '.faq-sources') {
          element.firstChild.textContent = language === 'mm'
            ? items[index]
            : originalContent.get(element).split('<')[0];
        } else {
          element.innerHTML = language === 'mm' ? items[index] : originalContent.get(element);
        }
      });
    });
    document.querySelectorAll('.faq-item').forEach((item, index) => {
      const [question, answer] = dictionary.questions[index];
      const questionNode = item.querySelector('summary > span:nth-child(2)');
      const answerNode = item.querySelector('.faq-answer p');
      [questionNode, answerNode].forEach((node) => {
        if (!originalContent.has(node)) originalContent.set(node, node.innerHTML);
      });
      questionNode.textContent = language === 'mm' ? question : originalContent.get(questionNode);
      answerNode.innerHTML = language === 'mm' ? answer : originalContent.get(answerNode);
    });
    searchInput.placeholder = language === 'mm'
      ? 'ဥပမာ - အရေးပေါ်အိတ်၊ ကျောင်း၊ နောက်ဆက်တွဲငလျင်'
      : 'e.g. emergency kit, school, aftershocks';
    if (languageButton) languageButton.setAttribute('aria-label', language === 'mm' ? 'ဘာသာစကား ပြောင်းရန်: မြန်မာ' : 'Change language: English');
    document.querySelectorAll('.lang-option').forEach((option) => {
      const active = option.dataset.lang === language;
      option.classList.toggle('active', active);
      option.setAttribute('aria-checked', String(active));
    });
    updateFaqs();
  }

  filters.forEach((filter) => {
    filter.addEventListener('click', () => {
      selectedCategory = filter.dataset.filter || 'all';
      filters.forEach((item) => {
        const active = item === filter;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      updateFaqs();
    });
  });

  searchInput.addEventListener('input', updateFaqs);
  resetButton.addEventListener('click', resetFilters);
  noResultsReset.addEventListener('click', resetFilters);
  document.querySelectorAll('.lang-option').forEach((option) => {
    option.addEventListener('click', () => applyLanguage(option.dataset.lang));
  });
  applyLanguage(language);
  updateFaqs();
});
