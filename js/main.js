document.addEventListener('DOMContentLoaded', () => {

  /* 0. Lenis 慣性スクロールの初期化 */
  if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
      duration: 1.2, // スクロールの慣性時間（数字が大きいほどヌルっと動きます）
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // スムースイージング
      smoothWheel: true,
      touchMultiplier: 1.5
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }

  /* 1. ビビッドピンク丸カスタムカーソル追従 */
  const cursor = document.querySelector('.custom-cursor');
  if (cursor && window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });

    const hoverTargets = document.querySelectorAll('a, button, .works-slide-item, .zoom-on-hover, .skill-minimal-card, .philosophy-card');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
    });
  }

  /* 2. ハンバーガーメニュー制御 */
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  /* 3. FVタイピング風アニメーション */
  const typingElement = document.getElementById('typingTitle');
  if (typingElement) {
    const textLines = ["ホソバヒカルの", "ポートフォリオ。"];
    typingElement.innerHTML = '';
    
    let lineIdx = 0;
    let charIdx = 0;
    
    const cursorSpan = document.createElement('span');
    cursorSpan.className = 'typing-cursor';
    
    function typeChar() {
      if (lineIdx < textLines.length) {
        const currentLineText = textLines[lineIdx];
        
        if (charIdx === 0 && lineIdx > 0) {
          typingElement.insertBefore(document.createElement('br'), cursorSpan);
        }
        
        if (charIdx < currentLineText.length) {
          const charNode = document.createTextNode(currentLineText.charAt(charIdx));
          typingElement.insertBefore(charNode, cursorSpan);
          charIdx++;
          setTimeout(typeChar, 110);
        } else {
          lineIdx++;
          charIdx = 0;
          setTimeout(typeChar, 300);
        }
      }
    }
    
    typingElement.appendChild(cursorSpan);
    setTimeout(typeChar, 400);
  }

  /* 4. スクロールフェードイン（20%高い位置で発火） */
  const fadeElements = document.querySelectorAll('.fade-in-up');
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -20% 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => observer.observe(el));

  /* 5. 横スライダー制御 */
  const sliderTrack = document.getElementById('worksSliderTrack');
  const prevBtn = document.getElementById('worksPrevBtn');
  const nextBtn = document.getElementById('worksNextBtn');

  if (sliderTrack && prevBtn && nextBtn) {
    const scrollAmount = 380;

    nextBtn.addEventListener('click', () => {
      sliderTrack.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
      sliderTrack.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
  }
});

/* 6．メールアドレス動的生成 ＆ クリック制御 */
document.addEventListener('DOMContentLoaded', () => {
  const user = "hkr.8sgok26";
  const domain = "gmail.com";
  const email = user + "@" + domain;

  const btn = document.getElementById('contactBtn');
  const text = document.getElementById('emailText');

  if (text) {
    text.textContent = email;
  }

  if (btn) {
    btn.href = "mailto:" + email;

    // クリック時にJS側からも確実にメーラー起動をトリガー
    btn.addEventListener('click', (e) => {
      // 念のためクリップボードにもコピー（メーラーが起動しない環境への配慮）
      if (navigator.clipboard) {
        navigator.clipboard.writeText(email);
      }
      
      // 直接mailtoへ飛ばす
      window.location.href = "mailto:" + email;
    });
  }
});