let emailEncontrado = false
let cloneContatos = ''
let codigoLocalUser
let codigoPessoal
let feito11 = false
db.collection('SobreUser').onSnapshot((data) => {
    data.docs.map(function(val) {
        let valorSobreUser = val.data()

        try {
            if(valorSobreUser.Sobre.Email == email && emailEncontrado == false) {
                document.getElementById('carregando').style.display = 'none'
                emailEncontrado = true
                codigoLocalUser = val.id
                cloneContatos = valorSobreUser
                codigoPessoal = valorSobreUser.Sobre.Codigo
                let codigoContatoFirst = valorSobreUser.Contatos
    
                //? Vai pegar as infs do contato
                db.collection('SobreUser').onSnapshot((data) => {
                    data.docs.map(function(val) {
                        let valorSobreUser2 = val.data()

                        for(let c = 0; c <= codigoContatoFirst.length; c++) {
                            let ultimaMsgEnviada = ''
                            try {
                                if(valorSobreUser2.Sobre.Codigo == codigoContatoFirst[c].SobreContato.CodigoContato && feito11 == false) {
                                    feito11 = true

                                    for(let b = 0; b < valorSobreUser.Contatos[c].Msgs.length; b++) {
                                        try {
                                            if(valorSobreUser.Contatos[b].Msgs[valorSobreUser.Contatos[b].Msgs.length - 1].MsgContato != undefined) {
                                                ultimaMsgEnviada = valorSobreUser.Contatos[b].Msgs[valorSobreUser.Contatos[b].Msgs.length - 1].MsgContato
                                            } else if(valorSobreUser.Contatos[b].Msgs[valorSobreUser.Contatos[b].Msgs.length - 1].TuaMsg != undefined) {
                                                ultimaMsgEnviada = valorSobreUser.Contatos[b].Msgs[valorSobreUser.Contatos[b].Msgs.length - 1].TuaMsg
                                            }    
                                        } catch {}
                                    }
                                    criaContatos(valorSobreUser2.Sobre.FotoPerfil, valorSobreUser2.Sobre.Nome, ultimaMsgEnviada, valorSobreUser2.Sobre.Recado, valorSobreUser2.Sobre.Codigo)

                                    //? Vai informar que o contato esta bloqueado e impedir de enviar msgs
                                    if(codigoContatoFirst[c].SobreContato.Estado == 'Bloqueado') {
                                        document.querySelector('#barraResponder').style.display = 'none'
                                        document.querySelector('#msgBloqueado').style.display = 'block'
                                        document.querySelector('#bloquearContato').innerText = 'Desbloquear Contato'
                                    }
                                }
                            } catch (error) {}
                        } 
                    })
                })
            }
        } catch {}

        setInterval(() => {
            if(emailEncontrado == false) {
                //? Vai mandar o user para a pagina de login
                if(location.href == 'http://127.0.0.1:5500/home.html') {
                    location.href = 'http://127.0.0.1:5500/login.html'
                    setTimeout(() => {
                        location.reload()
                    }, 100)

                } else if(location.href == 'http://127.0.0.1:5500/Home.html') {
                    location.href = 'http://127.0.0.1:5500/login.html'
                    setTimeout(() => {
                        location.reload()
                    }, 100)
                    
                } else if(location.href == 'https://wender101.github.io/html-css/desafio/SocialMedia/home.html') {
                    location.href = 'https://wender101.github.io/html-css/desafio/SocialMedia/login.html'
                    setTimeout(() => {
                        location.reload()
                    }, 100)
                }
            }
        }, 4000)
        
    })
})

