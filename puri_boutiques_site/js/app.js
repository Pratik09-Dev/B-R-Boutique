/**
 * Main Application Controller
 */
'use strict';

(function () {
  const { I18N, CATEGORIES, PRODUCTS, WEAVE_GUIDE } = window.AppData;
  const { escapeHtml, isValidName, isOwnerPhone, isValidPhone, isValidOptionalEmail, sanitizePhoneInput } = window.AppSecurity;

const state = {
      lang: 'en',
      activeCategory: 'all',
      searchQuery: '',
      activeGuide: 'sambalpuri',
      tray: [],
      messages: []
    };

    const VALID_PRODUCT_IDS = new Set(PRODUCTS.map(p => p.id));
    const ALLOWED_SHOPS = new Set(['Boyana Shilpa', 'Radha Gopinath Bastralaya', 'Either / Both Stores']);

    try {
      const savedLang = localStorage.getItem('bs_rg_lang');
      const savedTray = localStorage.getItem('bs_rg_tray_v3');
      const savedMsgs = localStorage.getItem('bs_rg_messages_v3');
      if (savedLang && Object.prototype.hasOwnProperty.call(I18N, savedLang)) {
        state.lang = savedLang;
      }
      if (savedTray) {
        const parsedTray = JSON.parse(savedTray);
        if (Array.isArray(parsedTray)) {
          state.tray = parsedTray
            .filter(id => typeof id === 'string' && VALID_PRODUCT_IDS.has(id))
            .slice(0, PRODUCTS.length);
        }
      }
      if (savedMsgs) {
        const parsedMsgs = JSON.parse(savedMsgs);
        if (Array.isArray(parsedMsgs)) {
          state.messages = parsedMsgs
            .filter(m => m && typeof m === 'object')
            .slice(0, 10)
            .map(m => ({
              shop: String(m.shop || '').slice(0, 60),
              name: String(m.name || '').slice(0, 60),
              message: String(m.message || '').slice(0, 1000),
              time: String(m.time || '').slice(0, 20)
            }));
        }
      }
    } catch (e) {}

    function persistState() {
      try {
        localStorage.setItem('bs_rg_lang', state.lang);
        localStorage.setItem('bs_rg_tray_v3', JSON.stringify(state.tray));
        localStorage.setItem('bs_rg_messages_v3', JSON.stringify(state.messages));
      } catch (e) {}
    }

    function t(key) {
      return (I18N[state.lang] && I18N[state.lang][key]) || I18N.en[key] || key;
    }

    function showToast(msg) {
      const toast = document.getElementById('toast');
      toast.textContent = msg;
      toast.classList.remove('hidden');
      clearTimeout(window._toastTimer);
      window._toastTimer = setTimeout(() => toast.classList.add('hidden'), 2600);
    }

    function applyTranslations() {
      document.documentElement.lang = state.lang === 'or' ? 'or' : state.lang === 'hi' ? 'hi' : 'en';
      document.querySelectorAll('[data-i18n]').forEach(el => {
        el.textContent = t(el.dataset.i18n);
      });
      document.getElementById('searchInput').placeholder = t('searchPlaceholder');
      document.getElementById('visitorName').placeholder = t('namePh');
      document.getElementById('visitorContact').placeholder = t('phonePh');
      const emailEl = document.getElementById('visitorEmail');
      if (emailEl) emailEl.placeholder = t('emailPh');
      document.getElementById('visitorMessage').placeholder = t('msgPh');
      const topicSelect = document.getElementById('inquiryTopic');
      const prevIdx = topicSelect.selectedIndex >= 0 ? topicSelect.selectedIndex : 0;
      topicSelect.innerHTML = t('topics').map(opt => `<option value="${escapeHtml(opt)}">${escapeHtml(opt)}</option>`).join('');
      if (prevIdx < topicSelect.options.length) topicSelect.selectedIndex = prevIdx;
      document.querySelectorAll('.lang-btn').forEach(btn => {
        const active = btn.dataset.lang === state.lang;
        btn.className = `lang-btn px-2 sm:px-2.5 py-1 rounded-full cursor-pointer transition-colors ${active ? 'bg-indigoDeep text-tussar' : 'text-indigoDeep hover:text-kumkum'}`;
      });
    }

    function renderCategoryButtons() {
      document.getElementById('categoryFilters').innerHTML = CATEGORIES.map(c => {
        const active = c.id === state.activeCategory;
        return `<button type="button" data-cat="${escapeHtml(c.id)}" class="cat-btn px-4 py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer ${active ? 'bg-indigoDeep text-tussar' : 'bg-sand text-indigoDeep hover:bg-indigoDeep/10'}">${escapeHtml(c[state.lang])}</button>`;
      }).join('');
    }

    function toggleTrayItem(id) {
      const idx = state.tray.indexOf(id);
      if (idx === -1) {
        state.tray.push(id);
        showToast(state.lang === 'hi' ? 'सूची में जोड़ा गया' : state.lang === 'or' ? 'ତାଲିକାରେ ଯୋଡ଼ାଗଲା' : 'Added to Inquiry Tray');
      } else {
        state.tray.splice(idx, 1);
        showToast(state.lang === 'hi' ? 'सूची से हटाया गया' : state.lang === 'or' ? 'ତାଲିକାରୁ ହଟାଗଲା' : 'Removed from Inquiry Tray');
      }
      persistState();
      renderAll();
    }

    // Extra cross-language & plural search synonyms per product ID
    const PRODUCT_SEARCH_ALIASES = {
      'sambalpuri-saree': 'saree sarees sari saris sadhi sambalpuri handloom print printed pure cotton pasapalli shankha chakra ଶାଢ଼ୀ ସମ୍ବଲପୁରୀ साड़ी साड़ियाँ संबलपुरी',
      'katki-saree': 'saree sarees sari saris sadhi katki cuttacki nuapatna maniabandha handloom print printed pure cotton ଶାଢ଼ୀ କଟକୀ साड़ी साड़ियाँ कटकी',
      'fancy-saree': 'saree sarees sari saris sadhi fancy partywear zari embroidery festive ଶାଢ଼ୀ ଫ୍ୟାନ୍ସି साड़ी साड़ियाँ फैंसी',
      'ikat-saree': 'saree sarees sari saris sadhi ikat bandha pure cotton handloom print ଶାଢ଼ୀ ଇକତ୍ साड़ी साड़ियाँ इकत',
      'ladies-kurti': 'kurti kurtis kurta ladies women tunic top dress sambalpuri katki fancy pure cotton କୁର୍ଟି ମହିଳା कुर्ती कुर्तियाँ',
      'mens-half-shirt': 'shirt shirts half shirt mens men kurta cotton sambalpuri katki handloom print ସାର୍ଟ ପୁରୁଷ शर्ट हाफ शर्ट',
      'cloth-sheet': 'cloth sheet sheets dress material unstitched fabric suit salwar piece cotton କପଡ଼ା ଡ୍ରେସ୍ कपड़ा सूट',
      'home-loom-bundle': 'lungi lungis towel towels gamuchha gamcha shawl shawls bedsheet bedsheets chadar home cotton ଲୁଙ୍ଗି ଗାମୁଛା ଶାଲ୍ ବେଡସିଟ୍ लुंगी तौलिया गमछा शॉल बेडशीट',
      'mens-sports': 'sports t-shirt tshirt tshirts pant pants track pant lower activewear mens gym ସ୍ପୋର୍ଟସ୍ ଟି-ସାର୍ଟ ପ୍ୟାଣ୍ଟ स्पोर्ट्स टी-शर्ट पैंट',
      'inner-items': 'inner innerwear undergarments vest brief lingerie daily essentials ଇନର୍ इनर',
      'many-more': 'more varieties dupatta stole scarf kids festival gift ଓଢ଼ଣୀ दुपट्टा'
    };

    function normalizeToken(word) {
      let w = word.toLowerCase().trim();
      if (w.length > 4 && w.endsWith('ies')) return w.slice(0, -3) + 'y';
      if (w.length > 4 && w.endsWith('es') && !w.endsWith('sarees')) return w.slice(0, -2);
      if (w.length > 3 && w.endsWith('s')) return w.slice(0, -1);
      return w;
    }

    function getProductSearchCorpus(p) {
      const langs = ['en', 'hi', 'or'];
      const parts = [p.id, p.category, PRODUCT_SEARCH_ALIASES[p.id] || ''];
      langs.forEach(l => {
        const d = p[l];
        if (d) {
          parts.push(d.title || '', d.tag || '', d.fabric || '', d.occasion || '', d.price || '');
        }
      });
      return parts.join(' ').toLowerCase();
    }

    function matchesProductQuery(p, rawQuery) {
      const q = String(rawQuery || '').trim().toLowerCase();
      if (!q) return true;
      const corpus = getProductSearchCorpus(p);
      if (corpus.includes(q)) return true;
      const tokens = q.split(/\s+/).filter(Boolean);
      return tokens.every(tok => {
        const stem = normalizeToken(tok);
        return corpus.includes(tok) || (stem.length >= 2 && corpus.includes(stem));
      });
    }

    function renderSearchSuggestions() {
      const box = document.getElementById('searchSuggestions');
      const clearBtn = document.getElementById('clearSearchBtn');
      const raw = state.searchQuery.trim();
      if (clearBtn) {
        clearBtn.classList.toggle('hidden', raw.length === 0);
      }
      if (!box) return;
      if (raw.length === 0) {
        box.classList.add('hidden');
        box.innerHTML = '';
        return;
      }
      const matches = PRODUCTS.filter(p => matchesProductQuery(p, raw)).slice(0, 6);
      if (matches.length === 0) {
        box.innerHTML = `<div class="px-4 py-3 text-xs text-inkMuted">${escapeHtml(t('emptyTitle'))}</div>`;
        box.classList.remove('hidden');
        return;
      }
      box.innerHTML = matches.map(p => {
        const item = p[state.lang];
        const enTitle = state.lang !== 'en' ? `<span class="block text-[10px] text-inkMuted truncate">${escapeHtml(p.en.title)}</span>` : '';
        const thumb = p.noPhoto
          ? `<div class="w-10 h-10 rounded-lg bg-indigoDeep text-brass flex items-center justify-center text-xs font-bold shrink-0">✓</div>`
          : `<img src="${p.image}" alt="${escapeHtml(item.title)}" class="w-10 h-10 rounded-lg object-cover shrink-0 border border-indigoDeep/10" />`;
        return `
          <button type="button" data-suggest-id="${escapeHtml(p.id)}" class="w-full px-3.5 py-2.5 text-left hover:bg-sand/80 flex items-center gap-3 border-b border-indigoDeep/5 last:border-b-0 transition-colors cursor-pointer">
            ${thumb}
            <div class="flex-1 min-w-0">
              <p class="text-xs font-bold text-indigoDeep truncate">${escapeHtml(item.title)}</p>
              ${enTitle}
              ${item.price ? `<p class="text-[10px] font-semibold text-kumkum truncate">${escapeHtml(item.price)}</p>` : ''}
            </div>
            <span class="text-xs text-indigoDeep/50 font-bold">→</span>
          </button>
        `;
      }).join('');
      box.classList.remove('hidden');
    }

    function renderLookbook() {
      const grid = document.getElementById('lookbookGrid');
      const empty = document.getElementById('emptyLookbook');
      const q = state.searchQuery.trim();

      let filtered = PRODUCTS.filter(p => {
        const matchCat = state.activeCategory === 'all' || p.category === state.activeCategory;
        return matchCat && matchesProductQuery(p, q);
      });

      // If user searches a term that exists in another category while a specific category pill is active, auto-switch to 'all'
      if (filtered.length === 0 && q && state.activeCategory !== 'all') {
        const allMatches = PRODUCTS.filter(p => matchesProductQuery(p, q));
        if (allMatches.length > 0) {
          state.activeCategory = 'all';
          renderCategoryButtons();
          filtered = allMatches;
        }
      }

      if (filtered.length === 0) {
        grid.innerHTML = '';
        empty.classList.remove('hidden');
        return;
      }
      empty.classList.add('hidden');

      grid.innerHTML = filtered.map(p => {
        const saved = state.tray.includes(p.id);
        const item = p[state.lang];
        const mediaBlock = p.noPhoto
          ? `<div class="h-56 bg-gradient-to-br from-indigoDeep to-indigoDeep/90 text-tussar p-6 flex flex-col justify-between">
               <span class="self-start px-3 py-1 rounded-full bg-brass text-indigoDeep text-[11px] font-bold uppercase tracking-wider">${escapeHtml(t('inStoreEssential'))}</span>
               <div>
                 <p class="font-serif text-2xl font-bold text-brass">${escapeHtml(item.title)}</p>
                 <p class="text-xs text-tussar/80 mt-1">${escapeHtml(t('traySub'))}</p>
               </div>
             </div>`
          : `<div class="relative overflow-hidden bg-sand">
               <img src="${p.image}" alt="${escapeHtml(item.title)}" class="w-full h-56 object-cover" />
               <span class="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-semibold bg-indigoDeep/90 text-brass border border-brass/40">${escapeHtml(t('bothStoresBadge'))}</span>
               <div class="absolute bottom-3 right-3 flex gap-1.5 bg-tussar/90 px-2 py-1 rounded-full">
                 ${p.palette.map(c => `<span class="w-3 h-3 rounded-full border border-black/10" style="background:${c}"></span>`).join('')}
               </div>
             </div>`;

        return `
          <article data-card-id="${escapeHtml(p.id)}" class="w-[84vw] sm:w-[330px] lg:w-[365px] shrink-0 snap-start bg-tussar rounded-3xl overflow-hidden border-2 border-indigoDeep/10 card-lift flex flex-col justify-between">
            <div>
              ${mediaBlock}
              <div class="sambalpuri-card-border w-full"></div>
              <div class="p-5 space-y-2">
                <p class="text-[11px] uppercase tracking-wider font-semibold text-kumkum">${escapeHtml(item.occasion)}</p>
                <h3 class="font-serif text-xl font-bold text-indigoDeep leading-snug">${escapeHtml(item.title)}</h3>
                ${item.price ? `<p class="inline-block px-3 py-1 rounded-lg bg-sand border border-brass/50 text-xs font-bold text-indigoDeep">${escapeHtml(item.price)}</p>` : ''}
                <p class="text-xs text-inkMuted">${escapeHtml(item.tag)}</p>
              </div>
            </div>
            <div class="px-5 pb-5 pt-2 flex items-center gap-2">
              <button type="button" data-quickview="${escapeHtml(p.id)}" class="flex-1 py-2 rounded-full border border-indigoDeep/20 text-xs font-semibold text-indigoDeep hover:bg-sand transition-colors cursor-pointer">
                ${escapeHtml(t('detailsBtn'))}
              </button>
              <button type="button" data-tray="${escapeHtml(p.id)}" class="flex-1 py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer ${saved ? 'bg-brass text-indigoDeep' : 'bg-indigoDeep text-tussar hover:bg-kumkum'}">
                ${escapeHtml(saved ? t('savedBtn') : t('saveBtn'))}
              </button>
            </div>
          </article>
        `;
      }).join('');
    }

    function renderWeaveGuide() {
      const g = WEAVE_GUIDE[state.activeGuide];
      const info = g[state.lang];
      const sBtn = document.getElementById('guideSambalpuriBtn');
      const kBtn = document.getElementById('guideKatkiBtn');
      sBtn.className = `px-5 py-2.5 rounded-full text-xs font-semibold cursor-pointer transition-colors ${state.activeGuide === 'sambalpuri' ? 'bg-indigoDeep text-tussar' : 'bg-tussar border border-indigoDeep/20 text-indigoDeep'}`;
      kBtn.className = `px-5 py-2.5 rounded-full text-xs font-semibold cursor-pointer transition-colors ${state.activeGuide === 'katki' ? 'bg-kumkum text-tussar' : 'bg-tussar border border-indigoDeep/20 text-indigoDeep'}`;

      document.getElementById('weaveGuideCard').innerHTML = `
        <div class="sm:col-span-5">
          <img src="${g.image}" alt="${info.title}" class="w-full h-56 sm:h-64 object-cover rounded-2xl border border-indigoDeep/10" />
        </div>
        <div class="sm:col-span-7 space-y-3">
          <p class="text-[11px] uppercase tracking-widest font-bold text-kumkum">${info.origin}</p>
          <h3 class="font-serif text-2xl sm:text-3xl font-bold text-indigoDeep">${info.title}</h3>
          <ul class="space-y-2 text-xs sm:text-sm text-inkMuted">
            ${info.points.map(pt => `<li class="flex gap-2"><span class="text-kumkum font-bold">•</span><span>${pt}</span></li>`).join('')}
          </ul>
        </div>
      `;
    }

    function renderTray() {
      document.getElementById('trayCount').textContent = state.tray.length;
      document.getElementById('formTrayCount').textContent = state.tray.length;
      const container = document.getElementById('trayItems');
      if (state.tray.length === 0) {
        container.innerHTML = `<p class="text-sm text-inkMuted py-8 text-center">${t('traySub')}</p>`;
        return;
      }
      container.innerHTML = state.tray.map(id => {
        const p = PRODUCTS.find(x => x.id === id);
        if (!p) return '';
        const item = p[state.lang];
        return `
          <div class="flex items-center gap-3 p-3 rounded-2xl bg-sand/70 border border-indigoDeep/10">
            ${p.noPhoto
              ? `<div class="w-14 h-14 rounded-xl bg-indigoDeep text-brass flex items-center justify-center font-serif font-bold shrink-0">✓</div>`
              : `<img src="${p.image}" alt="${item.title}" class="w-14 h-14 rounded-xl object-cover shrink-0" />`}
            <div class="flex-1 min-w-0">
              <p class="text-[10px] uppercase tracking-wider font-semibold text-kumkum">${t('bothStoresBadge')}</p>
              <p class="text-sm font-semibold text-indigoDeep truncate">${item.title}</p>
            </div>
            <button type="button" data-remove-tray="${p.id}" class="text-xs px-2.5 py-1 rounded-full hover:bg-kumkum hover:text-white text-inkMuted cursor-pointer">✕</button>
          </div>
        `;
      }).join('');
    }

    function renderSentMessages() {
      const box = document.getElementById('sentMessagesBox');
      const list = document.getElementById('sentMessagesList');
      if (state.messages.length === 0) {
        box.classList.add('hidden');
        return;
      }
      box.classList.remove('hidden');
      list.innerHTML = state.messages.slice(0, 3).map(m => `
        <div class="p-3 rounded-xl bg-sand/60 border border-indigoDeep/10">
          <div class="flex justify-between font-semibold text-indigoDeep">
            <span>${escapeHtml(m.shop)}</span>
            <span class="text-inkMuted font-normal">${escapeHtml(m.time)}</span>
          </div>
          <p class="text-inkMuted mt-1 line-clamp-2">${escapeHtml(m.message)}</p>
        </div>
      `).join('');
    }

    function renderAll() {
      applyTranslations();
      renderCategoryButtons();
      renderLookbook();
      renderSearchSuggestions();
      renderWeaveGuide();
      renderTray();
      renderSentMessages();
    }

    function openQuickView(id) {
      const p = PRODUCTS.find(x => x.id === id);
      if (!p) return;
      const item = p[state.lang];
      const saved = state.tray.includes(p.id);
      const headerImg = p.noPhoto
        ? `<div class="relative bg-indigoDeep text-tussar p-8 pr-14">
             <span class="text-xs uppercase tracking-widest text-brass font-bold">${escapeHtml(t('inStoreEssential'))}</span>
             <h3 class="font-serif text-3xl font-bold mt-2">${escapeHtml(item.title)}</h3>
           </div>
           <div class="sambalpuri-card-border w-full"></div>`
        : `<div class="relative">
             <img src="${p.image}" alt="${escapeHtml(item.title)}" class="w-full h-64 object-cover" />
           </div>
           <div class="sambalpuri-card-border w-full"></div>`;

      const modalBody = document.getElementById('detailModalBody');
      modalBody.innerHTML = `
        ${headerImg}
        <div class="p-6 space-y-4">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <span class="text-xs uppercase tracking-wider font-bold text-kumkum">Boyana Shilpa &amp; Radha Gopinath Bastralaya</span>
            <span class="text-xs px-3 py-1 rounded-full bg-sand text-indigoDeep font-medium">${escapeHtml(item.occasion)}</span>
          </div>
          ${p.noPhoto ? '' : `<h3 class="font-serif text-2xl sm:text-3xl font-bold text-indigoDeep">${escapeHtml(item.title)}</h3>`}
          ${item.price ? `<div class="inline-block px-3.5 py-1.5 rounded-xl bg-indigoDeep text-brass text-xs font-bold">${escapeHtml(item.price)}</div>` : ''}
          <p class="text-sm text-inkMuted leading-relaxed">${escapeHtml(item.fabric)}</p>
          <p class="text-xs font-semibold text-indigoDeep/80">${escapeHtml(item.tag)}</p>
          <div class="flex gap-3 pt-2">
            <button id="modalSaveBtn" type="button" class="flex-1 py-3 rounded-full bg-indigoDeep text-tussar text-xs font-semibold hover:bg-kumkum transition-colors cursor-pointer">
              ${escapeHtml(saved ? t('savedBtn') : t('saveBtn'))}
            </button>
            <a href="#contact" id="modalInquireLink" class="flex-1 py-3 rounded-full bg-brass text-indigoDeep text-xs font-bold text-center hover:bg-kumkum hover:text-tussar transition-colors">
              ${escapeHtml(t('navContact'))}
            </a>
          </div>
        </div>
      `;
      modalBody.scrollTop = 0;
      document.getElementById('detailModal').classList.remove('hidden');
      document.getElementById('modalSaveBtn').addEventListener('click', () => {
        toggleTrayItem(p.id);
        document.getElementById('detailModal').classList.add('hidden');
      });
      document.getElementById('modalInquireLink').addEventListener('click', () => {
        if (!state.tray.includes(p.id)) {
          state.tray.push(p.id);
          persistState();
          renderAll();
        }
        document.getElementById('detailModal').classList.add('hidden');
        attachTrayToTextarea();
      });
    }

    function attachTrayToTextarea() {
      const box = document.getElementById('visitorMessage');
      if (state.tray.length === 0) {
        showToast(t('traySub'));
        return;
      }
      const names = state.tray.map(id => {
        const p = PRODUCTS.find(x => x.id === id);
        return p ? `- ${p[state.lang].title}` : '';
      }).filter(Boolean).join('\n');
      const lbl = t('interestedPrefix');
      const prefix = lbl + '\n' + names + '\n\n';
      if (!box.value.includes(lbl)) {
        box.value = prefix + box.value;
      }
      showToast('✓');
    }

    // Event Listeners
    document.getElementById('langToggle').addEventListener('click', e => {
      const btn = e.target.closest('[data-lang]');
      if (!btn) return;
      state.lang = btn.dataset.lang;
      persistState();
      renderAll();
    });

    document.getElementById('mobileMenuBtn').addEventListener('click', () => {
      document.getElementById('mobileMenu').classList.toggle('hidden');
    });
    document.querySelectorAll('#mobileMenu a').forEach(a => {
      a.addEventListener('click', () => document.getElementById('mobileMenu').classList.add('hidden'));
    });

    document.querySelectorAll('[data-prefill-shop]').forEach(link => {
      link.addEventListener('click', () => {
        const val = link.dataset.prefillShop;
        const radio = document.querySelector(`input[name="targetShop"][value="${val}"]`);
        if (radio) radio.checked = true;
      });
    });

    document.getElementById('categoryFilters').addEventListener('click', e => {
      const btn = e.target.closest('[data-cat]');
      if (!btn) return;
      state.activeCategory = btn.dataset.cat;
      renderAll();
    });

    function scrollCatalogSlider(direction) {
      const grid = document.getElementById('lookbookGrid');
      if (!grid) return;
      const firstCard = grid.querySelector('article');
      const step = firstCard ? firstCard.getBoundingClientRect().width + 24 : 360;
      const maxScroll = grid.scrollWidth - grid.clientWidth;
      if (maxScroll <= 0) return;

      if (direction > 0) {
        // If already at/near the end of the horizontal track, loop back to the 1st card
        if (grid.scrollLeft >= maxScroll - 48) {
          grid.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          const nextLeft = Math.min(maxScroll, grid.scrollLeft + step);
          grid.scrollTo({ left: nextLeft, behavior: 'smooth' });
        }
      } else {
        // If at/near the start of the horizontal track, loop to the last card
        if (grid.scrollLeft <= 48) {
          grid.scrollTo({ left: maxScroll, behavior: 'smooth' });
        } else {
          const prevLeft = Math.max(0, grid.scrollLeft - step);
          grid.scrollTo({ left: prevLeft, behavior: 'smooth' });
        }
      }
    }

    const prevFloatBtn = document.getElementById('sliderPrevFloat');
    if (prevFloatBtn) prevFloatBtn.addEventListener('click', () => scrollCatalogSlider(-1));
    const nextFloatBtn = document.getElementById('sliderNextFloat');
    if (nextFloatBtn) nextFloatBtn.addEventListener('click', () => scrollCatalogSlider(1));

    // Also wrap around to 1st card if user scrolls horizontally past the end via trackpad/wheel
    const lookbookGridEl = document.getElementById('lookbookGrid');
    let wheelWrapCooldown = false;
    lookbookGridEl.addEventListener('wheel', e => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY) || wheelWrapCooldown) return;
      const maxScroll = lookbookGridEl.scrollWidth - lookbookGridEl.clientWidth;
      if (maxScroll <= 0) return;
      if (e.deltaX > 15 && lookbookGridEl.scrollLeft >= maxScroll - 10) {
        e.preventDefault();
        wheelWrapCooldown = true;
        lookbookGridEl.scrollTo({ left: 0, behavior: 'smooth' });
        setTimeout(() => { wheelWrapCooldown = false; }, 600);
      } else if (e.deltaX < -15 && lookbookGridEl.scrollLeft <= 10) {
        e.preventDefault();
        wheelWrapCooldown = true;
        lookbookGridEl.scrollTo({ left: maxScroll, behavior: 'smooth' });
        setTimeout(() => { wheelWrapCooldown = false; }, 600);
      }
    }, { passive: false });

    const searchInputEl = document.getElementById('searchInput');
    searchInputEl.addEventListener('input', e => {
      state.searchQuery = e.target.value;
      renderLookbook();
      renderSearchSuggestions();
    });
    searchInputEl.addEventListener('focus', () => {
      if (state.searchQuery.trim().length > 0) {
        renderSearchSuggestions();
      }
    });

    document.getElementById('clearSearchBtn').addEventListener('click', () => {
      state.searchQuery = '';
      searchInputEl.value = '';
      renderLookbook();
      renderSearchSuggestions();
      searchInputEl.focus();
    });

    document.getElementById('searchSuggestions').addEventListener('click', e => {
      const btn = e.target.closest('[data-suggest-id]');
      if (!btn) return;
      const prodId = btn.dataset.suggestId;
      const prod = PRODUCTS.find(p => p.id === prodId);
      if (prod) {
        state.activeCategory = 'all';
        state.searchQuery = prod[state.lang].title;
        searchInputEl.value = state.searchQuery;
        renderAll();
        document.getElementById('searchSuggestions').classList.add('hidden');
      }
    });

    document.addEventListener('click', e => {
      const wrap = document.getElementById('searchBoxWrap');
      const sugg = document.getElementById('searchSuggestions');
      if (wrap && sugg && !wrap.contains(e.target)) {
        sugg.classList.add('hidden');
      }
    });

    document.getElementById('resetFiltersBtn').addEventListener('click', () => {
      state.activeCategory = 'all';
      state.searchQuery = '';
      searchInputEl.value = '';
      renderAll();
      renderSearchSuggestions();
    });

    document.getElementById('lookbookGrid').addEventListener('click', e => {
      const qv = e.target.closest('[data-quickview]');
      if (qv) {
        openQuickView(qv.dataset.quickview);
        return;
      }
      const tr = e.target.closest('[data-tray]');
      if (tr) toggleTrayItem(tr.dataset.tray);
    });

    document.getElementById('guideSambalpuriBtn').addEventListener('click', () => {
      state.activeGuide = 'sambalpuri';
      renderWeaveGuide();
    });
    document.getElementById('guideKatkiBtn').addEventListener('click', () => {
      state.activeGuide = 'katki';
      renderWeaveGuide();
    });

    document.getElementById('openTrayBtn').addEventListener('click', () => {
      document.getElementById('trayDrawer').classList.remove('hidden');
    });
    document.getElementById('closeTrayBtn').addEventListener('click', () => {
      document.getElementById('trayDrawer').classList.add('hidden');
    });
    document.getElementById('trayItems').addEventListener('click', e => {
      const rm = e.target.closest('[data-remove-tray]');
      if (rm) toggleTrayItem(rm.dataset.removeTray);
    });
    document.getElementById('clearTrayBtn').addEventListener('click', () => {
      state.tray = [];
      persistState();
      renderAll();
    });
    document.getElementById('sendTrayToFormBtn').addEventListener('click', () => {
      document.getElementById('trayDrawer').classList.add('hidden');
      attachTrayToTextarea();
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });

    document.getElementById('attachTrayBtn').addEventListener('click', attachTrayToTextarea);

    document.getElementById('clearMessagesBtn').addEventListener('click', () => {
      state.messages = [];
      persistState();
      renderSentMessages();
    });

    // Validator functions imported from window.AppSecurity
    function setFieldError(inputId, errorId, msg) {
      const inp = document.getElementById(inputId);
      const err = document.getElementById(errorId);
      if (!inp || !err) return;
      if (msg) {
        err.textContent = msg;
        err.classList.remove('hidden');
        inp.classList.add('border-kumkum', 'ring-1', 'ring-kumkum');
      } else {
        err.textContent = '';
        err.classList.add('hidden');
        inp.classList.remove('border-kumkum', 'ring-1', 'ring-kumkum');
      }
    }

    // Real-time input sanitization + live validation on input & blur
    const nameInput = document.getElementById('visitorName');
    nameInput.addEventListener('input', () => {
      const raw = nameInput.value;
      const sanitized = raw.replace(/[^\p{L}\p{M} .'-]/gu, '');
      if (raw !== sanitized) {
        nameInput.value = sanitized;
        setFieldError('visitorName', 'nameError', t('errName'));
      } else if (sanitized.trim().length > 0 && !isValidName(sanitized.trim())) {
        setFieldError('visitorName', 'nameError', t('errName'));
      } else {
        setFieldError('visitorName', 'nameError', '');
      }
    });
    nameInput.addEventListener('blur', () => {
      const val = nameInput.value.trim();
      if (val && !isValidName(val)) setFieldError('visitorName', 'nameError', t('errName'));
    });

    // Close Details Modal via fixed top-right button or clicking backdrop
    document.getElementById('closeDetailBtn').addEventListener('click', () => {
      document.getElementById('detailModal').classList.add('hidden');
    });
    document.getElementById('detailModal').addEventListener('click', e => {
      if (e.target.id === 'detailModal') {
        document.getElementById('detailModal').classList.add('hidden');
      }
    });

    const contactInput = document.getElementById('visitorContact');
    contactInput.addEventListener('input', () => {
      const val = sanitizePhoneInput(contactInput.value);
      if (contactInput.value !== val) {
        contactInput.value = val;
      }
      const trimmed = val.trim();
      if (trimmed.length > 0 && isOwnerPhone(trimmed)) {
        setFieldError('visitorContact', 'contactError', t('errOwnerPhone'));
      } else if (trimmed.length > 0 && !isValidPhone(trimmed)) {
        setFieldError('visitorContact', 'contactError', t('errContact'));
      } else {
        setFieldError('visitorContact', 'contactError', '');
      }
    });
    contactInput.addEventListener('blur', () => {
      const val = contactInput.value.trim();
      if (val && isOwnerPhone(val)) {
        setFieldError('visitorContact', 'contactError', t('errOwnerPhone'));
      } else if (val && !isValidPhone(val)) {
        setFieldError('visitorContact', 'contactError', t('errContact'));
      }
    });

    const emailInput = document.getElementById('visitorEmail');
    if (emailInput) {
      emailInput.addEventListener('input', () => {
        const val = emailInput.value.replace(/[^a-zA-Z0-9@._+%\-]/g, '');
        if (emailInput.value !== val) emailInput.value = val;
        const trimmed = val.trim();
        if (trimmed.length > 0 && !isValidOptionalEmail(trimmed)) {
          setFieldError('visitorEmail', 'emailError', t('errEmail'));
        } else {
          setFieldError('visitorEmail', 'emailError', '');
        }
      });
      emailInput.addEventListener('blur', () => {
        const val = emailInput.value.trim();
        if (val && !isValidOptionalEmail(val)) setFieldError('visitorEmail', 'emailError', t('errEmail'));
      });
    }

    const msgInput = document.getElementById('visitorMessage');
    msgInput.addEventListener('input', () => {
      if (msgInput.value.trim().length >= 5 || msgInput.value.trim().length === 0) {
        setFieldError('visitorMessage', 'messageError', '');
      }
    });

    let lastSubmitTime = 0;
    document.getElementById('contactForm').addEventListener('submit', e => {
      e.preventDefault();
      // 1. Anti-bot Honeypot check
      const hp = document.getElementById('hpWebsite');
      if (hp && hp.value.trim() !== '') return;

      // 2. Client-side rate limit (4 seconds cooldown)
      const now = Date.now();
      if (now - lastSubmitTime < 4000) {
        showToast('Please wait a moment before sending again.');
        return;
      }

      const checkedRadio = document.querySelector('input[name="targetShop"]:checked');
      const rawShop = checkedRadio ? checkedRadio.value : 'Boyana Shilpa';
      const shop = ALLOWED_SHOPS.has(rawShop) ? rawShop : 'Boyana Shilpa';
      const name = document.getElementById('visitorName').value.trim();
      const contact = document.getElementById('visitorContact').value.trim();
      const email = (document.getElementById('visitorEmail') ? document.getElementById('visitorEmail').value.trim() : '').slice(0, 100);
      const visitDate = (document.getElementById('visitDate').value || 'Flexible').slice(0, 30);
      const topic = document.getElementById('inquiryTopic').value.slice(0, 100);
      const message = document.getElementById('visitorMessage').value.trim().slice(0, 1000);

      let valid = true;
      if (!isValidName(name)) {
        setFieldError('visitorName', 'nameError', t('errName'));
        valid = false;
      } else {
        setFieldError('visitorName', 'nameError', '');
      }
      if (isOwnerPhone(contact)) {
        setFieldError('visitorContact', 'contactError', t('errOwnerPhone'));
        valid = false;
      } else if (!isValidPhone(contact)) {
        setFieldError('visitorContact', 'contactError', t('errContact'));
        valid = false;
      } else {
        setFieldError('visitorContact', 'contactError', '');
      }
      if (!isValidOptionalEmail(email)) {
        setFieldError('visitorEmail', 'emailError', t('errEmail'));
        valid = false;
      } else {
        setFieldError('visitorEmail', 'emailError', '');
      }
      if (message.length < 5) {
        setFieldError('visitorMessage', 'messageError', t('errMsg'));
        valid = false;
      } else {
        setFieldError('visitorMessage', 'messageError', '');
      }
      if (!valid) return;
      lastSubmitTime = Date.now();

      const emailLine = email ? `\nEmail: ${email}` : '';
      const receiptText = `Hello Chandra Sekhar Sahoo Ji,\nStore: ${shop}\nFrom: ${name}\nPhone/WhatsApp: ${contact}${emailLine}\nVisit Date: ${visitDate}\nTopic: ${topic}\n\nMessage:\n${message}`;
      state.messages.unshift({
        shop,
        name,
        message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      persistState();
      renderSentMessages();

      document.getElementById('confirmSummary').textContent = `${name} — ${shop} (+91 97777 84991)`;
      document.getElementById('confirmReceipt').textContent = receiptText;
      document.getElementById('whatsappSendLink').href = `https://wa.me/919777784991?text=${encodeURIComponent(receiptText)}`;
      document.getElementById('confirmModal').classList.remove('hidden');
      e.target.reset();
    });

    document.getElementById('closeConfirmBtn').addEventListener('click', () => {
      document.getElementById('confirmModal').classList.add('hidden');
    });

    document.getElementById('copyReceiptBtn').addEventListener('click', () => {
      const text = document.getElementById('confirmReceipt').textContent;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => showToast('Copied!')).catch(() => fallbackCopy(text));
      } else {
        fallbackCopy(text);
      }
    });

    function fallbackCopy(text) {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); showToast('Copied!'); } catch (e) {}
      document.body.removeChild(ta);
    }

    renderAll();
})();
