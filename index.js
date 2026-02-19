document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const hamburger = document.getElementById('hamburgerBtn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const closeSidebar = document.getElementById('closeSidebar');

    function openMenu() {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (hamburger) {
        hamburger.addEventListener('click', openMenu);
    }

    if (closeSidebar) {
        closeSidebar.addEventListener('click', closeMenu);
    }

    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }

    const sidebarLinks = document.querySelectorAll('.sidebar__link');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Плавный скролл к якорям
    const allLinks = document.querySelectorAll('a[href^="#"]');
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Параллакс для hero
    const parallaxBg = document.getElementById('parallax-bg');
    if (parallaxBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const rate = scrolled * 0.3;
            parallaxBg.style.transform = `translateY(${rate}px)`;
        });
    }

    // Горизонтальный скролл для преимуществ (только десктоп)
    function initHorizontalAdvantages() {
        const section = document.getElementById('advantages');
        if (!section) return;

        if (window.innerWidth < 769) return;

        const wrapper = section.querySelector('.advantages__wrapper');
        const grid = section.querySelector('.advantages__grid');
        if (!wrapper || !grid) return;

        let maxScroll = 0;

        function setSectionHeight() {
            const gridWidth = grid.scrollWidth;
            const viewportWidth = window.innerWidth;
            maxScroll = Math.max(0, gridWidth - viewportWidth);
           
        }

        function updateTransform() {
            const start = section.offsetTop;
            const scrollY = window.scrollY;
            let progress = (scrollY - start) / maxScroll;
            progress = Math.min(1, Math.max(0, progress));
            const translateX = -progress * maxScroll;
            grid.style.transform = `translateX(${translateX}px)`;
        }

        setSectionHeight();
        window.addEventListener('scroll', updateTransform);
        window.addEventListener('resize', () => {
            setSectionHeight();
            updateTransform();
        });
        updateTransform();
    }

    // 3D tilt эффект для карточек преимуществ
    function init3DTilt() {
        const cards = document.querySelectorAll('.advantage-card');
        if (!cards.length) return;

        cards.forEach(card => {
            const inner = card.querySelector('.advantage-card__inner');
            if (!inner) return;

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const rotateX = (y - rect.height / 2) / 12;
                const rotateY = (rect.width / 2 - x) / 12;

                inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                inner.style.transform = '';
            });
        });
    }

    initHorizontalAdvantages();
    init3DTilt();
});