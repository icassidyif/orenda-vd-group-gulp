const getCookie = (name) => {
    const matches = document.cookie.match(
        new RegExp(
            // eslint-disable-next-line no-useless-escape
            `(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`,
        ),
    )
    return matches ? decodeURIComponent(matches[1]) : undefined
}
const setCookie = (name, value, options = {}) => {
    // eslint-disable-next-line no-param-reassign
    options = {
        path: '/',
        ...options,
    }

    if (options.expires instanceof Date) {
        // eslint-disable-next-line no-param-reassign
        options.expires = options.expires.toUTCString()
    }

    let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`

    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const optionKey in options) {
        updatedCookie += `; ${optionKey}`
        const optionValue = options[optionKey]
        if (optionValue !== true) {
            updatedCookie += `=${optionValue}`
        }
    }

    document.cookie = updatedCookie
}

const cookieAlert = document.querySelector('#cookies')
const acceptCookies = cookieAlert.querySelector('#cookies-accept')
const cookiesName = 'cookies_accept'

if (!getCookie(cookiesName)) {
    cookieAlert.classList.add('_active')
}

acceptCookies.addEventListener('click', () => {
    setCookie(cookiesName, true, { expires: new Date(Date.now() + 3.1556952e10).toUTCString() })
    cookieAlert.classList.remove('_active')
})