let codigoContatoSelecionado = {}
let ContatoSelecionado
function criaContatos(imagem, nome, ultMsg, recado, codigoContato) {
    let localContatos = document.getElementById('localContatos')
    let contatos = document.createElement('div')
    let lineOnline = document.createElement('div')
    let img = document.createElement('img')
    let localNomeEmsgContato = document.createElement('div')
    let nameContato = document.createElement('strong')
    let ultimaMsg = document.createElement('p')

    //? --
    img.src = imagem
    nameContato.innerText = nome
    ultimaMsg.innerText = ultMsg
    
    //? Classes
    contatos.className = 'contatos'
    lineOnline.className = 'lineOnline'
    localNomeEmsgContato.className = 'localNomeEmsgContato'
    nameContato.className = 'nameContato'
    
    //? AppendChilds
    lineOnline.appendChild(img)
    localNomeEmsgContato.appendChild(nameContato)
    localNomeEmsgContato.appendChild(ultimaMsg)
    contatos.appendChild(lineOnline)
    contatos.appendChild(localNomeEmsgContato)
    localContatos.appendChild(contatos)


    //? fuunções de clique
    contatos.addEventListener('click', () => {
        document.getElementById('localMsg').innerHTML = ''
        document.getElementById('recadoInicial').style.display = 'none'
        document.getElementById('localConversa').style.display = 'block'
        document.getElementById('msg').style.display = 'block'

        document.getElementById('imgContato2').src = imagem
        document.getElementById('nomeContato').innerText = nome

        criaMsg(codigoContato)
        codigoContatoSelecionado = codigoContato

        //? Vai trocar o recado
        ContatoSelecionado = {
            imagem, 
            nome, 
            ultMsg, 
            recado, 
            codigoContato
        }
        document.getElementById('ImgSobreContatoScroll').src = imagem
        document.getElementById('nomeSobreContato').innerText = nome
        document.getElementById('recadoSobreContato').innerText = recado
        document.getElementById('qmContato').innerText = nome
        document.getElementById('codigoQmContato').innerText = codigoContato

        window.addEventListener("scroll", (event) => {
            let scroll = this.scrollY
            if(scroll > 100) {
                document.getElementById('recadoScroll0').innerText = ContatoSelecionado.recado
            }
        })

        if(window.visualViewport.width <= 845) {
            document.getElementById('lateralContatos').style.display = 'none'
            document.getElementById('localConversa').style.width = '100%'
            document.getElementById('addContato').style.display = 'none'
        } else {
            document.getElementById('lateralContatos').style.display = 'block'
            document.getElementById('addContato').style.display = 'block'
        }
    })
}

//? Função que vai criar as msgs
let arrayCloneChat
function criaMsg(codigo) {
    db.collection('SobreUser').onSnapshot((data) => {
        data.docs.map(function(val) {
            let valorSobreUser = val.data()
            
            try {
                if(valorSobreUser.Sobre.Email == email) {
                    document.getElementById('localMsg').innerHTML = ''
                    for(let c = 0; c <= valorSobreUser.Contatos.length; c++) {
                        for(let b = 0; b <= valorSobreUser.Contatos[c].Msgs.length; b++) {

                            //? Vai mostrar as msg apenas do contato selecionado
                            if(valorSobreUser.Contatos[c].SobreContato.CodigoContato == codigo) {
                                let p = document.createElement('p')
                                arrayCloneChat = valorSobreUser.Contatos

                                if(valorSobreUser.Contatos[c].Msgs[b].MsgContato != undefined) {
                                    p.className = 'msgContato'
                                    p.innerText = valorSobreUser.Contatos[c].Msgs[b].MsgContato
                                    const audio = new Audio('../img/Tome\ -\ Efeito\ Sonoro\ \(320\ kbps\).mp3')
                                    audio.play()

                                } else if(valorSobreUser.Contatos[c].Msgs[b].TuaMsg != undefined) {
                                    p.className = 'tuaMsg'
                                    p.innerText = valorSobreUser.Contatos[c].Msgs[b].TuaMsg
                                }

                                document.getElementById('localMsg').appendChild(p)
                            }
                        }
                    }
                }
            } catch {}
        })
    })
}

