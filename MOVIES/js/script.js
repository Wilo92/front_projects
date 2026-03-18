(function() {
    var trailer = document.querySelector('.trailer');
    var video = document.querySelector('.trailer video');
    var header = document.querySelector('header');
    var menuToggle = document.querySelector('.menu-toggle');
    var nav = document.getElementById('primary-nav');

    window.toggleVideo = function() {
        if (!trailer || !video) return;
        var willOpen = !trailer.classList.contains('active');
        trailer.classList.toggle('active');
        document.body.classList.toggle('modal-open', willOpen);
        if (menuToggle && header) {
            menuToggle.setAttribute('aria-expanded', 'false');
            header.classList.remove('is-menu-open');
        }
        if (willOpen) {
            if (video.paused) video.play().catch(function() {});
        } else {
            video.pause();
            try {
                video.currentTime = 0;
            } catch (e) {}
        }
    };

    window.changeBg = function(bg, title) {
        var banner = document.querySelector('.banner');
        var contents = document.querySelectorAll('.content');
        if (!banner || !contents.length) return;
        banner.style.backgroundImage = 'url("./images/movies/' + bg + '")';
        banner.style.backgroundSize = 'cover';
        banner.style.backgroundPosition = 'center';
        for (var i = 0; i < contents.length; i++) {
            contents[i].classList.remove('active');
            if (contents[i].classList.contains(title)) {
                contents[i].classList.add('active');
            }
        }
    };

    function setMenuOpen(open) {
        if (!menuToggle || !header) return;
        menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        header.classList.toggle('is-menu-open', open);
    }

    function initMobileMenu() {
        if (!menuToggle || !header) return;

        menuToggle.addEventListener('click', function() {
            var isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
            setMenuOpen(!isOpen);
        });

        document.addEventListener('click', function(e) {
            if (!header.classList.contains('is-menu-open')) return;
            var target = e.target;
            if (!(target instanceof Element)) return;
            if (header.contains(target)) return;
            setMenuOpen(false);
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') setMenuOpen(false);
        });

        if (nav) {
            nav.addEventListener('click', function(e) {
                var target = e.target;
                if (!(target instanceof Element)) return;
                if (target.closest('a')) setMenuOpen(false);
            });
        }
    }

    function initCarousel() {
        if (typeof $ !== 'undefined' && $.fn.carousel) {
            $(document).ready(function() {
                $('.carousel').carousel();
            });
        }
    }
    initCarousel();
    initMobileMenu();
})();
