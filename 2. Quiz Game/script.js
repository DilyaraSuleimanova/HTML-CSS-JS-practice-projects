const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen =document.getElementById("result-screen");

const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answerContainer = document.getElementById("quiestion-answer");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionSpan = document.getElementById("total-question");
const scoreQuestionSpan = document.getElementById("score");
const progressBar = document.getElementById("progress");

const finalScoreSpan = document.getElementById("final-score");
const totalScoreSpan = document.getElementById("total-score");
const resultMessage = document.getElementById("message");
const restartButton = document.getElementById("restart-btn");
const hometButton = document.getElementById("home-btn");

const quizQuestions = [
    {
        question: "What was weather on 11 april in 2026 in Almaty?",
        answers: [
            { text: "sunny", correct: false },
            { text: "rainy", correct: true },
            { text: "windy", correct: false },
            { text: "cloudy", correct: false },
        ]
    },
    {
        question: "How many water person should drink?",
        answers: [
            { text: "1L", correct: false },
            { text: "3L", correct: false },
            { text: "0.5L", correct: false },
            { text: "2L", correct: true },
        ]
    },
    {
        question: "What is capital of South Korea?",
        answers: [
            { text: "Seoul", correct: true },
            { text: "Sonnam", correct: false },
            { text: "Shanghai", correct: false },
            { text: "Beijing", correct: false },
        ]
    },
    {
        question: "How to say 'Hello' in kazakh?",
        answers: [
            { text: "hi", correct: false },
            { text: "privet", correct: false },
            { text: "salem", correct: true },
            { text: "bonjur", correct: false },
        ]
    },
    {
        question: "What is name of our planet?",
        answers: [
            { text: "Earth", correct: true },
            { text: "Mars", correct: false },
            { text: "Jupiter", correct: false },
            { text: "Mercury", correct: false },
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;
let answerDisabled = false;

totalQuestionSpan.textContent = quizQuestions.length;
totalScoreSpan.textContent = quizQuestions.length;


startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);
hometButton.addEventListener("click", startScreenPage);

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreQuestionSpan.textContent = score;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion();

    // console.log("quiz started");
}

function showQuestion() {
    answerDisabled = false;

    const currentQuestion = quizQuestions[currentQuestionIndex];

    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    const progressPercent = currentQuestionIndex / quizQuestions.length * 100;
    progressBar.style.width = progressPercent + "%";

    questionText.textContent = currentQuestion.question;

    answerContainer.innerHTML = "";

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");

        button.dataset.correct = answer.correct;

        button.addEventListener("click", selectAnswer);

        answerContainer.appendChild(button);
    });
}

function selectAnswer(event) {
    if (answerDisabled) return;

    answerDisabled = true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    Array.from(answerContainer.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        } else if (button === selectedButton) {
            button.classList.add("incorrect");
        }
    });

    if (isCorrect) {
        score++;
        scoreQuestionSpan.textContent = score;
    }

    setTimeout(() => {
        currentQuestionIndex++;

        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 1000);
}

function showResult() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;

    const percentage = score / quizQuestions.length * 100;

    if(percentage === 100) {
        resultMessage.textContent = "You are a genius!!!";
    } else if (percentage >= 80) {
        resultMessage.textContent = "Great job!";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Good effort!";
    } else if (percentage >= 40) {
        resultMessage.textContent = "Not bad!";
    } else {
        resultMessage.textContent = "Keep study!";
    }
}

function restartQuiz() {
    resultScreen.classList.remove("active");
    
    startQuiz();
}

function startScreenPage() {
    resultScreen.classList.remove("active");
    startScreen.classList.add("active");
}