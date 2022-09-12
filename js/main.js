showtask();
let addtaskinput = document.getElementById("addtaskinput");
let addtaskbtn = document.getElementById("addtaskbtn");

addtaskbtn.addEventListener("click", function(){
    addtaskinputval = addtaskinput.value;
    if(addtaskinputval.trim()!=0){
        let webtask = localStorage.getItem("localtask");
        if(webtask == null){
            taskObj = [];
        }
        else{
            // local storage saves it to string format so we change it to JSON.parse() to convert text into a JavaScript object:
            taskObj = JSON.parse(webtask); 
        }
        taskObj.push({'task_name':addtaskinputval, 'completeStatus':false});
		// console.log(taskObj, 'Taha');
        // The JSON.stringify() method converts a JavaScript value to a JSON string
        localStorage.setItem("localtask", JSON.stringify(taskObj));
        addtaskinput.value = '';
    }
    showtask();
})

// showtask
function showtask(){
    let webtask = localStorage.getItem("localtask");
    if(webtask == null){
        taskObj = [];
    }
    else{
        taskObj = JSON.parse(webtask);
    }
    let html = '';
    let addedtasklist = document.getElementById("addedtasklist");
    taskObj.forEach((item, index) => {

        if(item.completeStatus==true){
            taskCompleteValue = `<td class="completed">${item.task_name}</td>`;
        }else{
            taskCompleteValue = `<td>${item.task_name}</td>`;
        }
        html += `<tr>
                    <th scope="row">${index+1}</th>
                    ${taskCompleteValue}
                    <td><button type="button" class="text-success" id=${index}><i class="fa fa-check-square-o"></i>Complete</button></td>
                    <td><button type="button" onclick="deleteitem(${index})" class="text-danger"><i class="fa fa-trash"></i>Delete</button></td>
                </tr>`;
    });
    addedtasklist.innerHTML = html;
}

// deleteitem
function deleteitem(index){
    let webtask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webtask);
    taskObj.splice(index, 1);
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    showtask();
}

// complete task
let addedtasklist = document.getElementById("addedtasklist");
    addedtasklist.addEventListener("click", function(e){
       // console.log(e);
        let webtask = localStorage.getItem("localtask");
        let taskObj = JSON.parse(webtask);
        let mytarget = e.target;
        if(mytarget.classList[0] === 'text-success'){
        let mytargetid = mytarget.getAttribute("id");
        
            for (keys in taskObj[mytargetid]) {
                if(keys == 'completeStatus' && taskObj[mytargetid][keys]==true){
                    taskObj[mytargetid].completeStatus = false;
                }else if(keys == 'completeStatus' && taskObj[mytargetid][keys]==false){
                    taskObj[mytargetid].completeStatus = true;
                }
            }
       
        localStorage.setItem("localtask", JSON.stringify(taskObj));
        showtask();
    }
    })

    
// serachlist
let searchtextbox = document.getElementById("searchtextbox");
searchtextbox.addEventListener("input", function(){
    let trlist = document.querySelectorAll("tr");
    //Array.from can be use to make html element to array
    Array.from(trlist).forEach(function(item){
        let searchedtext = item.getElementsByTagName("td")[0].innerText;
        let searchtextboxval = searchtextbox.value;
        // A regular expression is a pattern of characters. The pattern is used to do pattern-matching "search-and-replace" functions on text.
        // The gi modifier is used to do a case insensitive search of all occurrences of a regular expression in a string
        let re = new RegExp(searchtextboxval, 'gi');
        if(searchedtext.match(re)){
            item.style.display="table-row";
        }
        else{
            item.style.display="none";
        }
    })
})

