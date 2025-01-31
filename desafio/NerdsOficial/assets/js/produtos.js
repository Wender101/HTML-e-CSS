// Vai escolher os produtos em destaque
const array = []
for(let c = 0; c  < 5; c++) {
    const num = Math.floor(Math.random() * 10)

    if(num != array[0] && num != array[1] && num != array[2] && num != array[3] && num != array[4] && num != array[5]) {
        addOfertas(num)
    }
    array.push(num)
}    

function addOfertas(num) {

    const ofertas = document.getElementById('ofertas')
    const divP = document.createElement('div')
    const localImg = document.createElement('a')
    const divImg = document.createElement('div')
    const strong = document.createElement('strong')
    const p = document.createElement('p')
    
    divP.className = 'p'
    localImg.className = 'localImg'
    divImg.className = 'img'

    let pesquisa = []
    if(num == 0) {
        localImg.href = 'pagProduto.html'

        localImg.addEventListener('click', () => {
            pesquisa = ['Headset', 6]
            const produtoPesquisado = JSON.stringify(pesquisa)
            localStorage.setItem('produtoPesquisado', produtoPesquisado)
        })

        divImg.style.backgroundImage = 'url(assets/img/ofertas/HeadsetHylas/71YjrSgj-FL._AC_SY450_.jpg)'
        strong.innerText = 'Headset Gamer Hylas'
        p.innerText = 'Marca: Redragon, com iluminação RGB e Alto Falantes de 50mm'

    } else if(num == 1) {
        localImg.href = 'pagProduto.html'
        localImg.addEventListener('click', () => {
            pesquisa = ['Gabinetes', 5]
            const produtoPesquisado = JSON.stringify(pesquisa)
            localStorage.setItem('produtoPesquisado', produtoPesquisado)
        })

        divImg.style.backgroundImage = 'url(assets/img/ofertas/GabineteTdaggerRosa/gabinete-gamer-t-dagger-p03p-mid-tower-rgb-pink-atx-sem-fonte-sem-fan-tgc-p03p_114992.jpg)'
        strong.innerText = 'Gabinete Rosa'
        p.innerText = 'Marca: T Dagger, lateral em acrilico, RGB frontal'

    } else if(num == 2) {
        localImg.href = 'pagProduto.html'
        localImg.addEventListener('click', () => {
            pesquisa = ['Mouse', 4]
            const produtoPesquisado = JSON.stringify(pesquisa)
            localStorage.setItem('produtoPesquisado', produtoPesquisado)
        })

        divImg.style.backgroundImage = 'url(assets/img/ofertas/MouseGamerInfernal/mouseRedragon.png)'
        strong.innerText = 'Mouse Gamer Infernal'
        p.innerText = 'Marca: Redragon, diversos efeitos e cores, 8 Botões 16.000 DPI, Cabo: 1.8m'

    } else if(num == 3) {
        localImg.href = 'pagProduto.html'
        localImg.addEventListener('click', () => {
            pesquisa = ['Gabinetes', 5]
            const produtoPesquisado = JSON.stringify(pesquisa)
            localStorage.setItem('produtoPesquisado', produtoPesquisado)
        })

        divImg.style.backgroundImage = 'url(assets/img/ofertas/GabineteGamerMarsM1/gabinete-gamer-gamdias-mars-m1-mid-tower-s-fan-vidro-temperado-black-s-fonte_133657.jpg)'
        strong.innerText = 'Gabinete Mars M1 '
        p.innerText = 'Marca: Gamdias, lateral em vidro temperado, RGB Frontal, não incluso as fans'

    } else if(num == 4) {
        localImg.href = 'pagProduto.html'
        localImg.addEventListener('click', () => {
            pesquisa = ['Controles', 7]
            const produtoPesquisado = JSON.stringify(pesquisa)
            localStorage.setItem('produtoPesquisado', produtoPesquisado)
        })

        divImg.style.backgroundImage = 'url(assets/img/ofertas/ControlePs3/2906190795_1GG.jpg)'
        strong.innerText = 'Controle PS3'
        p.innerText = 'Controle PS3 padrão para aparelho de video game PlayStation 3 no consagrado formato ergonomico'
        
    }  else if(num == 5) {
        localImg.href = 'pagProduto.html'
        localImg.addEventListener('click', () => {
            pesquisa = ['Outros', 14]
            const produtoPesquisado = JSON.stringify(pesquisa)
            localStorage.setItem('produtoPesquisado', produtoPesquisado)
        })

        divImg.style.backgroundImage = 'url(assets/img/ofertas/FitaLEd/fita-3d-11-c9ad4c28a90baf04df16137000811895-1024-1024.jpeg)'
        strong.innerText = 'Fita Led'
        p.innerText = 'Fita Led + controle + fonte'
        
    } else if(num == 6) {
        localImg.href = 'pagProduto.html'
        localImg.addEventListener('click', () => {
            pesquisa = ['Outros', 14]
            const produtoPesquisado = JSON.stringify(pesquisa)
            localStorage.setItem('produtoPesquisado', produtoPesquisado)
        })

        divImg.style.backgroundImage = 'url(assets/img/ofertas/FitaLEd/615HDJQJ+6S._AC_SY450_.jpg)'
        strong.innerText = 'Fita Led'
        p.innerText = 'Fita Led + controle + fonte'
        
    } else if(num == 7) {
        localImg.href = 'pagProduto.html'
        localImg.addEventListener('click', () => {
            pesquisa = ['Controles', 7]
            const produtoPesquisado = JSON.stringify(pesquisa)
            localStorage.setItem('produtoPesquisado', produtoPesquisado)
        })

        divImg.style.backgroundImage = 'url(assets/img/ofertas/ControleXboxsemfio/235132374_1GG.jpg)'
        strong.innerText = 'Controle Xbox'
        p.innerText = 'controle sem fio, possui iluminação de LED para identificação do jogador, sistema de vibração e design anatômico;'
        
    } else if(num == 8) {
        localImg.href = 'pagProduto.html'
        localImg.addEventListener('click', () => {
            pesquisa = ['Teclados', 3]
            const produtoPesquisado = JSON.stringify(pesquisa)
            localStorage.setItem('produtoPesquisado', produtoPesquisado)
        })

        divImg.style.backgroundImage = 'url(assets/img/ofertas/TecladoKumaraRGB/teclado-redragon-kumara-rgb-k552-02.png)'
        strong.innerText = 'Teclado Mecanico Kumara'
        p.innerText = 'Marca: Redragon, iluminação RGB'
        
    } else {
        localImg.href = 'pagProduto.html'
        localImg.addEventListener('click', () => {
            pesquisa = ['Coolers', 13]
            const produtoPesquisado = JSON.stringify(pesquisa)
            localStorage.setItem('produtoPesquisado', produtoPesquisado)
        })

        divImg.style.backgroundImage = 'url(assets/img/ofertas/WaterCooler/water-cooler-gamdias-chione-e2-120-lite-controlador-argb-120mm-intel-amd_104384.jpg)'
        strong.innerText = 'Water Cooler'
        p.innerText = 'Water Cooler Iluminação RGB'
    } 

    localImg.appendChild(divImg)
    divP.appendChild(localImg)
    divP.appendChild(strong)
    divP.appendChild(p)
    ofertas.appendChild(divP)
}

