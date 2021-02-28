const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const processText = document.querySelector('#processText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0 
let availableQuestions= []


 let questions = [
    {
        question : 'What tag is used to underline a word or text ? ' ,
        choice1 : '<u>' ,
        choice2 : '<s>' ,
        choice3 : '<ul>' ,
        choice4 : '<li>' ,
        answer: 1 ,  
    } , 
    {
        question : 'what tag is used to define the bottom section (footer) of an HTML document ? ' ,
        choice1 : '<body>' ,
        choice2 : '<button>' ,
        choice3 : '<footer>' ,
        choice4 : '<br>' ,
        answer : 3 ,  
    } , 
    {
        question : 'what tag is used to define a container for an external app or plug-in ? ' ,
        choice1 :'<embed>' ,
        choice2 :'<code>' ,
        choice3 :'<caption>' ,
        choice4 :'<!DOCTYPE>' , 
        answer : 1 , 
    } , 
    {
        question :'what tag is used to render or transform text into an emphasized (italics) version ?' ,
        choice1 :'<strong>' ,   
        choice2 :'<em>' , 
        choice3 :'<a>' ,
        choice4 :'<code>' , 
        answer : 2 ,
    } , 
    {
        question :'What tag is used to define a table or image notation (caption) ?' ,
        choice1 :'<caption>' ,
        choice2 :'<code>' ,
        choice3 :'!DOCTYPE>' ,
        choice4 :'<embed>' ,
        answer : 1 ,
    } , 
    {
        question :'What group of tags are used to define the text headers in the body of the HTML document ?' ,
        choice1 :'<h1> to <h6>' ,
        choice2 :'<td>' ,
        choice3 :'<footer>' ,
        choice4 :'<button>' ,
        answer : 1 , 
    } , 
    {
        question :'What tag can be used to insert a line break or blank line in an HTML documnet ?' ,
        choice1 :'<title></title>' ,
        choice2 :'<br></br>' ,
        choice3 :'<body></body>' ,
        choice4 :'<head></head>' ,
        answer : 2 , 
    } , 
    {
        question :'What element is a container for all the head elements, and may include the document title, scripts, styles, meta information, and more ?' ,
        choice1 :'<head></head>' ,
        choice2 :'<br></br>' ,
        choice3 :'<title></title>' ,
        choice4 :'<body></body>' ,
        answer : 1 , 
    } , 
    {
        question :'What tag is used to define - and place - an interactive button in an HTML document ?' ,
        choice1 :'<clickfield>' ,
        choice2 :'<td>' ,
        choice3 :'<footer>' ,
        choice4 :'<button>' ,
        answer : 4 , 
    } , 
    {
        question :'What tag is used to define the metadata about HTML document, and must always be included inside the element ?' ,
        choice1 :'<img>' ,
        choice2 :'<table>' ,
        choice3 :'<div>' ,
        choice4 :'<meta>' ,
        answer : 4 , 
    } ,
 ]

 const SCORE_POINTS = 100
 const MAX_QUESTIONS = 10

 startGame = () => {
     questionCounter = 0
     score = 0
     availableQuestions = [...questions]
     getNewQuestion()
 }

 getNewQuestion = () => {
     if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
         localStorage.setItem('mostRecentScore', score)

         return window.location.assign('end.html')
     }

     questionCounter++ 
     progressText.innerText = 'Question ${questionCounter} of ${MAX_QUESTIONS}'
     progressBarFull.style.width = '${(questionCounter / MAX_QUESTIONS) * 10}%' 

     const questionIndex = Math.floor(Math.random() * availableQuestions.length)
     currentQuestion = availableQuestions [questionIndex] 
     question.innerText = currentQuestion.question

     choices.forEach(choice => {
         const number = choice.dataset ['number']
         choice.innerText = currentQuestion['choice' + number]
     })

     availableQuestions.splice(questionIndex, 1)

     acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()