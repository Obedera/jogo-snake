let jogo = document.querySelector('section');
let snake = '$';
let direcao = 1;

for(i=0;i<256;i++){
    jogo.innerHTML += '<div class="parede" name=""></div>';
}
for(i=17;i<239;i++){
    if(i%16 != 0 && (i+1)%16 != 0){
        document.querySelectorAll('section div')[i].classList.remove('parede');
        document.querySelectorAll('section div')[i].setAttribute('name','area');
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
        clearInterval(gerarAlimento);
        alert('vc perdeu');
    }
    if(posicao < 17 || posicao>238){
        clearInterval(movimentar);
        clearInterval(gerarAlimento);
        alert('vc perdeu');
    }
}

function mudarPosicao(tecla){
    // Baixo
    if(tecla == 40){
        if(direcao != -16){
            direcao = 16;
        }
    }
    // Direita
    if(tecla == 39){
        if(direcao != -1){
            direcao = 1;
        }
    }
    // Cima
    if(tecla == 38){
        if(direcao != 16){
            direcao = -16;
        }
    }
    // Esquerda
    if(tecla == 37){
        if(direcao != 1){
            direcao = -1;
        }
    }    
}

function aleatorio(min, max){
    return Math.floor(Math.random()*(max-min+1))+min;
}

function alimento(){
    let valor;
    let status = false;
    let comida;
    let area = document.querySelectorAll('section div[name="area"]');
    for(i=0;i<area.length;i++){
        if(area[i].innerHTML == '@'){
            comida = i;
        }
    }
    if(comida == null){
        while (status==false){
            valor = aleatorio(0,195);
            if(area[valor].innerHTML == ''){
                area[valor].innerHTML = '@';
                status=true
            }
        }
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

let gerarAlimento = setInterval(function(){
    alimento()
},5000)

document.addEventListener('keydown', pegarTecla)