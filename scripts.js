const questions = [
    { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: 2 },
    { question: "Which language is used for web development?", options: ["Python", "JavaScript", "C#", "Java"], answer: 1 },
    { question: "What is the largest planet in our solar system?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: 2 },
    { question: "Who wrote 'Hamlet'?", options: ["Charles Dickens", "William Shakespeare", "J.K. Rowling", "Leo Tolstoy"], answer: 1 },
    { question: "What is the square root of 64?", options: ["6", "7", "8", "9"], answer: 2 },
    { question: "What year did the Titanic sink?", options: ["1910", "1911", "1912", "1913"], answer: 2 },
    { question: "What is the chemical symbol for water?", options: ["O2", "CO2", "H2O", "NaCl"], answer: 2 },
    { question: "What is the largest continent?", options: ["Africa", "Asia", "Europe", "Antarctica"], answer: 1 },
    { question: "Who is known as the 'Father of Computers'?", options: ["Charles Babbage", "Alan Turing", "Steve Jobs", "Bill Gates"], answer: 0 },
    { question: "What is the boiling point of water?", options: ["90°C", "100°C", "110°C", "120°C"], answer: 1 }
];

let currentQuestion = 0;
let correctAnswers = 0;

document.getElementById("start-quiz").addEventListener("click", function () {
    document.getElementById("home-page").style.display = "none";
    document.getElementById("quiz-page").style.display = "block";
    loadQuestion();
});

document.getElementById("next-question").addEventListener("click", function () {
    checkAnswer();
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    }
    if (currentQuestion === questions.length - 1) {
        document.getElementById("next-question").style.display = "none";
        document.getElementById("submit-quiz").style.display = "inline-block";
    }
});

document.getElementById("submit-quiz").addEventListener("click", function () {
    checkAnswer();
    document.getElementById("quiz-page").style.display = "none";
    document.getElementById("analytics-page").style.display = "block";

    const score = Math.round((correctAnswers / questions.length) * 100);
    document.getElementById("progress-circle").style.setProperty('--score', score);
    document.getElementById("result-text").textContent = `${score}%`;
});

document.getElementById("get-reward").addEventListener("click", function () {
    document.getElementById("reward-popup").style.display = "flex";
});

document.querySelector(".close").addEventListener("click", function () {
    document.getElementById("reward-popup").style.display = "none";
});

document.getElementById("claim-reward").addEventListener("click", function () {
    const walletAddress = document.getElementById("wallet-address").value;
    alert(`Reward claimed! Wallet address: ${walletAddress}`);
    document.getElementById("reward-popup").style.display = "none";
});

document.getElementById("restart-quiz").addEventListener("click", function () {
    location.reload();
});

function loadQuestion() {
    const question = questions[currentQuestion];
    const container = document.getElementById("quiz-container");
    container.innerHTML = `<h2>${question.question}</h2>`;
    question.options.forEach((option, index) => {
        container.innerHTML += `
            <div>
                <input type="radio" name="option" id="option${index}" value="${index}">
                <label for="option${index}">${option}</label>
            </div>`;
    });
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption && parseInt(selectedOption.value) === questions[currentQuestion].answer) {
        correctAnswers++;
    }
}
