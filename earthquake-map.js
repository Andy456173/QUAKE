'use strict';
/*
 QUAKE / Myanmar earthquake impact atlas
 ADM1 geometries: geoBoundaries gbOpen Myanmar via geonet-myanmar (CC BY 4.0).
 Coordinates rounded and simplified for efficient SVG use; no invented state shapes.
 City estimates apply ONLY to seven assessed cities. Dated deaths are provisional.
*/
const STATE_PATHS={
"Ayeyarwady":"M199,459L199,456L193,460L199,459ZM228,459L234,454L233,450L229,452L228,459ZM219,448L219,442L200,455L203,460L202,457L208,455L200,461L209,463L219,448ZM188,450L188,445L170,454L171,460L188,450ZM223,450L218,454L223,450ZM182,400L182,406L187,408L181,406L178,407L179,412L174,411L177,413L174,419L177,419L170,421L172,425L168,433L162,434L158,448L161,455L180,446L176,443L190,440L190,427L193,431L194,427L192,430L197,433L191,436L192,439L197,438L189,445L195,445L182,456L209,442L185,456L190,459L203,447L214,442L203,447L204,453L219,442L220,449L230,447L219,453L219,461L226,461L233,450L231,448L237,443L230,464L245,462L258,452L258,444L261,449L265,448L273,440L265,437L269,434L266,422L270,419L252,405L260,400L240,392L244,389L237,376L239,374L223,364L200,369L205,375L199,382L204,387L203,392L197,394L198,400L193,406L182,400ZM189,441L183,445L189,441ZM270,447L273,440L267,446L270,447ZM273,446L282,441L276,440L273,446ZM194,431L191,431L191,436L196,433L194,431Z",
"Bago":"M260,400L283,389L296,402L297,410L304,415L302,418L324,418L332,424L330,421L334,422L336,413L342,413L336,410L339,407L335,407L335,396L350,400L358,398L351,384L356,376L340,366L340,359L323,360L316,355L320,353L316,350L322,348L316,348L310,340L314,339L303,329L264,329L268,335L266,340L239,339L215,352L201,346L191,347L195,351L190,353L195,357L191,359L196,361L194,365L200,369L223,364L239,374L237,376L244,389L240,392L260,400Z",
"Chin":"M136,286L151,282L145,275L153,268L152,264L146,263L153,253L146,248L144,241L149,222L146,222L148,216L144,208L147,203L142,195L146,191L142,187L147,188L146,182L153,182L155,172L129,165L113,168L102,162L108,177L103,189L105,197L87,201L90,205L86,209L86,219L92,228L82,230L80,238L76,236L73,240L70,235L59,232L53,239L54,256L67,270L88,270L90,279L120,284L119,279L125,276L136,286Z",
"Kachin":"M321,160L322,166L334,165L335,172L329,175L349,179L386,170L378,168L393,160L391,157L394,156L387,155L390,153L387,149L378,150L381,138L396,135L391,133L391,127L399,120L405,122L418,116L420,107L430,110L443,100L456,99L447,89L458,87L454,83L461,72L458,68L460,56L455,50L458,46L456,37L438,34L438,38L430,39L420,27L419,17L381,2L376,4L378,10L366,13L367,26L360,25L336,36L337,41L353,54L292,59L298,60L282,69L289,75L277,76L289,91L283,97L291,104L281,109L274,108L282,130L278,131L278,126L264,131L271,140L282,141L291,146L289,148L305,146L319,149L314,153L321,160Z",
"Kayah":"M367,360L373,364L394,361L392,350L387,348L399,342L395,331L402,328L399,322L380,319L382,316L378,313L353,310L354,318L337,325L335,327L341,330L331,336L349,357L367,360Z",
"Kayin":"M361,357L349,357L330,331L321,327L318,330L303,329L314,339L310,340L314,346L322,348L316,350L320,353L316,355L323,360L340,359L340,366L356,376L351,382L356,389L353,391L356,398L370,392L367,395L377,410L372,417L374,422L386,432L408,438L418,447L397,449L400,465L406,466L424,482L442,475L446,478L445,465L449,458L446,452L465,449L470,440L464,438L454,444L447,431L440,428L445,421L396,393L388,386L392,382L385,370L374,371L361,357Z",
"Magway":"M136,286L135,290L150,296L165,312L168,325L180,333L179,339L191,347L200,346L215,352L239,339L266,340L268,337L258,323L265,316L262,308L266,304L260,300L258,291L249,288L251,284L240,282L213,290L214,279L200,276L202,266L222,262L234,253L219,243L173,244L173,233L163,231L163,220L153,210L146,211L146,222L149,222L144,240L146,248L153,253L146,263L152,264L153,268L145,275L151,282L136,286Z",
"Mandalay":"M234,253L222,262L202,266L200,276L214,279L213,290L240,282L251,284L249,288L258,291L260,300L266,304L262,308L265,316L258,323L260,328L286,331L289,328L318,330L322,327L313,323L320,321L301,309L308,308L306,305L313,302L308,293L314,288L306,285L315,278L291,271L302,267L296,261L298,254L336,247L327,235L310,232L293,215L291,211L295,209L319,208L324,204L311,200L293,201L287,197L288,190L303,181L287,181L284,177L271,187L277,198L275,211L271,212L277,219L274,223L278,226L277,242L246,241L238,245L234,253Z",
"Mon":"M377,436L372,437L378,447L383,436L377,436ZM399,434L384,436L385,446L380,451L391,459L389,462L395,475L391,478L394,483L399,483L395,483L395,494L402,487L410,486L421,491L425,488L421,486L421,478L400,465L397,449L418,447L399,434ZM358,398L350,400L336,395L334,398L336,406L347,412L345,417L349,421L354,413L359,429L365,430L367,435L384,435L384,430L372,418L377,410L367,395L370,392L358,398Z",
"Rakhine":"M200,369L191,359L195,358L190,353L195,352L191,344L179,339L180,333L168,325L165,312L141,289L135,290L134,282L125,276L119,279L121,284L113,284L90,279L88,270L66,270L64,266L53,265L50,260L42,260L38,256L26,262L28,265L25,267L35,271L31,275L38,277L35,279L38,284L62,300L62,289L52,285L50,279L53,285L56,283L63,288L63,292L71,296L75,294L71,292L75,294L68,295L71,298L76,295L63,303L72,305L71,300L74,303L75,299L80,299L85,289L80,286L87,294L80,305L93,298L86,303L96,301L101,294L98,297L106,303L107,311L132,313L126,321L133,319L135,322L127,323L140,328L141,325L139,329L145,330L124,325L121,328L130,335L146,332L143,335L121,338L123,334L119,331L110,333L123,345L141,351L144,347L139,338L146,340L144,338L150,332L147,341L154,340L147,343L155,341L148,344L147,349L153,347L146,351L156,349L154,352L163,355L154,355L172,370L166,373L175,374L178,382L174,382L185,399L181,398L193,406L198,400L197,394L204,388L199,382L205,375L200,369ZM121,349L111,350L121,357L129,356L129,350L121,349ZM69,294L63,294L64,299L70,298L69,294ZM87,294L85,291L82,297L87,294ZM75,306L81,316L75,306ZM79,305L91,317L86,312L87,308L79,305ZM91,303L85,303L91,308L95,305L91,303ZM98,302L91,303L95,305L93,309L102,307L98,302ZM101,298L97,300L104,309L107,305L101,298ZM126,314L121,315L118,321L130,314L126,314ZM109,312L105,311L113,319L114,313L109,312Z",
"Sagaing":"M146,211L153,210L161,217L163,231L173,233L172,243L178,245L219,243L234,253L238,245L246,241L277,242L278,226L274,223L277,219L271,213L275,211L277,198L271,187L284,177L287,181L298,178L303,181L314,172L311,165L303,165L321,160L314,153L319,149L305,146L289,148L291,146L282,141L271,140L264,131L278,126L278,131L282,130L274,108L291,106L283,97L289,91L277,76L289,75L282,69L294,65L292,62L298,60L294,58L342,57L348,54L334,51L336,48L324,44L298,47L278,51L259,62L218,74L215,77L220,80L219,90L223,91L212,97L214,103L187,115L183,122L194,125L192,132L171,148L156,168L153,182L148,181L147,188L142,187L146,191L142,194L147,203L146,211Z",
"Shan":"M303,181L288,189L287,197L293,201L311,200L324,204L319,208L291,211L299,219L299,224L304,224L314,234L327,235L336,247L298,254L296,261L302,267L291,271L315,278L306,285L314,288L308,293L313,302L306,305L308,308L301,309L320,321L314,324L334,335L341,330L335,327L354,318L353,310L377,313L383,321L400,325L412,322L412,316L426,321L447,321L465,316L470,319L476,317L480,306L497,307L512,303L505,295L529,298L538,293L547,297L558,283L584,278L575,278L589,262L597,263L618,255L613,246L579,257L570,254L552,256L548,252L552,250L540,248L539,236L485,232L491,229L492,223L500,220L496,211L506,207L504,204L513,204L509,199L468,195L472,190L467,190L470,187L462,182L468,179L454,172L455,166L469,162L467,160L415,162L349,179L329,175L335,172L334,165L322,166L321,160L314,160L303,165L311,165L314,172L303,181Z",
"Tanintharyi":"M429,605L420,618L427,617L429,605ZM444,605L433,606L438,607L434,610L444,615L444,605ZM439,594L440,602L453,600L444,599L439,594ZM410,603L410,609L415,611L410,603ZM427,667L417,675L429,669L427,667ZM421,634L415,638L426,639L426,645L429,641L421,634ZM445,633L444,630L440,634L443,636L445,633ZM396,494L398,500L405,497L408,501L401,501L407,510L409,508L407,513L416,518L413,524L414,534L419,537L417,542L421,542L422,525L425,536L429,536L441,547L441,552L447,554L448,563L453,562L448,564L452,570L457,568L450,570L456,571L450,578L459,580L448,582L457,585L445,583L453,586L444,588L449,591L455,589L458,591L450,594L461,597L456,595L454,597L458,599L445,602L457,602L448,606L455,609L463,603L461,607L474,612L470,613L467,608L457,610L460,618L455,620L461,624L452,629L457,631L454,634L461,634L453,637L456,639L452,636L447,638L451,640L443,643L446,645L440,643L445,656L441,662L446,671L451,662L455,662L451,658L455,661L463,653L461,645L492,628L506,612L519,604L513,602L512,592L506,593L508,591L502,581L504,576L491,572L488,562L482,559L489,552L482,529L449,514L426,496L425,491L410,486L402,487L396,494ZM426,554L429,565L428,560L431,559L426,554ZM416,587L412,590L419,593L416,587ZM415,582L405,586L410,588L415,582ZM430,573L429,585L432,586L441,577L437,579L430,573Z",
"Yangon":"M266,436L286,442L299,437L285,424L290,426L300,421L291,426L295,433L308,432L296,432L303,436L320,434L332,424L324,418L302,418L304,415L297,410L296,402L281,389L252,404L270,419L266,422L269,425L266,436Z"
};

