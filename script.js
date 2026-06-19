const textElement = document.getElementById('text');
const startBtn = document.getElementById('startBtn');
const song = new Audio('song.mp3');

const BPM_ZOOM = 133;
const BPM_TEXT = 66.5;

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
    
    const zoomBeat = elapsed * (BPM_ZOOM / 60);
    const zoomPulse = Math.abs(Math.sin(zoomBeat * Math.PI));
    document.body.style.transform = `scale(${1 + (zoomPulse * 0.05)})`;

    const textBeat = elapsed * (BPM_TEXT / 60);
    for (let i = sequence.length - 1; i >= 0; i--) {
        if (textBeat >= sequence[i].beat) {
            textElement.innerText = sequence[i].text;
            break;
        }
    }

    requestAnimationFrame(update);
}

startBtn.addEventListener('click', update);
