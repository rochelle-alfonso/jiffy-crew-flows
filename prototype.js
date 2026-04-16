// Jiffy Crew Click-Through Prototype Engine
(function() {
  const screens = document.querySelectorAll('.screen-wrapper');
  let current = 0;
  
  if (screens.length === 0) return;

  // Create overlay container
  const overlay = document.createElement('div');
  overlay.id = 'prototype-overlay';
  overlay.innerHTML = `
    <div class="proto-header">
      <div class="proto-nav">
        <button id="proto-prev" class="proto-btn">← Back</button>
        <span id="proto-counter" class="proto-counter">1 / ${screens.length}</span>
        <button id="proto-next" class="proto-btn">Next →</button>
      </div>
      <div class="proto-dots" id="proto-dots"></div>
    </div>
    <div class="proto-phone-area" id="proto-phone-area"></div>
    <div class="proto-hint">Click the blue button on screen to advance, or use arrow keys</div>
  `;
  
  // Styles
  const style = document.createElement('style');
  style.textContent = `
    body.proto-mode { overflow: hidden; margin: 0; padding: 0; background: #1A1A2E; }
    body.proto-mode > *:not(#prototype-overlay):not(style):not(script):not(link) { display: none !important; }
    #prototype-overlay {
      position: fixed; inset: 0; display: flex; flex-direction: column;
      align-items: center; background: #1A1A2E; z-index: 9999; font-family: 'Onest', system-ui, sans-serif;
    }
    .proto-header {
      display: flex; flex-direction: column; align-items: center; gap: 12px;
      padding: 16px 24px; width: 100%;
    }
    .proto-nav { display: flex; align-items: center; gap: 20px; }
    .proto-btn {
      background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
      color: white; padding: 8px 20px; border-radius: 20px; cursor: pointer;
      font-size: 14px; font-family: 'Onest', sans-serif; font-weight: 500;
      transition: background 0.2s;
    }
    .proto-btn:hover { background: rgba(255,255,255,0.2); }
    .proto-btn:disabled { opacity: 0.3; cursor: default; }
    .proto-counter { color: rgba(255,255,255,0.7); font-size: 14px; font-weight: 500; min-width: 60px; text-align: center; }
    .proto-dots { display: flex; gap: 6px; flex-wrap: wrap; justify-content: center; max-width: 400px; }
    .proto-dot {
      width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.2);
      cursor: pointer; transition: all 0.2s;
    }
    .proto-dot.active { background: #2563EB; width: 24px; border-radius: 4px; }
    .proto-phone-area {
      flex: 1; display: flex; align-items: center; justify-content: center;
      padding: 0 20px 20px; overflow: hidden;
    }
    .proto-screen {
      width: 390px; height: 844px; background: white; border-radius: 40px;
      overflow: hidden; box-shadow: 0 20px 80px rgba(0,0,0,0.4);
      transform: scale(1); transition: transform 0.3s ease;
      position: relative;
    }
    .proto-screen-inner { width: 100%; height: 100%; overflow-y: auto; overflow-x: hidden; }
    .proto-screen-inner::-webkit-scrollbar { display: none; }
    .proto-hint {
      color: rgba(255,255,255,0.4); font-size: 12px; padding: 8px 20px 16px;
      text-align: center;
    }
    .proto-screen-label {
      position: absolute; top: -32px; left: 50%; transform: translateX(-50%);
      color: rgba(255,255,255,0.5); font-size: 12px; font-weight: 500;
      white-space: nowrap;
    }
    @media (max-height: 950px) {
      .proto-screen { transform: scale(0.85); }
    }
    @media (max-height: 800px) {
      .proto-screen { transform: scale(0.75); }
    }
  `;
  document.head.appendChild(style);

  // Build dots
  const dotsContainer = overlay.querySelector('#proto-dots');
  screens.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'proto-dot' + (i === 0 ? ' active' : '');
    dot.onclick = () => goTo(i);
    dotsContainer.appendChild(dot);
  });

  // Clone screens into prototype
  const phoneArea = overlay.querySelector('#proto-phone-area');
  
  function render() {
    const screen = screens[current];
    const label = screen.querySelector('.screen-label');
    const frame = screen.querySelector('.phone-frame');
    
    phoneArea.innerHTML = '';
    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    
    const labelEl = document.createElement('div');
    labelEl.className = 'proto-screen-label';
    labelEl.textContent = label ? label.textContent : `Screen ${current + 1}`;
    
    const phone = document.createElement('div');
    phone.className = 'proto-screen';
    const inner = document.createElement('div');
    inner.className = 'proto-screen-inner';
    inner.innerHTML = frame ? frame.innerHTML : '';
    phone.appendChild(inner);
    
    wrapper.appendChild(labelEl);
    wrapper.appendChild(phone);
    phoneArea.appendChild(wrapper);

    // Make CTAs clickable to advance
    const ctas = phone.querySelectorAll('[style*="border-radius: 28px"], [style*="border-radius:28px"]');
    ctas.forEach(cta => {
      if (cta.style.backgroundColor && cta.style.backgroundColor !== 'rgb(224, 224, 224)' && 
          cta.style.backgroundColor !== '#E0E0E0' && cta.style.backgroundColor !== '#FBFBFB') {
        cta.style.cursor = 'pointer';
        cta.style.transition = 'transform 0.1s';
        cta.addEventListener('click', (e) => {
          e.stopPropagation();
          cta.style.transform = 'scale(0.97)';
          setTimeout(() => { cta.style.transform = ''; goTo(current + 1); }, 150);
        });
      }
    });

    // Make back arrows clickable
    const backs = phone.querySelectorAll('svg');
    if (backs.length > 0) {
      const firstSvg = inner.querySelector('[style*="gap: 16px"] svg, [style*="gap:16px"] svg');
      if (firstSvg && current > 0) {
        firstSvg.style.cursor = 'pointer';
        firstSvg.addEventListener('click', (e) => { e.stopPropagation(); goTo(current - 1); });
      }
    }

    // Update nav
    overlay.querySelector('#proto-counter').textContent = `${current + 1} / ${screens.length}`;
    overlay.querySelector('#proto-prev').disabled = current === 0;
    overlay.querySelector('#proto-next').disabled = current === screens.length - 1;
    
    dotsContainer.querySelectorAll('.proto-dot').forEach((d, i) => {
      d.className = 'proto-dot' + (i === current ? ' active' : '');
    });
  }

  function goTo(index) {
    if (index < 0 || index >= screens.length) return;
    current = index;
    render();
  }

  // Wire up buttons
  document.body.appendChild(overlay);
  overlay.querySelector('#proto-prev').onclick = () => goTo(current - 1);
  overlay.querySelector('#proto-next').onclick = () => goTo(current + 1);

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); goTo(current + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(current - 1); }
    if (e.key === 'Escape') { document.body.classList.toggle('proto-mode'); }
  });

  // Start in prototype mode
  document.body.classList.add('proto-mode');
  render();
})();
