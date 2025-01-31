//! Vai pegar do browser o produto que foi salvo
const sobreProduto1 = localStorage.getItem('sobreProduto')
const conect = localStorage.getItem('conectado')
const conectado = JSON.parse(conect)
const sobreProduto2 = JSON.parse(sobreProduto1)
let idProdSelecionado = sobreProduto2[1]
let descProdSelecionado = sobreProduto2[0]
let urlSemProduto
let pesquisado = false
let errorProduto = false
//? Vai mudar a url
function trocarURL() {
    if(document.querySelector('title').innerText != 'EDStore - Produtos' && pesquisado == false) {
        pesquisado = true
        let url = window.location.href
        if(url.substr(-4) != 'html' && url.substr(-1) != '?') {
            for(let c = 0; c < 150; c++) {
                let a = url.substr(-c)
                if(a.substr(1, 1) == '?') {
                    let ab = c - 2
                    descProdSelecionado = url.substr(-ab)
                    let pDescEnviar = descProdSelecionado
                    pDescEnviar = pDescEnviar.replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, ' ').toLowerCase()
                    pDescEnviar = pDescEnviar.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
                    pDescEnviar = pDescEnviar.replace(/^\s+|\s+$/gm,'')
                    pDescEnviar = pDescEnviar.replace(/\s+/g, '-')
                    let array = [pDescEnviar, idProdSelecionado]
                    localStorage.setItem('sobreProduto', JSON.stringify(array))
                    urlSemProduto = window.location.href.replace(`?${descProdSelecionado}`, '')
                }
            }
        } else if(sobreProduto2[0] != undefined && sobreProduto2[0] != null && url.substr(-1) == 'l') {
            descProdSelecionado = descProdSelecionado.replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, ' ').toLowerCase()
            descProdSelecionado = descProdSelecionado.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
            descProdSelecionado = descProdSelecionado.replace(/^\s+|\s+$/gm,'')
            descProdSelecionado = descProdSelecionado.replace(/\s+/g, '-')
            window.location.href += '?' + descProdSelecionado
            trocarURL()

        } else if(sobreProduto2[0] != undefined && sobreProduto2[0] != null && url.substr(-1) != 'l') {
            descProdSelecionado = descProdSelecionado.replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, ' ').toLowerCase()
            descProdSelecionado = descProdSelecionado.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
            descProdSelecionado = descProdSelecionado.replace(/^\s+|\s+$/gm,'')
            descProdSelecionado = descProdSelecionado.replace(/\s+/g, '-')
            window.location.href += descProdSelecionado
            trocarURL()

        } else {
            console.log('else da função');
            errorProd()
        }
    } 
} trocarURL()

