import onSwipe from '../../../js/vendor/swipeEvent'

class Header {
    constructor(props = {}) {
        const {
            headerSelector = 'header.header',
            menuButtonSelector = '.header__icon',
            menuSelector = '.header__menu',
            scrollToShrink = 30,
        } = props

        this.header = document.querySelector(headerSelector)

        if (!this.header) throw new Error(`Invalid header: ${headerSelector} - no such element`)

        this.menuButton = this.header.querySelector(menuButtonSelector)
        this.menu = this.header.querySelector(menuSelector)
        this.menuIsOpen = false
        this.headerIsShrank = false
        this.scrollToShrink = scrollToShrink

        if (!this.menu) throw new Error(`Invalid header menu: ${menuSelector}  - no such element`)
        if (!this.menuButton) throw new Error(`Invalid header menuButton: ${menuButtonSelector}  - no such element`)

        this.header.addEventListener('click', (event) => {
            if (event.target.closest('a') && this.menuIsOpen) this.closeMenu()
            if (event.target.closest(menuButtonSelector)) this.toggleMenu()
        })

        document.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset !== undefined
                ? window.pageYOffset
                : (document.documentElement || document.body.parentNode || document.body)
                    .scrollTop
            if (scrollTop > this.scrollToShrink) {
                this.shrinkHeader()
            } else if (this.headerIsShrank) {
                this.extendHeader()
            }
        })

        const context = this
        onSwipe.left.push(() => {
            if (context.menuIsOpen) context.closeMenu()
        })
    }

    openMenu() {
        this.menuButton.classList.add('header__icon_active')
        this.menu.classList.add('header__menu_active')
        document.body.classList.add('_menu')
        this.menuIsOpen = true
    }

    closeMenu() {
        this.menuButton.classList.remove('header__icon_active')
        this.menu.classList.remove('header__menu_active')
        document.body.classList.remove('_menu')
        this.menuIsOpen = false
    }

    toggleMenu() {
        if (this.menuIsOpen) {
            this.closeMenu()
        } else {
            this.openMenu()
        }
    }

    shrinkHeader() {
        this.headerIsShrank = true
        this.header.classList.add('header_shrank')
    }

    extendHeader() {
        this.headerIsShrank = false
        this.header.classList.remove('header_shrank')
    }
}

export default Header
