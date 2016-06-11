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
    // 1 -> question
    // 2 -> correct answer
    // 3-6 -> Answers
    
    var question = {};
        
    for (var i = 0; i < lines.length; i++)
    {
        if(lines[i].length <= 2 || lines[i] == " " || lines[i] == "")
        {
            continue;
        }
        
        if(read == 0)
        {
            question.number = parseInt(lines[i]);
            read = 1;
        }
        else if(read == 1)
        {
            question.question = lines[i];
            read = 2;
        }
        else if(read == 2)
        {
            question.correct = lines[i];
            read = 3;
        }
        else if(read == 3)
        {
            question.A = lines[i];
            read = 4;
        }
        else if(read == 4)
        {
            question.B = lines[i];
            read = 5;
        }
        else if(read == 5)
        {   
            question.C = lines[i];
            read = 6;
        }
        else if(read == 6)
        {   
            question.D = lines[i];
            questions.push(question);
            console.log(question);
            read = 0;
        }
    }
    
    console.log(questions.length);
}