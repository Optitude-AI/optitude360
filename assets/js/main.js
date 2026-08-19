/* Optitude360 — minimal interaction layer (no framework, no jQuery). */
(function () {
  'use strict';

  /* Mobile navigation toggle */
  var toggle = document.querySelector('[data-nav-toggle]');
  var nav = document.querySelector('[data-nav]');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.getAttribute('aria-expanded') === 'true';
      nav.setAttribute('aria-expanded', String(!open));
      document.body.classList.toggle('nav-open', !open);
      toggle.setAttribute('aria-expanded', String(!open));
      toggle.textContent = !open ? 'Close' : 'Menu';
    });
  }

  /* Consent banner (UK GDPR/PECR) — gated by localStorage; no auto-tracking. */
  var banner = document.getElementById('consent-banner');
  var accept = document.getElementById('consent-accept');
  var decline = document.getElementById('consent-decline');
  if (banner) {
    if (!localStorage.getItem('o360-consent')) {
      banner.hidden = false;
    }
    if (accept) {
      accept.addEventListener('click', function () {
        localStorage.setItem('o360-consent', 'granted');
        banner.hidden = true;
        window.dispatchEvent(new CustomEvent('o360:consent', { detail: { granted: true } }));
      });
    }
    if (decline) {
      decline.addEventListener('click', function () {
        localStorage.setItem('o360-consent', 'declined');
        banner.hidden = true;
        window.dispatchEvent(new CustomEvent('o360:consent', { detail: { granted: false } }));
      });
    }
  }

  /* Analytics hook — load GA4 only after consent (placeholder ID, replace in production). */
  window.addEventListener('o360:consent', function (e) {
    if (!e.detail.granted) { return; }
    var gaId = window.O360_GA4_ID;
    if (!gaId) { return; }
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + gaId;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', gaId, { anonymize_ip: true });
  });
})();
