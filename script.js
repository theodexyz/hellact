const textElement = document.getElementById('text');
const startBtn = document.getElementById('startBtn');
const song = new Audio('song.mp3');
const BPM = 133;
const beatInterval = 60 / BPM;

const sequence = [
    { beat: 0, text: "Are you ready?" },
    { beat: 2, text: "I hope you are.." },
    { beat: 4, text: "Here we go?" }
];

let startTime = null;

function update(timestamp) {
    if (!startTime) {
        startTime = timestamp;
        song.play();
        startBtn.style.display = 'none';
    }
    
    const elapsed = (timestamp - startTime) / 1000;
    const currentBeat = elapsed / beatInterval;

    for (let i = sequence.length - 1; i >= 0; i--) {
        if (currentBeat >= sequence[i].beat) {
            textElement.innerText = sequence[i].text;
            break;
        }
    }

    if (elapsed <= 3.0) {
        const pulse = Math.sin(elapsed * (Math.PI / beatInterval));
        const scale = 1 + (Math.abs(pulse) * 0.1);
        document.body.style.transform = `scale(${scale})`;
    } else {
        document.body.style.transform = `scale(1)`;
    }

    requestAnimationFrame(update);
}

startBtn.addEventListener('click', update);
