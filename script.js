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



function mudarPosicao(tecla){
    let campo = document.querySelectorAll('section div');
    let posicao = acharPosicao(campo);
    console.log(posicao);
    // Baixo
    if(tecla == 40){
        campo[posicao].name = '';
        campo[posicao].innerHTML = '';
        campo[posicao+15].name = snake;
        campo[posicao+15].innerHTML = snake;
    }
    // Direita
    if(tecla == 39){
        campo[posicao].name = '';
        campo[posicao].innerHTML = '';
        campo[posicao+1].name = snake;
        campo[posicao+1].innerHTML = snake;
    }
    // Cima
    if(tecla == 38){
        campo[posicao].name = '';
        campo[posicao].innerHTML = '';
        campo[posicao-15].name = snake;
        campo[posicao-15].innerHTML = snake;
    }
    // Esquerda
    if(tecla == 37){
        campo[posicao].name = '';
        campo[posicao].innerHTML = '';
        campo[posicao-1].name = snake;
        campo[posicao-1].innerHTML = snake;
    }    
}


document.addEventListener('keydown', pegarTecla)