class Modals {
    constructor(props = {}) {
        this.queueMode = props.queueMode ?? false
        this.lockScroll = props.lockScroll ?? true
        this.openWithLink = props.openWithLink ?? false

        this.overlay = this['constructor'].#createOverlay()
        this.updateModals()

        const hash = window.location.hash
        if (this.openWithLink && hash.match(/#modal:.+/)) {
            this.open(hash.replace(/#modal:/, ''))
        }

        const handleClick = this['constructor'].#handleClick.bind(this)
        document.addEventListener('click', handleClick)
    }

    open(id) {
        const modal = this.getModal(id)
        if (!modal) throw new Error(`no modal found with id '${id}'`)

        if (this.activeModal) {
            if (this.queueMode) this.bufferedModals.unshift(this.activeModal)
            this.activeModal.element.classList.remove('_active')
        }

        modal.element.classList.add('_active')
        this.activeModal = modal

        const locked = document.body.classList.contains('_modal')
        if (this.lockScroll && !locked) {
            this['constructor'].#manageScroll()
            this.overlay.classList.add('_active')
        }

        if (this.openHandlers?.[id]) {
            this.openHandlers[id].forEach((callback) => {
                callback(this.getModal(id))
            })
        }
    }

    close() {
        let modal = this.activeModal

        if (!modal) throw new Error(`no modal found with id '${modal.id}'`)

        modal.element.classList.remove('_active')
        this.activeModal = null

        if (this.closeHandlers?.[modal.id]) {
            this.closeHandlers[modal.id].forEach((callback) => {
                callback(this.getModal(modal.id))
            })
        }

        if (this.queueMode && this.bufferedModals.length) {
            this.open(this.bufferedModals.shift().id)
        }

        if (this.lockScroll && !this.activeModal) {
            this['constructor'].#waitForAction(
                modal.element.querySelector('[data-modal-content]'),
                () => this['constructor'].#manageScroll(),
            )
            this.overlay.classList.remove('_active')
        }
    }

    toggle(id) {
        const modal = this.getModal(id)
        if (!modal) throw new Error(`no modal found with id '${id}'`)

        this.bufferedModals.includes(modal) || this.activeModal === modal
            ? this.close(modal.id)
            : this.open(modal.id)
    }

    closeAll() {
        if (!this.activeModal) return
        if (this.queueMode) this.bufferedModals = []
        this.close(this.activeModal.id)
    }

    updateModals() {
        const modals = [...document.querySelectorAll('[data-modal-content]')]
        this.modals = this['constructor'].#generateStructure(modals)
        this.activeModal = null
        this.bufferedModals = []
    }

    getModal(id) {
        return this.modals.find((modal) => modal.id === id)
    }

    getLink(id) {
        const link = window.location.href.replace(/window.location.hash/, '').replace(/\/$/, '')
        return `${link}#modal:${id}`
    }

    onOpen(id, callbackArr) {
        if (!this.openHandlers) this.openHandlers = {}
        this.openHandlers[id] = callbackArr
    }

    onClose(id, callbackArr) {
        if (!this.closeHandlers) this.closeHandlers = {}
        this.closeHandlers[id] = callbackArr
    }

    removeFromQueue(id) {
        if (!this.queueMode) return
        const modal = this.getModal(id)
        const index = this.bufferedModals.indexOf(modal)
        if (~index) return this.bufferedModals.splice(index, 1)
    }

    static #handleClick(event) {
        const closest = (s) => event.target.closest(s)

        const openBtn = closest('[data-modal-open]')
        const closeBtn = closest('[data-modal-close]')
        const clickOutside = closest('[data-modal-body]') && !closest('[data-modal-content]')

        if (!openBtn && !closeBtn && !clickOutside) return

        event.preventDefault()

        if (!this['constructor'].#allowAction) return
        this['constructor'].#allowAction = false

        const { open, close, activeModal, getModal } = this

        let id

        if (openBtn) {
            id = openBtn.dataset.modalOpen
            if (!id) throw new Error('no id in data-modal-open')
            open.call(this, id)
        }
        if (closeBtn) {
            const closestModal = closest('[data-modal-content]')
            id = closeBtn.dataset.modalClose || closestModal?.id
            if (!id) throw new Error('no closest modal or id in data-modal-close')
            close.call(this, id)
        }
        if (clickOutside) {
            id = activeModal.id
            close.call(this, id)
        }

        const modal = getModal.call(this, id)
        this['constructor'].#waitForAction(
            modal.element.querySelector('[data-modal-content]'),
            () => (this['constructor'].#allowAction = true),
        )
    }

    static #generateStructure(modals) {
        modals = modals.filter((modal) => {
            return !modal.closest('[data-modal-container]')
        })
        return modals.map((modal) => {
            const container = document.createElement('div')
            container.dataset.modalContainer = ''
            modal.after(container)

            const body = document.createElement('div')
            body.dataset.modalBody = ''

            body.append(modal)
            container.append(body)

            return { id: modal.id, element: container }
        })
    }

    static #createOverlay() {
        const overlay = document.createElement('div')
        overlay.dataset.modalOverlay = ''
        document.body.append(overlay)
        return overlay
    }

    static #manageScroll() {
        const hasStyle = document.body.style.paddingRight
        if (hasStyle) document.body.style.paddingRight = ''
        else {
            const scroll = window.innerWidth
            const noScroll = document.body.offsetWidth
            const scrollWidth = scroll - noScroll
            document.body.style.paddingRight = scrollWidth + 'px'
        }
        document.body.classList.toggle('_modal')
    }

    static #waitForAction(element, callback) {
        const styles = window.getComputedStyle(element)
        const duration = styles.getPropertyValue('transition-duration')
        setTimeout(callback, parseFloat(duration) * 1000)
    }

    static #allowAction = true
}

export default Modals