const CITIES=[
 {id:'Mandalay',region:'Mandalay',en:'Mandalay',mm:'မန္တလေး',lat:21.9588,lon:96.0891,total:266921,damaged:96037,pct:36},
 {id:'Pyin Oo Lwin',region:'Mandalay',en:'Pyin Oo Lwin',mm:'ပြင်ဦးလွင်',lat:22.035,lon:96.466,total:39356,damaged:15045,pct:38},
 {id:'Madaya',region:'Mandalay',en:'Madaya',mm:'မတ္တရာ',lat:22.26,lon:96.13,total:7264,damaged:2349,pct:32},
 {id:'Kyaukse',region:'Mandalay',en:'Kyaukse',mm:'ကျောက်ဆည်',lat:21.61,lon:96.13,total:11366,damaged:7057,pct:62},
 {id:'Sagaing',region:'Sagaing',en:'Sagaing',mm:'စစ်ကိုင်း',lat:21.878,lon:95.979,total:38157,damaged:25620,pct:67},
 {id:'Shwebo',region:'Sagaing',en:'Shwebo',mm:'ရွှေဘို',lat:22.57,lon:95.70,total:19132,damaged:3761,pct:20},
 {id:'Woundwin',region:'Mandalay',en:'Woundwin',mm:'ဝမ်းတွင်း',lat:21.133,lon:95.99,total:10291,damaged:7545,pct:73}
];
const NAMES={
 Mandalay:['Mandalay','မန္တလေး'],Sagaing:['Sagaing','စစ်ကိုင်း'],Shan:['Shan','ရှမ်း'],Bago:['Bago','ပဲခူး'],Magway:['Magway','မကွေး'],Naypyidaw:['Nay Pyi Taw','နေပြည်တော်'],
 Kachin:['Kachin','ကချင်'],Chin:['Chin','ချင်း'],Rakhine:['Rakhine','ရခိုင်'],Ayeyarwady:['Ayeyarwady','ဧရာဝတီ'],Yangon:['Yangon','ရန်ကုန်'],Mon:['Mon','မွန်'],Kayin:['Kayin','ကရင်'],Kayah:['Kayah','ကယား'],Tanintharyi:['Tanintharyi','တနင်္သာရီ']
};
const REGIONS={
 Mandalay:{affected:true,coverage:true,deaths:'1,790',body:{en:'Mandalay, Pyin Oo Lwin, Madaya, Kyaukse and Woundwin are the five Mandalay Region cities included in the UNU satellite assessment. Schools, hospitals, bridges and heritage structures were also damaged.',mm:'မန္တလေး၊ ပြင်ဦးလွင်၊ မတ္တရာ၊ ကျောက်ဆည်နှင့် ဝမ်းတွင်းမြို့များသည် UNU ဂြိုဟ်တုဆိုင်ရာလေ့လာမှုတွင် ပါဝင်သော မန္တလေးတိုင်းရှိ မြို့ငါးမြို့ဖြစ်သည်။ ကျောင်း၊ ဆေးရုံ၊ တံတားနှင့် ရှေးဟောင်းအဆောက်အအုံများလည်း ထိခိုက်ခဲ့သည်။'}},
 Sagaing:{affected:true,coverage:true,deaths:'314',body:{en:'Sagaing and Shwebo were assessed by satellite. The epicentral area near Sagaing suffered extensive building and infrastructure damage, including the collapse of the old Sagaing Bridge.',mm:'စစ်ကိုင်းနှင့် ရွှေဘိုမြို့များကို ဂြိုဟ်တုဖြင့် လေ့လာခဲ့သည်။ စစ်ကိုင်းအနီးဗဟိုချက်ဒေသတွင် အဆောက်အအုံနှင့် အခြေခံအဆောက်အအုံများ ထိခိုက်ပြီး စစ်ကိုင်းတံတားဟောင်း ပြိုကျခဲ့သည်။'}},
 Shan:{affected:true,deaths:'79',body:{en:'Southern Shan was among the areas in early WHO casualty reporting. The UN initial report also described earthquake damage to stilt settlements on Inle Lake and a hotel in Aung Pan.',mm:'ရှမ်းပြည်နယ်တောင်ပိုင်းကို WHO ၏ ကနဦးသေဆုံးမှုအစီရင်ခံစာတွင် ထည့်သွင်းဖော်ပြခဲ့သည်။ အင်းလေးကန်ပေါ်ရှိ တိုင်ပေါ်အိမ်ရွာများနှင့် အောင်ပန်းရှိ ဟိုတယ်တစ်ခုလည်း ပျက်စီးခဲ့သည်။'}},
 Bago:{affected:true,deaths:'35',body:{en:'Bago Region was named among affected areas in the early UN report. The preliminary WHO casualty summary also mentioned reported deaths in Bago.',mm:'ပဲခူးတိုင်းကို ကုလသမဂ္ဂ၏ ကနဦးအစီရင်ခံစာတွင် ထိခိုက်ခဲ့သော ဒေသအဖြစ် ဖော်ပြထားသည်။ WHO ၏ ကနဦးအစီရင်ခံစာတွင်လည်း သေဆုံးမှုအချို့ကို ဖော်ပြထားသည်။'}},
 Magway:{affected:true,deaths:null,body:{en:'Magway Region was among the areas identified in the UN initial impact report. Comparable region-wide building damage and fatality totals were not published in the sources used here.',mm:'မကွေးတိုင်းသည် UN ကနဦးအခြေအနေအစီရင်ခံစာတွင် ဖော်ပြထားသော ထိခိုက်ဒေသတစ်ခု ဖြစ်သည်။ ဤဝက်ဘ်စာမျက်နှာအတွက် အသုံးပြုထားသော ရင်းမြစ်များတွင် တိုင်းအလိုက် ပြည့်စုံသော ပျက်စီးမှုနှင့် သေဆုံးမှုစာရင်း မပါရှိပါ။'}},
 Naypyidaw:{affected:true,deaths:'402',body:{en:'Nay Pyi Taw was heavily affected. The initial UN report noted damage to its airport and other infrastructure. The WHO figure shown is an early reported death count, not a final tally.',mm:'နေပြည်တော်တွင် ထိခိုက်ပျက်စီးမှု ပြင်းထန်ခဲ့သည်။ UN ကနဦးအစီရင်ခံစာအရ လေဆိပ်နှင့် အခြားအခြေခံအဆောက်အအုံများ ထိခိုက်ခဲ့သည်။ WHO သေဆုံးမှုကိန်းဂဏန်းမှာ ကနဦးဖော်ပြချက်သာဖြစ်သည်။'}}
};
const UNKNOWN_BODY={en:'This state or region is shown for geographic reference. It was not one of the six areas listed in the cited UN initial impact report. That does not mean it experienced no shaking or damage.',mm:'ဤပြည်နယ်/တိုင်းကို မြေပုံအညွှန်းအဖြစ် ဖော်ပြထားသည်။ UN ကနဦးအစီရင်ခံစာရှိ ထိခိုက်ဒေသခြောက်ခုတွင် မပါဝင်သော်လည်း ငလျင်လှုပ်ခတ်မှု သို့မဟုတ် ပျက်စီးမှု မရှိခဲ့ဟု မဆိုလိုပါ။'};
const T={
 en:{navHome:'Home',navAbout:'About Us',navHistory:'Earthquake History',navPrep:'Preparedness',crumbMap:'IMPACT MAP',kicker:'QUAKE DATA ATLAS / 01',heroPart1:'WHERE THE',heroPart2:'GROUND',heroPart3:'MOVED.',heroDesc:'Explore the impact of Myanmar’s 28 March 2025 earthquake by state, region, and city. Every number is linked to a published source — missing figures are left blank rather than guessed.',featuredEvent:'FEATURED EARTHQUAKE',eventPillSub:'CENTRAL MYANMAR · Mw 7.7',mapOverview:'GEOGRAPHIC OVERVIEW',mapTitle:'2025 Earthquake Impact Map',mapBadge:'Interactive map',mapSubtitle:'Choose an area on the map to view its information.',mapHint:'Select a state or city to inspect details',legendSelected:'Selected state / region',legendAffected:'Affected (UN, March 2025)',legendNeutral:'Other regions',legendCity:'Assessed city',boundaryNote:'Boundaries are simplified for visualization; not a statement on territorial claims. State colouring shows reported affected areas, not uniform damage across each region.',overviewTitle:'QUICK FACTS',magnitude:'MAGNITUDE',dateLabel:'2025 · 12:50 LOCAL',damagedLabel:'LIKELY DAMAGED BUILDINGS¹',deathsLabel:'ESTIMATED DEATHS · NATIONWIDE²',statsDisclaimer:'Sum of seven city estimates in the June 2025 UNU study; not all Myanmar buildings. Research estimate; not a final confirmed count.',inspectorTag:'REGION INSPECTOR',inspectorMore:'Read details and sources',inspectorSubtitle:'SELECTED AREA / 2025',sampledCities:'ASSESSED CITIES',regionBuildings:'LIKELY DAMAGED BUILDINGS¹',preliminaryDeaths:'PRELIMINARY REPORTED DEATHS³',regionCaution:'Figures apply only to assessed cities within the region. Deaths come from a preliminary WHO summary dated 30 March 2025; they are not final regional totals.',prevRegion:'PREVIOUS',nextRegion:'NEXT REGION',cityOverline:'',cityTitle:'City comparison',cityDesc:'Estimated share of buildings likely damaged in seven cities after the 28 March 2025 earthquake. Select a row to match the city with the map.',viewStudy:'UNU RESEARCH',selectedCity:'SELECTED CITY',likelyDamaged:'ESTIMATED BUILDING DAMAGE SHARE',damagedBuildings:'Likely damaged buildings',cityFootprints:'Total mapped buildings',focusNote:'This is not the percentage of the city’s land area destroyed.',regionsOverline:'',regionsTitle:'Reported areas',regionsDesc:'These are the six Myanmar areas named in the UN’s 29 March 2025 initial report. Select one to highlight it on the map.',areaNote:'These are reported affected areas, not a ranking of severity. Unlisted regions should not be interpreted as unaffected.',sourcesOverline:'DATA NOTES / 04',sourcesTitle:'THE NUMBERS NEED CONTEXT.',sourcesDescription:'Regional casualty figures are preliminary snapshots. Satellite-derived building damage is an estimate for seven cities only. They use different sources, geographic coverage, and reporting dates. Do not combine or compare these as if they were a complete census.',endKicker:'BACK TO THE RECORD',endTitle:'EXPLORE THE FULL TIMELINE.',returnHistory:'RETURN TO EARTHQUAKE HISTORY',quickLinks:'QUICK LINKS',helpPrivacy:'HELP & PRIVACY',region:'REGION',state:'STATE',territory:'UNION TERRITORY',noCoverage:'Not assessed',notAvailable:'Not reported',countNote:'Assessed cities',impactReport:'Impact reported',referenceOnly:'Reference only'},
 mm:{navHome:'ပင်မစာမျက်နှာ',navAbout:'ကျွန်ုပ်တို့အကြောင်း',navHistory:'ငလျင်သမိုင်း',navPrep:'ကြိုတင်ပြင်ဆင်မှု',crumbMap:'သက်ရောက်မှုမြေပုံ',kicker:'QUAKE အချက်အလက်မြေပုံ / ၀၁',heroPart1:'ငလျင်လှုပ်ခတ်မှု',heroPart2:'သက်ရောက်ခဲ့သော',heroPart3:'ဒေသများ။',heroDesc:'၂၀၂၅ ခုနှစ် မတ်လ ၂၈ ရက် ငလျင်၏ ပြည်နယ်၊ တိုင်းနှင့် မြို့အလိုက် သက်ရောက်မှုများကို လေ့လာပါ။ ဖော်ပြထားသော ကိန်းဂဏန်းများကို ရင်းမြစ်များနှင့် ချိတ်ဆက်ထားပြီး မရှိသော အချက်အလက်များကို မခန့်မှန်းထားပါ။',featuredEvent:'ရွေးချယ်ထားသော ငလျင်',eventPillSub:'မြန်မာနိုင်ငံအလယ်ပိုင်း · ပြင်းအား ၇.၇',mapOverview:'မြေပုံခြုံငုံသုံးသပ်ချက်',mapTitle:'၂၀၂၅ ငလျင် သက်ရောက်မှုမြေပုံ',mapBadge:'အပြန်အလှန် မြင်ကွင်း',mapSubtitle:'မြေပုံပေါ်ရှိ ဒေသကို ရွေးချယ်ပြီး အချက်အလက်ကို ကြည့်ရှုပါ။',mapHint:'အသေးစိတ်ကြည့်ရန် ပြည်နယ်၊ တိုင်း သို့မဟုတ် မြို့ကို နှိပ်ပါ',legendSelected:'ရွေးချယ်ထားသော ပြည်နယ်/တိုင်း',legendAffected:'UN ကနဦးအစီရင်ခံစာတွင် ပါသောဒေသ',legendNeutral:'အခြားဒေသများ',legendCity:'လေ့လာထားသော မြို့',boundaryNote:'နယ်နိမိတ်များကို မြေပုံဖော်ပြရန် ရိုးရှင်းအောင် ပြုလုပ်ထားသည်။ အရောင်သည် တိုင်းဒေသတစ်ခုလုံး တစ်ပြေးညီပျက်စီးသည်ဟု မဆိုလိုပါ။',overviewTitle:'အမြန်အချက်အလက်',magnitude:'ငလျင်ပြင်းအား',dateLabel:'၂၀၂၅ · ဒေသစံတော်ချိန် ၁၂:၅၀',damagedLabel:'ပျက်စီးနိုင်ခြေမြင့် အဆောက်အအုံ¹',deathsLabel:'နိုင်ငံတစ်ဝန်း သေဆုံးမှုခန့်မှန်း²',statsDisclaimer:'¹ UNU ဇွန် ၂၀၂၅ လေ့လာမှုရှိ မြို့ခုနစ်မြို့၏ စုစုပေါင်းသာဖြစ်သည်။ သုတေသနအခြေပြု ခန့်မှန်းချက်ဖြစ်ပြီး နောက်ဆုံးအတည်ပြုစာရင်း မဟုတ်ပါ။',inspectorTag:'ဒေသအလိုက် အသေးစိတ်',inspectorMore:'အသေးစိတ်နှင့် ရင်းမြစ်များ',inspectorSubtitle:'ရွေးချယ်ထားသော ဒေသ / ၂၀၂၅',sampledCities:'လေ့လာထားသောမြို့',regionBuildings:'ပျက်စီးနိုင်ခြေမြင့် အဆောက်အအုံ¹',preliminaryDeaths:'ကနဦး သေဆုံးမှုအစီရင်ခံချက်³',regionCaution:'ဒေသအတွင်း လေ့လာထားသော မြို့များအတွက်သာ ဖြစ်သည်။ WHO ၏ ၂၀၂၅ မတ်လ ၃၀ ရက် ကနဦးဖော်ပြချက်ဖြစ်ပြီး နောက်ဆုံးစာရင်း မဟုတ်ပါ။',prevRegion:'ယခင်ဒေသ',nextRegion:'နောက်ဒေသ',cityOverline:'',cityTitle:'မြို့အလိုက် နှိုင်းယှဉ်ချက်',cityDesc:'၂၀၂၅ မတ်လ ၂၈ ရက် ငလျင်ပြီးနောက် မြို့ခုနစ်မြို့ရှိ အဆောက်အအုံ ပျက်စီးနိုင်ခြေရာခိုင်နှုန်း ခန့်မှန်းချက်များ ဖြစ်သည်။ အတန်းတစ်ခုကို ရွေးပြီး မြေပုံနှင့် တွဲကြည့်နိုင်သည်။',viewStudy:'UNU သုတေသန',selectedCity:'ရွေးချယ်ထားသောမြို့',likelyDamaged:'အဆောက်အအုံပျက်စီးမှု ခန့်မှန်းရာခိုင်နှုန်း',damagedBuildings:'ပျက်စီးနိုင်ခြေမြင့် အဆောက်အအုံ',cityFootprints:'မြေပုံတင်ထားသော အဆောက်အအုံအားလုံး',focusNote:'ဤရာခိုင်နှုန်းမှာ မြို့ဧရိယာတစ်ခုလုံး ပျက်စီးမှုရာခိုင်နှုန်း မဟုတ်ပါ။',regionsOverline:'',regionsTitle:'ဖော်ပြထားသော ဒေသများ',regionsDesc:'၂၀၂၅ မတ်လ ၂၉ ရက် UN ကနဦးအစီရင်ခံစာတွင် ဖော်ပြထားသော မြန်မာဒေသ ၆ ခု ဖြစ်သည်။ ရွေးချယ်ပြီး မြေပုံတွင် မီးမောင်းထိုးပြနိုင်သည်။',areaNote:'ဤစာရင်းသည် ပြင်းထန်မှုအဆင့်လိုက် မဟုတ်ပါ။ စာရင်းတွင် မပါဝင်ခြင်းသည် မထိခိုက်ခဲ့ကြောင်း မဆိုလိုပါ။',sourcesOverline:'အချက်အလက်မှတ်ချက် / ၀၄',sourcesTitle:'ကိန်းဂဏန်းများ၏ နောက်ခံအကြောင်း။',sourcesDescription:'ဒေသအလိုက် သေဆုံးမှုကိန်းဂဏန်းများမှာ ကနဦးအစီရင်ခံချက်များ ဖြစ်သည်။ ဂြိုဟ်တုအခြေပြု အဆောက်အအုံပျက်စီးမှုသည် မြို့ခုနစ်မြို့အတွက်သာ ခန့်မှန်းချက်ဖြစ်သည်။ အချိန်၊ ရင်းမြစ်နှင့် လေ့လာထားသော နေရာမတူသောကြောင့် ပြည့်စုံသောစာရင်းတစ်ခုအဖြစ် မပေါင်းစပ်သင့်ပါ။',endKicker:'ငလျင်မှတ်တမ်းသို့',endTitle:'ငလျင်သမိုင်း အချိန်ဇယားကို လေ့လာပါ။',returnHistory:'ငလျင်သမိုင်းသို့ ပြန်သွားရန်',quickLinks:'အမြန်လင့်ခ်များ',helpPrivacy:'အကူအညီနှင့် ကိုယ်ရေးလုံခြုံမှု',region:'တိုင်းဒေသကြီး',state:'ပြည်နယ်',territory:'ပြည်ထောင်စုနယ်မြေ',noCoverage:'မလေ့လာထားပါ',notAvailable:'မဖော်ပြထားပါ',countNote:'လေ့လာထားသောမြို့',impactReport:'ထိခိုက်မှု ဖော်ပြထား',referenceOnly:'မြေပုံအညွှန်းသာ'}
};

