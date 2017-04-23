var showState = 1;
var hiddenAnswers = [];

/*
populate the right panels with values already entered in the left panel

 */
window.onload = function () {
    console.log("load event detected!");

    //prepopulate the array with some hidden answers
    // this is just for demo, it  it not a good solution for prd
    hiddenAnswers.push("divAnswer5");
    refreshRightPanel();



}

function refreshRightPanel(){
    document.getElementById("rLabel").innerHTML =
        document.getElementById("descriptionTxtArea").value


    //populate radio options with values from the left panel
    document.getElementById("rLabelA").innerHTML =
        "a)  " + document.getElementById("answer1").value;
    document.getElementById("rLabelB").innerHTML =
        "b)  " + document.getElementById("answer2").value;
    document.getElementById("rLabelC").innerHTML =
        "c)  " + document.getElementById("answer3").value;
    document.getElementById("rLabelD").innerHTML =
        "d)  " + document.getElementById("answer4").value;


    document.getElementById("rHint").innerHTML =
        document.getElementById("hintText").value;
}


/*
Hide/show the extra options
 */
function ShowHideDiv(divId) {
    var div = document.getElementById(divId);
    if (showState == 1) {
        div.style.visibility = 'hidden';
        showState = 0;
    } else {
        showState = 1;
        div.style.visibility = 'visible';
    }
}

function ShowHideAnswer(divId) {
    if (divId!=undefined) {
        var div = document.getElementById(divId);
        // add it ot the array
        hiddenAnswers.push(divId)
        div.style.visibility = 'hidden';
    } else {
        // show a new div
        // if we have hidden divs we will show them , otherwise we will add a new one to DOM
        if (hiddenAnswers.length>0)
        {
            divId = hiddenAnswers.pop();
            var div2 = document.getElementById(divId);
            div2.style.visibility = 'visible';

        }
        else
        {
            alert("No more answers available!")
        }
    }

}

function save(){
    // save into some kind on permanent entity ( db, etc)
    //refresh the right panel
    refreshRightPanel();
}


//display the answers in random fashion
function randomAnswer(){

    if (!document.getElementById("randomCheck").checked){
        return;
    }
    // calculate how many options we have, 5 is the max
    var options = 5-hiddenAnswers.length;
    var orderedArray = []

    //populate in order
    for(i=0;i<options;i++){
        if (i==0){
            orderedArray.push("a");
        }
        if (i==1){
            orderedArray.push("b");
        }
        if (i==2){
            orderedArray.push("c");
        }
        if (i==3){
            orderedArray.push("d");
        }

        if (i==4){
            orderedArray.push("e");
        }
    }


    //randomize the array
    for(i=0;i<options;i++){
        var rid = getRandomInt(0,options-1);
        var tval1 =orderedArray[i];
        var tval2 =orderedArray[rid];

        orderedArray[i] = tval2;
        orderedArray[rid] = tval1;
    }


    var arrAsString="";
    // // transform into string
    for(i=0;i<orderedArray.length;i++) {
        arrAsString+=orderedArray[i]+",";
    }
    // cut the last comma
    arrAsString = arrAsString.substr(0,arrAsString.length-1);

    // add the option the to Select Ooption
    var z = document.createElement("option");
    z.setAttribute("value", "random");
    var t = document.createTextNode(arrAsString);
    z.appendChild(t);

    var element = document.getElementById("selectId");

    element.appendChild(z);

    var element = document.getElementById("selectId");
    element.value = "random"

}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

