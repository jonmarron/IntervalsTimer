const body = document.querySelector("body");

let localTrainings;

const saveToLocal = () => {
	window.localStorage.setItem(`trainings`, JSON.stringify(localTrainings));
};

function startTrainingTimer(trainTime, intervalTrain, setCounter) {
	trainTime = trainTime - 1;

	console.log(trainTime);

	document.querySelector("#give-up").addEventListener("click", function () {
		setStarterScreen();
		clearInterval(intervalTrain);
	});

	document.querySelector(".background-loop div").classList.remove("rest");
	document.querySelector(".background-loop div").classList.add("train");
	document.querySelector(".title h1").innerHTML = "TRAIN!";

	if (trainTime >= 0) {
		document.querySelector("#countdown").innerHTML = trainTime;
	}

	if (trainTime < 0) {
		clearInterval(intervalTrain);
		if (setCounter === localTrainings[id].sets - 1) {
			setCounter++;
		}
		if (setCounter <= localTrainings[id].sets) {
			startRestCountDown();
		} else {
			document.querySelector("#give-up").innerHTML = "BACK";
			document.querySelector(".title h1").innerHTML = "Congrats!";
			document.querySelector(".title h3").style.display = "none";

			document
				.querySelector(".background-loop div")
				.classList.add("rest");
			document
				.querySelector(".background-loop div")
				.classList.remove("train");

			document.querySelector("#countdown").innerHTML =
				"YOU<br>DID<br>IT!";
			document.querySelector("#countdown").style.margin = "10px 0px";
		}
	}
}

const initializeTrainings = () => {
	if (!localStorage.getItem(`trainings`)) {
		localTrainings = trainings;
		saveToLocal();
	} else {
		localTrainings = JSON.parse(localStorage.getItem(`trainings`));
	}
};
const startTrainCountdown = (setCounter, id) => {
	let trainTime = localTrainings[id].train.secs - 1;

	body.innerHTML = screenConstants.trancingScreen(
		setCounter,
		localTrainings,
		trainTime,
		id
	);

	let intervalTrain = setInterval(
		() => startTrainingTimer(trainTime, intervalTrain, setCounter),
		1000
	);
};
const startRestCountDown = () => {
	let restTime = localTrainings[id].rest.secs - 1;

	document.querySelector(".background-loop div").classList.add("rest");
	document.querySelector(".background-loop div").classList.remove("train");
	document.querySelector(".title h1").innerHTML = "REST!";
	document.querySelector("#countdown").innerHTML = restTime;

	let intervalRest = setInterval(function () {
		restTime--;

		document
			.querySelector("#give-up")
			.addEventListener("click", function () {
				setStarterScreen();
				clearInterval(intervalRest);
			});

		if (restTime >= 0) {
			document.querySelector(".title h1").innerHTML = "REST!";
			document.querySelector("#countdown").innerHTML = restTime;
		}

		if (restTime < 0) {
			setCounter++;
			clearInterval(intervalRest);
			startTrainCountdown(setCounter, id);
		}
	}, 1000);
};
const startTimer = () => {
	let id = document.querySelector("select").value;

	let setCounter = 1;

	startTrainCountdown(setCounter, id);
};

const setCreateScreen = () => {
	body.innerHTML = screenConstants.CreateScreen;

	let createButton = document.querySelector("#create");

	createButton.addEventListener("click", function () {
		document.querySelector("#error-notice").innerHTML = "";
		let name = document.querySelector("#training-name").value;
		let trainSecs = document.querySelector("#train").value;
		let restSecs = document.querySelector("#rest").value;
		let sets = document.querySelector("#sets").value;
		let index = localTrainings.length;

		if (name === "" || trainSecs === "" || restSecs === "" || sets === "") {
			document.querySelector("#error-notice").innerHTML =
				"Please input missing values";
		} else {
			let newTraining = {
				id: index,
				name: name,
				train: {
					mins: 0,
					secs: parseInt(trainSecs),
				},
				rest: {
					mins: 0,
					secs: parseInt(restSecs),
				},
				sets: parseInt(sets),
			};

			localTrainings.push(newTraining);
			saveToLocal();
			setStarterScreen();
		}
	});
};

const setStarterScreen = () => {
	body.innerHTML = screenConstants.startScreen;

	let select = document.querySelector("select");

	localTrainings.forEach((training) => {
		select.innerHTML += `<option value="${training.id}">${training.name}</option>`;
	});

	let startButton = document.querySelector("#go");
	let createButton = document.querySelector("#create");

	startButton.addEventListener("click", startTimer);
	createButton.addEventListener("click", setCreateScreen);
};

const main = () => {
	initializeTrainings();
	setStarterScreen();
};

/*
we need 2 functions one for training and one for rest
make a function that gets the training object and calls the training timer and and rest function in for loop repeating the number of sets
it put the intervals in a setTimeout so that it can be cleared when when the set is over
*/



main();