const COUNTRY_PATHS={"India":"M370,26L347,32L352,55L305,48L219,73L221,94L185,124L182,141L152,171L101,163L98,200L83,212L90,228L58,236L23,179L5,179L-6,202L-42,183L-22,163L8,161L38,130L0,124L-124,120L-130,95L-161,93L-214,78L-237,102L-189,121L-231,134L-245,148L-205,157L-216,179L-193,206L-183,236L-192,249L-318,256L-315,283L-350,304L-449,331L-449,59L-432,67L-302,79L-247,79L-239,64L-248,42L-243,26L-203,18L-196,54L-136,68L-94,62L15,63L20,41L-7,30L46,25L106,-1L183,-24L238,-16L285,-31L316,-8L294,7L365,12Z","Bangladesh":"M56,262L33,256L38,285L19,267L2,231L-25,210L-86,209L-80,223L-101,243L-129,236L-138,243L-183,236L-193,206L-216,179L-205,157L-245,148L-231,134L-189,121L-237,102L-214,78L-161,93L-130,95L-124,120L0,124L38,130L8,161L-22,163L-42,183L-6,202L5,179L23,179L58,236Z","China":"M1112,363L1111,332L1143,316L1215,306L1253,307L1268,321L1239,336L1224,357L1167,374ZM1452,218L1415,236L1323,254L1253,259L1231,297L1194,299L1177,273L1192,259L1104,248L1073,254L1006,244L975,230L985,209L925,202L893,189L837,208L720,212L650,226L660,267L625,266L617,243L569,253L491,233L510,203L469,196L453,163L383,169L391,127L454,97L454,39L425,31L403,10L365,12L294,7L316,-8L285,-31L238,-16L183,-24L106,-1L46,25L-7,30L-36,20L-118,11L-153,20L-197,47L-203,18L-243,26L-320,23L-394,14L-449,-2L-449,-194L1465,-194L1465,224Z","Laos":"M970,505L940,530L886,516L907,500L910,469L857,438L853,402L802,373L752,370L739,383L700,384L681,378L611,399L610,367L626,329L581,327L577,306L549,295L563,281L619,258L625,266L660,267L650,226L684,221L753,282L834,282L859,314L817,323L798,336L877,358L974,432L1024,457L1040,482L1028,518Z","Thailand":"M824,511L738,517L696,547L712,591L653,574L596,575L606,547L548,547L542,587L485,671L490,697L533,698L560,731L572,762L608,783L648,787L683,806L661,820L617,825L612,806L558,790L547,797L521,783L509,765L442,728L432,749L419,729L446,672L514,601L488,569L482,532L438,503L422,485L445,478L469,447L368,366L396,359L426,320L473,318L549,295L577,306L581,327L626,329L610,367L611,399L681,378L700,384L739,383L752,370L802,373L853,402L857,438L910,469L907,500L886,516Z","Vietnam":"M884,638L954,635L925,613L1036,585L1044,542L1028,518L1040,482L1024,457L974,432L877,358L798,336L817,323L859,314L834,282L753,282L684,221L720,212L837,208L893,189L925,202L985,209L975,230L1006,244L1073,254L984,285L929,319L915,344L1027,428L1087,451L1127,480L1157,546L1148,610L1093,633L1018,656L964,686L882,720L858,697L876,673L827,652Z","Cambodia":"M696,547L738,517L824,511L886,516L940,530L970,505L1028,518L1044,542L1036,585L925,613L954,635L884,638L827,652L772,647L745,628L712,591Z","Bhutan":"M20,41L15,63L-94,62L-136,68L-196,54L-197,47L-153,20L-118,11L-36,20Z","Nepal":"M-248,42L-239,64L-247,79L-302,79L-432,67L-449,59L-449,-2L-394,14L-243,26Z","Myanmar":"M549,295L473,318L426,320L396,359L368,366L469,447L445,478L422,485L438,503L482,532L488,569L514,601L446,672L439,645L460,618L437,596L443,557L416,539L383,450L354,420L236,464L158,452L180,408L167,374L115,332L123,319L84,315L38,285L33,256L56,262L58,236L90,228L83,212L98,200L101,163L152,171L182,141L185,124L221,94L219,73L305,48L352,55L347,32L370,26L365,12L403,10L425,31L454,39L454,97L391,127L383,169L453,163L469,196L510,203L491,233L569,253L617,243L619,258L563,281Z"};

