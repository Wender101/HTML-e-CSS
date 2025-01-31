//! Vai pegar do browser o produto que foi salvo
const sobreProduto1 = localStorage.getItem('sobreProduto')
const sobreProduto2 = JSON.parse(sobreProduto1)
let idp
let okay = false

//! Vai usar a URL da pág como guía para encontrar o produto
function urlPage() {
    let url = window.location.href

    if (sobreProduto2 != null && url.substr(-1) == 'l') {
        let url = `${window.location.href}#${sobreProduto2}`
        window.location.href = url
        location.reload()

    } else if(sobreProduto2 == null && url.substr(-1) == 'l' || url.substr(-1) == 'r') {
        if(url.substr(-1) != 'r') {
            let url = `${window.location.href}#error`
            window.location.href = url
        }  
    } else if(sobreProduto2 == null && url.substr(-1) != 'l') {
        for(let c = 0; c < 200; c++) {
            let a = url.substr(-c)
            let ab = c.toString()
            let ac = ab.length + 1
            let a2 = a.substr(-ac)
            let a3 = `#${c}`
            
            if(a2 == 1) {
                if(url.substr(-2) == '#1') {
                    a2 = `#${a2}`
                }
            }
            
            if(a2 == a3 ) {
                let gg = ac - 1
                b = a2.substr(-gg)
                idp = b
                localStorage.setItem('sobreProduto', idp)
                return
            }
        }

    } else {
        for(let c = 0; c < 200; c++) {
            let a = url.substr(-c)
            let ab = c.toString()
            let ac = ab.length + 1
            let a2 = a.substr(-ac)
            let a3 = `#${c}`
            
            if(a2 == 1) {
                if(url.substr(-2) == '#1') {
                    a2 = `#${a2}`
                }
            }
            
            if(a2 == a3 ) {
                let gg = ac - 1
                b = a2.substr(-gg)
                idp = b
                localStorage.setItem('sobreProduto', idp)
                return idp
            }
        }
    }
} urlPage()

setTimeout(() => {
    let desc = document.getElementById('desc').innerText
    if(desc == 'Conectando ao banco de dados ;)') {
        document.getElementById('titulo').innerText = 'Algo deu errado :('
        document.getElementById('desc').innerText = 'Parece que nenhum produto foi encotrado. Volte para página anterior e tente novamente.'
        document.getElementById('otherImgs').style.display = 'none'
        let imgProduto = document.getElementById('imgProduto')
        imgProduto.src = 'assets/img/site/error.png'
        imgProduto.style.right = 'auto'
        imgProduto.style.top = '30%'
        imgProduto.style.marginLeft = '50%'
        imgProduto.style.transform = 'translate(-35%)'

        let btnContato = document.getElementById('btnContato')
        let btnContatoBtn = document.getElementById('btnContato').querySelector('button')
        
        btnContato.target = '_self'

        document.getElementById('btns').style.display = 'flex'
        document.getElementById('btns').getElementsByTagName('a')[0].querySelector('button').innerText = 'Voltar'
        btnContato.style.margin = 'auto'
        btnContato.addEventListener('click', () => {
            if(btnContatoBtn.innerText == 'Voltar') {
                window.history.back()

                setTimeout(() => {
                    location.reload()
                }, 500)
            }
        })
        document.getElementById('btnCarrinho').style.display = 'none'
        return
    }
}, 8000)

let classeProduto
db.collection('Produtos').onSnapshot((data) => {
    data.docs.map(function(val) {

        let p = val.data()

        if(p.id == idp) {
            classeProduto = p.classe
            construirProduto(p.nome, p.desc, p.imagem1, p.imagem2, p.id, p.valor, p.desconto, p.tipoDesconto)
            localStorage.setItem('sobreProduto', p.id)

            document.getElementById('valorDoProduto').style.display = 'block'

            let btnContato = document.getElementById('btnContato')
        
            document.getElementById('valorDoProduto').style.display = 'block'
            btnContato.target = '_blank'
            document.getElementById('btns').getElementsByTagName('a')[0].querySelector('button').innerText = 'Entrar em Contato'
            btnContato.style.margin = 'auto'
            document.getElementById('btnCarrinho').style.display = 'block'
    
            btnContato.href=`https://api.whatsapp.com/send?phone=+55%2061%2099831-0963&text=Estou interessado nesse produto: id:${p.id}`

            //! Vai fazer com q o produto sejá add automaticamente quando o user logar na conta após clicar em add ao carrinho sem conta
            let checarReload = localStorage.getItem('reload')
            if(checarReload == 'true') {
                addCarrinho()
                localStorage.setItem('reload', false)
            }
        }
    
    })
}) 

