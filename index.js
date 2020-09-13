
"use strict";

const STORE = {
  questions: [//1
    {
      question: `Javascript is going to be an outdated technology, don't learn it`,
      answers: [
        `(a) True: Go is the new hype man! `,
        `(b) False: Jeff Atwood said Any application that can be written in JavaScript, will eventually be written in JavaScript`,
        `(c) Javascript is lame of course`,
             ],
      correctAnswer: `(b) False: Jeff Atwood said Any application that can be written in JavaScript, will eventually be written in JavaScript`,
      
    },
    //2
    {
      question: `JavaScript is the best language for data science?`,
      answers: [
        `(a) True: Dude, JavaScript can do anything`,
     `(b) False: Yes you can use JavaScript for data science, but Python is better designed for data science`,
     `(c) It's the best type of language to talk about
    coffee brewery scripting art using Java beans`
      ],
      correctAnswer:  `(b) False: Yes you can use JavaScript for data science, but Python is better designed for data science`,
      
    },
    //3
    {
      question:  `JavaScript can only be used on the frontend`,
      answers: [
        `(a) True`,
      `(b) False`,
      `(c) You can do whatever you want with Javacript, like build complex desktop app`
      ],
      correctAnswer: `(b) False`,
     
    },
    //4
    {
      question: `The name JavaScript is borrowed from another programming language
      "Java"`,
      answers: [ `(a) True`,
      `(b) False`,
      `(c) Yes, someone felt down from a tree and a Java bean hit their head and they saw "script" in the clouds`],
      correctAnswer:  `(b) False`,
      
    },
    //5
    {
      question: `You cannot become a Web Developer just with JavaScript`,
      answers: [
       `(a) True`,
     `(b) False`,
     `(c) You need a 4 year undergrad degree, 2 year masters, and 5 year PHD to become a web developer`
      ],
      correctAnswer: `(b) False`
    }
  ],
  quizStarted: false,
  currentQuestion: 0,
  score: 0
};


function generateStartScreenHtml() {
  return `
    <div class="start-screen">
      <p>A quick quiz to test your knowledge of basic Javascript.</p>
      <button type="button" id="start">Start Quiz</button>
    </div>
  `;
}



function generateQuestionNumberAndScoreHtml() {
  return `
    <ul class="question-and-score">
      <li id="question-number">
        Question Number: ${STORE.currentQuestion + 1}/${STORE.questions.length}
      </li>
      <li id="score">
        Score: ${STORE.score}/${STORE.questions.length}
      </li>
    </ul>
  `;
}


function generateAnswersHtml() {
  const answersArray = STORE.questions[STORE.currentQuestion].answers
  let answersHtml = '';
  let i = 0;

  answersArray.forEach(answer => {
    answersHtml += `
      <div id="option-container-${i}">
        <input type="radio" name="options" id="option${i + 1}" value= "${answer}" tabindex ="${i + 1}" required> 
        <label for="option${i + 1}"> ${answer}</label>
      </div>
    `;
    i++;
  });
  return answersHtml;
}


function generateQuestionHtml() {
  let currentQuestion = STORE.questions[STORE.currentQuestion];
  return `
    <form id="question-form" class="question-form">
      <fieldset>
        <div class="question">
          <legend> ${currentQuestion.question}</legend>
        </div>
        <div class="options">
          <div class="answers">
            ${generateAnswersHtml()}
          </div>
        </div>
        <button type="submit" id="submit-answer-btn" tabindex="5">Submit</button>
        <button type="button" id="next-question-btn" tabindex="6"> Next &gt;></button>
      </fieldset>
    </form >
  `;
}



function generateResultsScreen() {
  return `
    <div class="results">
      <form id="js-restart-quiz">
        <fieldset>
          <div class="row">
        
              <legend>Your Score is: ${STORE.score}/${STORE.questions.length}</legend>
            </div>
          </div>
        
          <div class="row">
          
              <button type="button" id="restart"> Restart Quiz </button>
            </div>
          </div>
        </fieldset>
    </form>
    </div>
  `;
}



function generateFeedbackHTML(answerStatus) {
  let correctAnswer = STORE.questions[STORE.currentQuestion].correctAnswer;
  let html = '';
  if (answerStatus === 'correct') {
    html = `
    <img src="https://media.giphy.com/media/iDIV2HpWFYpFzZYHXL/giphy.gif" alt="Corect Answer">
    `;
  }
  else if (answerStatus === 'incorrect') {
    html = `
      
      <img src="https://media.giphy.com/media/xVIkfXYGTJeZKilg3p/giphy.gif" alt="Wrong">
    `;
  }
  return html;
}

/********** RENDER FUNCTION **********/


function render() {
  let html = '';

  if (STORE.quizStarted === false) {
    $('main').html(generateStartScreenHtml());
    return;
  }
  else if (STORE.currentQuestion >= 0 && STORE.currentQuestion < STORE.questions.length) {
    html = generateQuestionNumberAndScoreHtml();
    html += generateQuestionHtml();
    $('main').html(html);
  }
  else {
    $('main').html(generateResultsScreen());
  }
}

/********** EVENT HANDLER FUNCTIONS **********/


function startButton() {
  $('main').on('click', '#start', function (event) {
    STORE.quizStarted = true;
    render();
  });
}

/**
 * Handles the click of the "next" button
 */
function nextButtonClick() {
  $('body').on('click', '#next-question-btn', (event) => {
    render();
  });
}

/**
 * Handles the submission of the question form
 */
function submitButton() {
  $('body').on('submit', '#question-form', function (event) {
    event.preventDefault();
    const currentQuestion = STORE.questions[STORE.currentQuestion];

    // get value from checkbox checked by user
    let selectedOption = $('input[name=options]:checked').val();
    

    let optionContainerId = `#option-container-${currentQuestion.answers.findIndex(i => i === selectedOption)}`;

    if (selectedOption === currentQuestion.correctAnswer) {
      STORE.score++;
      $(optionContainerId).append(generateFeedbackHTML('correct'));
    }
    else {
      $(optionContainerId).append(generateFeedbackHTML('incorrect'));
    }
    STORE.currentQuestion++;
    // hide the submit button
    $('#submit-answer-btn').hide();
    // disable all inputs
    $('input[type=radio]').each(() => {
      $('input[type=radio]').attr('disabled', true);
    });
    // show the next button
    $('#next-question-btn').show();

  });
}
/**
 * Resets all values to prepare to restart quiz
 */
function restartQuiz() {
  STORE.quizStarted = false;
  STORE.currentQuestion = 0;
  STORE.score = 0;
}

function restartButton() {
  $('body').on('click', '#restart', () => {
    restartQuiz();
    render();
  });
}

function runButton() {
  render();
  startButton();
  nextButtonClick();
  submitButton();
  restartButton();
}

$(runButton);