// This page depicts reported effects of ONE 2025 earthquake. Labels are not a live ShakeMap.
const CROSS_BORDER = {
 Thailand:{en:'Thailand',mm:'ထိုင်းနိုင်ငံ',level:'damage',source:'https://www.adrc.asia/view_disaster_en.php?Key=2743',stats:{first:'96',second:'1,389',third:'38'},labels:{en:['Deaths, Thailand-wide','Damaged houses, Thailand-wide','Injuries, Thailand-wide'],mm:['သေဆုံးမှု (ထိုင်းတစ်နိုင်ငံလုံး)','ထိခိုက်ပျက်စီးသည့်အိမ်များ','ဒဏ်ရာရမှု (တစ်နိုင်ငံလုံး)']},desc:{en:'Shaking reached Bangkok, where a high-rise under construction collapsed. Thailand’s DDPM reported 96 deaths, 38 injuries and 1,389 damaged houses nationwide as of 12 May 2025. These are Thailand-wide figures, not Bangkok city totals.',mm:'ငလျင်လှုပ်ခတ်မှုကို ဘန်ကောက်မြို့တွင် ခံစားခဲ့ရပြီး တည်ဆောက်နေဆဲ အထပ်မြင့်အဆောက်အအုံတစ်ခု ပြိုကျခဲ့သည်။ ၂၀၂၅ မေလ ၁၂ ရက် DDPM စာရင်းအရ ထိုင်းတစ်နိုင်ငံလုံးတွင် သေဆုံးသူ ၉၆ ဦး၊ ဒဏ်ရာရသူ ၃၈ ဦးနှင့် ပျက်စီးသည့်အိမ် ၁,၃၈၉ လုံးရှိသည်။ ဘန်ကောက်မြို့တစ်ခုတည်း၏ စာရင်းမဟုတ်ပါ။'},note:{en:'Thailand DDPM figures reported via ADRC, dated 12 May 2025; nationwide totals.',mm:'ADRC မှ ဖော်ပြထားသော ၂၀၂၅ မေလ ၁၂ ရက် DDPM ၏ တစ်နိုင်ငံလုံးဆိုင်ရာစာရင်း။'}},
 China:{en:'China (Yunnan)',mm:'တရုတ်နိုင်ငံ (ယူနန်)',level:'damage',source:'https://www.gdacs.org/report.aspx?eventid=1474477&eventtype=EQ',stats:{first:'2,840',second:'847',third:'Ruili'},labels:{en:['People affected in Ruili','Damaged houses in Ruili','Reported city'],mm:['ရွှေလီမြို့ ထိခိုက်သူများ','ရွှေလီမြို့ ပျက်စီးသည့်အိမ်များ','သတင်းပို့ထားသောမြို့']},desc:{en:'Earthquake shaking was felt in southwestern Yunnan. A European Commission/ECHO update reported 2,840 people affected and 847 damaged houses in Ruili, near the Myanmar border. These are Ruili figures, not China-wide totals.',mm:'ယူနန်ပြည်နယ် အနောက်တောင်ပိုင်းတွင် ငလျင်လှုပ်ခတ်မှု ခံစားခဲ့ရသည်။ ဥရောပကော်မရှင် ECHO အစီရင်ခံစာတွင် မြန်မာနယ်စပ်အနီး ရွှေလီမြို့၌ ထိခိုက်သူ ၂,၈၄၀ ဦးနှင့် ပျက်စီးသည့်အိမ် ၈၄၇ လုံး ဖော်ပြထားသည်။ တရုတ်တစ်နိုင်ငံလုံး၏ စာရင်းမဟုတ်ပါ။'},note:{en:'ECHO/GDACS update of 5 April 2025; Ruili city only.',mm:'၂၀၂၅ ဧပြီလ ၅ ရက် ECHO/GDACS အချက်အလက်၊ ရွှေလီမြို့အတွက်သာ။'}},
 Bangladesh:{en:'Bangladesh',mm:'ဘင်္ဂလားဒေ့ရှ်',level:'felt',source:'https://myanmar.un.org/sites/default/files/2025-03/UNFPA%20Myanmar%20Earthquake%20Flash%20Update%201.pdf',desc:{en:'Tremors were reported in Bangladesh, including building evacuations. No comparable nationwide casualty or housing damage totals are established by the sources used on this map.',mm:'ဘင်္ဂလားဒေ့ရှ်တွင် ငလျင်လှုပ်ခတ်မှု ခံစားခဲ့ရပြီး အဆောက်အအုံများမှ ထွက်ခွာမှုများ ဖြစ်ပေါ်ခဲ့သည်။ ဤမြေပုံတွင် အသုံးပြုထားသော ရင်းမြစ်များအရ နိုင်ငံတစ်ဝန်း သေဆုံးမှု သို့မဟုတ် အိမ်ပျက်စီးမှုစာရင်း မရှိပါ။'}},
 India:{en:'India',mm:'အိန္ဒိယ',level:'felt',source:'https://www.earthquakes.bgs.ac.uk/earthquakes/recent_events/20250328063200.html',desc:{en:'Shaking was felt in parts of northeastern India. The sources used here do not establish an earthquake-related nationwide damage or fatality total for India.',mm:'အိန္ဒိယနိုင်ငံ အရှေ့မြောက်ပိုင်းနေရာအချို့တွင် ငလျင်လှုပ်ခတ်မှု ခံစားခဲ့ရသည်။ ဤရင်းမြစ်များမှ နိုင်ငံလုံးဆိုင်ရာ ပျက်စီးမှု၊ သေဆုံးမှုစာရင်းကို အတည်မပြုနိုင်ပါ။'}},
 Laos:{en:'Laos',mm:'လာအို',level:'felt',source:'https://myanmar.un.org/sites/default/files/2025-03/UNFPA%20Myanmar%20Earthquake%20Flash%20Update%201.pdf',desc:{en:'Tremors were felt in Laos. No verified nationwide death or damaged-house count is included in the sources used here.',mm:'လာအိုနိုင်ငံတွင် ငလျင်လှုပ်ခတ်မှု ခံစားခဲ့ရသည်။ ဤရင်းမြစ်များတွင် နိုင်ငံတစ်ဝန်း သေဆုံးမှု သို့မဟုတ် အိမ်ပျက်စီးမှု အတည်ပြုစာရင်း မပါရှိပါ။'}},
 Vietnam:{en:'Vietnam',mm:'ဗီယက်နမ်',level:'felt',source:'https://myanmar.un.org/sites/default/files/2025-03/UNFPA%20Myanmar%20Earthquake%20Flash%20Update%201.pdf',desc:{en:'Shaking was reported in Vietnam and prompted evacuations in some buildings. The sources used do not establish comparable countrywide structural damage totals.',mm:'ဗီယက်နမ်တွင် ငလျင်လှုပ်ခတ်မှု ခံစားခဲ့ရပြီး အချို့အဆောက်အအုံများမှ ထွက်ခွာမှုများ ဖြစ်ပေါ်ခဲ့သည်။ နိုင်ငံတစ်ဝန်း အဆောက်အအုံပျက်စီးမှုစာရင်း မရှိပါ။'}},
 Cambodia:{en:'Cambodia',mm:'ကမ္ဘောဒီးယား',level:'context',source:'https://www.usgs.gov/news/featured-story/m77-mandalay-burma-myanmar-earthquake',desc:{en:'Cambodia appears for geographic context. The cited sources do not establish a comparable March 2025 earthquake impact total here.',mm:'ကမ္ဘောဒီးယားနိုင်ငံကို ပထဝီအနေအထားပြရန် ထည့်သွင်းထားသည်။ ဤနေရာအတွက် နှိုင်းယှဉ်နိုင်သည့် ထိခိုက်မှုစာရင်းကို ရင်းမြစ်များမှ မသတ်မှတ်ထားပါ။'}},
 Bhutan:{en:'Bhutan',mm:'ဘူတန်',level:'context',source:'https://www.usgs.gov/news/featured-story/m77-mandalay-burma-myanmar-earthquake',desc:{en:'Bhutan appears as a neighbouring country on the regional map; no verified impact totals are provided here.',mm:'ဘူတန်ကို အနီးဝန်းကျင်နိုင်ငံအဖြစ် ဖော်ပြထားသည်။ ဤမြေပုံတွင် ထိခိုက်မှု အတည်ပြုစာရင်း မထည့်ထားပါ။'}},
 Nepal:{en:'Nepal',mm:'နီပေါ',level:'context',source:'https://www.usgs.gov/news/featured-story/m77-mandalay-burma-myanmar-earthquake',desc:{en:'Nepal appears for geographic context only; no verified 2025 event impact totals are provided here.',mm:'နီပေါကို ပထဝီအနေအထားအတွက်သာ ဖော်ပြထားပြီး ဤဖြစ်ရပ်၏ ထိခိုက်မှုစာရင်းကို မထည့်ထားပါ။'}}
};
const OUTSIDE_MARKERS = [
 {id:'Bangkok',country:'Thailand',lat:13.7563,lon:100.5018,en:'Bangkok',mm:'ဘန်ကောက်',kind:'damage'},
 {id:'Chiang Mai',country:'Thailand',lat:18.7883,lon:98.9853,en:'Chiang Mai',mm:'ချင်းမိုင်',kind:'felt'},
 {id:'Ruili',country:'China',lat:24.0144,lon:97.8522,en:'Ruili',mm:'ရွှေလီ',kind:'damage'},
 {id:'Kunming',country:'China',lat:25.0389,lon:102.7183,en:'Kunming',mm:'ကူမင်း',kind:'felt'},
 {id:'Chattogram',country:'Bangladesh',lat:22.3569,lon:91.7832,en:'Chattogram',mm:'စစ်တကောင်း',kind:'felt'},
 {id:'Imphal',country:'India',lat:24.8170,lon:93.9368,en:'Imphal',mm:'အင်ဖာ',kind:'felt'},
 {id:'Vientiane',country:'Laos',lat:17.9757,lon:102.6331,en:'Vientiane',mm:'ဗီယန်ကျန်း',kind:'felt'},
 {id:'Hanoi',country:'Vietnam',lat:21.0278,lon:105.8342,en:'Hanoi',mm:'ဟနွိုင်း',kind:'felt'}
];
Object.assign(T.en,{
 mapTitle:'2025 Earthquake Impact Map',mapBadge:'Interactive map',mapSubtitle:'Choose an area on the map to view its information.',heroDesc:'See where the 28 March 2025 magnitude 7.7 earthquake was felt, from Mandalay and Sagaing to Bangkok and southwestern China. Select a location to distinguish reported damage from shaking alone.',mapHint:'Drag to pan · Select a region or city for details',legendSelected:'Selected area',legendAffected:'Reported Myanmar impact',legendNeutral:'Neighbouring countries',legendCity:'City marker',boundaryNote:'Geographic overview, not a scientific ShakeMap. Simplified Natural Earth country boundaries and geoBoundaries Myanmar regions. Shaking felt does not imply structural damage.',
 regionInspectorExternal:'COUNTRY REPORT',placeInspector:'PLACE REPORT',cityInspector:'CITY INSPECTOR',cityType:'CITY',cityDamageShare:'LIKELY BUILDINGS DAMAGED',cityLikelyDamaged:'LIKELY DAMAGED BUILDINGS',cityMappedBuildings:'MAPPED BUILDINGS',cityInspectorDescription:'The June 2025 UNU-INWEH assessment estimates building damage for seven cities. City-specific casualty totals are not provided in this source.',citySourceNote:'Building estimates are from the June 2025 UNU-INWEH satellite assessment; city-level casualty figures are not provided.',placeInspectorDescription:'Shaking was reported in {place}. The sources used here do not establish comparable damage or casualty totals for this place. Select {country} to view available country-level information.',bangkokPlaceDescription:'A high-rise under construction collapsed in Bangkok after the earthquake. Available casualty and damaged-house figures are Thailand-wide, not Bangkok city totals.',kunmingPlaceDescription:'Shaking was felt in Kunming. The damage figures available for China refer to Ruili, not Kunming.',reportedStatus:'REPORTED STATUS',placeDamageTotal:'PLACE-SPECIFIC DAMAGE TOTAL',placeCasualtyTotal:'PLACE-SPECIFIC CASUALTIES',boundaryNoteTitle:'MAP & DATA NOTE',boundaryNote:'Geographic context only — not a ShakeMap. Boundaries are simplified; reported shaking does not confirm building damage.',backToMyanmar:'MYANMAR VIEW',regionalView:'REGIONAL VIEW',countryNote:'Countrywide and city-only reports must not be combined.',placeNote:'Place markers show local reports only; country totals are not city totals.',crossOverline:'CROSS-BORDER REPORTS / 04',crossTitle:'THE IMPACT REACHED BEYOND MYANMAR.',crossDesc:'Thailand recorded deaths and structural damage; damage was also reported in Ruili, China. Other nearby countries reported shaking. Choose a location for the source and reporting scope.',crossSource:'OPEN SOURCE',damageDocumented:'DOCUMENTED DAMAGE',shakingReported:'SHAKING REPORTED',geoOnly:'MAP CONTEXT',metricNotReported:'Not verified',mapZoomHelp:'Switch between a regional overview and a closer Myanmar view.'
});
Object.assign(T.mm,{
 mapTitle:'၂၀၂၅ ငလျင် သက်ရောက်မှုမြေပုံ',mapBadge:'အပြန်အလှန် မြင်ကွင်း',mapSubtitle:'မြေပုံပေါ်ရှိ ဒေသကို ရွေးချယ်ပြီး အချက်အလက်ကို ကြည့်ရှုပါ။',heroDesc:'၂၀၂၅ မတ်လ ၂၈ ရက် ပြင်းအား ၇.၇ ငလျင်ကို မန္တလေး၊ စစ်ကိုင်းမှ ဘန်ကောက်နှင့် တရုတ်အနောက်တောင်ပိုင်းအထိ မည်သို့ခံစားခဲ့ရသည်ကို လေ့လာပါ။ တစ်နေရာချင်း နှိပ်၍ ပျက်စီးမှုအတည်ပြုစာရင်းနှင့် လှုပ်ခတ်မှုခံစားခဲ့ရခြင်းကို ခွဲခြားကြည့်ရှုနိုင်ပါသည်။',mapHint:'ဆွဲရွှေ့၍ မြေပုံရွှေ့ပါ · အသေးစိတ်အတွက် ဒေသ သို့မဟုတ် မြို့ကို ရွေးပါ',legendSelected:'ရွေးချယ်ထားသောဒေသ',legendAffected:'မြန်မာထိခိုက်ဒေသ',legendNeutral:'အိမ်နီးချင်းနိုင်ငံများ',legendCity:'မြို့အမှတ်အသား',boundaryNoteTitle:'မြေပုံနှင့် အချက်အလက်',boundaryNote:'ပထဝီအညွှန်းအတွက်သာဖြစ်ပြီး ငလျင်လှုပ်ခတ်မှုပြင်းအားမြေပုံ မဟုတ်ပါ။ နယ်နိမိတ်များကို ရိုးရှင်းအောင် ပြထားပြီး လှုပ်ခတ်မှုခံစားရခြင်းသည် အဆောက်အအုံပျက်စီးကြောင်း အတည်ပြုခြင်း မဟုတ်ပါ။',regionInspectorExternal:'နိုင်ငံဖြတ်ကျော် အစီရင်ခံစာ',placeInspector:'နေရာအလိုက် အစီရင်ခံစာ',cityInspector:'မြို့အလိုက် အသေးစိတ်',cityType:'မြို့',cityDamageShare:'ပျက်စီးနိုင်ခြေရှိသော အဆောက်အအုံ',cityLikelyDamaged:'ပျက်စီးနိုင်ခြေရှိသော အဆောက်အအုံ',cityMappedBuildings:'မြေပုံတွင် ပါဝင်သော အဆောက်အအုံ',cityInspectorDescription:'၂၀၂၅ ဇွန်လ UNU-INWEH လေ့လာမှုတွင် မြို့ခုနစ်မြို့၏ အဆောက်အအုံပျက်စီးမှုကို ခန့်မှန်းထားသည်။ ဤရင်းမြစ်တွင် မြို့အလိုက် သေဆုံးမှုစာရင်း မပါဝင်ပါ။',citySourceNote:'အဆောက်အအုံခန့်မှန်းချက်များသည် ၂၀၂၅ ဇွန်လ UNU-INWEH ဂြိုဟ်တုလေ့လာမှုမှ ဖြစ်သည်။ မြို့အလိုက် သေဆုံးမှုစာရင်း မပါဝင်ပါ။',placeInspectorDescription:'{place} တွင် ငလျင်လှုပ်ခတ်မှုကို ခံစားခဲ့ရသည်။ ဤမြေပုံရှိရင်းမြစ်များတွင် ဤနေရာအတွက် နှိုင်းယှဉ်နိုင်သော ပျက်စီးမှု သို့မဟုတ် သေဆုံးမှုစာရင်း မရှိပါ။ {country} ကို ရွေးချယ်ပြီး ရရှိနိုင်သော နိုင်ငံအလိုက်အချက်အလက်ကို ကြည့်ပါ။',bangkokPlaceDescription:'ငလျင်ကြောင့် ဘန်ကောက်တွင် ဆောက်လုပ်ဆဲ အထပ်မြင့်အဆောက်အအုံတစ်ခု ပြိုကျခဲ့သည်။ ရရှိနိုင်သော သေဆုံးမှုနှင့် အိမ်ပျက်စီးမှုစာရင်းများသည် ထိုင်းနိုင်ငံတစ်ဝန်းအတွက်ဖြစ်ပြီး ဘန်ကောက်မြို့အတွက်သာ မဟုတ်ပါ။',kunmingPlaceDescription:'ကူမင်းတွင် ငလျင်လှုပ်ခတ်မှု ခံစားခဲ့ရသည်။ တရုတ်နိုင်ငံအတွက် ရရှိနိုင်သော ပျက်စီးမှုစာရင်းသည် ကူမင်းမဟုတ်ဘဲ ရွှေလီမြို့အတွက် ဖြစ်သည်။',reportedStatus:'အစီရင်ခံထားသော အခြေအနေ',placeDamageTotal:'နေရာအလိုက် ပျက်စီးမှုစာရင်း',placeCasualtyTotal:'နေရာအလိုက် ထိခိုက်သေဆုံးမှု',backToMyanmar:'မြန်မာမြေပုံ',regionalView:'ဒေသတွင်းမြေပုံ',countryNote:'နိုင်ငံအလိုက်နှင့် မြို့အလိုက်စာရင်းကို မပေါင်းစပ်သင့်ပါ။',placeNote:'နေရာအမှတ်အသားတွင် ဒေသဆိုင်ရာအစီရင်ခံချက်ကိုသာ ပြထားသည်။ နိုင်ငံတစ်ဝန်းစာရင်းသည် မြို့စာရင်းမဟုတ်ပါ။',crossOverline:'နိုင်ငံဖြတ်ကျော်အစီရင်ခံစာ / ၀၄',crossTitle:'မြန်မာပြင်ပသို့လည်း သက်ရောက်ခဲ့သည်။',crossDesc:'ထိုင်းနိုင်ငံတွင် သေဆုံးမှုနှင့် အဆောက်အအုံပျက်စီးမှုရှိပြီး တရုတ်နိုင်ငံ ရွှေလီမြို့တွင်လည်း ပျက်စီးမှုရှိခဲ့သည်။ အခြားအနီးဝန်းကျင်နိုင်ငံများတွင် ငလျင်လှုပ်ခတ်မှုကို ခံစားခဲ့ရသည်။',crossSource:'သတင်းရင်းမြစ်',damageDocumented:'ပျက်စီးမှု အတည်ပြု',shakingReported:'လှုပ်ခတ်မှု ခံစားရ',geoOnly:'ပထဝီအညွှန်း',metricNotReported:'အတည်မပြုနိုင်ပါ',mapZoomHelp:'မြန်မာအနီးကပ်မြေပုံနှင့် ဒေသတွင်းမြေပုံကို ပြောင်းကြည့်နိုင်သည်။'
});
Object.assign(T.en,{statisticsNoteTitle:'ESTIMATE & REPORTING NOTE'});
Object.assign(T.mm,{statisticsNoteTitle:'ခန့်မှန်းချက်နှင့် အစီရင်ခံစာ'});