//! Vai checar se o produto2 tem algum valor salvo
function construirProduto(nome, desc, imagem1, imagem2, id, valor, desconto, tipoDesconto) {
    if(sobreProduto2 == null) {
        
        document.getElementById('titulo').innerText = 'Algo deu errado :('
        document.getElementById('desc').innerText = 'Parece que nenhum produto foi encotrado. Volte para página anterior e tente novamente.'
        document.getElementById('otherImgs').style.display = 'none'
        let imgProduto = document.getElementById('imgProduto')
        imgProduto.src = 'assets/img/site/error.png'
        imgProduto.style.right = 'auto'
        imgProduto.style.top = '30%'
        imgProduto.style.marginLeft = '50%'
        imgProduto.style.transform = 'translate(-35%)'

        let btnContato = document.getElementById('btnContato')
        let btnContatoBtn = document.getElementById('btnContato').querySelector('button')
        btnContatoBtn.innerText = 'Voltar'
        btnContato.style.margin = 'auto'
        btnContato.addEventListener('click', () => {
            if(btnContatoBtn.innerText == 'Voltar') {
                window.history.back()

                setTimeout(() => {
                    location.reload()
                }, 500)
            }
        })
        document.getElementById('btnCarrinho').style.display = 'none'


    } else {

        document.querySelector('title').innerText = nome

        const imgProduto = document.getElementById('imgProduto')
        imgProduto.src = imagem1
        
        //! img1
        let img1 = document.getElementById('img1')
        img1.src = imagem1

        // * Vai alterar a img principal para a img1
        img1.addEventListener('click', () => {
            imgProduto.src = img1.src
            zoom()
        })

        //! img2
        let img2 = document.getElementById('img2')
        img2.src = imagem2

        // * Vai alterar a img principal para a img2
        img2.addEventListener('click', () => {
            imgProduto.src = img2.src
            zoom() 
        })
        

        //! Vai add o titulo e a descrição
        let titulo = document.getElementById('titulo')
        titulo.className = ''
        titulo.innerText = nome
        document.getElementById('btns').style.display = 'flex'
        document.getElementById('desc').innerText = desc
        
        if(valor != undefined && desconto != undefined) {
            //! Vai calcular o valor com o desconto implementado
            let valor2 = parseFloat(valor)
            let desconto2 = parseFloat(desconto)
            let ValorComDesconto = (((desconto2 * valor2) / 100) - valor2) * -1
            
            //! Vai add os valores
            document.getElementById('valorNormal').innerText = `R$${valor2.toFixed(2)}`
            document.getElementById('valor').innerText = `R$${ValorComDesconto.toFixed(2)}`
            document.getElementById('qDesconto').innerText = `${desconto} OFF`
        }

        //! Vai enviar uma msg ao vendedor informando qual é o produto
        let btnContato = document.getElementById('btnContato')
        
        document.getElementById('otherImgs').style.display = 'block'
        btnContato.target = '_blank'
        let btnContatoBtn = document.getElementById('btnContato').querySelector('button')
        btnContatoBtn.innerText = 'Voltar'
        btnContato.addEventListener('click', () => {
            if(btnContatoBtn.innerText == 'Voltar') {
                window.history.back()

                setTimeout(() => {
                    location.reload()
                }, 500)
            }
        })
        document.getElementById('btnCarrinho').style.display = 'block'

        //! Vai criar o efeito de zoom nas imgs
        function zoom() {

            let small = document.querySelector("#small")
            let mask = document.querySelector("#mask")
            let big = document.querySelector("#big")
            let bigImg = document.querySelector("#big>img")
            let imgProduto = document.querySelector("#imgProduto")
        
            bigImg.src = imgProduto.src

            small.addEventListener("mouseenter",function(){
                if(document.defaultView.innerWidth > 700) {
                    big.style.display = "block" 
                }
            })
            small.addEventListener("mouseleave",function(){
                big.style.display = "none" 
            })

            small.addEventListener("mousemove",function(event){
                try {
                    let pos = small.getBoundingClientRect()
                    let x = event.clientX -pos.x 
                    let y = event.clientY - pos.y 
            
                    if( x< 100 ){ x = 100}
                    if( x > 400 ){  x = 400}
            
                    ( y < 100 )&&( y = 100 )
                    ( y > 400 )&&( y = 400 )
            
                    mask.style.left = (x-100) + "px"
                    mask.style.top = (y-100) + "px"
            
                    bigImg.style.left = -(x-100)*2+"px"
                    bigImg.style.top = -(y-100)*2+"px"

                } catch {}
            })
        } zoom()
    }
}

