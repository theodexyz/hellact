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
        console.log("Started");
    }
    
    const elapsed = (timestamp - startTime) / 1000;
    
    const zoomBeat = elapsed * (BPM_ZOOM / 60);
    document.body.style.transform = `scale(${1 + (Math.abs(Math.sin(zoomBeat * Math.PI)) * 0.05)})`;

    const textBeat = elapsed * (BPM_TEXT / 60);
    
    let currentText = sequence[0].text;
    for (let i = 0; i < sequence.length; i++) {
        if (textBeat >= sequence[i].beat) {
            currentText = sequence[i].text;
        }
    }
    
    if (textElement.innerText !== currentText) {
        textElement.innerText = currentText;
        console.log("Updated text to: " + currentText);
    }

    requestAnimationFrame(update);
}

startBtn.addEventListener('click', update);