//? Vai checar se algo foi escrito no input de msg e liberar o btn enviar
setInterval(() => {
    let inputMsg = document.getElementById('inputResponder').value
    if(inputMsg.length > 0) {
        document.getElementById('imgEnviar').style.display = 'block'
        document.getElementById('pet').style.display = 'none'
    } else {
        document.getElementById('imgEnviar').style.display = 'none'
        document.getElementById('pet').style.display = 'block'
    }
}, 100)

//? Vai enviar uma msg
document.addEventListener('keypress', (e) => {
    if(e.keyCode == 13) {
        enviarMsg()
    }
})

function enviarMsg() {
    let msgEnviada = false
    let inputMsg = document.getElementById('inputResponder').value
    for(let c = 0; c < arrayCloneChat.length; c++) {
        if(inputMsg.length > 0 && codigoContatoSelecionado == arrayCloneChat[c].SobreContato.CodigoContato) {
            let obj = {
                TuaMsg: inputMsg
            }
            arrayCloneChat[c].Msgs.push(obj)
            db.collection('SobreUser').doc(codigoLocalUser).update({Contatos: arrayCloneChat})

            document.getElementById('localMsg').innerHTML = ''
            document.getElementById('inputResponder').value =  ''

            db.collection('SobreUser').onSnapshot((data) => {
                data.docs.map(function(val) {
                    let valorSobreUser = val.data()
                    try {
                        if(valorSobreUser.Sobre.Codigo == codigoContatoSelecionado) {
                            for(let c = 0; c < valorSobreUser.Contatos.length; c++) {
                                if(valorSobreUser.Contatos[c].SobreContato.CodigoContato == codigoPessoal &&msgEnviada == false) {
                                    msgEnviada = true
                                    let arrayCloneChat2 = valorSobreUser.Contatos
                                    let obj2 = {
                                        MsgContato: inputMsg
                                    }
                                    arrayCloneChat2[c].Msgs.push(obj2)
                                    db.collection('SobreUser').doc(val.id).update({Contatos: arrayCloneChat2})

                                    document.getElementById('localMsg').innerHTML = ''
                                    document.getElementById('inputResponder').value =  ''
                                }
                            }
                        }
                    } catch (error){ console.warn(error)}
                })
            })
        }
    }
}

//? Função add Contato
let localAdd = document.getElementById('localAdd')
function abrirAddContato() {
    localAdd.style.display = 'flex'
}

localAdd.addEventListener('click', (e) => {
    let el = e.target.id
    if(el == 'localAdd' || el == 'btnAddContato') {
        localAdd.style.display = 'none'
    }
}) 

//? função de adicionar contato
function addContato() {
    let adicionado = false
    let adicionado2 = false
    let cogidoDoContatoAdicionado = ''
    let inputAddContato = document.getElementById('inputAddContato').value

    db.collection('SobreUser').onSnapshot((data) => {
        data.docs.map(function(val) {
            let valorSobreUser = val.data()

            
            try {
                //? Vai adicionar ao seus conatatos uma nova pessoa
                if(inputAddContato.length > 0 && valorSobreUser.Sobre.Codigo == inputAddContato && adicionado == false) {
                    adicionado = true
                    cogidoDoContatoAdicionado = val.id

                    let objContatos = {
                        Msgs: [],
                
                        SobreContato: {
                            CodigoContato: valorSobreUser.Sobre.Codigo,
                            Estado: 'Ativo'
                        }
                    }

                    cloneContatos.Contatos.push(objContatos)
                    db.collection('SobreUser').doc(codigoLocalUser).update({Contatos: cloneContatos.Contatos})
                    criaContatos(valorSobreUser.Sobre.FotoPerfil, valorSobreUser.Sobre.Nome, '...', valorSobreUser.Sobre.Codigo)
                }

                // //? vai salvar seu contato na parte contatos do individuo q vc adiconou
                if(valorSobreUser.Sobre.Email == email && adicionado2 == false) {
                    adicionado2 = true
                    let cloneContatos2 = valorSobreUser
                    let objContatos2 = {
                        Msgs: [],
                
                        SobreContato: {
                            CodigoContato: valorSobreUser.Sobre.Codigo,
                        }
                    }
                
                    cloneContatos2.Contatos.push(objContatos2)
                    db.collection('SobreUser').doc(cogidoDoContatoAdicionado).update({Contatos: cloneContatos2.Contatos})
                }
            } catch {}
        })
    })
}

