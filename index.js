document.addEventListener('DOMContentLoaded', function(){
    const body = document.querySelector('body');
   
    let localTrainings;

    const saveToLocal = () => {
        window.localStorage.setItem(`trainings`, JSON.stringify(localTrainings));
    }
    
    if (!localStorage.getItem(`trainings`)) {
        localTrainings = trainings;
        saveToLocal();
    } else {
        localTrainings = JSON.parse(localStorage.getItem(`trainings`));
    }

    const startTimer = () => {

        let id = document.querySelector('select').value;
        
        let setCounter = 1;
        
        const startTrainCountdown = () => {
            
            let trainTime = localTrainings[id].train.secs -1;

            body.innerHTML = `
            <div class="container" id="second-screen">
                <div class="title">
                    <h1>TRAIN!</h1>
                    <h3>Set ${setCounter} of ${localTrainings[id].sets}</h3>
                </div>
                <div class="timer">
                    <p id="countdown">${trainTime}</p>
                    <div class="background-loop">
                        <div class="train"></div>
                    </div>
                </div>
                <button class="secondary" id="give-up">GIVE UP</button>
            </div>
            `;

            let intervalTrain = setInterval(function(){
                trainTime--;
                
                document.querySelector('#give-up').addEventListener('click', function(){
                    setStarterScreen();
                    clearInterval(intervalTrain);    
                });

                document.querySelector('.background-loop div').classList.remove('rest');
                document.querySelector('.background-loop div').classList.add('train');
                document.querySelector('.title h1').innerHTML = 'TRAIN!';

                if (trainTime >= 0) {
                    document.querySelector('#countdown').innerHTML = trainTime;
                }

                if(trainTime < 0){
                    clearInterval(intervalTrain);
                    if(setCounter === localTrainings[id].sets - 1){ setCounter++};
                    if(setCounter <= localTrainings[id].sets){
                        
                        startRestCountDown();
                    } else {
                        document.querySelector('#give-up').innerHTML = 'BACK';
                        document.querySelector('.title h1').innerHTML = 'Congrats!';
                        document.querySelector('.title h3').style.display = 'none';
                        
                        document.querySelector('.background-loop div').classList.add('rest');
                        document.querySelector('.background-loop div').classList.remove('train');

                        document.querySelector('#countdown').innerHTML = 'YOU<br>DID<br>IT!';
                        document.querySelector('#countdown').style.margin = '10px 0px';
                    }
                }

            }, 1000)
        }

        const startRestCountDown = () => {
            
            let restTime = localTrainings[id].rest.secs -1;

            document.querySelector('.background-loop div').classList.add('rest');
            document.querySelector('.background-loop div').classList.remove('train');
            document.querySelector('.title h1').innerHTML = 'REST!';
            document.querySelector('#countdown').innerHTML = restTime;

            let intervalRest = setInterval(function(){
                restTime--;

                document.querySelector('#give-up').addEventListener('click', function(){
                    setStarterScreen();
                    clearInterval(intervalRest);
                });
                
                if(restTime >= 0) {
                    document.querySelector('.title h1').innerHTML = 'REST!';
                    document.querySelector('#countdown').innerHTML = restTime;
                }
                
                if (restTime < 0) {
                    setCounter++;
                    clearInterval(intervalRest);
                    startTrainCountdown();
                }
            }, 1000)
        }

        startTrainCountdown();
    }
    
    const setCreateScreen = () => {
        body.innerHTML = `
        <div class="container" id="create-training">
            <div class="logo">
                <div class="graphic"></div>
                <h1>Timey<br>Wimey</h1>
            </div>
            <div class="user-input create">
                <p style="color:red;" id="error-notice"></p>
                <div class="name-input">
                    <label for="name-training">Name your training:</label>
                    <input type="text" name="name-training" id="training-name" placeholder="Input name">
                </div>
                <div class="time-input">
                    <div>
                        <label for="train">Train:</label>
                        <input type="number" name="train" id="train" min="10" max="60">
                    </div>
                    <div>
                        <label for="rest">Rest:</label>
                        <input type="number" name="rest" id="rest" min="10" max="60">
                    </div>
                    <div>
                        <label for="sets">Sets:</label>
                        <input type="number" name="sets" id="sets" min="1"></div>
                    </div>
                <button class="secondary" id="create">CREATE</button>
            </div>
        </div>`;

        let createButton = document.querySelector('#create');

        createButton.addEventListener('click', function(){
            document.querySelector('#error-notice').innerHTML = '';
            let name = document.querySelector('#training-name').value;
            let trainSecs = document.querySelector('#train').value;
            let restSecs = document.querySelector('#rest').value;
            let sets = document.querySelector('#sets').value;
            let index = localTrainings.length;

            if ( name === '' || trainSecs === '' || restSecs === '' || sets === '') {
                document.querySelector('#error-notice').innerHTML = 'Please input missing values';
               
            } else {
                let newTraining = {
                    id: index,
                    name: name,
                    train: {
                        mins: 00,
                        secs: parseInt(trainSecs)
                    },
                    rest: {
                        mins: 00,
                        secs: parseInt(restSecs)
                    },
                    sets: parseInt(sets)
                };
            
                localTrainings.push(newTraining);
                saveToLocal();
                setStarterScreen();
            }
            
        })
    }

    const setStarterScreen = () => {
        body.innerHTML = `
        <div class="container" id="first-screen">
            <div class="logo">
                <div class="graphic"></div>
                <h1>Timey<br>Wimey</h1>
            </div>
            <div class="user-input">
                <label for="select-training">Choose your training:</label>
                <div class="input-button">
                    <div class="select-wrapper">
                        <select name="select-training" id="select-training">
                        </select>
                    </div>
                    <div class="action-buttons">
                        <button class="primary" id="go">GO!</button>
                        <button class="secondary" id="create">CREATE NEW</button>
                    </div>

                </div>
            </div>
        </div>
        `;

        let select = document.querySelector('select');

        localTrainings.forEach(training => {
            select.innerHTML += `<option value="${training.id}">${training.name}</option>`
        })

        let startButton = document.querySelector('#go');
        let createButton = document.querySelector('#create');

        startButton.addEventListener('click', startTimer);
        createButton.addEventListener('click', setCreateScreen);
    }
    
    setStarterScreen();
})