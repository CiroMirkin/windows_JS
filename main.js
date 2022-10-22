"use strict"

const moveWindow = ({ window, event }) => {
    window.style.position = 'absolute'
    window.style.zIndex = 1000
    let shiftX = event.clientX - window.getBoundingClientRect().left;
    let shiftY = event.clientY - window.getBoundingClientRect().top

    document.body.append(window)
    function moveAt(pageX, pageY) {
        window.style.left = pageX - shiftX + 'px'
        window.style.top = pageY - shiftY + 'px'
    }
    moveAt(event.pageX, event.pageY)

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY)
    }
    document.addEventListener('mousemove', onMouseMove)

    window.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove)
        window.onmouseup = null
    }
}

const body = document.body

body.addEventListener('mousedown', (event) => {
    if (event.target.classList[0] == 'window__header') {
        const window = event.target.parentElement
        moveWindow({ window, event})
    }
    else if(event.target.parentElement.classList[0] == 'window__header') {
        const window = event.target.parentElement.parentElement
        moveWindow({ window, event})
    }
})