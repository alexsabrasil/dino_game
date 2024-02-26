var jogoAtivo = true;

// Adiciona a classe pulo criada em css
function pulo() {
    // Se o dino não contem a classe pulo
    if (!jogoAtivo) return;
    if (!dino.classList.contains("pulo")) {
        dino.classList.add("pulo");
        setTimeout(function () {
            dino.classList.remove("pulo");
        }, 500);
    }
}

//Quais teclas estão precissionadas
document.addEventListener("keydown", function (event) {

    // Se espaço for precionado ativa a função pulo
    if (event.code === "Space") {
        pulo();
    }

});

//chao

let chaoPosition = 0;

function moveChao() {
    if (!jogoAtivo) return;
    chaoPosition -= 5;
    chao.style.backgroundPositionX = chaoPosition + 'px';
    requestAnimationFrame(moveChao);
}

//cacto

let cactoPosition = 0;
function movecacto() {
    if (!jogoAtivo) return;
    cactoPosition -= 5;
    cacto.style.left = cactoPosition + 'px';
    if (cactoPosition < 5) {
        cactoPosition = 590;
    }
    requestAnimationFrame(movecacto)
}

//nuvem

let nuvemPosition = 0;

function movenuvem() {
    if (!jogoAtivo) return;
    nuvemPosition -= 1.4;
    nuvem.style.left = nuvemPosition + 'px';
    if (nuvemPosition < 5) {
        nuvemPosition = 590;
    }
    requestAnimationFrame(movenuvem)
}

// animação
var step = 1;

function animateDino() {
    if (!jogoAtivo) {
        dino.style.backgroundImage = "url(img/dino/scared.png";
    } else {
        if (dino.classList.contains("pulo")) {
            dino.style.backgroundImage = "url(img/dino/normal.png"
        } else {
            if (step == 1) {
                dino.style.backgroundImage = "url(img/dino/dino1.png)";
                step = 2;
            } else {
                dino.style.backgroundImage = "url(img/dino/dino2.png)";
                step = 1;
            }
        }
    }
}

function colidiu(rect1, rect2) {
    return !(rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom);
}

function verificarColisao() {
    var dinoRect = document.getElementById("dino").getBoundingClientRect();
    var cactoRect = document.getElementById("cacto").getBoundingClientRect();

    if (colidiu(dinoRect, cactoRect)) {
        jogoAtivo = false;
        clearInterval(verificacao);
        console.log("Colisao detectada!")
        atualizarTelaGameOver();
    }
}

function atualizarTelaGameOver() {
    var elementoGameOver = document.getElementById('gameover');
    elementoGameOver.style.visibility = 'visible';
}


movenuvem();
moveChao();
movecacto();
setInterval(animateDino, 100);
var verificacao = setInterval(verificarColisao, 100);