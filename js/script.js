let vidaGorila = 100;
const vidaMaximaGorila = 100;
let defendendo = false;
let humanos = [];


function criarHumanos(skipReset = false) {
    const humanosDiv = document.getElementById('humanos');
    humanosDiv.innerHTML = '';

    if (!skipReset) {
        humanos = [];
        for (let i = 0; i < 100; i++) {
            humanos.push({ vivo: true });
        }
    }

    for (let i = 0; i < 100; i++) {
        const humanoDiv = document.createElement('div');
        humanoDiv.classList.add('humano');
        humanoDiv.id = `humano-${i}`;
        humanosDiv.appendChild(humanoDiv);

        if (humanos[i] && !humanos[i].vivo) {
            humanoDiv.classList.add('morto');
        }
    }
}


function atacar() {
    const vivos = humanos.filter(h => h.vivo);
    if (vivos.length === 0) return;

    const quantidade = Math.min(5, vivos.length);
    let mortos = 0;

    for (let i = 0; i < quantidade; i++) {
        const index = humanos.findIndex(h => h.vivo);
        if (index !== -1) {
            humanos[index].vivo = false;
            document.getElementById(`humano-${index}`).classList.add('morto');
            mortos++;
        }
    }

    adicionarLog(`🦍 Gorilla atacou e derrotou ${mortos} humanos!`);
    atualizarInterface();
    verificarFimDeJogo();
}

function curar() {
    if (vidaGorila >= vidaMaximaGorila) {
        adicionarLog('🧠 Cura não necessária. Vida cheia.');
        return;
    }
    const cura = Math.floor(Math.random() * 20) + 10;
    vidaGorila = Math.min(vidaGorila + cura, vidaMaximaGorila);
    adicionarLog(`💚 Gorilla se curou em +${cura} de vida.`);

    atualizarInterface();
}


function defender() {
    defendendo = true;
    adicionarLog('🛡️ Gorilla está se defendendo! Reduzirá dano do próximo ataque.');

    setTimeout(() => {
        defendendo = false;
        adicionarLog('🛡️ Defesa acabou.');
    }, 3000);
}

function ataqueHumanos() {
    const vivos = humanos.filter(h => h.vivo).length;
    if (vivos <= 0) return;

    const danoPorHumano = 0.3;
    let dano = vivos * danoPorHumano;
    if (defendendo) dano = dano / 2;

    dano = Math.floor(dano);

    vidaGorila -= dano;
    if (vidaGorila < 0) vidaGorila = 0;

    adicionarLog(`👥 Humanos atacaram causando ${dano} de dano.`);

    atualizarInterface();
    verificarFimDeJogo();
}


function atualizarInterface() {
    const hpPorcentagem = (vidaGorila / vidaMaximaGorila) * 100;
    document.getElementById('gorilla-hp').style.width = hpPorcentagem + '%';

    salvarProgresso();
}

function verificarFimDeJogo() {
    const humanosVivos = humanos.filter(h => h.vivo).length;

    if (humanosVivos <= 0) {
        adicionarLog('🎉 Gorilla venceu! Todos os humanos foram derrotados.');
        alert('🎉 Gorilla venceu!');
        resetarJogo();
    }

    if (vidaGorila <= 0) {
        adicionarLog('💀 Gorilla foi derrotado pelos humanos...');
        alert('💀 Gorilla perdeu...');
        resetarJogo();
    }
}

function adicionarLog(mensagem) {
    const logDiv = document.getElementById('log');
    const p = document.createElement('p');
    p.textContent = mensagem;
    logDiv.appendChild(p);
    logDiv.scrollTop = logDiv.scrollHeight;
}

function salvarProgresso() {
    const dados = {
        vidaGorila,
        humanos: humanos.map(h => h.vivo)
    };
    localStorage.setItem('gorilla-batalha', JSON.stringify(dados));
}

function iniciarJogo() {
    const dados = JSON.parse(localStorage.getItem('gorilla-batalha'));
    if (dados) {
        vidaGorila = dados.vidaGorila;
        humanos = dados.humanos.map(vivo => ({ vivo }));
        criarHumanos(true);
        adicionarLog('📦 Progresso carregado do jogo anterior.');
    } else {
        criarHumanos();
    }

    atualizarInterface();
    adicionarLog('🚀 Jogo iniciado.');
}

function resetarJogo() {
    vidaGorila = vidaMaximaGorila;
    criarHumanos();
    atualizarInterface();
    localStorage.removeItem('gorilla-batalha');
    document.getElementById('log').innerHTML = '';
    adicionarLog('🔄 Jogo reiniciado.');
}

document.getElementById('botao-ataque').addEventListener('click', atacar);
document.getElementById('botao-curar').addEventListener('click', curar);
document.getElementById('botao-defender').addEventListener('click', defender);


setInterval(ataqueHumanos, 4000);

iniciarJogo();
