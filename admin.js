
let results=[];


fetch(
"https://script.google.com/macros/s/AKfycbz5VqAN2SPlc6KS59m5SVAZ3dnQjoctPWk--ZZfGLzJJm_HxJ9ilCc-SCmMLh6DOqKx/exec"
)

.then(response=>response.json())

.then(data=>{


results=data.slice(1);


displayResults(results);


});





function displayResults(data){


let table="";


data.forEach(row=>{


table += `

<tr>

<td>${row[0]}</td>

<td>${row[1]}</td>

<td>${row[2]}</td>

<td>${row[3]}</td>

<td>${row[4]}</td>

<td>${row[6]}</td>


</tr>

`;



});



document.getElementById("resultTable")
.innerHTML=table;



document.getElementById("totalStudents")
.innerHTML=data.length;



let total=0;


data.forEach(row=>{

total += Number(row[3]);

});


let average =
data.length ?
(total/data.length).toFixed(2)
:
0;



document.getElementById("averageScore")
.innerHTML=
average;



document.getElementById("totalExams")
.innerHTML=
data.length;



}





function searchResult(){


let input =
document.getElementById("search")
.value.toLowerCase();



let filtered =
results.filter(row=>


row[0].toLowerCase()
.includes(input)

||

row[1].toLowerCase()
.includes(input)


);



displayResults(filtered);



}