let jogo = document.querySelector('section');
let snake = '$';
let direcao = 1;

for(i=0;i<256;i++){
    jogo.innerHTML += '<div class="parede" name=""></div>';
}
for(i=17;i<239;i++){
    if(i%16 != 0 && (i+1)%16 != 0){
        document.querySelectorAll('section div')[i].innerHTML = i-17;
        document.querySelectorAll('section div')[i].classList.remove('parede');
    }
}
document.querySelectorAll('section div')[106].innerHTML = snake;
document.querySelectorAll('section div')[106].name = snake;

function pegarTecla(event){
    return mudarPosicao(event.keyCode);
}

function acharPosicao(lista){
    for(i=0;i<lista.length;i++){
        if(lista[i].name == snake){
            return i;
        }
    }
}

function checarJogo(posicao){
    if(posicao%16 == 0 || (posicao+1)%16 == 0){
        clearInterval(movimentar);
        alert('vc perdeu');
    }
    if(posicao < 17 || posicao>238){
        clearInterval(movimentar);
        alert('vc perdeu');
    }
}

function mudarPosicao(tecla){
    // Baixo
    if(tecla == 40){
        direcao = 16;
    }
    // Direita
    if(tecla == 39){
        direcao = 1;
    }
    // Cima
    if(tecla == 38){
        direcao = -16;
    }
    // Esquerda
    if(tecla == 37){
        direcao = -1;
    }    
}


let movimentar = setInterval(function(){
    let campo = document.querySelectorAll('section div');
    let posicao = acharPosicao(campo);
    campo[posicao].name = '';
    campo[posicao].innerHTML = '';
    checarJogo(posicao+direcao);
    campo[posicao+direcao].name = snake;
    campo[posicao+direcao].innerHTML = snake;
},300);

document.addEventListener('keydown', pegarTecla)