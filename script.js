var questionsStorage = localStorage.getItem("allQuestions");
var allQuestions ;
if (questionsStorage){
	allQuestions = JSON.parse(questionsStorage);
	console.log(allQuestions);
	initializeTable();
}
else {
	allQuestions = [];
}

function initializeTable(){
	for (i=0; i< allQuestions.length; i++){
		createItemOnTable(allQuestions[i]);
	}
}

var addButton =document.getElementById("add");
addButton.addEventListener("click", function(){

	var question = document.getElementById("question").value;
	var difficulty = document.getElementById("difficulty").value;
	var assignee = document.getElementById("assignee").value	
	var newWod = {
		title : question,
		difficulty: difficulty,
		assignee: assignee,
		done : false
	}
	allQuestions.push(newWod);
	localStorage.setItem("allQuestions", JSON.stringify(allQuestions));
	createItemOnTable(newWod)
	
})

function createItemOnTable(item){
	var newTr = document.createElement("tr");
	var tdQuest = document.createElement("td");
	var tdDifficulty = document.createElement("td");
	var tdAssignee = document.createElement("td");
	var table = document.querySelectorAll("#table table")[0];
	

	tdQuest.innerHTML = item.title;
	tdDifficulty.innerHTML = item.difficulty;
	tdAssignee.innerHTML = item.assignee;

	newTr.appendChild(tdQuest);
	newTr.appendChild(tdDifficulty);
	newTr.appendChild(tdAssignee);
	newTr.addEventListener("click", function(){

		var questionspan = document.getElementById("questionspan");
		var difficultyspan = document.getElementById("difficultyspan");
		var assigneespan = document.getElementById("assigneespan");
		var statusspan = document.getElementById("statusspan");
		questionspan.innerHTML = item.title;
		difficultyspan.innerHTML = item.difficulty;
		assigneespan.innerHTML = item.assignee;
		if (item.done){
			statusspan.innerHTML = "Completed";
		}
		else {
			statusspan.innerHTML = "Incomplete";
		}
		var markButton = document.getElementById("markButton");
		var deleteButton = document.getElementById("deleteButton");

		deleteButton.addEventListener("click", function(){
			
			for (i = 0 ; i < allQuestions.length; i++){
				if (item.title === allQuestions[i].title){
					// Delete the item
					allQuestions.splice(i,1);
					localStorage.setItem("allQuestions", 
						JSON.stringify(allQuestions));
					table.removeChild(newTr);
					//Save into local storage
				}
			}
		})

	})
	table.appendChild(newTr);
}