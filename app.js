
const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Rome"],
    answer: "Paris"
  },
  {
    question: "Which country is known as the 'Land of the Rising Sun'?",
    options: ["China", "Japan", "South Korea", "Thailand"],
    answer: "Japan"
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Jupiter", "Saturn", "Neptune", "Mars"],
    answer: "Jupiter"
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Michelangelo"],
    answer: "Leonardo da Vinci"
  },
  {
    question: "Which country is famous for its tulip fields?",
    options: ["Netherlands", "Italy", "France", "Germany"],
    answer: "Netherlands"
  },
  {
    question: "Which planet is known as the 'Red Planet'?",
    options: ["Jupiter", "Saturn", "Mars", "Neptune"],
    answer: "Mars"
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Au", "Ag", "Fe", "Cu"],
    answer: "Au"
  },
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const feedbackElement = document.getElementById("feedback");
const scoreElement = document.getElementById("score");
const nextButton = document.getElementById("next-button");

function loadQuestion() {
  const currentQuizData = quizData[currentQuestion];
  questionElement.textContent = currentQuizData.question;

  optionsElement.innerHTML = "";
  currentQuizData.options.forEach((option) => {
    const optionElement = document.createElement("label");
    optionElement.innerHTML = `
      <input type="radio" name="answer" value="${option}">
      ${option}
    `;
    optionsElement.appendChild(optionElement);
  });

  feedbackElement.textContent = ""; // Clear previous feedback
}


function checkAnswer() {
  const selectedOption = document.querySelector('input[name="answer"]:checked');
  if (selectedOption) {
    const userAnswer = selectedOption.value;
    const currentQuizData = quizData[currentQuestion];
    const correctAnswer = currentQuizData.answer;

    if (userAnswer === correctAnswer) {
      feedbackElement.textContent = "Correct!";
      feedbackElement.classList.remove("wrong");
      feedbackElement.classList.add("correct");
      score++;
    } else {
      feedbackElement.textContent = `Wrong! The correct answer is ${correctAnswer}`;
      feedbackElement.classList.remove("correct");
      feedbackElement.classList.add("wrong");
    }

    optionsElement.querySelectorAll("input").forEach((input) => {
      if (input.value === correctAnswer) {
        const label = input.parentElement;
        label.classList.add("correct-answer");
      }
      input.disabled = true;
    });

    nextButton.textContent = "Next";
    nextButton.disabled = false;

    currentQuestion++;
    if (currentQuestion < quizData.length) {
      setTimeout(() => {
        loadQuestion();
      }, 1500);
    } else {
      setTimeout(() => {
        showScore();
      }, 1500);
    }
  }
}

function showScore() {
  questionElement.style.display = "none";
  optionsElement.style.display = "none";
  nextButton.style.display = "none";
  scoreElement.textContent = `Your Score: ${score}/${quizData.length}`;
}

nextButton.addEventListener("click", checkAnswer);

loadQuestion();


function showScore() {
  questionElement.style.display = "none";
  optionsElement.style.display = "none";
  nextButton.style.display = "none";
  scoreElement.textContent = `Your Score: ${score}/${quizData.length}`;
}

nextButton.addEventListener("click", () => {
  if (nextButton.textContent === "Next") {
    showNextQuestion();
  } else {
    checkAnswer();
  }
});

loadQuestion();
