'use strict';

var questions = [];
var currentQuestion = 1;

function readSingleFile(e) {
    var file = e.target.files[0];
    if (!file) {
        return;
    }
    var reader = new FileReader();
    reader.onload = function(e) {
        var contents = e.target.result;
        displayContents(contents);
    };
    reader.readAsText(file);
}

function readFile(fileName)
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            displayContents(xhttp.responseText);
        }
    };
    xhttp.open("GET", fileName, true);
    xhttp.send();
}

function displayContents(contents) {
    //var element = document.getElementById('file-content');
    //element.innerHTML = contents;
    textToArray(contents)
}

function textToArray(text)
{
    questions = [];
    
    var lines = text.split("\n");
    var read = 0;
    // 0 -> number
    // 1 -> empty line
    // 2 -> question
    // 3 -> empty line / next line of question
    // 4 -> correct answer
    // 5 -> empty line
    // 6,8,10,12 -> Answers
    // 7,9,11,13 -> empty lines / next lines of answers
    // 14 -> end

    var question = {};

    for (var i = 0; i < lines.length; i++)
    {
        if(lines[i].length <= 1 || lines[i].substr(0,1) == " " || lines[i] == " " || lines[i] == "")
        {
            if((read % 2) == 1) {
                read++;
                
                if(read == 14) { // end of question
                    questions.push(question);
                    console.log(question);
                    question = new Object();
                    read = 0;
                }
            }
                
            continue;
        }

        if(read == 0) { //number
            question.number = parseInt(lines[i]);
            read = 1;
        } else if(read == 2) { // question
            question.question = lines[i];
            read = 3;
        } else if(read == 3) { // next line of question
            question.question += lines[i];
            read = 3;
        } else if(read == 4) { //correct
            question.correct = lines[i].substr(0,1);
            read = 5;
        } else if(read == 6) { // A
            question.A = lines[i];
            read = 7;
        } else if(read == 7) { // next line of A
            question.A += lines[i];
            read = 7;
        } else if(read == 8) { // B
            question.B = lines[i];
            read = 9;
        } else if(read == 9) { // next line of B
            question.B += lines[i];
            read = 9;
        } else if(read == 10) { // C
            question.C = lines[i];
            read = 11;
        } else if(read == 11) { // next line of C
            question.C += lines[i];
            read = 11;
        } else if(read == 12) { // D
            question.D = lines[i];
            read = 13;
        } else if(read == 13) { // next line of D
            question.D += lines[i];
            read = 13;
        } 
    }

    console.log(questions.length);
    var element = document.getElementById('question');
    element.innerHTML = "Loaded " + questions.length + " questions";
    randomQuestion();
}

function changeQuestion(number)
{
    currentQuestion = (currentQuestion + number).mod(questions.length);
    showQuestion();
}


function randomQuestion()
{
    currentQuestion = (Math.floor((Math.random() * questions.length) + 1)) % questions.length;
    showQuestion();
}

function showQuestion()
{
    var element = document.getElementById('question');
    var text = "<div style='font-weight: bold;'>" + questions[currentQuestion].number + ". " + questions[currentQuestion].question + "</div> \
<div onclick='answer(this, " + ((questions[currentQuestion].correct == "A") ? "true" : "false") + ")' style='cursor: pointer;'>" + questions[currentQuestion].A + "</div> \
<div onclick='answer(this, " + ((questions[currentQuestion].correct == "B") ? "true" : "false") + ")' style='cursor: pointer;'>" + questions[currentQuestion].B + "</div> \
<div onclick='answer(this, " + ((questions[currentQuestion].correct == "C") ? "true" : "false") + ")' style='cursor: pointer;'>" + questions[currentQuestion].C + "</div> \
<div onclick='answer(this, " + ((questions[currentQuestion].correct == "D") ? "true" : "false") + ")' style='cursor: pointer;'>" + questions[currentQuestion].D + "</div>";
    element.innerHTML = text;
}

function answer(element, correct)
{
    if(correct == true){
        element.style.background = "#0F0";
    } else {
        element.style.background = "#F00";
    }
}

Number.prototype.mod = function(n) {
    return ((this%n)+n)%n;
}