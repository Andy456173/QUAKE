/* QUAKE / shared shell and lightweight homepage-only */
'use strict';
(() => {
  const copy = {
    en: {home:'Home',about:'About Us',history:'Earthquake History',preparedness:'Preparedness',more:'More',faq:'FAQ',references:'References',privacy:'Privacy & Policy',terms:'Terms of Service',news:'Earthquake News',contact:'Contact Us',map:'Earthquake Impact Map',quick:'Quick links',help:'Help & Privacy',motto:'Learn · Prepare · Take Action'},
    mm: {home:'ပင်မစာမျက်နှာ',about:'ကျွန်ုပ်တို့အကြောင်း',history:'ငလျင်သမိုင်း',preparedness:'ကြိုတင်ပြင်ဆင်မှု',more:'နောက်ထပ်',faq:'မေးလေ့ရှိသော မေးခွန်းများ',references:'ကိုးကားချက်များ',privacy:'ကိုယ်ရေးလုံခြုံမှု မူဝါဒ',terms:'အသုံးပြုမှု စည်းကမ်းချက်များ',news:'ငလျင်သတင်းများ',contact:'ဆက်သွယ်ရန်',map:'ငလျင်သက်ရောက်မှုမြေပုံ',quick:'အမြန်လင့်ခ်များ',help:'အကူအညီနှင့် ကိုယ်ရေးလုံခြုံမှု',motto:'လေ့လာပါ · ပြင်ဆင်ပါ · လုပ်ဆောင်ပါ'}
  };
  document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('quakeHeader');
    if (!header) return;
    const picker = header.querySelector('.lang-picker');
    const button = header.querySelector('.lang-button');
    const options = [...header.querySelectorAll('.lang-option')];
    const path = document.body.dataset.page || location.pathname.split('/').pop() || 'index.html';
    const navShell = header.querySelector('.quake-nav-shell');
    const menuButton = header.querySelector('.navbar-toggler');
    const pickerHome = picker?.parentElement;
    const pickerAnchor = picker?.nextSibling;
    const mobileNav = window.matchMedia('(max-width: 991.98px)');

    const placeLanguagePicker = () => {
      if (!picker || !navShell || !pickerHome) return;
      if (mobileNav.matches) {
        navShell.insertBefore(picker, menuButton);
      } else if (picker.parentElement !== pickerHome) {
        pickerHome.insertBefore(picker, pickerAnchor);
      }
    };
    placeLanguagePicker();
    mobileNav.addEventListener('change', placeLanguagePicker);

    // Map and homepage own their language-menu interactions; all other pages share this compact handler.
    if (picker && button && !['earthquake-map.html','index.html'].includes(path)) {
      button.addEventListener('click', event => {
        event.stopPropagation();
        const open = !picker.classList.contains('is-open');
        picker.classList.toggle('is-open', open);
        button.setAttribute('aria-expanded', String(open));
      });
      document.addEventListener('click', event => {
        if (!picker.contains(event.target)) {
          picker.classList.remove('is-open');
          button.setAttribute('aria-expanded', 'false');
        }
      });
      document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && picker.classList.contains('is-open')) {
          picker.classList.remove('is-open');
          button.setAttribute('aria-expanded', 'false');
          button.focus();
        }
      });
    }
    // Repeat the headline enough times to fill wide screens, then duplicate the
    // sequence so the ticker can loop without a blank gap.
    const ticker = header.querySelector('.news-ticker');
    const tickerTrack = header.querySelector('.news-ticker-track');
    const fillTicker = () => {
      if (!ticker || !tickerTrack || !tickerTrack.firstElementChild) return;
      const original = tickerTrack.firstElementChild;
      tickerTrack.replaceChildren(original);
      const headlineWidth = original.getBoundingClientRect().width;
      const repetitions = headlineWidth > 0
        ? Math.max(2, Math.ceil(ticker.clientWidth / headlineWidth) + 1)
        : 4;
      for (let i = 1; i < repetitions * 2; i++) {
        const copy = original.cloneNode(true);
        copy.setAttribute('aria-hidden', 'true');
        tickerTrack.appendChild(copy);
      }
    };
    window.addEventListener('resize', fillTicker);

    const updateShellLanguage = lang => {
      const currentLanguage = lang === 'mm' || lang === 'my' ? 'mm' : 'en';
      const d = copy[currentLanguage];
      document.querySelectorAll('[data-shell-key]').forEach(el => {
        const text = d[el.dataset.shellKey];
        if (text !== undefined) el.textContent = text;
      });
      header.querySelectorAll('.news-ticker-track > span').forEach(span => {
        const date = span.querySelector('strong');
        if (!date) return;
        date.textContent = currentLanguage === 'mm' ? '၂၀၂၅ မတ် ၂၈' : '28 MAR 2025';
        date.nextSibling.textContent = currentLanguage === 'mm'
          ? ' မန္တလေးနှင့် စစ်ကိုင်းအနီး မြန်မာနိုင်ငံအလယ်ပိုင်း၌ ပြင်းအား ၇.၇ ရှိသော ငလျင်တစ်ခု လှုပ်ခတ်ခဲ့သည်။'
          : ' A magnitude 7.7 earthquake struck central Myanmar near Mandalay and Sagaing.';
      });
      fillTicker();
      const footerDescription = document.querySelector('.site-footer .footer-columns p');
      if (footerDescription) {
        footerDescription.textContent = currentLanguage === 'mm'
          ? 'QUAKE သည် မြန်မာနိုင်ငံရှိ ငလျင်သမိုင်းနှင့် ဘေးအန္တရာယ်လျှော့ချရေးအကြောင်း ကျောင်းသားများ ဦးဆောင်ဖန်တီးထားသော ပညာပေးဝက်ဘ်ဆိုက်ဖြစ်သည်။'
          : 'QUAKE is a student-led educational website about historical earthquakes and disaster risk reduction in Myanmar.';
      }
      const copyright = document.querySelector('.site-footer .footer-bottom > span:first-child');
      if (copyright) {
        copyright.textContent = currentLanguage === 'mm'
          ? 'မူပိုင်ခွင့် © ၂၀၂၆ QUAKE။ မူပိုင်ခွင့်အားလုံး ရယူထားသည်။ QUAKE ဖန်တီးရေးအဖွဲ့က ကျောင်းသား ICT PBL ပရောဂျက်အဖြစ် ဖန်တီးထားသည်။'
          : 'Copyright © 2026 QUAKE. All rights reserved. Student educational website developed by the QUAKE Development Team.';
      }
      if (button) {
        button.setAttribute('aria-label', currentLanguage === 'mm' ? 'ဘာသာစကား ပြောင်းရန်: မြန်မာ' : 'Change language: English');
      }
      options.forEach(opt => {
        const active = opt.dataset.lang === currentLanguage;
        opt.classList.toggle('active',active);
        opt.setAttribute('aria-checked',String(active));
      });
    };
    // Page translation handler runs on the option first; this document listener keeps common shell in sync.
    document.addEventListener('click', e => {
      const option = e.target.closest('#quakeHeader .lang-option');
      if (!option) return;
      updateShellLanguage(option.dataset.lang);
      try {
        localStorage.setItem('quake-language', option.dataset.lang === 'mm' ? 'mm' : 'en');
      } catch (error) {
        // Language switching remains available when browser storage is disabled.
      }
      if (!['earthquake-map.html','index.html'].includes(path)) {
        picker.classList.remove('is-open');
        button.setAttribute('aria-expanded','false');
      }
    });
    let initialLanguage = ['mm','my'].includes(document.documentElement.lang) ? 'mm' : 'en';
    try {
      initialLanguage = localStorage.getItem('quake-language') || initialLanguage;
    } catch (error) {
      // The current page language remains available when browser storage is disabled.
    }
    updateShellLanguage(initialLanguage);

    // Mobile: close nav when a link is selected; avoid double toggling Bootstrap.
    const collapse = header.querySelector('#mainNavbar');
    if (collapse && menuButton) {
      if (!window.bootstrap && !['earthquake-map.html','earthquake-history.html'].includes(path)) {
        menuButton.addEventListener('click', () => {
          const open = collapse.classList.toggle('show');
          menuButton.setAttribute('aria-expanded',String(open));
        });
      }
      collapse.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
        if (!collapse.classList.contains('show')) return;
        if (window.bootstrap) window.bootstrap.Collapse.getOrCreateInstance(collapse).hide();
        else {collapse.classList.remove('show');menuButton.setAttribute('aria-expanded','false')}
      }));
    }

    // Bootstrap normally handles dropdowns.
    if (!window.bootstrap) {
      const more = header.querySelector('#moreMenu');
      const moreList = more?.nextElementSibling;
      if (more && moreList) {
        more.addEventListener('click', event => {
          event.preventDefault();
          const opening = !moreList.classList.contains('show');
          moreList.classList.toggle('show', opening);
          more.setAttribute('aria-expanded',String(opening));
        });
        document.addEventListener('click', event => {
          if (event.target.closest('#moreMenu') || event.target.closest('#quakeHeader .dropdown-menu')) return;
          moreList.classList.remove('show');
          more.setAttribute('aria-expanded','false');
        });
        document.addEventListener('keydown', event => {
          if (event.key === 'Escape' && moreList.classList.contains('show')) {
            moreList.classList.remove('show');
            more.setAttribute('aria-expanded','false');
            more.focus();
          }
        });
      }
    }

    // Keep decorative snowfall contained within the homepage notice.
    const notice = document.getElementById('developmentNotice');
    const snow = document.getElementById('noticeSnow');
    const close = document.getElementById('closeDevelopmentNotice');
    if (notice && snow && close) {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!reduced) {
        const fragment = document.createDocumentFragment();
        const path = 'M12 2v20M3.34 7l17.32 10M3.34 17 20.66 7M9.4 4.6 12 7.1l2.6-2.5M9.4 19.4 12 16.9l2.6 2.5';
        for (let n = 0; n < 19; n++) {
          const flake = document.createElement('span');
          flake.className = 'notice-snowflake';
          flake.setAttribute('aria-hidden','true');
          const fraction = (n * 0.61803398875) % 1;
          flake.style.setProperty('--sx',`${(fraction*98).toFixed(1)}%`);
          flake.style.setProperty('--sz',`${(8 + (n * 7 % 9))}px`);
          flake.style.setProperty('--drift',`${(n % 2 ? 1 : -1) * (8 + n % 22)}px`);
          flake.style.setProperty('--dur',`${(3.1 + n % 6 * .32).toFixed(2)}s`);
          flake.style.setProperty('--delay',`${(-n * .47).toFixed(2)}s`);
          flake.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="${path}"/></svg>`;
          fragment.appendChild(flake);
        }
        snow.appendChild(fragment);
      }
      const dismissBanner = () => {
        if (!notice.isConnected || notice.classList.contains('is-dismissing')) return;
        notice.classList.add('is-dismissing');
        close.disabled = true;
        window.setTimeout(() => notice.remove(), reduced ? 0 : 300);
      };
      close.addEventListener('click', dismissBanner);
    }
  });
})();
