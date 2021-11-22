// Selecting elements to move
const moveElements = document.querySelectorAll('[data-move]')

if (moveElements.length > 0) {
    // Original position of elements
    const moveElementsOriginal = []
    // Move elements info
    const moveElementsInfo = []
    // Media queries
    const mediaQueries = []

    for (let i = 0; i < moveElements.length; i++) {
        const element = moveElements[i]
        const moveAttr = element.getAttribute('data-move')

        if (moveAttr) {
            const moveArr = moveAttr.split(',')
            const breakpoint = !isNaN(+moveArr[0].trim()) ? +moveArr[0].trim() : 767.98
            const destination = document.querySelector(`${moveArr[1].trim()}`)
            const place = moveArr[2] ? moveArr[2].trim() : 1
            const type = moveArr[3] === 'max' || moveArr[3] === 'min' ? moveArr[3] : 'max'

            if (destination && moveArr.length > 0) {
                moveElementsInfo.push({
                    element,
                    breakpoint,
                    destination,
                    place,
                    type,
                })
            }
        }
    }

    // Sorting elements by place
    moveElementsInfo.sort((a, b) => (a.place > b.place ? 1 : -1))

    // Getting the default elements' position
    for (let i = 0; i < moveElements.length; i++) {
        const element = moveElements[i]
        const parent = element.parentNode

        let index

        for (let j = 0; j < parent.children.length; j++) {
            const child = parent.children[j]
            if (child === element) index = j
        }

        moveElementsOriginal.push({
            element,
            parent,
            index,
        })
    }

    // Media Queries
    for (let i = 0; i < moveElementsInfo.length; i++) {
        const item = moveElementsInfo[i]
        const { type } = item
        const { breakpoint } = item
        const media_query = window.matchMedia(`(${type}-width: ${breakpoint}px)`)

        media_query.addEventListener('change', () => movingElements())

        mediaQueries.push(media_query)
    }

    // Main function
    function movingElements() {
        for (let i = 0; i < moveElementsInfo.length; i++) {
            const item = moveElementsInfo[i]
            const { element } = item
            const { destination } = item
            const { place } = item
            const className = '_moved'
            const breakpoint = mediaQueries[i]

            if (breakpoint.matches) {
                if (!element.classList.contains(className)) {
                    if (place === 'last') {
                        destination.append(element)
                    } else if (place === 'first') {
                        destination.prepend(element)
                    } else if (destination.children[place - 1]) {
                        destination.insertBefore(element, destination.children[place - 1])
                    } else {
                        destination.append(element)
                    }
                    element.classList.add(className)
                }
            } else {
                moveBack(element)
                element.classList.remove(className)
            }
        }
    }

    // Moving back
    function moveBack(element) {
        for (let i = 0; i < moveElementsOriginal.length; i++) {
            const item = moveElementsOriginal[i]

            if (item.element === element) {
                const { index } = item
                const { parent } = item

                if (parent.children[index]) {
                    parent.insertBefore(element, parent.children[index])
                } else {
                    parent.append(element)
                }
            }
        }
    }

    movingElements()
}
