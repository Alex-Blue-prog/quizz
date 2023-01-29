//inital data
let answers = [];
let wrongQuestions = [];
let questIndex = 0;
let questionArea = document.querySelector(".questionArea");
let questionElement = document.querySelector(".question");
let optionsElement = document.querySelector(".options");
let scoreAreaElement = document.querySelector(".scoreArea");

//events
scoreAreaElement.querySelector("#reset").addEventListener("click", reset);
scoreAreaElement.querySelector("#wrong").addEventListener("click", showWrong);

//funtions
function quizz() {
    questionArea.style.display = "block";
    let takeQuestion = questions[questIndex];

    // check if there are questions
    if(questIndex + 1 > questions.length) {
        questionArea.style.display = "none";
        checkResult();
       
    } else {
        showQuestion(takeQuestion);  
    }

    showProgress();
}

function showQuestion(question) {
    questionElement.innerHTML = question.question;

    let divs = "";

    question.options.forEach((option, index) => {
        divs += `<div class="option" onclick="questionMaked(${index})"><span>${index + 1}</span> ${option}</div>`;
    });

    optionsElement.innerHTML = divs;
}

function questionMaked(value) {
    answers.push(value);
    questIndex++
    quizz();
}

function showProgress() {
    let progressElement = document.querySelector(".progress--bar");
    let answeredTotal = answers.length;
    let questionTotal = questions.length;
    let progress = answeredTotal / questionTotal * 100;
    progressElement.style.width = progress+"%";
}

function checkResult() {
    let correctTotal = 0;
    let correctPorcentageTotal;
    let questionTotal = questions.length;
    let msg = "";
    let msgColor = "";
    

    answers.forEach((value, index) => {
        correctTotal = value === questions[index].answer ? correctTotal + 1 : correctTotal;
    });

    correctPorcentageTotal = correctTotal / questionTotal * 100; 

    if(correctPorcentageTotal < 50) {
        msg = "Péssimo!";
        msgColor = "red";
    } else if(correctPorcentageTotal >= 99) {
        msg = "Parabéns!";
        msgColor = "#0d630d";
    } else {
        msg = "Muito bom!";
        msgColor = "#0d630d";
    }   
    

    scoreAreaElement.style.display = "block";
    scoreAreaElement.querySelector(".scoreText1").innerHTML = msg;
    scoreAreaElement.querySelector(".scorePct").innerHTML = `Acertou ${correctPorcentageTotal}%`;
    scoreAreaElement.querySelector(".scorePct").style.color = msgColor;
    scoreAreaElement.querySelector(".scoreText2").innerHTML = `Você respondeu ${questionTotal} questões e acertou ${correctTotal}.`;
    
}

function getWrongQuestions() {
    return questions.filter((value, index) => {
        return value.answer !== answers[index];
    }).map(value => {
        return value.question;
    });
}

function showWrong() {
    wrongQuestions = getWrongQuestions();

    let li = wrongQuestions.map(value => {
        return `<li>${value}</li>`;
    }).join(" ");
    document.querySelector("ul").innerHTML = li;
    document.querySelector("ul").style.display = "block";
}

function reset() {
    scoreAreaElement.style.display = "none";
    document.querySelector("ul").style.display = "none";
    answers = [];
    questIndex = 0;
    quizz();
}

quizz();