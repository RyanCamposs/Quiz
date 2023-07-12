const question = document.querySelector(".question");
const answers = document.querySelector(".answers");
const span = document.querySelector(".span");
const finalTxt = document.querySelector(".finish span");
const content = document.querySelector(".content");
const contentFinish = document.querySelector(".finish");
const btnRestart = document.querySelector(".finish button")

import questions from "./questions.js";

let currentIndex = 0;
let questionCorrect = 0;

btnRestart.onclick = () => {
    content.style.display = "flex";
    contentFinish.display = "none";

    currentIndex = 0;
    questionCorrect = 0;
    loadQuestion();
}

function nextQuestion(e) {
  if (e.target.getAttribute("data-correct") === "true") {
    questionCorrect++;
  }

  if (currentIndex < questions.length - 1) {
    currentIndex++;
    loadQuestion();
  } else {
    finish();
  }
}


function finish() {
    
    content.style.display = "none";
    contentFinish.style.display = "flex";

    if (questionCorrect >= 3) {
      finalTxt.innerHTML = `Parabéns! Você acertou ${questionCorrect} de ${questions.length} nessa rodada!`;
    }else {
      finalTxt.innerHTML = `Você acertou ${questionCorrect} de ${questions.length}`
    }
    
}

function loadQuestion() {
    span.innerHTML = `${currentIndex + 1}/${questions.length}`;
    const item = questions[currentIndex];
    answers.innerHTML = "";
    finalTxt.innerHTML = "";
    contentFinish.style.display = "none";
    question.innerHTML = item.question;

    item.answers.forEach((answer) => {
        const div = document.createElement("div")

        div.innerHTML = `
            <button class="answer" data-correct="${answer.correct}">${answer.option}</button>
        `;

        answers.appendChild(div);
        
    });

    document.querySelectorAll(".answer").forEach((item) => {
        item.addEventListener("click", nextQuestion);
    });
}

loadQuestion();