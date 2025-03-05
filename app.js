let listaNumerosSorteados = []
let limite = 10
let numeroSecreto = gerarNumeroAleatorio()
let tentativas = 1

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag)
    campo.innerHTML = texto
    /*
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2})
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto)
        utterance.lang = 'pt-BR'
        utterance.rate = 1.5
        window.speechSynthesis.speak(utterance)
    } else {
        console.log('Web Speech API não suportada neste navegador')
    }*/
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Número Secreto 2.0')
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${limite}`)
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * limite + 1)
    let quantidadeLista = listaNumerosSorteados.length
    if (quantidadeLista == limite) {
        listaNumerosSorteados = []
    }
    if (listaNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio()
    } else {
        listaNumerosSorteados.push(numeroEscolhido)
        return numeroEscolhido
    }
}

function verificarChute() {
    let chute = document.querySelector('input').value
    if (chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Acertou! Parabéns!')
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`
        exibirTextoNaTela('p', mensagemTentativas)
        document.getElementById('reiniciar').removeAttribute('disabled')
        document.getElementById('chutar').setAttribute('disabled', true)
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'Tente um número menor...')
        } else {
            exibirTextoNaTela('p', 'Tente um número maior...')
        }
        tentativas++
        limparCampo()
        document.querySelector('input').focus()
    }
}

function limparCampo() {
    document.querySelector('input').value = ''
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio()
    limparCampo()
    tentativas = 1
    exibirMensagemInicial()
    document.getElementById('reiniciar').setAttribute('disabled', true)
    document.getElementById('chutar').removeAttribute('disabled')
}

exibirMensagemInicial()