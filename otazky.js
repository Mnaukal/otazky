'use strict';

var questions = [];

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
    var element = document.getElementById('file-content');
    element.innerHTML = contents;
    textToArray(contents)
}

function textToArray(text)
{
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
}