import 'fslightbox';

(function infoDropdown() {
    const openBtn = document.querySelector('.ac-open')
    const grid = document.querySelector('.grid-collapse')

    window.addEventListener('resize', () => {
        if (openBtn.classList.contains('_active')) {
            grid.style.maxHeight = `${grid.scrollHeight / 16}rem`
        }
    })

    openBtn.addEventListener('click', () => {
        if (!openBtn.classList.contains('_active')) {
            openBtn.classList.add('_active')
            grid.classList.add('_active')

            grid.style.maxHeight = `${grid.scrollHeight / 16}rem`
            grid.style.opacity = 1

            openBtn.textContent = openBtn.dataset.activeText
        } else {
            openBtn.classList.remove('_active')
            grid.classList.remove('_active');
            (grid.closest('#gallery') || grid.parentElement).scrollIntoView()

            grid.style.maxHeight = 0
            grid.style.opacity = 0

            openBtn.textContent = openBtn.dataset.inactiveText
        }
    })
}())