//? Vai abrir o sobreContatoLocal
function abrirSobreContato() {
    let sobreContatoLocal = document.getElementById('sobreContatoLocal')
    let localSobreContato = document.getElementById('localSobreContato')
    sobreContatoLocal.style.display = 'block'
    localSobreContato.style.right = '0px'

    sobreContatoLocal.addEventListener('click', (e) => {
        let el = e.target.id
        if(el == 'sobreContatoLocal') {
            sobreContatoLocal.style.display = 'none'
            localSobreContato.style.right = '-100%'
        }
    })
}

//? Vai mudar a parte sobre o contado
let sobreContato = document.getElementById('sobreContato')
window.addEventListener("scroll", (event) => {
	let scroll = this.scrollY
	if(scroll >= 100) {
        sobreContato.id = 'sobreContatoScroll'
        document.getElementById('msg').style.paddingTop = '200px'
        document.getElementById('recadoScroll0').innerText = ContatoSelecionado.recado
        document.getElementById('ImgSobreContatoScroll').src = ContatoSelecionado.imagem
        document.getElementById('imgContato').src = ContatoSelecionado.imagem
        document.getElementById('nomeSobreContato').innerText = ContatoSelecionado.nome
        document.getElementById('recadoSobreContato').innerText = ContatoSelecionado.recado
        scroll = 140
        document.getElementById('btnVoltar').id = 'btnVoltar2'

    } else {
        sobreContato.id = 'sobreContato'
        document.getElementById('recadoScroll0').innerText = 'Esse é o inicio de uma boa conversa'
        document.getElementById('msg').style.paddingTop = '0px'
        document.getElementById('btnVoltar2').id = 'btnVoltar'
    }
})

//? Função voltar para os contatos
function voltarParaContatos() {
    if(document.getElementById('sobreContatoLocal').style.display == 'block') {
        document.getElementById('sobreContatoLocal').style.display = 'none'
        
    } else {
        document.getElementById('lateralContatos').style.display = 'block'
        document.getElementById('addContato').style.display = 'block'
    }
}

//? Vai bloquear o contato
function bloquearContato() {
    let estadoMudado = false
    db.collection('SobreUser').onSnapshot((data) => {
        data.docs.map(function(val) {
            let valorSobreUser = val.data()

            try {
                if(estadoMudado == false) {
                    if(valorSobreUser.Sobre.Email == email) {
                        estadoMudado = true

                        for(let c = 0; c < arrayCloneChat.length; c++) {
                            if(arrayCloneChat[c].SobreContato.CodigoContato == codigoContatoSelecionado && arrayCloneChat[c].SobreContato.Estado != 'Bloqueado') {
                                arrayCloneChat[c].SobreContato.Estado = 'Bloqueado'
                                db.collection('SobreUser').doc(val.id).update({Contatos: arrayCloneChat})
    
                            } else if(arrayCloneChat[c].SobreContato.CodigoContato == codigoContatoSelecionado && arrayCloneChat[c].SobreContato.Estado == 'Bloqueado') {
                                arrayCloneChat[c].SobreContato.Estado = 'Ativo'
                                db.collection('SobreUser').doc(val.id).update({Contatos: arrayCloneChat})
                            }
    
                        }
                    }
                }
            } catch (error) {
                console.warn(error)
            }
        })
    })
}

