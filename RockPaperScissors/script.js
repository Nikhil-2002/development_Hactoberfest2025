let wins = 0;
let losses = 0;
let ties = 0;

function play(userChoice) {
    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    let resultText = `You chose ${userChoice}, Computer chose ${computerChoice}. `;

    if (userChoice === computerChoice) {
        resultText += "It's a tie! 🤝";
        ties++;
    } else if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
        resultText += "You win! 🎉";
        wins++;
    } else {
        resultText += "You lose! 😢";
        losses++;
    }

    document.getElementById('result').innerText = resultText;
    document.getElementById('wins').innerText = wins;
    document.getElementById('losses').innerText = losses;
    document.getElementById('ties').innerText = ties;
}

document.getElementById('resetBtn').addEventListener('click', () => {
    wins = 0;
    losses = 0;
    ties = 0;
    document.getElementById('wins').innerText = wins;
    document.getElementById('losses').innerText = losses;
    document.getElementById('ties').innerText = ties;
    document.getElementById('result').innerText = "";
});
