//! Vai adicionar um favIcon em todas as pags do site
document.querySelector('head').innerHTML += '<link rel="shortcut icon" href="assets/img/icons/faveIcoNerds.png" type="image/x-icon">'

function login() {
    const msgLogin = document.getElementById('msgLogin')
    msgLogin.style.display = 'block'
    document.getElementById('pMsgLogin').innerText = 'Ops! Ainda estamos trabalhando nisso...'
    fecharMenu()
}

function fecharMsg() {
    const msgLogin = document.getElementById('msgLogin')
    msgLogin.style.display = 'none'
}


//! Vai adicionar um fundo ao menu, quando rola o scroll
window.addEventListener("scroll", (event) => {
    let scroll = this.scrollY
    const nav = document.querySelector('nav')

    if(scroll < 30) {
        nav.id = 'semFundo'

    } else {
        nav.id = 'comFundo'
    }
})

let at = false
function abrirMenu() {
    const menu = document.getElementById('menu')
    const nav = document.querySelector('nav')
    const sombra = document.getElementById('sombra')
    const html = document.querySelector('html')
    menu.style.display = 'none'
    nav.style.display = 'block'
    sombra.style.display = 'block'
    html.style.overflow = 'hidden'
    at = true
    fecharMsg()
}

function fecharMenu() {
    const menu = document.getElementById('menu')
    const nav = document.querySelector('nav')
    const sombra = document.getElementById('sombra')
    const html = document.querySelector('html')
    menu.style.display = 'block'
    nav.style.display = 'none'
    sombra.style.display = 'none'
    html.style.overflow = 'auto'
    at = false
}

//! Vai checar qual o tamho da tela e alterar o menu de acordo com o tamanho
setInterval(() => {
    let tamanhoTela = document.defaultView.innerWidth
    if(tamanhoTela > 480) {
        const nav = document.querySelector('nav')
        const menu = document.getElementById('menu')
        nav.style.display = 'block'
        menu.style.display = 'none'

    } else {
        if(at == false) fecharMenu()
    }
}, 10)

// try {
//     let random = Math.floor(Math.random() * 5)
//     let ps5 = document.getElementById('ps5')

//     if(random == 0) {
//         ps5.style.backgroundImage = 'url("assets/img/site/ps5.png")'

//     } else if(random == 1) {
//         ps5.style.backgroundImage = 'url("assets/img/produtos/fontRedragon.png")'

//     } else if(random == 2) {
//         ps5.style.backgroundImage = 'url("assets/img/produtos/gabineteRedragon.webp")'
        
//     } else if(random == 3) {
//         ps5.style.backgroundImage = 'url("assets/img/produtos/mouseRedragon.png")'
        
//     } else if(random == 4) {
//         ps5.style.backgroundImage = 'url("assets/img/produtos/fontRedragon.png")'
        
//     }  else {
//         ps5.style.backgroundImage = 'url("assets/img/site/ps5.png")'
        
//     }

//     ps5.style.backgroundSize = 'contain'


// } catch {

// }

//! btn voltar ao topo com scroll suave
window.addEventListener("scroll", (event) => {
	let scroll = this.scrollY
	let subir = window.document.getElementById("subir")

	if(scroll < 100) {
		subir.style.transition = "20ms right linear"
		subir.style.right = "-100px"

	} else {
		subir.style.transition = "100ms right linear"
		subir.style.right = "15px"
	}
})

const menuLinks = document.querySelectorAll("#voltarTopo a[href^=\"#\"]")

function getDistanceFromTheTop(element) {
	const id = element.getAttribute("href")
	return document.querySelector(id).offsetTop
}

function scrollToSection(event) {
	event.preventDefault()
	const distanceFromTheTop = getDistanceFromTheTop(event.target) - 90
	smoothScrollTo(0, distanceFromTheTop)
}

menuLinks.forEach((link) => {
	link.addEventListener("click", scrollToSection)
})

function smoothScrollTo(endX, endY, duration) {
	const startX = window.scrollX || window.pageXOffset
	const startY = window.scrollY || window.pageYOffset
	const distanceX = endX - startX
	const distanceY = endY - startY
	const startTime = new Date().getTime()

	duration = typeof duration !== "undefined" ? duration : 700

	const easeInOutQuart = (time, from, distance, duration) => {
		if ((time /= duration / 2) < 1)
			return (distance / 2) * time * time * time * time + from
		return (-distance / 2) * ((time -= 2) * time * time * time - 2) + from
	}

	const timer = setInterval(() => {
		const time = new Date().getTime() - startTime
		const newX = easeInOutQuart(time, startX, distanceX, duration)
		const newY = easeInOutQuart(time, startY, distanceY, duration)
		if (time >= duration) {
			clearInterval(timer)
		}
		window.scroll(newX, newY)
	}, 1000 / 60)
}