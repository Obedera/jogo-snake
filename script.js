let estadoTecla = 'destravado';
let estadoJogo = true;
let snake = '<img src="img/snake.png">';
let imgCorpo = '<img src="img/'+aleatorio(0,1)+'.png">'
let direcao = 1;
let corpo = [116,115,114];

function fazerCampo(){
    document.querySelector('section').innerHTML = '';
    let jogo = document.querySelector('section');

    for(i=0;i<256;i++){
        jogo.innerHTML += '<div class="parede" name=""></div>';
    }
    for(i=17;i<239;i++){
        if(i%16 != 0 && (i+1)%16 != 0){
            document.querySelectorAll('section div')[i].classList.remove('parede');
            document.querySelectorAll('section div')[i].setAttribute('name','area');
        }
    }
    document.querySelectorAll('section div')[corpo[0]].innerHTML = snake;
    document.querySelectorAll('section div')[corpo[0]].name = snake;
    document.querySelectorAll('section div')[corpo[1]].innerHTML = imgCorpo;
    document.querySelectorAll('section div')[corpo[1]].name = '#';
}


function pegarTecla(event){
    if(estadoTecla == 'destravado'){
        return mudarPosicao(event.keyCode);
    }
}

function acharPosicao(lista){
    for(i=0;i<lista.length;i++){
        if(lista[i].name == snake){
            return i;
        }
    }
}

function checarJogo(posicao, campo){
    if(campo[posicao].innerHTML!='#' && campo[posicao].innerHTML!=''){
        corpo = corpo.concat(corpo[corpo.length-1]);
    }
    if(campo[posicao].name=='#'){
        estadoJogo=false;
        alert('vc perdeu');
    }
    if(posicao%16 == 0 || (posicao+1)%16 == 0){
        estadoJogo=false;
        alert('vc perdeu');
    }
    if(posicao < 17 || posicao>238){
        estadoJogo=false;
        alert('vc perdeu');
    }
}

function mudarPosicao(tecla){
    estadoTecla = 'travado';
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
    let area = document.querySelectorAll('section div[name="area"]');
    if(document.querySelector('img[name="comida"]') == null){
        while (status==false){
            valor = aleatorio(0,195);
            if(area[valor].innerHTML == ''){
                area[valor].innerHTML = '<img name="comida" src="img/p'+aleatorio(0,5)+'.png">';
                status=true
            }
        }
    }
}


function iniciarJogo(){
    fazerCampo();
    estadoJogo=true;
    document.querySelector('nav').innerHTML = '<h1>Jogo Snake</h1>';
    let movimentar = setInterval(function(){
        let campo = document.querySelectorAll('section div');
        let posicao = acharPosicao(campo);
        let aux = [];
        aux[0] = posicao;
        for(i=0;i<corpo.length-1;i++){
            aux[i+1] = corpo[i];
        }
        corpo = aux;
        for(i=0;i<corpo.length;i++){
            campo[corpo[i]].name = '#';
            campo[corpo[i]].innerHTML = imgCorpo;
        }
        
        campo[corpo[corpo.length-1]].name = '';
        campo[corpo[corpo.length-1]].innerHTML = '';
        checarJogo(corpo[0]+direcao, campo);
        if(estadoJogo == true){
            campo[corpo[0]+direcao].name = snake;
            campo[corpo[0]+direcao].innerHTML = snake;
            estadoTecla = 'destravado';
        }
        else{
            clearInterval(movimentar);
            clearInterval(gerarAlimento);
            document.querySelector('nav').innerHTML += '<button onclick="reiniciar();">Reiniciar</button>';    
        }
    },300);
    
    let gerarAlimento = setInterval(function(){
        alimento()
    },5000);    
}

function reiniciar(){
    direcao = 1;
    corpo = [116,115,114];
    fazerCampo();
    iniciarJogo();   
}

iniciarJogo();
document.addEventListener('keydown', pegarTecla)