//! Vai pegar do BD o carrinho
let arrayCarrinho = []
let carrinhoCarregado = false
let carrinhoCarregado2 = false
auth.onAuthStateChanged((valEmail) => {
    db.collection('Carrinho').onSnapshot((data) => {
        setTimeout(() => {
            document.getElementById('carregando').style.display = 'none'
        }, 900)
        data.docs.map(function(valCarrinho) {
            let p = valCarrinho.data()

            try {
                if(p.email == valEmail.email && carrinhoCarregado == false) {
                    for(let c = 0; c < p.carrinho.length; c++) {
                        try {
                            let objCarrinhoBD = {
                                id: p.carrinho[c].id
                            }

                            arrayCarrinho.push(objCarrinhoBD)
                            
                        } catch {
                            return
                        }   
                    }
                    carrinhoCarregado = true
                }

                //! Vai possibilitar que pessoas que logaram qnd foi add o produto possa add dps de logar
                if(carrinhoCarregado2 == false) {
                    carrinhoCarregado2 = true
                    document.getElementById('btnCarrinho').addEventListener('click', () => {
                        addCarrinho()
                    })
                }

            } catch {
                document.getElementById('btnCarrinho').addEventListener('click', () => {
                    login()
                })
            }
        })
    })
})

// //! Vai add ao carrinho
let checkEmail = false
let checkCarrinho = false
let idProdutoCarrinho
function addCarrinho(addNovamente = false) {
    let feito = false
    db.collection('Produtos').onSnapshot((data) => {
        data.docs.map(function(valProduto) {
            let p = valProduto.data()
            
            //! Vai fazer com que apenas o produto especionado sejá adicionado ao carrinho
            if(p.id == idp) {

                let objCarrinho = {
                    id: p.id
                }

                //! Essas funções vão checar se o usuario já tem produtos no carrinho
                checarEmail()
                checarCarrinho(p.id)
                
                //! pegar o email do user
                setTimeout(() => {
                    auth.onAuthStateChanged((valEmail) => {

                        if(feito == false) {
                            //! Caso o user não tenha nenhum produto no carrinho
                            if(checkEmail == false && checkCarrinho == false) {
                                arrayCarrinho.push(objCarrinho)
                                let car = {
                                    email: valEmail.email,
                                    carrinho: arrayCarrinho
                                }
            
                                db.collection('Carrinho').add(car)
                                document.getElementById('carregando').style.display = 'flex'
                                anim()
                                feito = true
            
                                //! Caso o user já tenha um produto no carrinho, mas sejá diferente do que ele vai add agr
                            } else if(checkEmail == true && checkCarrinho == false) {
                                arrayCarrinho.push(objCarrinho)
                                db.collection('Carrinho').doc(idProdutoCarrinho).update({carrinho: arrayCarrinho})
                                document.getElementById('carregando').style.display = 'flex'
                                anim()
                                feito = true
            
                                //! Caso esse produto já esteja no carrinho e o user n queira add novamente
                            } else if(checkEmail == true && checkCarrinho == true && addNovamente == false) {
                                document.getElementById('infAddCarrinho').style.display = 'flex'
                                feito = true

                                //! Caso esse produto já esteja no carrinho e o user queira add novamente
                            } else if(checkEmail == true && checkCarrinho == true && addNovamente == true) {
                                arrayCarrinho.push(objCarrinho)
                                db.collection('Carrinho').doc(idProdutoCarrinho).update({carrinho: arrayCarrinho})
                                document.getElementById('carregando').style.display = 'flex'
                                anim()
                                feito = true
                            }
    
                            feito = true
                            return
                        }
                    })
                }, 300);
            }
        })     
    })
}

function anim() {
    document.getElementById('carrinho').className = 'animation'
    setTimeout(() => {
        document.getElementById('carrinho').className = ''
    }, 800)
}

