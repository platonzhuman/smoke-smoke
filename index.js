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

    if (hamburger) hamburger.addEventListener('click', openMenu);
    if (closeSidebar) closeSidebar.addEventListener('click', closeMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);

    document.querySelectorAll('.sidebar__link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Плавный скролл к якорям
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Проверка на мобильное устройство
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    // Параллакс для hero (только на десктопе)
    if (!isMobile) {
        const parallaxBg = document.getElementById('parallax-bg');
        if (parallaxBg) {
            let ticking = false;
            window.addEventListener('scroll', () => {
                if (!ticking) {
                    window.requestAnimationFrame(() => {
                        const scrolled = window.scrollY;
                        parallaxBg.style.transform = `translateY(${scrolled * 0.3}px)`;
                        ticking = false;
                    });
                    ticking = true;
                }
            }, { passive: true });
        }
    }

    // Эффекты только для десктопа (ширина > 768px)
    if (!isMobile) {
        // Горизонтальный скролл для преимуществ
        const section = document.getElementById('advantages');
        if (section) {
            const wrapper = section.querySelector('.advantages__wrapper');
            const grid = section.querySelector('.advantages__grid');
            if (wrapper && grid) {
                let maxScroll = 0;
                let ticking = false;

                function setSectionHeight() {
                    maxScroll = Math.max(0, grid.scrollWidth - window.innerWidth);
                }

                function updateTransform() {
                    const start = section.offsetTop;
                    const scrollY = window.scrollY;
                    let progress = (scrollY - start) / maxScroll;
                    progress = Math.min(1, Math.max(0, progress));
                    grid.style.transform = `translateX(${-progress * maxScroll}px)`;
                }

                setSectionHeight();
                window.addEventListener('scroll', () => {
                    if (!ticking) {
                        window.requestAnimationFrame(() => {
                            updateTransform();
                            ticking = false;
                        });
                        ticking = true;
                    }
                }, { passive: true });

                window.addEventListener('resize', () => {
                    setSectionHeight();
                    updateTransform();
                });

                updateTransform();
            }
        }

        // 3D tilt эффект для карточек преимуществ
        document.querySelectorAll('.advantage-card').forEach(card => {
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
});