function criaProduto() {
    db.collection('Produtos').onSnapshot((data) => {
        data.docs.map(function(val) {
            let Produtos = val.data()

            //? Caso o user tenha se conectado a conta google dps de clicar em salvar ao carrinho, o produto sera salvo altomatico após o reload
            try {
                let reloadPage = localStorage.getItem('reloadPage')

                if(reloadPage == '1') {
                    localStorage.setItem('reloadPage', '2')
                    salvarNoCarrinho()
                }
            } catch (error) {}

            //? Vai pesquisar de acordo com a Url
            let pDesc = Produtos.Desc
            pDesc = pDesc.replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, ' ').toLowerCase()
            pDesc = pDesc.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
            pDesc = pDesc.replace(/^\s+|\s+$/gm,'')
            pDesc = pDesc.replace(/\s+/g, '-')

            //? Vai criar os produtos
            if(pDesc == descProdSelecionado && Produtos.Estado != 'Suspenso' || pDesc == descProdSelecionado && conectado == true) {
                idProdSelecionado = Produtos.Id
                document.getElementById('valorDoProduto').style.display = 'block'
                document.getElementById('localBtns').style.display = 'flex'
                document.getElementById('othersImgs').style.display = 'block'
                document.getElementById('chat').style.display = 'block'
                document.getElementById('descricaoDetalhada').style.display = 'block'
                document.getElementsByClassName('text')[0].style.display = 'block'
                document.getElementById('infos').style.position = ''
                document.getElementById('voltar').style.display = 'none'

                if(conectado == true && Produtos.Estado == 'Suspenso') {
                    document.getElementById('suspensoAvisoPageProduto').style.display = 'block'
                }

                //? --------------------------------
                document.getElementById('imgPrincipal').src = Produtos.Img1 
                document.getElementById('imgSecundaria').src = Produtos.Img1 
                document.getElementsByClassName('imgEX')[0].src = Produtos.Img1 
                document.getElementsByClassName('imgEX')[1].src = Produtos.Img2
                document.getElementsByClassName('imgEX')[2].src = Produtos.Img3
                document.getElementsByClassName('imgEX')[3].src = Produtos.Img4
                document.getElementsByClassName('nameProd')[0].innerText = Produtos.Nome
                document.getElementById('desc').innerText = Produtos.Desc

                if(Produtos.DescDetalhada != undefined && Produtos.DescDetalhada != 'undefined') {
                    document.getElementById('descricaoP').innerHTML = Produtos.DescDetalhada
                } else {
                    document.getElementById('descricaoP').innerHTML = 'Este produto não contém uma descrição mais detalhado do produto ;/'
                }

                let valorComDesconto = (((Produtos.Desconto * Produtos.Valor) / 100) - Produtos.Valor) * -1
                var res = valorComDesconto

                if(Produtos.Desconto != 0) {
                    res = (Produtos.Valor - valorComDesconto) + valorComDesconto
                }

                document.getElementById('valorNormal').innerText = 'R$' + res.toFixed(2)
                document.getElementsByClassName('valorProdAdd')[0].innerText = 'R$' + valorComDesconto.toFixed(2)
                if(Produtos.Desconto <= 0) {
                    document.getElementById('qDesconto').innerText = ' 0% OFF'
                } else {
                    document.getElementById('qDesconto').innerText = Produtos.Desconto + '% OFF'
                }
                //Produtos.Id

                produtosRelacionados(Produtos.Nome, Produtos.Categoria)

                //? Funções de click
                for (let c = 0; c < 4; c++) {
                    let imgClick = document.getElementsByClassName('imgEX')[c]
                    imgClick.addEventListener('mouseenter', () => {
                        document.getElementById('imgPrincipal').src = imgClick.src
                        document.getElementById('imgSecundaria').src = imgClick.src
                    })
                }

            } else if(pDesc == descProdSelecionado && Produtos.Estado == 'Suspenso') {
                document.querySelector("#imgPrincipal").src = 'assets/img/site/error2.png'
                document.querySelector("#imgSecundaria").src = 'assets/img/site/error2.png'
                document.getElementsByClassName('nameProd')[0].innerText = 'Ops'
                document.getElementById('desc').innerText = 'O Produto se encontra suspenso ou fora de estoque. Tente novamente mais tarde.'
                document.getElementById('valorDoProduto').style.display = 'none'
                document.getElementById('localBtns').style.display = 'none'
                document.getElementById('othersImgs').style.display = 'none'
                document.getElementById('chat').style.display = 'none'
                document.getElementById('descricaoDetalhada').style.display = 'none'
                document.getElementsByClassName('text')[0].style.display = 'none'
                document.getElementById('infos').style.position = 'relative'
                document.getElementById('voltar').style.display = 'block'

                document.getElementById('voltar').addEventListener('click', () => {
                    window.history.back()
                })
            }
        })
    })
} criaProduto()

 //? Vai criar o efeito de zoom nas imgs
 function zoom() {

    let small = document.querySelector("#small")
    let mask = document.querySelector("#mask")
    let big = document.querySelector("#big")
    let bigImg = document.querySelector("#big>img")
    let imgProduto = document.querySelector("#imgPrincipal")

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

//? Caso o produto não seje encontrado
function errorProd() {
    if(errorProduto == false) {
        errorProduto = true

        document.querySelector("#imgPrincipal").src = 'assets/img/site/produtonaoencontrado.jpg'
        document.querySelector("#imgSecundaria").src = 'assets/img/site/produtonaoencontrado.jpg'
        document.getElementsByClassName('nameProd')[0].innerText = 'Ops'
        document.getElementById('desc').innerText = 'O produto não foi encontrado.'
        document.getElementById('valorDoProduto').style.display = 'none'
        document.getElementById('localBtns').style.display = 'none'
        document.getElementById('othersImgs').style.display = 'none'
        document.getElementById('chat').style.display = 'none'
        document.getElementById('descricaoDetalhada').style.display = 'none'
        document.getElementsByClassName('text')[0].style.display = 'none'
        document.getElementById('infos').style.position = 'relative'
        document.getElementById('voltar').style.display = 'block'
        document.getElementById('voltar').addEventListener('click', () => {
            window.history.back()
        })
    }
}

//? Vai criar os produtos relacionados
let relacionadosCarregado = false
function produtosRelacionados(relacionados = '', classeProd = '') {
    let arrayProd = []
    let kdPalavra = relacionados.split(' ')
    let max = 0
    for(let c = 0; c < relacionados.length; c++) {
        let palavraSeparada = kdPalavra[c]

        db.collection('Produtos').onSnapshot((data) => {
            data.docs.map(function(val) {
                let Produtos = val.data()

                if(relacionadosCarregado == false) {
                    setTimeout(() => {
                        relacionadosCarregado = true
                    }, 1500)
                    try {
                        palavraSeparada = palavraSeparada.toLocaleLowerCase()
                        palavraSeparada = palavraSeparada.normalize('NFD').replace(/[\u0300-\u036f]/g, "") //? Vai remover os acentos
                        palavraSeparada = palavraSeparada.replace(/\s/g, '') //? Vai remover os espaços
                    } catch (error) {}
                    
    
                    let nome = Produtos.Nome
                    nome = nome.toLocaleLowerCase()
                    nome = nome.normalize('NFD').replace(/[\u0300-\u036f]/g, "") //? Vai remover os acentos
                    nome = nome.replace(/\s/g, '') //? Vai remover os espaços
            
                    let desc = Produtos.Desc
                    desc = desc.toLocaleLowerCase()
                    desc = desc.normalize('NFD').replace(/[\u0300-\u036f]/g, "") //? Vai remover os acentos
                    desc = desc.replace(/\s/g, '') //? Vai remover os espaços
                    
                    if(nome.includes(palavraSeparada) && max < 6 || desc.includes(palavraSeparada) && max < 6 || Produtos.Categoria.includes(classeProd) && max < 6) {
                        max++
                        let igual = false
                        //? Vai impedir que os produtos se repitam
                        for(let b = -1; b < arrayProd.length; b++) {
                            if(arrayProd[b] == Produtos.Nome) {
                                igual = true
                            } else if(b + 1 == arrayProd.length && igual == false) {
                                if(Produtos.Estado != 'Suspenso') {
                                    arrayProd.push(Produtos.Nome)
                                    criaRelacionados(Produtos.Img1, Produtos.Img2, Produtos.Img3, Produtos.Img4, Produtos.Nome, Produtos.Desc , Produtos.Valor, Produtos.Desconto, Produtos.Id)
                                }
                            }
                        }
                    }
                }
            })
        })
    }
}

function criaRelacionados(Img1 ,Img2, Img3, Img4, Nome, Desc, Valor, Desconto, Id) {
    let relacionadosLocal = document.getElementById('relacionadosLocal')
    let prod = document.createElement('div')
    let localImg = document.createElement('div')
    let imgProduto = document.createElement('img')
    let sobreProd = document.createElement('div')
    let nameProd = document.createElement('p')
    let p = document.createElement('p')
    let valorStrong = document.createElement('strong')
    let valorSemDescontoT = document.createElement('span')
    let valorSalvo = document.createElement('span')
    let descontoPartProd = document.createElement('div')
    let spanDesconto = document.createElement('span')

    //? Class
    prod.className = 'prod'
    descontoPartProd.className = 'descontoPartProd'
    localImg.className = 'localImg'
    imgProduto.className = 'imgProduto'
    sobreProd.className = 'sobreProd'
    nameProd.className = 'nameProd'
    valorStrong.className = 'valor'
    valorSemDescontoT.className = 'valorSemDescontoT'
    valorSalvo.className = 'valorSalvo'

    //?---
    imgProduto.src = Img1
    nameProd.innerText = Nome

    if(Desconto > 0) {
        prod.style.borderRadius = ' 0px 70px 0px 0px'
        localImg.style.borderRadius = ' 0px 16px 0px 0px'
        spanDesconto.innerText = `${Desconto}% OFF`
        descontoPartProd.style.display = 'flex'

    } else {
        valorSalvo.style.opacity = '0'
        valorSemDescontoT.style.opacity = '0'
    }

    if(Desconto <= 0) {
        Desconto = 0
    }
    let valorComDesconto = (((Desconto * Valor) / 100) - Valor) * -1
    var res = valorComDesconto
    if(Desconto != 0) {
        res = (Valor - valorComDesconto) + valorComDesconto
    }

    valorStrong.innerText = 'R$' + valorComDesconto.toFixed(2)
    valorSemDescontoT.innerText = 'R$' + parseInt(Valor).toFixed(2)
    valorSalvo.innerText = 'Salvo - R$' + (res - valorComDesconto).toFixed(2)
    
    //? AppendChild
    p.appendChild(valorStrong)
    p.appendChild(valorSemDescontoT)
    localImg.appendChild(imgProduto)
    sobreProd.appendChild(nameProd)
    sobreProd.appendChild(p)
    sobreProd.appendChild(valorSalvo)
    descontoPartProd.appendChild(spanDesconto)
    prod.appendChild(descontoPartProd)
    prod.appendChild(localImg)
    prod.appendChild(sobreProd)
    relacionadosLocal.appendChild(prod)

    //? Funções de click
    prod.addEventListener('click', () => {
        let pDescEnviar = Desc
        pDescEnviar = pDescEnviar.replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, ' ').toLowerCase()
        pDescEnviar = pDescEnviar.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        pDescEnviar = pDescEnviar.replace(/^\s+|\s+$/gm,'')
        pDescEnviar = pDescEnviar.replace(/\s+/g, '-')

        let array = [pDescEnviar, Id]
        localStorage.setItem('sobreProduto', JSON.stringify(array))
        setTimeout(() => {
            if(location.host == '127.0.0.1:5500') {
                location.href = `http://${location.host}${location.pathname}?${pDescEnviar}`
                
            } else if(location.host == 'wender101.github.io') {
                location.href = `https://${location.host}${location.pathname}?${pDescEnviar}`
            }
        }, 100)
    })
}

