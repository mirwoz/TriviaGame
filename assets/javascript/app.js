$(document).ready(function () {
    var card = $("#quiz-area");
    var timer;
    var correctAnsArray = [];
    var Game = {
        correct: 0,
        incorrect: 0,
    };

    function countdown() {
        var counter = 120;
        var interval = setInterval(function () {
            counter--;

            if (counter === 0) {
                clearInterval(interval);
                finish();
                return;
            } else {
                $('#time').text(counter);
            }
        }, 1000);
    };

    function getFromAPI(difficulty) {
        let dbUrl = `https://opentdb.com/api.php?amount=15&category=17&difficulty=${difficulty}&type=multiple`
        $.ajax({
            method: "GET",
            url: dbUrl
        }).then((res) => {
            loadQues(res)

        })
    };


    // function to shuffle the answer array 

    function shuffle(allAns) {

        for (let i = allAns.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allAns[i], allAns[j]] = [allAns[j], allAns[i]];

        }
        return allAns
    };



    function loadQues(res) {
        let results = res.results

        results.forEach(result => {
            let question = result.question;
            let allAns = result.incorrect_answers;
            correctAns = result.correct_answer;
            allAns.push(correctAns);
            correctAnsArray.push(correctAns);

            card.append("<h2>" + question + "<h2>");
            shuffle(allAns)
            allAns.forEach(ans => {

                card.append(`<input type='radio' name='${question}' value='${ans}'> ${ans}`)
            })


        })
    };



    function start() {

        $("#sub-wrapper").prepend(
            "<h2>Time Remaining: <span id='time'>120</span> Seconds</h2>"
        );

        $("#start").remove();


        getFromAPI("easy");
        countdown();
        card.append("<button id='finish'>Submit</button>");
    };

    function finish() {
        var inputs = [];
        $.each($("input[type='radio']:checked"), function () {
            inputs.push($(this).val());
        });

        for (var i = 0; i < inputs.length; i++) {

            if (inputs[i] === correctAnsArray[i]) {
                Game.correct++;
                console.log(Game.correct)
            } else {
                Game.incorrect++;
                console.log(Game.incorrect)
            }
        }
        results();
    };

    function results() {
        clearInterval(timer);

        $("#sub-wrapper h2").remove();

        card.html("<h2 id='allDone'>All Done!</h2>");
        card.append("<h3>Correct Answers: " + Game.correct + "</h3>");
        card.append("<h3>Incorrect Answers: " + Game.incorrect + "</h3>");
        card.append("<button id='retry'>Try again!</button>")
    };


    // click events

    $(document).on("click", "#start", "#retry", function () {
        start();
    });

    $(document).on("click", "#retry", function () {
        location.reload();
    });

    $(document).on("click", "#finish", function () {
        finish();
    });



































    $("#check").on("click", function (buttonValue) {
        console.log("I'm clicked");
        var buttonValue = checkAnswer(".answerLabel");
        console.log(buttonValue);

    });

    function checkAnswer(spanClass) {
        var radioVal = "";
        var radios = document.getElementsByClassName(spanClass);
        for (i = 0; i < radios.length; i++) {

            if (radios[i].checked()) {
                radioVal = $(spanClass).text();
                return radioVal;
            }

            // if (radioVal === )

        }


    }



    // function questionCounter() {

    // }

    // function getQues(responses) {

    //     let results = responses.results;
    //     console.log(results);

    //     for (let i = 0; i < results.length; i++) {

    //         let correctAnswer = [];
    //         let incorrectAnswers = [];
    //         let allQues = [];


    //         allQues.push(results[i].question);
    //         console.log(allQues);
    //         correctAnswer.push(results[i].correct_answer);

    //         incorrectAnswers.push(results[i].incorrect_answers);


    //         var allAns = $.map(incorrectAnswers, function (v, i) {
    //             return [v, correctAnswer[i]];
    //         });


    //         //allAns[0] are all the answers combined, allAns[1] is the correct anser
    //         allAns[0].push(allAns[1]);

    //         shuffle(allAns[0]);

    //         console.log(allAns)

    //         results.forEach(question => {

    //             var quesDiv = $("<div/>").attr("class", "card");
    //             var theQuestion = $("<h5/>").attr("class", "card-title", "id", "theQuestion")

    //             $("#theQuestion").text(question.question);

    //             one = $("#answerOne").text(question.incorrect_answers[0]);
    //             one = $("#inputOne").value;
    //             console.log(one);

    //             two = $("#answerTwo").text(question.incorrect_answers[1]);
    //             two = $("#inputTwo").value;

    //             three = $("#answerThree").text(question.incorrect_answers[2]);
    //             three = $("#inputThree").value;

    //             four = $("#answerFour").text(question.incorrect_answers[3]);
    //             four = $("#inputFour").value;


    //         });



    //     };



    // };
    // parsedAnswer.forEach(question => {
    //     console.log(parsedAnswer.question)
    // })


});

// function showQues(allAns) {



// }








//Justins code:

// allAns.push(question.correct_answer)
// question.incorrect_answers.forEach(ans => {
//     allAns.push(ans);
// })

// let parsedAnswer = {
//     question: question.question,
//     correct_answer: question.correct_answer,
//     answers: allAns
// }
// console.log(parsedAnswer.question.answers);


// $("#DIV").on("click",function(){
//     console.log("THIS IS A CALLABCK")
// })