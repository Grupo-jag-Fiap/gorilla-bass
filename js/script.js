
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