//! Sliders
let slide = document.querySelector('.slideshow-wrapper')
let btnSlide1 = document.getElementsByClassName('slide-btn-1')[0]
let btnSlide2 = document.getElementsByClassName('slide-btn-2')[0]
let anin = 0
let stop = false

setInterval( function animacao() {
    if(stop == false) {
        if(anin < 300) {
            anin += 100
            
        } else {
            anin = 0
        }
    
        slide.style.left = `-${anin}%`
    }
}, 3500);

function btnSliderE() {
    if(anin > 0) {
        stop = true
        anin -= 100
        slide.style.left = `-${anin}%`
        btnSlide2.style.display = 'block'
    }
}

function btnSliderD() {
    if(anin < 300) {
        stop = true
        anin += 100
        slide.style.left = `-${anin}%`
        btnSlide1.style.display = 'block'

    }
}

setInterval(() => {
    //! Vai controlar qunado o bnt1 vai aparecer ou sumir
    if(anin == 0) {
        btnSlide1.style.display = 'none'

    } else {
        btnSlide1.style.display = 'block'
    } 

    //! Vai controlar qunado o bnt2 vai aparecer ou sumir
    if(anin == 300) {
        btnSlide2.style.display = 'none'

    } else {
        btnSlide2.style.display = 'block'
    }
}, 500);

document.addEventListener('click', (el) => {
    let e = el.target.className
    if(e != 'slide-btn slide-btn-1' && e != 'slide-btn slide-btn-2') {
        stop = false
    }
})