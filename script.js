//Global Variables
//Vars to get HTML elements
const doorImage1 = document.getElementById('door1')
const doorImage2 = document.getElementById('door2')
const doorImage3 = document.getElementById('door3')
const startButton = document.getElementById('start')
const currentScore = document.getElementById('current-score')
const bestScore = document.getElementById('best-score')
const submitBtn = document.getElementById('btn')

//Vars for image paths
const botDoorPath = "file:///C:/Users/persi/JavascriptProjects/CC-ChoreDoor/resources/robot1.jpg"
const beachDoorPath = "file:///C:/Users/persi/JavascriptProjects/CC-ChoreDoor/resources/beach.png"
const spaceDoorPath = "file:///C:/Users/persi/JavascriptProjects/CC-ChoreDoor/resources/space.png"
const closedDoorPath = "file:///C:/Users/persi/JavascriptProjects/CC-ChoreDoor/resources/closed_door.png"

//Vars for javascript interactivity
let numClosedDoors = 3;
let openDoor1;
let openDoor2;
let openDoor3;
let currentlyPlaying = true;
let currentWinCounter = 0;
let bestWinCounter = 0;

//Checks to see if the user has opened a door with the robot.
const isBot = door => {
    return (door.src===botDoorPath) ? true:false;
}

//Makes sure each door is only clickable once.
const isClicked = door => {
    return (door.src===closedDoorPath) ? false:true;
}

//reduces numClosedDoors so when it hits 0 there is a winner.
const playDoor = door => {
    numClosedDoors--;
    if(numClosedDoors===0) {
        gameOver('win')
    } else if(isBot(door)===true) {
        gameOver('lose')
    };
}

//Assigns a random image to each door
const randomChoreDoorGenerator = () => {
    let choreDoor = Math.floor(Math.random()*numClosedDoors);

    if(choreDoor===0) {
        openDoor1 = botDoorPath;
        openDoor2 = spaceDoorPath;
        openDoor3 = beachDoorPath;
    }else if(choreDoor===1) {
        openDoor2 = botDoorPath;
        openDoor1 = spaceDoorPath;
        openDoor3 = beachDoorPath;
    }else {
        openDoor3 = botDoorPath;
        openDoor1 = beachDoorPath;
        openDoor2 = spaceDoorPath;
    }
}

//Event listeners for each door. When clicked, changes door image.
doorImage1.addEventListener('click', () => {
    if((isClicked(doorImage1)===false)&&(currentlyPlaying===true)) {
        doorImage1.src = openDoor1;
        playDoor(doorImage1);     
    }
})
doorImage2.addEventListener('click', () => {
    if(((isClicked(doorImage2)===false)&&(currentlyPlaying===true))) {
        doorImage2.src = openDoor2;
        playDoor(doorImage2);
    }
})
doorImage3.addEventListener('click', () => {
    if((isClicked(doorImage3)===false)&&(currentlyPlaying===true)) {
        doorImage3.src = openDoor3;
        playDoor(doorImage3);
    }
})
//Event listener 'click', starts/restarts the game.
startButton.addEventListener('click', () => {
    if(currentlyPlaying===false) startRound();
})

//Event listener 'click' on form button captures user input.
submitBtn.addEventListener('click', ev => {
    ev.preventDefault();//stops the form submitting

    const userInputOfDoors = document.getElementById('numOfDoors').value
    const doorParentID = document.getElementById('door-rows')

    numClosedDoors = parseInt(numClosedDoors,10)//Needs to be converted from int to num
    let addOrSubtractDoors = userInputOfDoors-numClosedDoors
    let newDoorID = numClosedDoors+1
    let removeDoorID = Math.abs(numClosedDoors)

    numClosedDoors = userInputOfDoors;

    if (addOrSubtractDoors===0) return
    
    if (addOrSubtractDoors>0) {
        console.log(addOrSubtractDoors)
        while(addOrSubtractDoors!==0) {

            

            let newDoor = document.createElement("img")
            let newDoorNumber = doorParentID.appendChild(newDoor)


            newDoorNumber.setAttribute("id", "door"+newDoorID)
            newDoorNumber.setAttribute("class", "door-frame")
            newDoorNumber.setAttribute("src", closedDoorPath)

            addOrSubtractDoors--
            newDoorID++;
        }
    } else {
        console.log(addOrSubtractDoors)
        while(addOrSubtractDoors!==0) {

            let removeDoor = document.getElementById("door"+removeDoorID)
            console.log(removeDoorID)
            let newDoorNumber = doorParentID.removeChild(removeDoor)

            addOrSubtractDoors++
            removeDoorID--
        }  
    }


})

//Starts/restarts the game.
const startRound = () => {
    doorImage1.src = closedDoorPath;
    doorImage2.src = closedDoorPath;
    doorImage3.src = closedDoorPath;
    numClosedDoors = 3;
    startButton.innerHTML = 'Good Luck!'
    currentlyPlaying = true; 
    randomChoreDoorGenerator();
}

//Called when lose or win condition from playDoor() is met.
const gameOver = status => {
    if(status==='win') {
        currentWinCounter++;
        if(currentWinCounter>bestWinCounter){
            bestWinCounter=currentWinCounter;
        }

        bestScore.innerHTML = bestWinCounter;
        currentScore.innerHTML = currentWinCounter;

        startButton.innerHTML = 'You win! Play again?'
    }else if(status==='lose'){
        currentWinCounter = 0;
        currentScore.innerHTML = currentWinCounter;
        startButton.innerHTML = 'You Lose! Play again?'
    }
    currentlyPlaying = false;
}

startRound();