//? Adicionar o produto ao carrinho
let cloneCarrinho = []
function salvarNoCarrinho(addNovamente = false) {
    let jaTemProdutoADDNoCarrinho = false
    if(email != undefined) {
        let checkTemCarrinho = false
        let carrinhoCarregado = false
        let feito = false
        db.collection('User').onSnapshot((data) => {
            data.docs.map(function(valCarrinho) {
                let User = valCarrinho.data()
    
                //? Caso o usar já tenha um carrinho criado ele vai adicionar o produto direto
                if(User.Email == email && carrinhoCarregado == false) {
                    cloneCarrinho = User.Carrinho
    
                    db.collection('Produtos').onSnapshot((data) => {
                        data.docs.map(function(val) {
                            let Produto = val.data()
    
                            try {
                            if(Produto.Id == idProdSelecionado && cloneCarrinho.length > 0) {
                                    for(let c = 0; c < cloneCarrinho.length; c++) {

                                        if(cloneCarrinho[c].Id == idProdSelecionado && feito == false && checkTemCarrinho == false) {
                                            checkTemCarrinho = true
                                            jaTemProdutoADDNoCarrinho = true
                                            document.getElementById('pop-Up-AddProdutoNovamente').style.display = 'flex'
                                
                                            if(addNovamente == true && feito == false) {
                                                console.log(111);
                                                feito = true
                                                fecharPopUp()
                                                let obj = {
                                                    Id: Produto.Id
                                                }
                                                cloneCarrinho.push(obj)
                                                db.collection('User').doc(valCarrinho.id).update({Carrinho: cloneCarrinho})
                                                document.getElementById('infAddCarrinho').style.bottom = '0px'
                                                setTimeout(() => {
                                                    document.getElementById('infAddCarrinho').style.bottom = '-100px'
                                                }, 10000)
                                            }
                                        } else if(c + 1 == cloneCarrinho.length && jaTemProdutoADDNoCarrinho == false && feito == false) {
                                            feito = true
                                            let obj = {
                                                Id: Produto.Id
                                            }
                                            cloneCarrinho.push(obj)
                                            db.collection('User').doc(valCarrinho.id).update({Carrinho: cloneCarrinho})
                                            document.getElementById('infAddCarrinho').style.bottom = '0px'
                                            setTimeout(() => {
                                                document.getElementById('infAddCarrinho').style.bottom = '-100px'
                                            }, 10000)
                                        }
                                    }

                                } else if(Produto.Id == idProdSelecionado && cloneCarrinho.length <= 0) {
                                    setTimeout(() => {
                                        carrinhoCarregado = true
                                        db.collection('Produtos').onSnapshot((data) => {
                                            data.docs.map(function(val) {
                                                let Produto = val.data()
                    
                                                if(Produto.Id == idProdSelecionado) {
                                                    cloneCarrinho = []
                                                    let obj = {
                                                        Id: Produto.Id
                                                    }
                                                    cloneCarrinho.push(obj)
                    
                                                    db.collection('User').doc(valCarrinho.id).update({Carrinho: cloneCarrinho})
                                                    document.getElementById('infAddCarrinho').style.bottom = '0px'
                                                    setTimeout(() => {
                                                        document.getElementById('infAddCarrinho').style.bottom = '-100px'
                                                    }, 10000)
                                                }
                                            })
                                        })
                                    }, 500)
                                }
                            } catch {
                                setTimeout(() => {
                                    carrinhoCarregado = true
                                    db.collection('Produtos').onSnapshot((data) => {
                                        data.docs.map(function(val) {
                                            let Produto = val.data()
                
                                            if(Produto.Id == idProdSelecionado) {
                                                cloneCarrinho = []
                                                let obj = {
                                                    Id: Produto.Id
                                                }
                                                cloneCarrinho.push(obj)
                
                                                db.collection('User').doc(valCarrinho.id).update({Carrinho: cloneCarrinho})
                                                document.getElementById('infAddCarrinho').style.bottom = '0px'
                                                setTimeout(() => {
                                                    document.getElementById('infAddCarrinho').style.bottom = '-100px'
                                                }, 10000)
                                            }
                                        })
                                    })
                                }, 500)
                            }
                        })
                    })
                }

            })
        })

        //? O user n estaja logado á uma conta google
    } else {
        localStorage.setItem('reloadPage', '1')
        login()
    }
}

//? Vai fechar o pop up
function fecharPopUp() {
    document.getElementById('pop-Up-AddProdutoNovamente').style.display = 'none'
}