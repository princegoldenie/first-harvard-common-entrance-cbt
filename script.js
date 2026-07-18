// =====================================
// FIRST HARVARD ACADEMY CBT SYSTEM
// COMMON ENTRANCE CBT EXAMINATION - 2026
// MAIN SCRIPT FILE
// =====================================



// ===============================
// START EXAM BUTTON
// ===============================


function startExam(){


let name =
document.getElementById("studentName").value;


let examNumber =
document.getElementById("examNumber").value;


let subject =
document.getElementById("subject").value;



if(name.trim()==""){

alert("Please enter your name");

return;

}



if(examNumber.trim()==""){

alert("Please enter your exam number");

return;

}



// SAVE STUDENT INFORMATION


localStorage.setItem(
"name",
name
);


localStorage.setItem(
"examNumber",
examNumber
);


localStorage.setItem(
"subject",
subject
);



// GO TO EXAM PAGE


window.location.href="exam.html";


}






// ===============================
// VARIABLES
// ===============================


let questions=[];

let currentQuestion=0;

let studentAnswers=[];

let score=0;

let time=2700; // 45minutes

let timer;






// ===============================
// GET SUBJECT
// ===============================


let selectedSubject =
localStorage.getItem("subject");








// ===============================
// TYPEWRITER TITLE
// ===============================


let titleText =
"COMMON ENTRANCE CBT EXAMINATION - 2026";


let titleIndex=0;



function typeWriter(){


let title =
document.getElementById("typing-title");



if(title && titleIndex < titleText.length){


title.innerHTML +=
titleText.charAt(titleIndex);


titleIndex++;


setTimeout(typeWriter,80);


}


}



window.onload=function(){


typeWriter();


};








// ===============================
// LOAD EXAM PAGE
// ===============================


if(window.location.pathname.includes("exam.html")){



setTimeout(function(){



document.getElementById("subject-title").innerHTML =
selectedSubject;



document.getElementById("student-number").innerHTML =
localStorage.getItem("examNumber");




// SELECT QUESTION BANK



if(selectedSubject=="Mathematics & Quantitative Reasoning"){


questions =
questionBank.mathQuantitative;


}



else if(selectedSubject=="English & Verbal Reasoning"){


questions =
questionBank.englishVerbal;


}



else if(selectedSubject=="Science"){


questions =
questionBank.science;


}



else if(selectedSubject=="General Paper"){


questions =
questionBank.generalPaper;


}




// SHUFFLE QUESTIONS


questions =
shuffle(questions);



// PICK ONLY 50 QUESTIONS


questions =
questions.slice(0,50);




// START EXAM


loadQuestion();


startTimer();



},200);



}









// ===============================
// SHUFFLE FUNCTION
// ===============================


function shuffle(array){


let newArray=[...array];



for(let i=newArray.length-1;i>0;i--){


let j =
Math.floor(Math.random()*(i+1));



[newArray[i],newArray[j]]
=
[newArray[j],newArray[i]];


}



return newArray;


}









// ===============================
// LOAD QUESTION
// ===============================


function loadQuestion(){



let q =
questions[currentQuestion];



document.getElementById("question-number").innerHTML =

"Question "
+(currentQuestion+1)
+" / 50";





// PROGRESS BAR


let progress =
((currentQuestion+1)/50)*100;



let bar =
document.getElementById("progress-bar");


if(bar){

bar.style.width =
progress+"%";

}






// QUESTION TEXT


document.getElementById("question").innerHTML =
q.question;





// CREATE OPTIONS


let options=[


["a",q.a],

["b",q.b],

["c",q.c],

["d",q.d]


];



options =
shuffle(options);



let optionBox="";





options.forEach(function(option){



optionBox += `

<button onclick="answer('${option[0]}',this)">

${option[1]}

</button>

`;



});





document.getElementById("options").innerHTML =
optionBox;







// SHOW SAVED ANSWER


let saved =
studentAnswers[currentQuestion];



if(saved){


let buttons =
document.querySelectorAll("#options button");



buttons.forEach(function(button){



if(button.dataset.answer == saved){


button.style.background="#5C4033";

button.style.color="white";


}



});



}




// ADD ANSWER DATA


let buttons =
document.querySelectorAll("#options button");



buttons.forEach(function(button,index){


button.dataset.answer =
options[index][0];


});



}









// ===============================
// ANSWER FUNCTION
// ===============================


function answer(choice,button){



studentAnswers[currentQuestion]=choice;





let buttons =
document.querySelectorAll("#options button");



buttons.forEach(function(btn){


btn.style.background="white";

btn.style.color="black";


});





button.style.background="#5C4033";

button.style.color="white";



}










// ===============================
// NEXT QUESTION
// ===============================


function nextQuestion(){



if(currentQuestion < questions.length-1){


currentQuestion++;


loadQuestion();


}

else{


submitExam();


}



}







// ===============================
// PREVIOUS QUESTION
// ===============================


function previousQuestion(){



if(currentQuestion>0){


currentQuestion--;


loadQuestion();


}



}









// ===============================
// TIMER
// ===============================


function startTimer(){



timer=setInterval(function(){



time--;



let minutes =
Math.floor(time/60);



let seconds =
time%60;



if(seconds<10){

seconds="0"+seconds;

}




let timerDisplay =
document.getElementById("timer");



if(timerDisplay){


timerDisplay.innerHTML =
minutes+":"+seconds;


}






if(time<=0){


clearInterval(timer);


submitExam();


}



},1000);



}










// ===============================
// EXTRA TIME
// ===============================


let extraUsed=false;



function addExtraTime(){



if(!extraUsed){


time +=300;


extraUsed=true;



alert(
"5 minutes added. Score penalty will apply."
);



}

else{


alert(
"Extra time already used."
);


}



}










// ===============================
// SUBMIT EXAM
// ===============================


function submitExam(){



clearInterval(timer);



score=0;



// CHECK ANSWERS


for(let i=0;i<questions.length;i++){



if(studentAnswers[i]==questions[i].correct){


score +=2;


}



}





// EXTRA TIME PENALTY


if(extraUsed){


score =
Math.floor(score*0.95);


}






let confirmSubmit =
confirm(
"Are you sure you want to submit your exam?"
);


if(confirmSubmit){


localStorage.setItem(
"score",
score
);

saveResult();

setTimeout(()=>{

window.location.href="result.html";

},2000);


}
}

function saveResult(){

let resultData = {

name: localStorage.getItem("name"),

examNumber: localStorage.getItem("examNumber"),

subject: localStorage.getItem("subject"),

score: localStorage.getItem("score"),

time: new Date().toLocaleString()

};


fetch("https://script.google.com/macros/s/AKfycbz5VqAN2SPlc6KS59m5SVAZ3dnQjoctPWk--ZZfGLzJJm_HxJ9ilCc-SCmMLh6DOqKx/exec",
{

method:"POST",

mode:"no-cors",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(resultData)

})

.then(()=>{

console.log("Result saved successfully");

})

.catch(error=>{

console.log("Error:",error);

});


}

window.onload=function(){

let savedName =
localStorage.getItem("name");

let savedExam =
localStorage.getItem("examNumber");


if(document.getElementById("studentName")){


document.getElementById("studentName").value =
savedName;


document.getElementById("examNumber").value =
savedExam;


}


};