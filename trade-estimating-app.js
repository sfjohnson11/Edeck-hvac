// Trade Estimating App - Audio Mixing Board UI & Live Estimate Breakdown
// Owned by S F Johnson Enterprises, LLC

const trades = {
    hvac: { 
        stripeLink: 'https://buy.stripe.com/6oEdS50iR2LR0RW5p7',
        price: 79.99
    },
    electrical: {
        stripeLink: 'https://buy.stripe.com/00g9BPe9HfyD44804P',
        price: 89.99
    },
    framingDrywall: {
        stripeLink: 'https://buy.stripe.com/eVa15j7Lj9affMQaJu',
        price: 69.99
    },
    plumbing: {
        stripeLink: 'https://buy.stripe.com/dR6bJXd5DfyD0RWdVE',
        price: 69.99
    }
};

// Function to Handle Stripe Payment Redirect
function redirectToPayment() {
    const trade = document.getElementById('trade-select').value;
    if (trade && trades[trade].stripeLink) {
        if (confirm(`You have selected ${trade.toUpperCase()} Estimating Access for $${trades[trade].price.toFixed(2)}. Proceed to payment?`)) {
            window.location.href = trades[trade].stripeLink;
        }
    } else {
        alert('Please select a trade to proceed with the purchase.');
    }
}

// Function to Update Estimate Preview
function updateEstimatePreview() {
    const estimatePreview = document.getElementById('estimate-preview');
    let estimateText = '';

    document.getElementById('estimate-window').childNodes.forEach(line => {
        if (line.innerText) {
            estimateText += `${line.innerText}<br>`;
        }
    });

    document.getElementById('estimate-details').innerHTML = estimateText;
}

// Music selection options
const musicTracks = [
    { name: 'Relaxing', src: 'https://www.bensound.com/bensound-music/bensound-relaxing.mp3' },
    { name: 'Jazz', src: 'https://www.bensound.com/bensound-music/bensound-jazz.mp3' },
    { name: 'Ambient', src: 'https://www.bensound.com/bensound-music/bensound-ambient.mp3' }
];

let currentTrack = 0;
const audioPlayer = new Audio(musicTracks[currentTrack].src);
audioPlayer.loop = true;

function toggleMusic() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        document.getElementById('music-btn').innerText = 'Pause Music';
    } else {
        audioPlayer.pause();
        document.getElementById('music-btn').innerText = 'Play Music';
    }
}

function nextMusic() {
    audioPlayer.pause();
    currentTrack = (currentTrack + 1) % musicTracks.length;
    audioPlayer.src = musicTracks[currentTrack].src;
    audioPlayer.play();
    document.getElementById('current-track').innerText = 'Now Playing: ' + musicTracks[currentTrack].name;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('buy-btn').addEventListener('click', redirectToPayment);
    document.getElementById('music-btn').addEventListener('click', toggleMusic);
    document.getElementById('next-music-btn').addEventListener('click', nextMusic);
});