// Interactive map controls//
(() =>{
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const SVG = 'http://www.w3.org/2000/svg';
  const affectedOrder = ['Mandalay', 'Sagaing', 'Naypyidaw', 'Shan', 'Bago', 'Magway'];
  const orderedRegions = [...affectedOrder, ...Object.keys(STATE_PATHS).filter(r => !affectedOrder.includes(r))];
  const labels ={
    Kachin: [375, 91], Sagaing: [202, 173], Shan: [456, 268], Chin: [114, 228], Rakhine: [130, 343], Magway: [201, 311], Mandalay: [271, 284], Kayah: [367, 344], Kayin: [405, 411], Bago: [297, 369], Mon: [368, 430], Yangon: [300, 420], Ayeyarwady: [205, 419], Tanintharyi: [469, 566]
  };
  const capital ={
    lat: 19.7633, lon: 96.0785
  };
  let selectedRegion = 'Mandalay', selectedCity = 'Mandalay', selectedCityInspector = false, selectedExternal = null, selectedOutsideCity = null, language = 'en', zoom = 1;
  const VIEWS ={
    regional:{
      x: -220, y: -80, w: 1410, h: 860
    }, myanmar:{
      x: -75, y: -45, w: 800, h: 780
    }
  };
  let currentView = 'regional', currentViewport ={
    ...VIEWS.regional
  };
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fmt = n => typeof n === 'number' ? n.toLocaleString('en-US'): n;
  const n =(key) => NAMES[key] ? NAMES[key][language === 'mm' ? 1: 0]: key;
  const t =(key) => T[language][key] || key;
  const pos = (lat, lon) =>({
    x: Math.round((lon - 91.8)*66), y: Math.round((28.6 - lat)*36)
  });
  const create = (tag, attrs ={
  }, text = null) =>{
    const el = document.createElementNS(SVG, tag);
    for (const[k, v]of Object.entries(attrs))el.setAttribute(k, String(v));
    if (text !== null)el.textContent = text;
    return el
  };
  const icon = () =>{
    if (window.lucide)window.lucide.createIcons()
  };
  function locationType(region) {
    if (region === 'Naypyidaw')return t('territory');
    return ['Kachin', 'Chin', 'Shan', 'Kayah', 'Kayin', 'Mon', 'Rakhine'].includes(region) ? t('state'): t('region')
  }
  // When an area is selected, update the highlight and inspector.
  function selectRegion(key, moveToCity = true) {
    if (!orderedRegions.includes(key))return;
    selectedExternal = null;
    selectedOutsideCity = null;
    selectedCityInspector = false;
    selectedRegion = key;
    const inRegion = CITIES.filter(c => c.region === key);
    if (inRegion.length && moveToCity && !inRegion.some(c => c.id === selectedCity))selectedCity = inRegion[0].id;
    updateRegionInspector();
    refreshMap();
    renderOutsideCards();
  }
  function selectCity(id, scrollToMap = false) {
    const city = CITIES.find(c => c.id === id);
    if (!city)return;
    selectedExternal = null;
    selectedOutsideCity = null;
    selectedCity = id;
    selectedCityInspector = true;
    selectedRegion = city.region;
    updateRegionInspector();
    refreshMap();
    renderOutsideCards();
    if (scrollToMap)$('#myanmarView') ?.click();
    if (scrollToMap && window.innerWidth < 750) {
      $('#myanmarMap').scrollIntoView({
        behavior: reduced ? 'auto': 'smooth', block: 'center'
      });
    }
  }
  function tooltip(text, sub, x, y) {
    const el = $('#mapTooltip');
    if (!el)return;
    el.replaceChildren();
    const title = document.createElement('strong');
    title.textContent = text;
    const smaller = document.createElement('small');
    smaller.textContent = sub;
    el.append(title, smaller);
    el.hidden = false;
    el.style.left = Math.max(8, Math.min(innerWidth - 240, x + 13)) + 'px';
    el.style.top = Math.max(8, y - 68) + 'px'
  }
  function hideTooltip() {
    const el = $('#mapTooltip');
    if (el)el.hidden = true
  }
  function selectExternal(country, marker = null) {
    const item = CROSS_BORDER[country];
    if (!item)return;
    selectedExternal = country;
    selectedOutsideCity = marker;
    selectedCityInspector = false;
    refreshMap();
    updateRegionInspector();
    renderOutsideCards();
  }
  
  function renderMap() {
    ['countryShapes', 'stateShapes', 'mapPulse', 'mapCityMarkers', 
    'neighborMarkers', 'mapTopLabels'].forEach(id =>{
      const layer = document.getElementById(id);
      if (layer) layer.replaceChildren();
    });
    const countries = $('#countryShapes');
    Object.entries(COUNTRY_PATHS).forEach(([country, d]) =>{
      const feature = create('path',{
        d, class: 'country-area', 'data-country': country
      });
      if (country !== 'Myanmar') {
        feature.setAttribute('tabindex', '0');
        feature.setAttribute('role', 'button');
        feature.setAttribute('aria-label', country);
        feature.addEventListener('click',() => selectExternal(country));
        feature.addEventListener('keydown', e =>{
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            selectExternal(country)
          }
        });
        feature.addEventListener('pointerenter', e =>{
          const c = CROSS_BORDER[country];
          tooltip(language === 'mm' ? c.mm: c.en, t(c.level === 'damage' ? 'damageDocumented': c.level === 'felt' ? 'shakingReported': 'geoOnly'), e.clientX, e.clientY)
        });
        feature.addEventListener('pointerleave', hideTooltip);
      }
      countries.appendChild(feature);
    });
    const states = $('#stateShapes');
    Object.entries(STATE_PATHS).forEach(([region, d]) =>{
      const shape = create('path',{
        d, class: 'admin-region', 'data-region': region, role: 'button', tabindex: '0', 'aria-label': `${NAMES[region][0]} state or region`
      });
      shape.addEventListener('click',() => selectRegion(region));
      shape.addEventListener('keydown', e =>{
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectRegion(region)
        }
      });
      shape.addEventListener('pointerenter', e => tooltip(n(region), REGIONS[region] ?.affected ? t('impactReport'): t('referenceOnly'), e.clientX, e.clientY));
      shape.addEventListener('pointerleave', hideTooltip);
      states.appendChild(shape);
    });
    const markerG = $('#mapCityMarkers');
    CITIES.forEach((city, i) =>{
      const p = pos(city.lat, city.lon);
      const g = create('g',{
        'data-city': city.id, role: 'button', tabindex: '0', 'aria-label': `${city.en}, ${city.pct}% likely damaged buildings`
      });
      g.appendChild(create('circle',{
        cx: p.x, cy: p.y, r: 10, class: 'marker-halo'
      }));
      g.appendChild(create('circle',{
        cx: p.x, cy: p.y, r: 7, class: 'marker-core'
      }));
      g.appendChild(create('text',{
        x: p.x, y: p.y + .8, class: 'marker-number'
      }, String(i + 1)));
      g.addEventListener('click',() => selectCity(city.id));
      g.addEventListener('keydown', e =>{
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectCity(city.id)
        }
      });
      g.addEventListener('pointerenter', e => tooltip(n(city.id), `${city.pct}% · ${fmt(city.damaged)} likely damaged buildings`, e.clientX, e.clientY));
      g.addEventListener('pointerleave', hideTooltip);
      markerG.appendChild(g);
    });
    const p = pos(capital.lat, capital.lon);
    const np = create('g',{
      class: 'capital-pin', role: 'button', tabindex: '0', 'data-region': 'Naypyidaw', 'aria-label': 'Nay Pyi Taw Union Territory'
    });
    np.appendChild(create('circle',{
      cx: p.x, cy: p.y, r: 7, fill: '#f57a20', stroke: '#fff', 'stroke-width': '2'
    }));
    np.addEventListener('click',() => selectRegion('Naypyidaw'));
    np.addEventListener('keydown', e =>{
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectRegion('Naypyidaw')
      }
    });
    markerG.appendChild(np);
    const ep = pos(22.011, 95.936);
    const pg = $('#mapPulse');
    pg.appendChild(create('circle',{
      cx: ep.x, cy: ep.y, r: 15, class: 'epicenter-static'
    }));
    pg.appendChild(create('circle',{
      cx: ep.x, cy: ep.y, r: 3.3, class: 'epicenter-core'
    }));
    // Country capitals and reported cities stay lightweight: static SVG dots, no perpetual animations.
    const ng = $('#neighborMarkers');
    OUTSIDE_MARKERS.forEach(marker =>{
      const xy = pos(marker.lat, marker.lon);
      const group = create('g',{
        class: 'outside-marker', 'data-outside': marker.id, 'data-country': marker.country, role: 'button', tabindex: '0', 'aria-label': marker.en
      });
      group.appendChild(create('circle',{
        cx: xy.x, cy: xy.y, r: 9, class: 'outside-hit'
      }));
      group.appendChild(create('circle',{
        cx: xy.x, cy: xy.y, r: 4.2, class: 'outside-core ' +(marker.kind === 'damage' ? 'impact': 'felt')
      }));
      group.appendChild(create('text',{
        x: xy.x + 8, y: xy.y - 8, class: 'outside-label'
      }, marker.en));
      group.addEventListener('click',() => selectExternal(marker.country, marker.id));
      group.addEventListener('keydown', e =>{
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectExternal(marker.country, marker.id)
        }
      });
      group.addEventListener('pointerenter', e => tooltip(language === 'mm' ? marker.mm: marker.en, t(CROSS_BORDER[marker.country].level === 'damage' ? 'damageDocumented': 'shakingReported'), e.clientX, e.clientY));
      group.addEventListener('pointerleave', hideTooltip);
      ng.appendChild(group);
    });
    const captions = $('#mapTopLabels');
    const shown = ['Kachin', 'Sagaing', 'Shan', 'Magway', 'Mandalay', 'Bago', 'Rakhine', 'Tanintharyi'];
    shown.forEach(key =>{
      const xy = labels[key];
      captions.appendChild(create('text',{
        x: xy[0], y: xy[1], class: 'map-state-caption', 'data-label': key, 'text-anchor': 'middle'
      }, n(key)))
    });
    const countryLabels = [['INDIA', - 225, 80], ['BANGLADESH', - 180, 250], ['CHINA', 830, 70], ['LAOS', 780, 354], ['THAILAND', 710, 500], ['VIETNAM', 1050, 475], ['CAMBODIA', 1015, 660]];
    countryLabels.forEach(([name, x, y]) => captions.appendChild(create('text',{
      x, y, class: 'country-label', 'data-country-caption': name
    }, name)));
  }
  // Use the selected area to highlight the correct shapes.
  function refreshMap() {
    $$('.admin-region').forEach(path =>{
      const region = path.dataset.region;
      path.classList.toggle('affected', !!REGIONS[region] ?.affected);
      path.classList.toggle('assessed', !!REGIONS[region] ?.coverage);
      path.classList.toggle('selected', !selectedExternal && selectedRegion === region);
      path.setAttribute('aria-pressed', String(!selectedExternal && selectedRegion === region));
    });
    $$('.country-area').forEach(el =>{
      const country = el.dataset.country;
      el.classList.toggle('selected', selectedExternal === country);
      el.classList.toggle('damage-documented', CROSS_BORDER[country] ?.level === 'damage');
      el.setAttribute('aria-pressed', String(selectedExternal === country));
    });
    $$('.marker-core').forEach(el => el.classList.remove('selected'));
    const active = $(`[data-city="${selectedCity}"]`);
    if (active && !selectedExternal)active.querySelector('.marker-core') ?.classList.add('selected');
    $$('.outside-marker').forEach(el =>{
      const active = el.dataset.outside === selectedOutsideCity;
      el.classList.toggle('selected', active);
      const label = el.querySelector('.outside-label');
      if (label) {
        const m = OUTSIDE_MARKERS.find(c => c.id === el.dataset.outside);
        label.textContent = language === 'mm' ? m.mm: m.en;
      }
    });
    $$('.map-state-caption').forEach(el =>{
      const key = el.dataset.label;
      el.textContent = n(key);
      el.classList.toggle('is-selected', !selectedExternal && key === selectedRegion)
    });
  }
  // Changes the selected region information
 // Show published numbers for the selected region or country.
  function updateRegionInspector() {
    if (selectedExternal) {
      const detail = CROSS_BORDER[selectedExternal];
      const marker = selectedOutsideCity ? OUTSIDE_MARKERS.find(x => x.id === selectedOutsideCity) : null;
      const lang = language;
      const status = marker
        ? marker.kind === 'damage' ? 'damageDocumented' : 'shakingReported'
        : detail.level === 'damage' ? 'damageDocumented' : detail.level === 'felt' ? 'shakingReported' : 'geoOnly';
      const hasLocationStats = !!detail.stats && (!marker || marker.id === 'Ruili');
      $('#selectedRegion').textContent = marker
        ? `${marker[lang]} · ${detail[lang]}`
        : detail[lang];
      $('#regionType').textContent = t(status);
      $('#inspectorTagLabel').textContent = t(marker ? 'placeInspector' : 'regionInspectorExternal');
      $('#regionCitiesLabel').textContent = hasLocationStats ? detail.labels[lang][0] : t('reportedStatus');
      $('#regionBuildingsLabel').textContent = hasLocationStats ? detail.labels[lang][1] : t('placeDamageTotal');
      $('#regionDeathsLabel').textContent = hasLocationStats ? detail.labels[lang][2] : t('placeCasualtyTotal');
      $('#regionCities').textContent = hasLocationStats ? detail.stats.first : t(status);
      $('#regionBuildingsValue').textContent = hasLocationStats ? detail.stats.second : '—';
      $('#regionDeaths').textContent = hasLocationStats ? detail.stats.third : '—';
      const placeDescriptions = {
        Bangkok: t('bangkokPlaceDescription'),
        Kunming: t('kunmingPlaceDescription')
      };
      $('#regionDescription').textContent = marker
        ? marker.id === 'Ruili'
          ? detail.desc[lang]
          : placeDescriptions[marker.id] || t('placeInspectorDescription')
              .replace('{place}', marker[lang])
              .replace('{country}', detail[lang])
        : detail.desc[lang];
      $('#regionSourceNote').textContent = marker
        ? marker.id === 'Ruili' ? detail.note?.[lang] || t('placeNote') : t('placeNote')
        : detail.note?.[lang] || t('countryNote');
      $('#inspectorSource').href = detail.source;
      $('#inspectorSource').hidden = false;
      return;
    }
    if (selectedCityInspector) {
      const city = CITIES.find(item => item.id === selectedCity);
      if (city) {
        $('#inspectorTagLabel').textContent = t('cityInspector');
        $('#selectedRegion').textContent = `${city[language]} · ${n(city.region)}`;
        $('#regionType').textContent = t('cityType');
        $('#regionCitiesLabel').textContent = t('cityDamageShare');
        $('#regionBuildingsLabel').textContent = t('cityLikelyDamaged');
        $('#regionDeathsLabel').textContent = t('cityMappedBuildings');
        $('#regionCities').textContent = `${city.pct}%`;
        $('#regionBuildingsValue').textContent = fmt(city.damaged);
        $('#regionDeaths').textContent = fmt(city.total);
        $('#regionDescription').textContent = t('cityInspectorDescription');
        $('#regionSourceNote').textContent = t('citySourceNote');
        $('#inspectorSource').href = 'https://doi.org/10.53328/INR24MSIR002';
        $('#inspectorSource').hidden = false;
        return;
      }
    }
    $('#inspectorTagLabel').textContent = t('inspectorTag');
    $('#regionCitiesLabel').textContent = t('sampledCities');
    $('#regionBuildingsLabel').textContent = t('regionBuildings');
    $('#regionDeathsLabel').textContent = t('preliminaryDeaths');
    $('#regionSourceNote').textContent = t('regionCaution');
    $('#inspectorSource').hidden = true;
    const info = REGIONS[selectedRegion] ||{
      body: UNKNOWN_BODY
    };
    const cities = CITIES.filter(c => c.region === selectedRegion);
    $('#selectedRegion').textContent = n(selectedRegion) +(language === 'en' ? ' ' + locationType(selectedRegion).toUpperCase(): '');
    $('#regionType').textContent = locationType(selectedRegion).toUpperCase();
    $('#regionCities').textContent = cities.length ? cities.length + ' / 7': t('noCoverage');
    $('#regionBuildingsValue').textContent = cities.length ? fmt(cities.reduce((n, c) => n + c.damaged, 0)): '—';
    $('#regionDeaths').textContent = info.deaths || t('notAvailable');
    $('#regionDescription').textContent = info.body[language];
  }
  // Create buttons for the neighbouring-country reports.
  function renderOutsideCards() {
    const host = $('#crossBorderGrid');
    if (!host)return;
    host.replaceChildren();
    const countries = ['Thailand', 'China', 'Bangladesh', 'India', 'Laos', 'Vietnam'];
    for (const country of countries) {
      const item = CROSS_BORDER[country];
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'outside-card';
      button.classList.toggle('active', selectedExternal === country);
      button.setAttribute('aria-pressed', String(selectedExternal === country));
      const title = document.createElement('strong');
      title.textContent = language === 'mm' ? item.mm: item.en;
      const subtitle = document.createElement('span');
      subtitle.textContent = t(item.level === 'damage' ? 'damageDocumented': 'shakingReported');
      const big = document.createElement('b');
      big.textContent = country === 'Thailand' ? '96 / 1,389': country === 'China' ? '2,840 / 847': '—';
      const foot = document.createElement('small');
      foot.textContent = country === 'Thailand' ?(language === 'mm' ? 'သေဆုံးသူ / ပျက်စီးသည့်အိမ် (တစ်နိုင်ငံလုံး)': 'Deaths / damaged houses (nationwide)'): country === 'China' ?(language === 'mm' ? 'ရွှေလီမြို့ ထိခိုက်သူ / ပျက်စီးအိမ်': 'Affected people / damaged houses, Ruili'):(language === 'mm' ? 'အတည်ပြုနိုင်သည့် ပျက်စီးမှုစာရင်းမရှိ': 'No comparable damage total');
      button.append(title, subtitle, big, foot);
      button.addEventListener('click',() =>{
        selectExternal(country);
        if (window.innerWidth < 720)$('#regionInspector').scrollIntoView({
          behavior: reduced ? 'auto': 'smooth', block: 'start'
        })
      });
      host.appendChild(button);
    }
  }
  // Replace the page text when a language is selected.
  function translate(languageCode) {
    language = languageCode === 'mm' ? 'mm': 'en';
    document.documentElement.lang = language === 'mm' ? 'my': 'en';
    document.title = language === 'mm' ? '၂၀၂၅ ငလျင်သက်ရောက်မှု မြေပုံ | QUAKE': 'Earthquake Impact Map | QUAKE';
    $$('[data-t]').forEach(el =>{
      if (T[language][el.dataset.t])el.textContent = T[language][el.dataset.t]
    });
    $$('.lang-option').forEach(el =>{
      const active = el.dataset.lang === language;
      el.classList.toggle('active', active);
      el.setAttribute('aria-checked', String(active))
    });
    $$('.lang-picker').forEach(el => el.classList.remove('is-open'));
    $$('.lang-button').forEach(el => el.setAttribute('aria-expanded', 'false'));
    updateRegionInspector();
    refreshMap();
    renderOutsideCards();
    try {
      localStorage.setItem('quake-history-language', language);
      localStorage.setItem('quake-language', language)
    }catch (e) {
    }
  }
  function initializeLanguages() {
    const picker = $('.lang-picker'), button = $('.lang-button');
    button ?.addEventListener('click', e =>{
      e.stopPropagation();
      const next = !picker.classList.contains('is-open');
      picker.classList.toggle('is-open', next);
      button.setAttribute('aria-expanded', String(next))
    });
    $$('.lang-option').forEach(el => el.addEventListener('click',() => translate(el.dataset.lang)));
    document.addEventListener('click', e =>{
      if (picker && !picker.contains(e.target)) {
        picker.classList.remove('is-open');
        button ?.setAttribute('aria-expanded', 'false')
      }
    });
    document.addEventListener('keydown', e =>{
      if (e.key === 'Escape') {
        picker ?.classList.remove('is-open');
        button ?.setAttribute('aria-expanded', 'false');
        hideTooltip()
      }
    });
    try {
      language = localStorage.getItem('quake-language') || localStorage.getItem('quake-history-language') || 'en'
    }catch (e) {
    };
  }
  // Map drag, zoom, and view buttons
 // Handle the two map views, zoom buttons, and dragging.
  function initializeZoom() {
    const map = $('#myanmarMap');
    const apply =() =>{
      const v = currentViewport;
      map.setAttribute('viewBox', `${v.x} ${v.y} ${v.w} ${v.h}`);
      map.dataset.view = currentView;
      $('#regionalView').classList.toggle('active', currentView === 'regional');
      $('#myanmarView').classList.toggle('active', currentView === 'myanmar')
    };
    const preset =(which) =>{
      currentView = which;
      currentViewport ={
        ...VIEWS[which]
      };
      apply()
    };
    const zoomStep =(factor) =>{
      const old = currentViewport;
      const nextW = Math.max(425, Math.min(1900, old.w*factor));
      const nextH = old.h*(nextW/old.w);
      currentViewport ={
        x: old.x +(old.w - nextW)/2, y: old.y +(old.h - nextH)/2, w: nextW, h: nextH
      };
      currentView = 'custom';
      apply()
    };
    let pointerStart = null;
    let isDragging = false;
    let suppressClick = false;
    const clampView =() =>{
      const view = currentViewport, region = VIEWS.regional;
      const marginX = region.w*.15, marginY = region.h*.15;
      view.x = Math.max(region.x - marginX, Math.min(region.x + region.w - view.w + marginX, view.x));
      view.y = Math.max(region.y - marginY, Math.min(region.y + region.h - view.h + marginY, view.y));
    };
    map.addEventListener('pointerdown', event =>{
      if (pointerStart || event.button !== 0)return;
      suppressClick = false;
      pointerStart ={
        id: event.pointerId, x: event.clientX, y: event.clientY, lastX: event.clientX, lastY: event.clientY
      };
      isDragging = false;
      map.setPointerCapture(event.pointerId);
    });
    map.addEventListener('pointermove', event =>{
      if (!pointerStart || event.pointerId !== pointerStart.id)return;
      const dx = event.clientX - pointerStart.lastX, dy = event.clientY - pointerStart.lastY;
      if (!isDragging && Math.hypot(event.clientX - pointerStart.x, event.clientY - pointerStart.y) > 5) {
        isDragging = true;
        map.classList.add('is-panning');
        currentView = 'custom';
        map.style.transition = 'none';
      }
      if (!isDragging)return;
      const matrix = map.getScreenCTM();
      if (!matrix)return;
      currentViewport.x -= dx/Math.hypot(matrix.a, matrix.b);
      currentViewport.y -= dy/Math.hypot(matrix.c, matrix.d);
      clampView();
      pointerStart.lastX = event.clientX;
      pointerStart.lastY = event.clientY;
      apply();
    });
    const endPan = event =>{
      if (!pointerStart || event.pointerId !== pointerStart.id)return;
      if (isDragging) {
        map.classList.remove('is-panning');
        map.style.transition = '';
        suppressClick = event.type === 'pointerup';
      }
      if (map.hasPointerCapture(event.pointerId))map.releasePointerCapture(event.pointerId);
      pointerStart = null;
      isDragging = false;
    };
    map.addEventListener('pointerup', endPan);
    map.addEventListener('pointercancel', endPan);
    map.addEventListener('click', event =>{
      if (!suppressClick)return;
      suppressClick = false;
      event.preventDefault();
      event.stopImmediatePropagation();
    }, true);
    $('#zoomIn').addEventListener('click',() => zoomStep(.80));
    $('#zoomOut').addEventListener('click',() => zoomStep(1.25));
    $('#zoomReset').addEventListener('click',() => preset('regional'));
    $('#regionalView').addEventListener('click',() => preset('regional'));
    $('#myanmarView').addEventListener('click',() => preset('myanmar'));
    if (window.innerWidth < 690) preset('myanmar');
    else apply();
  }

  function initRegionPager() {
    const cycle = delta =>{
      let i = orderedRegions.indexOf(selectedRegion);
      selectRegion(orderedRegions[(i + delta + orderedRegions.length)%orderedRegions.length])
    };
    $('#prevRegion').addEventListener('click',() => cycle(-1));
    $('#nextRegion').addEventListener('click',() => cycle(1));
  }
  function initLogoFallback() {
    $$('.brand-logo,.footer-brand-logo').forEach(image =>{
      const fallback = image.parentElement.querySelector('.brand-fallback');
      function missing() {
        image.classList.add('is-missing');
        fallback ?.classList.add('is-visible')
      }
      image.addEventListener('error', missing);
      if (image.complete && !image.naturalWidth)missing()
    });
  }
  function initNavbar() {
    const btn = $('.navbar-toggler'), collapse = $('#mainNavbar');
    btn ?.addEventListener('click',() =>{
      if (window.bootstrap)return;
      let open = collapse.classList.toggle('show');
      btn.setAttribute('aria-expanded', String(open))
    });
    $$('#mainNavbar a').forEach(link => link.addEventListener('click',() =>{
      if (collapse.classList.contains('show')) {
        if (window.bootstrap)window.bootstrap.Collapse.getOrCreateInstance(collapse).hide();
        else collapse.classList.remove('show')
      }
    }));
  }
  document.addEventListener('DOMContentLoaded',() =>{
    initializeLanguages();
    renderMap();
    updateRegionInspector();
    refreshMap();
    renderOutsideCards();
    initializeZoom();
    initRegionPager();
    initLogoFallback();
    initNavbar();
    translate(language);
    icon();
  });
})();
