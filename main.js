"use strict"

const moveWindowStyles = (window) => {
    window.classList.add('window--defaultSize')
    window.classList.remove('window--max')
    console.log(window)
    return window
}

const moveWindow = ({ window, event }) => {
    window = moveWindowStyles(window)
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

const closeWindow = (window) => {
    window.classList.add('window--hidden')
    let actualChildNode = 0

    body.childNodes.forEach(windowInBody => {
        if(`${windowInBody}` == '[object HTMLDivElement]'){
            const windowClassList = windowInBody.classList.value.split(' ')
            const isThisWindowHidden = !!(windowClassList.filter(windowClass => windowClass == 'window--hidden').at(0))
            
            if(isThisWindowHidden) {
                body.childNodes.item(actualChildNode).remove()
            }
        }
        actualChildNode++
    })
}

const maxWindow = (window) => {
    window.classList.toggle('window--defaultSize')
    window.classList.toggle('window--max')
}

const btnAction = (btn) => {
    const btnActions = {
        'close': (window) => closeWindow(window),
        'max': (window) => maxWindow(window)
    }

    Object.entries(btnActions).forEach(([btnActionClass, btnAction]) => {
        const btnClass = btn.classList.value.split(' ').filter(btnClass => btnClass == btnActionClass).at(0)
        if(!!btnClass) {
            const window = btn.parentElement.parentElement.parentElement
            btnAction(window)
        }
    });
}

body.addEventListener('click', (e) => {
    if(e.target.classList[0] == 'actions__action') {
        btnAction(e.target)
    }
})