//! Vai checar se o email do user existe no carrinho do banco de dados
let feito2 = false
function checarEmail() {
    auth.onAuthStateChanged((valEmail) => {
        db.collection('Carrinho').onSnapshot((data) => {
            data.docs.map(function(valCarrinho) {
                if(feito2 == false && valEmail.email == valCarrinho.data().email) {
                    checkEmail = true
                    idProdutoCarrinho = valCarrinho.id
                    feito2 = true
                }
            })
        })
    })
}

//! Vai checar se o produto já existe no carrinho
let feito3 = false
function checarCarrinho(id) {
    auth.onAuthStateChanged((valEmail) => {
        db.collection('Carrinho').onSnapshot((data) => {
            data.docs.map(function(valCarrinho) {
                for(let c = 0; c <= valCarrinho.data().carrinho.length; c++) {
                    try {
                        if(feito3 == false && valEmail.email == valCarrinho.data().email && valCarrinho.data().carrinho[c].id == id) {
                            checkCarrinho = true
                            feito3 = true
                        }

                    } catch {}
                }
            })
        })
    })
}

// //! Vai fachar a section que informa que o produto já está em seu carrinho
function fecharInfCarrinho() {
    document.getElementById('infAddCarrinho').style.display = 'none'
}

//! Vai adicionar o produto de novo no carrinho
function addAgain() {
    addCarrinho(true)
    fecharInfCarrinho()
}

// //! Vai colocar na tela produtos relacionados ao escolhido
function relacionados() {
    let arrayProduto = []
    let feito = false
    
    db.collection('Produtos').onSnapshot((data) => {
        data.docs.map(function(valProduto) {
            let p = valProduto.data()
            
            try {
                
                if(p.classe == classeProduto) {
                    let objProduto = {
                        classe: p.classe,
                        imagem1: p.imagem1,
                        imagem2: p.imagem2,
                        nome: p.nome,
                        desc: p.desc,
                        id: p.id
                    }
                    
                    arrayProduto.push(objProduto)
                }
                
            } catch {}
            
            setTimeout(() => {
                // //! Vai sortear 4 números direfentes correspontes aos produtos
                let numeros = []
                let max = 4
                if(arrayProduto.length < 4) max = arrayProduto.length
                
                function numeroAleatorio() {
                    while (numeros.length < max) {
                        let aleatoreo = Math.floor(Math.random() * arrayProduto.length)
                        
                        if (numeros.indexOf(aleatoreo) == -1) numeros.push(aleatoreo)
                    }
                } numeroAleatorio()
                
                if(feito == false) {
                    for(let c = 0; c < max; c++) {
                        let num = numeros[c]
                        
                        try {
                            document.getElementById('h1Relacionados').innerText = 'Relacionados'
                            let ProdutosRelacionados = document.getElementById('ProdutosRelacionados')
                            let containerProduto = document.createElement('div')
                            let localImgProduto = document.createElement('a')
                            let imgProduto = document.createElement('img')
                            let strong = document.createElement('strong')
                            let p = document.createElement('p')
                
                            containerProduto.className = 'containerProduto'
                            localImgProduto.className = 'localImgProduto'
                            localImgProduto.href = 'sobre-o-produto.html'
                            imgProduto.className = 'imgProduto'
                            imgProduto.id = arrayProduto[num].id
                            imgProduto.src = 'assets/img/site/error.png'
                            strong.innerText = 'Algo deu errado!'
                            p.innerText = 'Parece que esse produto não foi carregado corretamente.'
                
                            imgProduto.src = arrayProduto[num].imagem1
                            strong.innerText = arrayProduto[num].nome
                            p.innerText = arrayProduto[num].desc
                
                            //! appendChild
                            containerProduto.appendChild(localImgProduto)
                            localImgProduto.appendChild(imgProduto)
                            containerProduto.appendChild(strong)
                            containerProduto.appendChild(p)
                            ProdutosRelacionados.appendChild(containerProduto)

                            //!Vai trocar a img do produto ao passar o mouse em cima
                            imgProduto.addEventListener('mouseenter', () => {
                                imgProduto.src = arrayProduto[num].imagem2
                            })

                            imgProduto.addEventListener('mouseout', () => {
                                imgProduto.src = arrayProduto[num].imagem1
                            })
                                        
                            //! Vai add a memoria qual produto vai ser analizado pelo usuario
                            localImgProduto.addEventListener('click', () => {
                                localStorage.setItem('sobreProduto', arrayProduto[num].id)
                            })
                
                        } catch {}
                        feito = true
                    }
                }
            }, 1000)
        })
    })
} relacionados()