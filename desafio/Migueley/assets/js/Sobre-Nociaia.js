function slug() {
    let urlPage = window.location.href
    if(location.host == '127.0.0.1:5500') {
        urlPage = urlPage.replace('http://127.0.0.1:5500/Sobre-Noticia.html?=', "")

    } else {
        urlPage = urlPage.replace('https://wender101.github.io/html-css/desafio/Migueley/Sobre-Noticia.html?=', "")
    }

    db.collection('UsersMigueley').onSnapshot((data) => {
        data.docs.map(function(valor) {
            let UsersMigueley = valor.data()

            
            for (let c = 0; c < UsersMigueley.Noticias.length; c++) {
                let TextoSlug = UsersMigueley.Noticias[c].Texto.toLocaleLowerCase()
                TextoSlug = TextoSlug.normalize('NFD').replace(/[\u0300-\u036f]/g, "") //? Vai remover os acentos
                TextoSlug = TextoSlug.replace(/\s/g, '') //? Vai remover os espaços

                if(urlPage == TextoSlug) {
                    document.querySelector('#tituloNoticia').innerHTML = UsersMigueley.Noticias[c].Titulo
                    document.querySelector('#textoNoticia').innerHTML = UsersMigueley.Noticias[c].Texto
                    document.querySelector('#imgNoticia').src = UsersMigueley.Noticias[c].Img
                }
            }
        })
    })
} slug()

//? Carregar noticias criadas
function carregarNoticiasCriadas() {
    db.collection('UsersMigueley').onSnapshot((data) => {
        data.docs.map(function(valor) {
            let UsersMigueley = valor.data()
            
            if(UsersMigueley.EmailUser == email) {
                let secontStap = document.querySelector('#secontStap')

                for (let c = 0; c < UsersMigueley.Noticias.length; c++) {
                    let div = document.createElement('div')
                    let img = document.createElement('img')
                    let div2 = document.createElement('div')
                    let h2 = document.createElement('h2')

                    div.className = 'maisNoticias'

                    img.src = UsersMigueley.Noticias[c].Img
                    h2.innerText = UsersMigueley.Noticias[c].Titulo

                    div.appendChild(img)
                    div2.appendChild(h2)
                    div.appendChild(div2)
                    secontStap.appendChild(div)

                    //? Função de click
                    div.addEventListener('click', () => {
                        let TextoSlug = UsersMigueley.Noticias[c].Texto.toLocaleLowerCase()
                        TextoSlug = TextoSlug.normalize('NFD').replace(/[\u0300-\u036f]/g, "") //? Vai remover os acentos
                        TextoSlug = TextoSlug.replace(/\s/g, '') //? Vai remover os espaços
                        window.location.href = `Sobre-Noticia.html?=${TextoSlug}`
                    })
                }
            }
        })
    })
} carregarNoticiasCriadas()