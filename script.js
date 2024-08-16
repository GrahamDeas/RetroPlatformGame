
const questions = [
    {
        question: "Which of the following is a common sample rate for professional audio recording?",
        choices: ["44.1 kHz", "48 kHz", "96 kHz", "All of the above"],
        answer: "All of the above"
    },
    {
        question: "What does EQ stand for in sound production?",
        choices: ["Equalizer", "Equalization", "Equilibrium", "Equal Quality"],
        answer: "Equalization"
    },
    {
        question: "Which microphone type is most suitable for live vocals?",
        choices: ["Condenser", "Ribbon", "Dynamic", "Lavalier"],
        answer: "Dynamic"
    }
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById('question');
const choicesElement = document.getElementById('choices');
const scoreElement = document.getElementById('score');
const storyElement = document.getElementById('story');
const scoreSection = document.getElementById('score-section');
const restartButton = document.getElementById('restart');

function loadQuestion() {
    const current = questions[currentQuestion];
    questionElement.textContent = current.question;
    choicesElement.innerHTML = '';
    
    current.choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice;
        button.classList.add('bg-blue-500', 'text-white', 'py-2', 'px-4', 'rounded', 'hover:bg-blue-700');
        button.addEventListener('click', () => checkAnswer(choice));
        choicesElement.appendChild(button);
    });
}

function checkAnswer(choice) {
    if (choice === questions[currentQuestion].answer) {
        score += 10;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    questionElement.classList.add('hidden');
    choicesElement.classList.add('hidden');
    scoreElement.textContent = score;
    scoreSection.classList.remove('hidden');
}

restartButton.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    questionElement.classList.remove('hidden');
    choicesElement.classList.remove('hidden');
    scoreSection.classList.add('hidden');
    loadQuestion();
});

loadQuestion();
