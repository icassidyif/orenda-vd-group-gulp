import Swiper from 'swiper/swiper-bundle.min'
import {
    uniqueNamesGenerator, adjectives, colors, animals,
} from 'unique-names-generator'

const tabs = document.querySelectorAll('.tabs')

// eslint-disable-next-line no-plusplus
for (let i = 0; i < tabs.length; i++) {
    const currentTab = tabs[i]

    currentTab.addEventListener('click', (event) => {
        const trigger = event.target.closest('.tabs__trigger')

        if (trigger) {
            const content = currentTab.querySelectorAll('.tabs__content')
            const triggers = currentTab.querySelectorAll('.tabs__trigger')

            // eslint-disable-next-line no-plusplus
            for (let j = 0; j < content.length; j++) {
                content[j].classList.remove('_active')
                if (content[j].dataset.tab === trigger.dataset.tab) {
                    content[j].classList.add('_active')
                }
            }

            // eslint-disable-next-line no-plusplus
            for (let j = 0; j < triggers.length; j++) {
                triggers[j].classList.remove('_active')
                triggers[j].classList.add('_inactive')
                if (triggers[j] === trigger) {
                    triggers[j].classList.remove('_inactive')
                    triggers[j].classList.add('_active')
                }
            }
        }
    })
}

// Swiper.use([Grid])

const swiperConfig = {
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
    },
    centerInsufficientSlides: true,
    slidesPerView: 1,
    spaceBetween: 30,
    breakpoints: {
        576: {
            grid: {
                fill: 'row',
                rows: 1,
            },
            slidesPerView: 2,
        },
        992: {
            grid: {
                fill: 'row',
                rows: 2,
            },
            slidesPerView: 3,
        },
    },
}

const sliders = []

window.addEventListener('DOMContentLoaded', () => {
    const apartmentsSliders = document.querySelectorAll('.swiper')
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < apartmentsSliders.length; i++) {
        const className = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] })
        apartmentsSliders[i].classList.add(className)
        // eslint-disable-next-line no-new
        const swiper = new Swiper(`.${className}`, swiperConfig)
        sliders.push(swiper)
    }
})

export default sliders
