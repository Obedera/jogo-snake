let jogo = document.querySelector('section');
let snake = '$';

for(i=0;i<225;i++){
    jogo.innerHTML += '<div name="">'+i+'</div>';
}
document.querySelectorAll('section div')[105].innerHTML = snake;
document.querySelectorAll('section div')[105].name = snake;

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

let direcao = 1;
let movimentar = setInterval(function(){
        let campo = document.querySelectorAll('section div');
        let posicao = acharPosicao(campo);
        campo[posicao].name = '';
        campo[posicao].innerHTML = '';
        campo[posicao+direcao].name = snake;
        campo[posicao+direcao].innerHTML = snake;
},300);


function mudarPosicao(tecla){
    // Baixo
    if(tecla == 40){
        direcao = 15;
    }
    // Direita
    if(tecla == 39){
        direcao = 1;
    }
    // Cima
    if(tecla == 38){
        direcao = -15;
    }
    // Esquerda
    if(tecla == 37){
        direcao = -1;
    }    
}


document.addEventListener('keydown', pegarTecla)