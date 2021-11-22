const testWebp = (cb) => {
    const webp = new Image()
    webp.onload = () => cb(webp.height === 2)
    webp.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
}

testWebp((support) => {
    if (!support) return
    document.body.classList.add('webp')
})
