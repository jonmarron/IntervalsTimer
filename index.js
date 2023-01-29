document.addEventListener('DOMContentLoaded', function(){
    const body = document.querySelector('body');
    
    const startTimer = () => {

        let id = document.querySelector('select').value;
        
        let setCounter = 1;
        
        const startTrainCountdown = () => {
            
            let trainTime = trainings[id].train.secs;

            body.innerHTML = `
            <div class="container" id="second-screen">
                <div class="title">
                    <h1>TRAIN!</h1>
                    <h3>Set ${setCounter} of ${trainings[id].sets}</h3>
                </div>
                <div class="timer">
                    <p id="countdown">${trainTime}</p>
                    <div class="background-loop">
                        <div class="train"></div>
                    </div>
                </div>
                <button id="give-up">GIVE UP</button>
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
                    startRestCountDown();
                }

            }, 1000)
        }

        const startRestCountDown = () => {
            
            let restTime = trainings[id].rest.secs;

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
                    
                    if(setCounter <= trainings[id].sets){
                        startTrainCountdown();
                    } else {
                        document.querySelector('#give-up').innerHTML = 'BACK';
                        document.querySelector('.title h1').innerHTML = 'Congrats!';
                        document.querySelector('.title h3').style.display = 'none';

                        document.querySelector('#countdown').innerHTML = 'YOU<br>DID<br>IT!';
                        document.querySelector('#countdown').style.margin = '10px 0px';
                        //ADD LAST SCREEN
                    }
                }
            }, 1000)
        }

        startTrainCountdown();
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
                    <select name="select-training" id="select-training">
                    </select>
                    <button>GO!</button>
                </div>
            </div>
        </div>
        `;

        let select = document.querySelector('select');

        trainings.forEach(training => {
            select.innerHTML += `<option value="${training.id}">${training.name}</option>`
        })

        let startButton = document.querySelector('.input-button button');

        startButton.addEventListener('click', startTimer);
    }
    
    setStarterScreen();

})