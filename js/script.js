
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