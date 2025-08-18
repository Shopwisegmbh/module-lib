document.addEventListener('DOMContentLoaded', () => {
    const widget = document.getElementById('floatingWidget');

    if (window.innerWidth <= 767) {
        widget.style.opacity = '0';
        widget.style.transition = 'opacity 0.4s ease';

        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;

            if (scrollTop < 100) {
                widget.style.opacity = '1';
                widget.style.pointerEvents = 'auto';
            } else {
                widget.style.opacity = '0';
                widget.style.pointerEvents = 'none';
            }
        });
    } else {
        widget.style.opacity = '1';
        widget.style.pointerEvents = 'auto';
        widget.style.transition = 'none';
    }
});