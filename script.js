const startBtn = document.getElementById("startBtn");
const quizBox = document.getElementById("quizBox");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const scoreEl = document.getElementById("score");

let score = 0;

startBtn.addEventListener("click", startQuiz);

function startQuiz() {
    startBtn.style.display = "none";
    quizBox.classList.remove("hidden");
    fetchQuestion();
}

function fetchQuestion() {
    fetch("https://opentdb.com/api.php?amount=1&type=multiple")
        .then(response => response.json())
        .then(data => {
            const questionData = data.results[0];
            showQuestion(questionData);
        });
}

function showQuestion(data) {
    questionEl.innerHTML = data.question;

    let answers = [...data.incorrect_answers];
    answers.push(data.correct_answer);
    answers.sort(() => Math.random() - 0.5);

    answersEl.innerHTML = "";

    answers.forEach(answer => {
        const btn = document.createElement("button");
        btn.innerHTML = answer;
        btn.addEventListener("click", () => checkAnswer(answer, data.correct_answer));
        answersEl.appendChild(btn);
    });
}

function checkAnswer(selected, correct) {
    if (selected === correct) {
        score++;
    }

    scoreEl.innerText = "Score: " + score;
    fetchQuestion();
}