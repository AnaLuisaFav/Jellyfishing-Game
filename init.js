var altura = 0
var largura = 0
var vidas = 1
var tempo = 15

var criaAguaTempo = 1500

var nivel = window.location.search
nivel = (nivel.replace('?', ''))

if(nivel === 'normal') {
    criaAguaTempo = 1500
} else if (nivel === 'dificil') {
    criaAguaTempo = 1000
} else if (nivel === 'chucknorris') {
    criaAguaTempo = 750
}

function ajustaTamanho() {
    altura = window.innerHeight
    largura = window.innerWidth

    console.log(largura, altura)
}

ajustaTamanho()

var cronometro = setInterval(function() {

    tempo -= 1
    
    if(tempo < 0) {
        clearInterval(cronometro)
        clearInterval(criaAgua)
        window.location.href = 'vitoria.html'
    } else {
        document.getElementById('cronometro').innerHTML = tempo 
    }
}, 1000)

function posicaoRandomica() {

    //remover a água viva anterior (caso exista)
    if(document.getElementById('jellyfish')) {
        document.getElementById('jellyfish').remove()

        if(vidas > 3) {
            window.location.href = 'game_over.html?' + nivel 
        } else {
            document.getElementById('c' + vidas).src="img/heart1.png"
        }

        vidas++
    }

    var posicaoX = Math.floor(Math.random() * largura) - 200
    var posicaoY = Math.floor(Math.random() * altura) - 200

    posicaoX = posicaoX < 0 ? 0 : posicaoX
    posicaoY = posicaoY < 0 ? 0 : posicaoY

    console.log(posicaoX, posicaoY)

    //criar o elemento html
    var jellyfish = document.createElement('img')
    jellyfish.src = 'img/jellyfish.png'
    jellyfish.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
    jellyfish.style.left = posicaoX + 'px'
    jellyfish.style.top = posicaoY + 'px'
    jellyfish.style.position = 'absolute'
    jellyfish.id = 'jellyfish'
    jellyfish.ondragstart = function() { return false; }
    jellyfish.onclick = function() {
        this.remove()
    }

    document.body.appendChild(jellyfish)
}

function tamanhoAleatorio() {
    var classe = Math.floor(Math.random() * 3)

    switch(classe) {
        case 0:
            return 'jellyfish jellyfish-1'
        case 1:
            return 'jellyfish jellyfish-2'
        case 2:
            return 'jellyfish jellyfish-3'
    }
}

function ladoAleatorio() {
    var classe = Math.floor(Math.random() * 2)

    switch(classe) {
        case 0:
            return 'ladoA'
        case 1:
            return 'ladoB'
    }
}
