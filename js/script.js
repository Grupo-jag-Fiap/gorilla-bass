
let vidaGorila = 100;
const vidaMaximaGorila = 100;
let defendendo = false;
let humanos = [];


function criarHumanos() {
    const humanosDiv = document.getElementById('humanos');
    humanosDiv.innerHTML = '';
    humanos = [];

    for (let i = 0; i < 100; i++) {
        humanos.push({ vivo: true });

        const humanoDiv = document.createElement('div');
        humanoDiv.classList.add('humano');
        humanoDiv.id = `humano-${i}`;
        humanosDiv.appendChild(humanoDiv);
    }
}

function atacar() {
    const vivos = humanos.filter(h => h.vivo);
    if (vivos.length === 0) return;

    const quantidade = Math.min(5, vivos.length); // Ataca até 5 humanos por ataque
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

function carregarProgresso() {
    const dados = JSON.parse(localStorage.getItem('gorilla-batalha'));
    if (dados) {
        vidaGorila = dados.vidaGorila;
        dados.humanos.forEach((vivo, index) => {
            humanos[index] = { vivo: vivo };
            const humanoDiv = document.getElementById(`humano-${index}`);
            if (humanoDiv) {
                if (!vivo) {
                    humanoDiv.classList.add('morto');
                }
            }
        });
        atualizarInterface();
        adicionarLog('📦 Progresso carregado do jogo anterior.');
    }
}