const screenConstants = {
	CreateScreen: `
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
        </div>`,
	trancingScreen: (setCounter, localTrainings, trainTime, id) => `
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
        `,
	startScreen: `
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
        `,
};
