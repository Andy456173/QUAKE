'use strict';

// QUAKE ICT PBL — Earthquake History
// All figures are reported with their source and uncertainty. No live data API.
document.addEventListener('DOMContentLoaded', () => {
  const prefersLessMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersLessMotion && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('js-animate');
  }

  const ui = {
    en: {
      viewMapLink:'VIEW 2025 IMPACT MAP',mapInlineNote:'EXPLORE THE 2025 EARTHQUAKE BY STATE, REGION AND CITY',navHome:'HOME', navHistory:'EARTHQUAKE HISTORY', heroKicker:'MYANMAR · HISTORICAL RECORDS',
      heroTitleA:'EARTHQUAKES THAT', heroTitleB:'SHAPED MYANMAR.',
      heroIntro:'From the Rakhine coast to the Sagaing Fault, these are major earthquakes that changed communities, cities and historic places across Myanmar.',
      heroYears:'1762 — 2025',heroEntries:'9 documented events',heroVerified:'Source-based records',heroExplore:'EXPLORE THE TIMELINE',
      imageLabel:'MANDALAY, 2025 · CHINA NEWS SERVICE / CC BY 4.0',
      overviewLabel:'THE BIG PICTURE / 01',overviewA:'A HISTORY WRITTEN',overviewB:'IN THE GROUND.',
      overviewBody:'Myanmar has experienced repeated destructive earthquakes along major fault systems. Some historic events are known only from written accounts; later events have instrument measurements and more detailed disaster reports.',
      overviewCaution:'This timeline highlights selected major earthquakes, not every earthquake in Myanmar. Dates, magnitudes and casualty counts can differ between studies—especially before modern seismic instruments.',
      figureEstimate:'HISTORICAL ESTIMATE',figureDesc:'1762 Chittagong–Rakhine earthquake — one of the largest historical magnitude estimates associated with Myanmar’s coast.',
      timelineLabel:'EXPLORE THE RECORD / 02',timelineA:'THE EARTHQUAKE',timelineB:'TIMELINE.',
      timelineLead:'Scroll through the years. Select “View details” for affected places, casualties, damage and original sources.',
      eventsTag:'FEATURED EVENTS',filterAll:'ALL EVENTS',filterEarly:'BEFORE 1900',filter20:'1900—1999',filterModern:'2000—PRESENT',
      searchLabel:'Search earthquakes',searchPlaceholder:'Search year or place...',noEvents:'No matching events',tryAnother:'Try another year, place or filter.',reset:'CLEAR FILTERS',
      timelineNote:'Magnitudes marked “estimated” refer to historical reconstructions, not modern instrument measurements.',sourcesJump:'READ THE SOURCES →',
      comparisonLabel:'2025 / CITY COMPARISON / 03',comparisonA:'SEVEN CITIES.',comparisonB:'DIFFERENT IMPACTS.',
      comparisonIntro:'United Nations University researchers estimated likely damage to buildings in seven affected cities using satellite radar imagery and building-footprint data.',
      estBuildings:'LIKELY DAMAGED BUILDINGS, TOTAL',citySummarySub:'Across seven assessed cities, not Myanmar nationwide',
      chartLabel:'ESTIMATED SHARE OF BUILDINGS DAMAGED',chartLegend:'Likely damaged',
      cityCaution:'These are estimated percentages of damaged buildings—NOT percentages of an entire city destroyed. Figures are based on satellite analysis (June 2025), not a final household-by-household survey.',
      universitySource:'UNITED NATIONS UNIVERSITY REPORT',
      impactsLabel:'THE LONG-TERM EFFECT / 04',impactsA:'MORE THAN JUST',impactsB:'A NUMBER.',
      impactTitle1:'Homes and buildings',impactDesc1:'Damage to homes, schools, bridges and hospitals can affect communities long after the shaking stops.',
      impactTitle2:'Cultural heritage',impactDesc2:'Earthquakes have damaged temples, pagodas and historic structures in places such as Bagan and Innwa.',
      impactTitle3:'People and livelihoods',impactDesc3:'Casualties, displacement and disrupted daily life show why better preparedness matters before a disaster.',
      sourcesLabel:'RESEARCH & VERIFICATION / 05',sourcesA:'WHERE THE DATA',sourcesB:'COMES FROM.',
      sourcesDesc:'Explore the original reports and institutional references behind this timeline.',
      sourceCaveat:'The Myanmar Earthquake Portal history page is included for further reading; it was not accessible during verification. Figures here are checked against the other listed sources. Some early historical estimates differ between publications.',
      nextTag:'WHAT HISTORY TEACHES US',nextA:'THE NEXT STEP IS',nextB:'PREPARATION.',
      nextDesc:'We cannot prevent earthquakes, but we can reduce risks before they happen.',nextAction:'GO TO PREPAREDNESS',
      major:'MAJOR EARTHQUAKE',historical:'HISTORICAL ESTIMATE',recorded:'REPORTED MAGNITUDE',
      date:'DATE',where:'LOCATION',viewDetails:'VIEW DETAILS',hideDetails:'HIDE DETAILS',viewMap:'VIEW IMPACT MAP',
      affected:'AFFECTED PLACES',impact:'WHAT HAPPENED',deaths:'REPORTED DEATHS',buildings:'BUILDINGS / HOUSES',
      note:'DATA NOTE',original:'OPEN ORIGINAL SOURCE',unknown:'Not reliably recorded',
      citiesCount:'likely damaged buildings', navAbout:'About Us',navPrepared:'Preparedness',footerTitle:'QUICK LINKS',footerHelp:'HELP & PRIVACY'
    },
    mm: {
      viewMapLink:'၂၀၂၅ သက်ရောက်မှုမြေပုံကို ကြည့်ရန်',mapInlineNote:'၂၀၂၅ ငလျင်ကို ပြည်နယ်၊ တိုင်းနှင့် မြို့အလိုက် လေ့လာပါ',navHome:'ပင်မစာမျက်နှာ',navHistory:'ငလျင်သမိုင်း',heroKicker:'မြန်မာနိုင်ငံ · သမိုင်းမှတ်တမ်းများ',
      heroTitleA:'မြန်မာနိုင်ငံ၏',heroTitleB:'ငလျင်သမိုင်း။',
      heroIntro:'ရခိုင်ကမ်းရိုးတန်းမှ စစ်ကိုင်းပြတ်ရွေ့အထိ မြို့များ၊ လူမှုအသိုင်းအဝိုင်းများနှင့် သမိုင်းဝင်နေရာများကို ထိခိုက်စေခဲ့သော အဓိကငလျင်ဖြစ်စဉ်များကို လေ့လာပါ။',
      heroYears:'၁၇၆၂ — ၂၀၂၅',heroEntries:'မှတ်တမ်းတင်ထားသော ဖြစ်စဉ် ၉ ခု',heroVerified:'ရင်းမြစ်အခြေပြု အချက်အလက်',heroExplore:'အချိန်ဇယားကို ကြည့်ရှုရန်',
      imageLabel:'မန္တလေး၊ ၂၀၂၅ · CHINA NEWS SERVICE / CC BY 4.0',
      overviewLabel:'ခြုံငုံသုံးသပ်ချက် / ၀၁',overviewA:'မြေပြင်တွင် ကျန်ရစ်ခဲ့သော',overviewB:'သမိုင်းမှတ်တမ်း။',
      overviewBody:'မြန်မာနိုင်ငံတွင် အဓိကပြတ်ရွေ့ကြောများတစ်လျှောက် ပြင်းထန်သော ငလျင်များ အကြိမ်ကြိမ် ဖြစ်ပွားခဲ့သည်။ ရှေးခေတ်ဖြစ်ရပ်အချို့ကို စာဖြင့်ရေးသားထားသော မှတ်တမ်းများမှသာ သိရှိနိုင်ပြီး နောက်ပိုင်းဖြစ်ရပ်များတွင် တိုင်းတာချက်နှင့် ပိုမိုအသေးစိတ်သော အစီရင်ခံစာများ ရှိသည်။',
      overviewCaution:'ဤအချိန်ဇယားတွင် အဓိကငလျင်အချို့ကိုသာ ရွေးချယ်ဖော်ပြထားပြီး မြန်မာနိုင်ငံ၏ ငလျင်အားလုံး မပါဝင်ပါ။ အထူးသဖြင့် ခေတ်မီတိုင်းတာရေးကိရိယာများ မပေါ်ပေါက်မီက အချက်အလက်များသည် ရင်းမြစ်အလိုက် ကွဲပြားနိုင်ပါသည်။',
      figureEstimate:'သမိုင်းဆိုင်ရာ ခန့်မှန်းချက်',figureDesc:'၁၇၆၂ ခုနှစ် စစ်တကောင်း–ရခိုင် ငလျင်သည် မြန်မာကမ်းရိုးတန်းနှင့် ဆက်စပ်သော အင်အားအကြီးဆုံး သမိုင်းဆိုင်ရာ ခန့်မှန်းချက်များအနက် တစ်ခုဖြစ်သည်။',
      timelineLabel:'ငလျင်မှတ်တမ်း / ၀၂',timelineA:'ငလျင်ဖြစ်စဉ်',timelineB:'အချိန်ဇယား။',
      timelineLead:'နှစ်အလိုက် ဆွဲကြည့်ပါ။ ထိခိုက်ခဲ့သော နေရာများ၊ အသေအပျောက်၊ ပျက်စီးမှုနှင့် ရင်းမြစ်များအတွက် အသေးစိတ်ကို နှိပ်ပါ။',
      eventsTag:'ရွေးချယ်ထားသော ဖြစ်စဉ်များ',filterAll:'အားလုံး',filterEarly:'၁၉၀၀ မတိုင်မီ',filter20:'၁၉၀၀–၁၉၉၉',filterModern:'၂၀၀၀–ယနေ့',
      searchLabel:'ငလျင်များကို ရှာရန်',searchPlaceholder:'ခုနှစ် သို့မဟုတ် မြို့အမည်ရှာရန်...',noEvents:'ကိုက်ညီသော ဖြစ်စဉ် မတွေ့ပါ',tryAnother:'အခြားနှစ်၊ နေရာ သို့မဟုတ် အမျိုးအစားဖြင့် ရှာပါ။',reset:'ရှာဖွေမှု ဖျက်ရန်',
      timelineNote:'“ခန့်မှန်း” ဟု ဖော်ပြထားသော ပြင်းအားများသည် ခေတ်မီတိုင်းတာချက်မဟုတ်ဘဲ သမိုင်းမှတ်တမ်းအခြေပြု ပြန်လည်ခန့်မှန်းချက်များ ဖြစ်သည်။',sourcesJump:'ရင်းမြစ်များ ကြည့်ရန် →',
      comparisonLabel:'၂၀၂၅ / မြို့အလိုက် နှိုင်းယှဉ်ခြင်း / ၀၃',comparisonA:'မြို့ခုနစ်မြို့။',comparisonB:'ထိခိုက်မှု ကွာခြားချက်။',
      comparisonIntro:'ကုလသမဂ္ဂတက္ကသိုလ်မှ သုတေသီများသည် ဂြိုဟ်တုရေဒါပုံရိပ်များနှင့် အဆောက်အအုံအချက်အလက်များကို အသုံးပြု၍ မြို့ခုနစ်မြို့၏ အဆောက်အအုံထိခိုက်ပျက်စီးမှုကို ခန့်မှန်းခဲ့သည်။',
      estBuildings:'ပျက်စီးနိုင်ခြေမြင့်သော အဆောက်အအုံ စုစုပေါင်း',citySummarySub:'စစ်ဆေးထားသော မြို့ခုနစ်မြို့အတွက်သာ ဖြစ်ပြီး နိုင်ငံတစ်ဝန်း မဟုတ်ပါ',
      chartLabel:'အဆောက်အအုံ ပျက်စီးမှု ခန့်မှန်းရာခိုင်နှုန်း',chartLegend:'ပျက်စီးနိုင်ခြေမြင့်',
      cityCaution:'ဤရာခိုင်နှုန်းများမှာ အဆောက်အအုံပျက်စီးမှု ခန့်မှန်းချက်ဖြစ်ပြီး မြို့၏ဧရိယာတစ်ခုလုံး ပျက်စီးသည့် ရာခိုင်နှုန်း မဟုတ်ပါ။ ၂၀၂၅ ဇွန်လ ဂြိုဟ်တုလေ့လာချက်ကို အခြေခံထားသည်။',
      universitySource:'ကုလသမဂ္ဂတက္ကသိုလ် အစီရင်ခံစာ',
      impactsLabel:'ရေရှည်သက်ရောက်မှု / ၀၄',impactsA:'ကိန်းဂဏန်းများထက်',impactsB:'ပိုမိုအရေးကြီးသည်။',
      impactTitle1:'နေအိမ်နှင့် အဆောက်အအုံများ',impactDesc1:'အိမ်၊ ကျောင်း၊ တံတားနှင့် ဆေးရုံများ ပျက်စီးမှုသည် ငလျင်ပြီးနောက် အချိန်ကြာမြင့်စွာ သက်ရောက်နိုင်သည်။',
      impactTitle2:'ယဉ်ကျေးမှုအမွေအနှစ်',impactDesc2:'ပုဂံနှင့် အင်းဝကဲ့သို့သော နေရာများရှိ စေတီ၊ ဘုရားနှင့် ရှေးဟောင်းအဆောက်အအုံများ ထိခိုက်ခဲ့သည်။',
      impactTitle3:'ပြည်သူနှင့် အသက်မွေးဝမ်းကျောင်း',impactDesc3:'လူသေဆုံးမှု၊ အိုးအိမ်စွန့်ခွာရမှုနှင့် နေ့စဉ်ဘဝနှောင့်ယှက်မှုများကြောင့် ကြိုတင်ပြင်ဆင်မှု အရေးကြီးသည်။',
      sourcesLabel:'သုတေသနနှင့် ရင်းမြစ်စစ်ဆေးချက် / ၀၅',sourcesA:'အချက်အလက်',sourcesB:'ရင်းမြစ်များ။',
      sourcesDesc:'ဤအချိန်ဇယားအတွက် အသုံးပြုထားသော မူရင်းအစီရင်ခံစာများနှင့် အဖွဲ့အစည်းရင်းမြစ်များကို ကြည့်ရှုပါ။',
      sourceCaveat:'Myanmar Earthquake Portal ၏ သမိုင်းစာမျက်နှာကို ထပ်မံဖတ်ရှုရန် ထည့်သွင်းထားသော်လည်း စစ်ဆေးချိန်တွင် ဖွင့်မရခဲ့ပါ။ ဤစာမျက်နှာရှိ ကိန်းဂဏန်းများကို အခြားဖော်ပြထားသော ရင်းမြစ်များဖြင့် စစ်ဆေးထားသည်။',
      nextTag:'သမိုင်းမှ ရရှိသော သင်ခန်းစာ',nextA:'နောက်တစ်ဆင့်မှာ',nextB:'ကြိုတင်ပြင်ဆင်ခြင်း။',
      nextDesc:'ငလျင်ကို မတားဆီးနိုင်သော်လည်း ကြိုတင်ပြင်ဆင်ခြင်းဖြင့် အန္တရာယ်ကို လျှော့ချနိုင်ပါသည်။',nextAction:'ကြိုတင်ပြင်ဆင်မှု စာမျက်နှာ',
      major:'အဓိကငလျင်',historical:'သမိုင်းဆိုင်ရာ ခန့်မှန်းချက်',recorded:'ဖော်ပြထားသော ပြင်းအား',
      date:'နေ့စွဲ',where:'နေရာ',viewDetails:'အသေးစိတ် ကြည့်ရန်',hideDetails:'အသေးစိတ် ပိတ်ရန်',viewMap:'သက်ရောက်မှုမြေပုံ ကြည့်ရန်',
      affected:'ထိခိုက်ခဲ့သော နေရာများ',impact:'ဖြစ်ပျက်ခဲ့သော အကြောင်း',deaths:'သေဆုံးသူ အရေအတွက်',buildings:'အဆောက်အအုံ / နေအိမ်',
      note:'အချက်အလက် မှတ်ချက်',original:'မူရင်းရင်းမြစ် ဖွင့်ရန်',unknown:'ယုံကြည်စိတ်ချရသော မှတ်တမ်း မရှိ',
      citiesCount:'ပျက်စီးနိုင်ခြေမြင့်သော အဆောက်အအုံများ',navAbout:'ကျွန်ုပ်တို့အကြောင်း',navPrepared:'ကြိုတင်ပြင်ဆင်မှု',footerTitle:'အမြန်လင့်ခ်များ',footerHelp:'အကူအညီနှင့် ကိုယ်ရေးလုံခြုံမှု'
    }
  };

  const sources = {
    adrcHistorical: 'https://www.adrc.asia/publications/disaster_report/pdf/2025/Myanmar_EQ_20250328_en.pdf',
    adrc2012: 'https://www.adrc.asia/view_disaster_en.php?Key=1708&Lang=en',
    unuw: 'https://unu.edu/inweh/collection/building-damage-assessment-march-2025-myanmar-earthquake',
    unesco: 'https://whc.unesco.org/document/166328',
    maas: 'https://www.maas.edu.mm/Research/Admin/pdf/Vol.XVI%20No.5.pdf',
    usgs: 'https://www.usgs.gov/news/featured-story/m77-mandalay-burma-myanmar-earthquake',
    adrc2016: 'https://www.adrc.asia/aboutus/vrdata/finalpresentation/FY2018B_MMR_frp.pdf'
  };

  // Events are shown newest first. Early magnitudes are estimates, and casualty figures
  // carry report dates / uncertainties. Never interpret heritage counts as house counts.
  const events = [
    {
      year:'2025',era:'modern',date:{en:'28 MARCH 2025',mm:'၂၀၂၅ မတ်လ ၂၈ ရက်'},magnitude:'7.7',estimate:false,
      title:{en:'MANDALAY–SAGAING EARTHQUAKE',mm:'မန္တလေး–စစ်ကိုင်း ငလျင်'},
      intro:{en:'A shallow, powerful earthquake struck central Myanmar near Sagaing and Mandalay, severely affecting buildings, public services and historic sites.',mm:'စစ်ကိုင်းနှင့် မန္တလေးအနီး မြေအောက်အနက်မများသော အင်အားပြင်းငလျင်ကြောင့် အဆောက်အအုံများ၊ ပြည်သူ့ဝန်ဆောင်မှုများနှင့် ရှေးဟောင်းနေရာများ ပြင်းထန်စွာ ထိခိုက်ခဲ့သည်။'},
      locations:{en:['Mandalay','Sagaing','Kyaukse','Madaya','Woundwin','Pyin Oo Lwin','Shwebo','Naypyidaw'],mm:['မန္တလေး','စစ်ကိုင်း','ကျောက်ဆည်','မတ္တရာ','ဝမ်းတွင်း','ပြင်ဦးလွင်','ရွှေဘို','နေပြည်တော်']},
      impact:{en:'The 12:50 pm mainshock was followed by a major aftershock. Hospitals, transport infrastructure and cultural heritage were damaged. A June 2025 satellite study estimated over 157,000 likely damaged buildings in seven surveyed cities.',mm:'နေ့လယ် ၁၂:၅၀ တွင် လှုပ်ခတ်ခဲ့ပြီး နောက်ဆက်တွဲငလျင်ကြီးတစ်ခု ထပ်မံဖြစ်ပွားခဲ့သည်။ ဆေးရုံ၊ သယ်ယူပို့ဆောင်ရေးနှင့် ယဉ်ကျေးမှုအမွေအနှစ်များ ထိခိုက်ခဲ့သည်။ ၂၀၂၅ ဇွန်လ ဂြိုဟ်တုလေ့လာချက်အရ စစ်တမ်းကောက်ယူထားသော မြို့ခုနစ်မြို့တွင် အဆောက်အအုံ ၁၅၇,၀၀၀ ကျော် ပျက်စီးနိုင်ခြေမြင့်ကြောင်း ခန့်မှန်းထားသည်။'},
      deaths:{en:'3,600–5,350 (estimate)',mm:'၃,၆၀၀–၅,၃၅၀ (ခန့်မှန်း)'},buildings:{en:'157,000+ likely damaged',mm:'၁၅၇,၀၀၀ ကျော် ပျက်စီးနိုင်ခြေမြင့်'},
      caution:{en:'UNU research estimates (June 2025); building figure refers to seven surveyed cities and deaths to Myanmar overall. These are not final confirmed totals.',mm:'ကုလသမဂ္ဂတက္ကသိုလ်၏ ၂၀၂၅ ဇွန်လ ခန့်မှန်းချက်။ အဆောက်အအုံကိန်းဂဏန်းမှာ မြို့ခုနစ်မြို့အတွက်သာဖြစ်ပြီး သေဆုံးမှုမှာ မြန်မာနိုင်ငံတစ်ဝန်းအတွက် ဖြစ်သည်။ အတည်ပြုပြီး နောက်ဆုံးစာရင်း မဟုတ်ပါ။'},
      source:sources.unuw,sourceName:'United Nations University · June 2025',placeSearch:'central myanmar mandalay sagaing kyaukse madaya woundwin pyin oo lwin shwebo naypyidaw'
    },
    {
      year:'2016',era:'modern',date:{en:'24 AUGUST 2016',mm:'၂၀၁၆ ဩဂုတ်လ ၂၄ ရက်'},magnitude:'6.8',estimate:false,
      title:{en:'CHAUK–BAGAN EARTHQUAKE',mm:'ချောက်–ပုဂံ ငလျင်'},
      intro:{en:'An earthquake near Chauk damaged religious monuments across the Bagan archaeological landscape.',mm:'ချောက်မြို့အနီး ငလျင်ကြောင့် ပုဂံရှေးဟောင်းဒေသရှိ ဘာသာရေးအဆောက်အအုံများ ပျက်စီးခဲ့သည်။'},
      locations:{en:['Chauk','Bagan','Nyaung-U','Central Myanmar'],mm:['ချောက်','ပုဂံ','ညောင်ဦး','မြန်မာအလယ်ပိုင်း']},
      impact:{en:'A heritage assessment recorded damage to 389 Bagan monuments, including 17 small monuments completely destroyed. These figures are monuments, not residential houses.',mm:'ပုဂံရှိ ရှေးဟောင်းအဆောက်အအုံ ၃၈၉ ခု ထိခိုက်ခဲ့ပြီး သေးငယ်သော အဆောက်အအုံ ၁၇ ခု လုံးဝပျက်စီးခဲ့သည်။ ဤကိန်းဂဏန်းများသည် နေအိမ်များမဟုတ်ဘဲ ရှေးဟောင်းအမွေအနှစ်များကို ဆိုလိုသည်။'},
      deaths:{en:'4 (ADRC report)',mm:'၄ ဦး (ADRC အစီရင်ခံစာ)'},buildings:{en:'389 heritage monuments',mm:'ရှေးဟောင်းအဆောက်အအုံ ၃၈၉ ခု'},
      caution:{en:'UNESCO’s Bagan nomination dossier gives 389 damaged monuments. The death figure comes from an ADRC disaster-management presentation.',mm:'ပျက်စီးသော အမွေအနှစ် ၃၈၉ ခုကို UNESCO စာတမ်းမှ၊ သေဆုံးသူအရေအတွက်ကို ADRC အစီရင်ခံစာမှ ယူထားသည်။'},
      source:sources.unesco,sourceName:'UNESCO · Bagan nomination dossier',placeSearch:'chauk bagan nyaung u'
    },
    {
      year:'2012',era:'modern',date:{en:'11 NOVEMBER 2012',mm:'၂၀၁၂ နိုဝင်ဘာလ ၁၁ ရက်'},magnitude:'6.8',estimate:false,
      title:{en:'SHWEBO EARTHQUAKE',mm:'ရွှေဘို ငလျင်'},
      intro:{en:'Strong shaking north of Shwebo damaged houses, schools and religious buildings in Sagaing Region.',mm:'ရွှေဘိုမြို့မြောက်ပိုင်းတွင် လှုပ်ခတ်ခဲ့သော ငလျင်ကြောင့် စစ်ကိုင်းတိုင်းရှိ နေအိမ်၊ ကျောင်းနှင့် ဘာသာရေးအဆောက်အအုံများ ပျက်စီးခဲ့သည်။'},
      locations:{en:['Shwebo','Sagaing Region','Thabeikkyin','Mandalay area'],mm:['ရွှေဘို','စစ်ကိုင်းတိုင်း','သပိတ်ကျင်း','မန္တလေးအနီး']},
      impact:{en:'The 17 November 2012 government situation report recorded more than 400 damaged houses, 65 schools and 100 religious buildings.',mm:'၂၀၁၂ နိုဝင်ဘာ ၁၇ ရက် အစိုးရအခြေအနေအစီရင်ခံစာအရ နေအိမ် ၄၀၀ ကျော်၊ ကျောင်း ၆၅ ကျောင်းနှင့် ဘာသာရေးအဆောက်အအုံ ၁၀၀ ပျက်စီးခဲ့သည်။'},
      deaths:{en:'At least 16 (17 Nov report)',mm:'အနည်းဆုံး ၁၆ ဦး (နိုဝင်ဘာ ၁၇)'},buildings:{en:'400+ houses; 65 schools',mm:'နေအိမ် ၄၀၀ ကျော်၊ ကျောင်း ၆၅ ကျောင်း'},
      caution:{en:'Counts are from a dated OCHA update quoted by ADRC; later reports may differ.',mm:'ADRC မှ ကိုးကားထားသည့် OCHA အချိန်သတ်မှတ်အစီရင်ခံစာမှ ကိန်းဂဏန်းများဖြစ်ပြီး နောက်ပိုင်းစာရင်းများ ကွာခြားနိုင်သည်။'},
      source:sources.adrc2012,sourceName:'ADRC · OCHA situation update',placeSearch:'shwebo sagaing thabeikkyin mandalay'
    },
    {
      year:'1975',era:'twentieth',date:{en:'8 JULY 1975',mm:'၁၉၇၅ ဇူလိုင်လ ၈ ရက်'},magnitude:'6.8',estimate:false,
      title:{en:'BAGAN EARTHQUAKE',mm:'ပုဂံ ငလျင်'},
      intro:{en:'An earthquake in the Bagan–Nyaung-U area badly damaged important pagodas and historic structures.',mm:'ပုဂံ–ညောင်ဦးဒေသတွင် လှုပ်ခတ်ခဲ့ပြီး ထင်ရှားသော စေတီများနှင့် ရှေးဟောင်းအဆောက်အအုံများ ပြင်းထန်စွာ ထိခိုက်ခဲ့သည်။'},
      locations:{en:['Bagan','Nyaung-U','Mandalay Region'],mm:['ပုဂံ','ညောင်ဦး','မန္တလေးတိုင်း']},
      impact:{en:'Many historic pagodas were damaged. Later restoration work following this earthquake influenced how some monuments responded to the 2016 earthquake.',mm:'ရှေးဟောင်းစေတီများစွာ ပျက်စီးခဲ့သည်။ ၁၉၇၅ ငလျင်နောက်ပိုင်း ပြန်လည်ပြုပြင်မှုအချို့သည် ၂၀၁၆ ငလျင်ကာလတွင် အဆောက်အအုံများ ထိခိုက်ပုံကို သက်ရောက်စေခဲ့သည်။'},
      deaths:{en:'2 (one academic study)',mm:'၂ ဦး (သုတေသနတစ်ခုအရ)'},buildings:{en:'Many pagodas; count varies',mm:'စေတီများစွာ၊ စုစုပေါင်းမတူနိုင်'},
      caution:{en:'A Myanmar Academy of Arts and Science paper lists two deaths and 15 injuries. Another ADRC compilation appears to misdate this event as 1976.',mm:'မြန်မာနိုင်ငံ သိပ္ပံနှင့်ဝိဇ္ဇာအကယ်ဒမီ စာတမ်းတွင် သေဆုံးသူ ၂ ဦး၊ ဒဏ်ရာရသူ ၁၅ ဦး ဖော်ပြထားသည်။ ADRC စာရင်းတစ်ခု၌ ၁၉၇၆ ဟု မှားယွင်းဖော်ပြထားပုံရသည်။'},
      source:sources.maas,sourceName:'Myanmar Academy of Arts and Science · 2018',placeSearch:'bagan nyaung u mandalay'
    },
    {
      year:'1956',era:'twentieth',date:{en:'16 JULY 1956',mm:'၁၉၅၆ ဇူလိုင်လ ၁၆ ရက်'},magnitude:'7.0',estimate:true,
      title:{en:'SAGAING EARTHQUAKE',mm:'စစ်ကိုင်း ငလျင်'},
      intro:{en:'A major earthquake near Sagaing severely damaged pagodas and affected communities around the central Myanmar fault zone.',mm:'စစ်ကိုင်းမြို့အနီး အင်အားပြင်းငလျင်ကြောင့် စေတီများစွာ ပျက်စီးခဲ့ပြီး မြန်မာအလယ်ပိုင်းရှိ လူမှုအသိုင်းအဝိုင်းများ ထိခိုက်ခဲ့သည်။'},
      locations:{en:['Sagaing','Central Myanmar'],mm:['စစ်ကိုင်း','မြန်မာအလယ်ပိုင်း']},
      impact:{en:'Historical summaries describe serious damage to several pagodas. Complete house-by-house records are not consistently available.',mm:'သမိုင်းမှတ်တမ်းများအရ စေတီများစွာ ပြင်းထန်စွာ ထိခိုက်ခဲ့သော်လည်း နေအိမ်တစ်အိမ်ချင်းစီ ပျက်စီးမှုစာရင်းကို အပြည့်အစုံ မရနိုင်ပါ။'},
      deaths:{en:'About 40–50 (historical)',mm:'၄၀–၅၀ ခန့် (သမိုင်းမှတ်တမ်း)'},buildings:{en:'Pagodas damaged; total unknown',mm:'စေတီများ ပျက်စီး၊ စုစုပေါင်းမသိ'},
      caution:{en:'Approximate values in the ADRC historical compilation, not a modern verified census.',mm:'ADRC ၏ သမိုင်းစာရင်းမှ ခန့်မှန်းချက်ဖြစ်ပြီး ခေတ်မီအတည်ပြုစာရင်း မဟုတ်ပါ။'},
      source:sources.adrcHistorical,sourceName:'ADRC · historical earthquake summary',placeSearch:'sagaing central myanmar'
    },
    {
      year:'1930',era:'twentieth',date:{en:'5 MAY 1930',mm:'၁၉၃၀ မေလ ၅ ရက်'},magnitude:'7.3',estimate:true,
      title:{en:'BAGO (PEGU) EARTHQUAKE',mm:'ပဲခူး ငလျင်'},
      intro:{en:'One of the most destructive earthquakes recorded in southern Myanmar, causing extensive damage around Bago and Yangon.',mm:'မြန်မာနိုင်ငံအောက်ပိုင်းတွင် မှတ်တမ်းတင်ထားသော အပျက်အစီးများဆုံးငလျင်များထဲမှ တစ်ခုဖြစ်ပြီး ပဲခူးနှင့် ရန်ကုန်အနီး ထိခိုက်ခဲ့သည်။'},
      locations:{en:['Bago (Pegu)','Yangon','Khayan','Southern Bago Region'],mm:['ပဲခူး','ရန်ကုန်','ခရမ်း','ပဲခူးတိုင်းတောင်ပိုင်း']},
      impact:{en:'Severe damage affected structures along the Sagaing Fault zone; historical summaries report roughly 500 deaths in Bago and 50 in Yangon.',mm:'စစ်ကိုင်းပြတ်ရွေ့တစ်လျှောက် အဆောက်အအုံများ ပြင်းထန်စွာ ထိခိုက်ခဲ့ပြီး သမိုင်းမှတ်တမ်းများတွင် ပဲခူး၌ သေဆုံးသူ ၅၀၀ ခန့်နှင့် ရန်ကုန်၌ ၅၀ ခန့် ဖော်ပြထားသည်။'},
      deaths:{en:'About 550 (historical)',mm:'၅၅၀ ခန့် (သမိုင်းမှတ်တမ်း)'},buildings:{en:'Severe losses; no verified total',mm:'ပြင်းထန်စွာ ပျက်စီး၊ စုစုပေါင်းမသိ'},
      caution:{en:'Reported deaths are historical approximations, not independently verified modern totals.',mm:'သေဆုံးသူကိန်းဂဏန်းများမှာ သမိုင်းဆိုင်ရာ ခန့်မှန်းချက်များ ဖြစ်သည်။'},
      source:sources.adrcHistorical,sourceName:'ADRC · historical earthquake summary',placeSearch:'bago pegu yangon khayan'
    },
    {
      year:'1912',era:'twentieth',date:{en:'23 MAY 1912',mm:'၁၉၁၂ မေလ ၂၃ ရက်'},magnitude:'7.6–7.9',estimate:true,
      title:{en:'MAYMYO / SHAN EARTHQUAKE',mm:'မေမြို့ / ရှမ်းပြည်နယ် ငလျင်'},
      intro:{en:'A very large historical earthquake affected the Maymyo–Shan region and was felt beyond Myanmar’s borders.',mm:'မေမြို့နှင့် ရှမ်းဒေသအနီး ပြင်းထန်သော သမိုင်းဝင်ငလျင်တစ်ခုဖြစ်ပြီး မြန်မာနိုင်ငံပြင်ပအထိ လှုပ်ခတ်မှုကို ခံစားခဲ့ကြသည်။'},
      locations:{en:['Maymyo (Pyin Oo Lwin) area','Shan Plateau','Taunggyi region'],mm:['မေမြို့ (ပြင်ဦးလွင်) အနီး','ရှမ်းကုန်းပြင်မြင့်','တောင်ကြီးဒေသ']},
      impact:{en:'Historical reviews estimate magnitude 7.6–7.9, with shaking reported in neighbouring Thailand, Yunnan and northeastern India. Reliable city-by-city damage totals are scarce.',mm:'သမိုင်းမှတ်တမ်းများတွင် ပြင်းအား ၇.၆–၇.၉ ခန့်မှန်းထားပြီး ထိုင်း၊ ယူနန်နှင့် အိန္ဒိယအရှေ့မြောက်ပိုင်းအထိ လှုပ်ခတ်မှု ခံစားခဲ့ရသည်။ မြို့အလိုက် ပျက်စီးမှုစာရင်းများ အလုံအလောက် မရှိပါ။'},
      deaths:{en:'Not reliably established',mm:'ယုံကြည်စိတ်ချရစွာ မသတ်မှတ်နိုင်'},buildings:{en:'No comparable total recorded',mm:'နှိုင်းယှဉ်နိုင်သော စာရင်းမရှိ'},
      caution:{en:'Historical estimates differ by study, and exact locations and magnitudes vary across catalogues.',mm:'သုတေသနအလိုက် ပြင်းအားနှင့် နေရာသတ်မှတ်ချက်များ ကွဲပြားနိုင်သည်။'},
      source:sources.adrcHistorical,sourceName:'ADRC · historical earthquake summary',placeSearch:'maymyo pyin oo lwin shan taunggyi'
    },
    {
      year:'1839',era:'historical',date:{en:'23 MARCH 1839',mm:'၁၈၃၉ မတ်လ ၂၃ ရက်'},magnitude:'≈8.2',estimate:true,
      title:{en:'INNWA (AVA) EARTHQUAKE',mm:'အင်းဝ ငလျင်'},
      intro:{en:'A catastrophic earthquake struck the then-royal capital of Ava and damaged monuments around central Myanmar.',mm:'ထိုစဉ်က မြို့တော် အင်းဝကို ပြင်းထန်စွာ ထိခိုက်စေခဲ့ပြီး မြန်မာအလယ်ပိုင်းရှိ ရှေးဟောင်းအဆောက်အအုံများ ပျက်စီးခဲ့သည်။'},
      locations:{en:['Innwa (Ava)','Mingun','Sagaing','Mandalay area'],mm:['အင်းဝ','မင်းကွန်း','စစ်ကိုင်း','မန္တလေးအနီး']},
      impact:{en:'Historical reports describe destruction of Ava’s city walls and pagodas, damage to Mingun Pagoda, ground fissures and the abandonment of the former royal capital.',mm:'အင်းဝမြို့ရိုးနှင့် စေတီများ ပျက်စီးခြင်း၊ မင်းကွန်းပုထိုးတော် ထိခိုက်ခြင်းနှင့် မြေပြင်ကွဲအက်ခြင်းတို့ကို သမိုင်းမှတ်တမ်းများတွင် ဖော်ပြထားသည်။'},
      deaths:{en:'About 300–400 (historical)',mm:'၃၀၀–၄၀၀ ခန့် (သမိုင်းမှတ်တမ်း)'},buildings:{en:'Major historic losses; no count',mm:'ရှေးဟောင်းအဆောက်အအုံများ ပျက်စီး'},
      caution:{en:'Magnitude and casualty totals are historical estimates reconstructed from accounts.',mm:'ပြင်းအားနှင့် သေဆုံးမှုမှာ သမိုင်းမှတ်တမ်းအခြေပြု ခန့်မှန်းချက်များဖြစ်သည်။'},
      source:sources.adrcHistorical,sourceName:'ADRC · historical earthquake summary',placeSearch:'innwa ava mingun sagaing mandalay'
    },
    {
      year:'1762',era:'historical',date:{en:'2 APRIL 1762',mm:'၁၇၆၂ ဧပြီလ ၂ ရက်'},magnitude:'≈8.8',estimate:true,
      title:{en:'CHITTAGONG–RAKHINE EARTHQUAKE',mm:'စစ်တကောင်း–ရခိုင် ငလျင်'},
      intro:{en:'An immense historical earthquake affected the Bay of Bengal coast, including the Rakhine region, and generated a tsunami.',mm:'ဘင်္ဂလားပင်လယ်အော်ကမ်းရိုးတန်းနှင့် ရခိုင်ဒေသကို ထိခိုက်စေခဲ့သော အလွန်ပြင်းထန်သော သမိုင်းဝင်ငလျင်ဖြစ်ပြီး ဆူနာမီဖြစ်ပေါ်ခဲ့သည်။'},
      locations:{en:['Rakhine coast','Chittagong (now Bangladesh)','Bay of Bengal'],mm:['ရခိုင်ကမ်းရိုးတန်း','စစ်တကောင်း (ယနေ့ ဘင်္ဂလားဒေ့ရှ်)','ဘင်္ဂလားပင်လယ်အော်']},
      impact:{en:'The ADRC historical review cites an estimated magnitude up to 8.8 and notes tsunami effects. No accurate regional inventory of damaged houses survives.',mm:'ADRC သမိုင်းမှတ်တမ်းအရ ပြင်းအား ၈.၈ အထိ ခန့်မှန်းထားပြီး ဆူနာမီသက်ရောက်မှုကို ဖော်ပြထားသည်။ ပျက်စီးသော နေအိမ်စာရင်းကို အတိအကျ မရနိုင်ပါ။'},
      deaths:{en:'Not reliably established',mm:'ယုံကြည်စိတ်ချရစွာ မသတ်မှတ်နိုင်'},buildings:{en:'Not reliably recorded',mm:'ယုံကြည်စိတ်ချရသော စာရင်းမရှိ'},
      caution:{en:'The 8.8 estimate is from a retrospective study; this earthquake was not measured by seismographs.',mm:'၈.၈ ပြင်းအားသည် နောက်ပိုင်းသုတေသနမှ ခန့်မှန်းချက်ဖြစ်ပြီး ထိုခေတ်က ငလျင်တိုင်းကိရိယာဖြင့် မတိုင်းတာခဲ့ပါ။'},
      source:sources.adrcHistorical,sourceName:'ADRC · historical earthquake summary',placeSearch:'rakhine arakan chittagong bangladesh bay bengal'
    }
  ];

  const cityData = [
    {en:'Woundwin',mm:'ဝမ်းတွင်း',pct:73,damaged:7545},
    {en:'Sagaing',mm:'စစ်ကိုင်း',pct:67,damaged:25620},
    {en:'Kyaukse',mm:'ကျောက်ဆည်',pct:62,damaged:7057},
    {en:'Pyin Oo Lwin',mm:'ပြင်ဦးလွင်',pct:38,damaged:15045},
    {en:'Mandalay',mm:'မန္တလေး',pct:36,damaged:96037},
    {en:'Madaya',mm:'မတ္တရာ',pct:32,damaged:2349},
    {en:'Shwebo',mm:'ရွှေဘို',pct:20,damaged:3761}
  ];

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));
  const list = $('#timelineList');
  let language = 'en';
  let filter = 'all';
  let searchTerm = '';
  const word = (key) => ui[language][key] || key;
  const safeIcon = (name) => `<i data-lucide="${name}" aria-hidden="true"></i>`;
  const get = (object) => object[language] || object.en;

  // Optional on-device language preference; falls back when browser storage is disabled.
  try { language = (localStorage.getItem('quake-language') || localStorage.getItem('quake-history-language')) === 'mm' ? 'mm' : 'en'; }
  catch (_) { language = 'en'; }

  const revealObserver = 'IntersectionObserver' in window && !prefersLessMotion
    ? new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      }, {rootMargin:'0px 0px -45px 0px',threshold:.06})
    : null;

  function observeReveals() {
    $$('.scroll-in,.time-event').forEach((el, index) => {
      if (revealObserver) {
        revealObserver.observe(el);
      } else {
        el.classList.add('in-view');
      }
    });
  }

  function refreshIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  function renderEvent(event) {
    const note = get(event.caution);
    return `<article class="time-event ${event.year === '2025' ? 'highlight-event' : ''}" data-id="${event.year}" data-era="${event.era}">
      <div class="event-year" aria-hidden="true">${event.year}</div><span class="event-node" aria-hidden="true"></span>
      <div class="event-card">
        <div class="event-topline"><span class="event-period">${word('major')} / ${event.year}</span><span class="event-strength">${safeIcon('activity')} M ${event.magnitude}${event.estimate ? ' *' : ''}</span></div>
        <h3 class="event-title">${get(event.title)}</h3>
        <p class="event-intro">${get(event.intro)}</p>
        <div class="event-meta"><span>${safeIcon('calendar-days')} ${get(event.date)}</span><span>${safeIcon('map-pin')} ${get(event.locations)[0]}</span></div>
        <button type="button" class="event-toggle" aria-expanded="false" aria-controls="event-detail-${event.year}"><span>${word('viewDetails')}</span>${safeIcon('chevron-down')}</button>
        <div class="event-detail" id="event-detail-${event.year}" hidden>
          <div class="detail-columns">
            <div><div class="detail-section-label">${safeIcon('map-pin')} ${word('affected')}</div><div class="location-tags">${get(event.locations).map(place => `<span class="location-tag">${place}</span>`).join('')}</div></div>
            <div><div class="detail-section-label">${safeIcon('activity')} ${word('impact')}</div><p class="detail-text">${get(event.impact)}</p></div>
          </div>
          <div class="detail-stat-grid"><div class="detail-stat"><small>${safeIcon('skull')} ${word('deaths')}</small><strong>${get(event.deaths)}</strong></div><div class="detail-stat"><small>${safeIcon('house')} ${word('buildings')}</small><strong>${get(event.buildings)}</strong></div></div>
          <p class="event-caveat"><b>${word('note')}:</b> ${note}</p>
          <a class="detail-source" href="${event.source}" target="_blank" rel="noopener noreferrer">${word('original')} · ${event.sourceName} ${safeIcon('external-link')}</a>
          ${event.year === '2025' ? `<a class="event-map-link" href="earthquake-map.html">${safeIcon('map')} ${word('viewMap')} ${safeIcon('arrow-up-right')}</a>` : ''}
        </div>
      </div>
    </article>`;
  }

  // Opening a card does not navigate away. Clicking its source opens the publisher.
  list.addEventListener('click', (e) => {
    const button = e.target.closest('.event-toggle');
    if (!button) return;
    const panel = document.getElementById(button.getAttribute('aria-controls'));
    const opening = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(opening));
    panel.hidden = !opening;
    button.querySelector('span').textContent = word(opening ? 'hideDetails' : 'viewDetails');
  });

  function renderTimeline() {
    const filtered = events.filter(e => {
      const eraMatch = filter === 'all' || e.era === filter;
      const text = `${e.year} ${e.placeSearch} ${e.title.en} ${e.title.mm} ${e.locations.mm.join(' ')}`.toLowerCase();
      return eraMatch && text.includes(searchTerm);
    });
    list.innerHTML = filtered.map(renderEvent).join('');
    $('#emptyResults').hidden = filtered.length !== 0;
    observeReveals();
    refreshIcons();
  }

  $$('.filter-button').forEach(button => button.addEventListener('click', () => {
    filter = button.dataset.era;
    $$('.filter-button').forEach(b => {
      const active = b === button;
      b.classList.toggle('is-active', active);
      b.setAttribute('aria-pressed', String(active));
    });
    renderTimeline();
  }));

  $('#earthquakeSearch').addEventListener('input', (e) => {
    searchTerm = e.target.value.trim().toLocaleLowerCase();
    renderTimeline();
  });

  $('#resetFilters').addEventListener('click', () => {
    searchTerm = '';
    filter = 'all';
    $('#earthquakeSearch').value = '';
    $$('.filter-button').forEach(b => {
      const active = b.dataset.era === 'all';
      b.classList.toggle('is-active', active);
      b.setAttribute('aria-pressed', String(active));
    });
    renderTimeline();
  });

  function renderCities() {
    $('#cityRows').innerHTML = cityData.map(city => `
      <div class="city-row">
        <span class="city-name">${city[language]}</span>
        <div class="bar-track" aria-label="${city.en}: ${city.pct} percent estimated building damage"><div class="bar-fill" style="--damage:${city.pct}%"></div></div>
        <span class="city-percent">${city.pct}%</span><span class="city-count">${city.damaged.toLocaleString('en-US')} ${language === 'mm' ? 'ခု' : 'buildings'}</span>
      </div>`).join('');
    const board = $('.city-board');
    if (!revealObserver) board.classList.add('in-view');
    else if (!board.classList.contains('in-view')) revealObserver.observe(board);
  }

  function applyLanguage(value) {
    language = value === 'mm' ? 'mm' : 'en';
    document.documentElement.lang = language === 'mm' ? 'my' : 'en';
    document.title = language === 'mm' ? 'မြန်မာနိုင်ငံ ငလျင်သမိုင်း | QUAKE' : 'Earthquake History | QUAKE';
    $$('[data-t]').forEach(node => { node.textContent = word(node.dataset.t); });
    $('#earthquakeSearch').placeholder = word('searchPlaceholder');
    $$('.lang-option').forEach(option => {
      const active = option.dataset.lang === language;
      option.classList.toggle('active', active);
      option.setAttribute('aria-checked', String(active));
    });
    // Shared navigation + footer retain the uploaded original page structure.
    const nav = $$('#mainNavbar .nav-link');
    if (nav[0]) nav[0].textContent = word('navHome');
    if (nav[1]) nav[1].textContent = word('navAbout');
    if (nav[2]) nav[2].textContent = word('navHistory');
    if (nav[3]) nav[3].textContent = word('navPrepared');
    $$('.site-footer h3').forEach((heading, i) => { if (i === 0) heading.textContent = word('footerTitle'); if (i === 1) heading.textContent = word('footerHelp'); });
    renderTimeline();
    renderCities();
    try { localStorage.setItem('quake-history-language',language); localStorage.setItem('quake-language',language); } catch (_) {}
    refreshIcons();
  }
  $$('.lang-option').forEach(button => button.addEventListener('click', () => applyLanguage(button.dataset.lang)));

  // Scroll progress / back to top.
  const topButton = $('#historyBackTop');
  const onScroll = () => topButton.classList.toggle('show', window.scrollY > 680);
  window.addEventListener('scroll', onScroll, {passive:true});
  topButton.addEventListener('click', () => window.scrollTo({top:0,behavior:prefersLessMotion?'auto':'smooth'}));
  onScroll();

  applyLanguage(language);
  observeReveals();
  refreshIcons();
});

// Logo image fallback
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.brand-logo,.footer-brand-logo').forEach(image => {
    const fallback = image.parentElement.querySelector('.brand-fallback');
    const showFallback = () => {
      image.classList.add('is-missing');
      if (fallback) fallback.classList.add('is-visible');
    };
    image.addEventListener('error', showFallback);
    if (image.complete && image.naturalWidth === 0) showFallback();
  });
  const toggle = document.querySelector('.history-page .navbar-toggler');
  const collapse = document.getElementById('mainNavbar');
  if (toggle && collapse) toggle.addEventListener('click', () => {
    if (window.bootstrap) return;
    const open = collapse.classList.toggle('show');
    toggle.setAttribute('aria-expanded',String(open));
  });
});
