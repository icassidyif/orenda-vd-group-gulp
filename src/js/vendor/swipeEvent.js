const onSwipe = {
    up: [],
    down: [],
    left: [],
    right: [],
}

let xDown = null
let yDown = null

function getTouches(evt) {
    return evt.touches
}

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0]
    xDown = firstTouch.clientX
    yDown = firstTouch.clientY
}

function handleTouchMove(evt) {
    if (!xDown || !yDown) {
        return
    }

    const xUp = evt.touches[0].clientX
    const yUp = evt.touches[0].clientY

    const xDiff = xDown - xUp
    const yDiff = yDown - yUp

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
            onSwipe.right.forEach((cb) => cb())
        } else {
            onSwipe.left.forEach((cb) => cb())
        }
    } else if (yDiff > 0) {
        onSwipe.down.forEach((cb) => cb())
    } else {
        onSwipe.up.forEach((cb) => cb())
    }
    xDown = null
    yDown = null
}

document.addEventListener('touchstart', handleTouchStart, false)
document.addEventListener('touchmove', handleTouchMove, false)

export default onSwipe
