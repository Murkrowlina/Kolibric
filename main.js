// HIDE/SHOW PASSWORD
let password_visiblity = false;
function hide_showPassword(){
    document.getElementById('hide-pass').classList.toggle('hidden');
    document.getElementById('show-pass').classList.toggle('hidden');

    if(password_visiblity == false){
        password_visiblity = true;
        document.getElementById('password').type = 'text';
    }
    else if(password_visiblity == true){
        password_visiblity = false;
        document.getElementById('password').type = 'password';
    } 
}

// OPEN OR CLOSE SIDENAV
function open_closeSidenav(){
    document.getElementById('sidenav-menu').addEventListener('click', function(){
        document.getElementById('navbar-side').classList.toggle('w-64');
    });
    document.getElementById('sidenav-menu').addEventListener('click', function(){
        document.getElementById('navbar-user').classList.toggle('hidden');
    });
    
    document.getElementById('sidenav-close').addEventListener('click', function(){
        document.getElementById('navbar-side').classList.toggle('w-64');
    });
    document.getElementById('sidenav-close').addEventListener('click', function(){
        document.getElementById('navbar-user').classList.toggle('hidden');
    });
}

// SOUND EFFECTS
function soundEffect(audio) {
    this.sound = document.createElement('audio');
    this.sound.src = audio;
    this.sound.setAttribute('preload', 'auto');
    this.sound.setAttribute('controls', 'none');
    this.sound.setAttribute('id', 'aud')
    this.sound.style.display = 'none';
    document.body.appendChild(this.sound);
    
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    

    setTimeout(function(){
        document.body.removeChild(document.getElementById('aud'))
    }, 1000)
};

// API DICTIONARY
function voiceWord(word){
    if(player.has_clicked == true){
        return;
    }
    else {
        player.has_clicked = true;
    }

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(res => res.json())
    .then(data => {
        let sound;
        if(data[0].phonetics[0].audio != ""){
            sound = new soundEffect(data[0].phonetics[0].audio);
        }
        else{
            sound = new soundEffect(data[0].phonetics[1].audio);
        }
        sound.play();
        setTimeout(function(){
            player.has_clicked = false;
        }, 100);
    })
    .catch(err => console.log(err))
}

// ANIMAL ARRAY
let animals = {
    ocean: [
        {
            name: 'fish',
            height_style: 'h-[10rem] md:h-[13rem] lg:h-[13rem]'
        },
        {
            name: 'whale',
            height_style: 'h-[12rem] md:h-[20rem] lg:h-[20rem]'
        },
        {
            name: 'shark',
            height_style: 'h-[12rem] md:h-[20rem] lg:h-[20rem]'
        },
        {
            name: 'dolphin',
            height_style: 'h-[20rem] md:h-[30rem] lg:h-[30rem]'
        },
        {
            name: 'starfish',
            height_style: 'h-[12rem] md:h-[17rem] lg:h-[17rem]'
        },
        {
            name: 'octopus',
            height_style: 'h-[12rem] md:h-[17rem] lg:h-[17rem]'
        },
        {
            name: 'crab',
            height_style: 'h-[10rem] md:h-[10rem] lg:h-[10rem]'
        }
    ],
    jungle: [
        {
            name: 'lion',
            height_style: 'h-[18rem] md:h-[20rem] lg:h-[20rem]'
        },
        {
            name: 'tiger',
            height_style: 'h-[18rem] md:h-[20rem] lg:h-[20rem]'
        },
        {
            name: 'elephant',
            height_style: 'h-[18rem] md:h-[20rem] lg:h-[20rem]'
        },
        {
            name: 'crocodile',
            height_style: 'h-[18rem] md:h-[16rem] lg:h-[16rem]'
        },
        {
            name: 'hippopotamus',
            height_style: 'h-[18rem] md:h-[20rem] lg:h-[22rem]'
        },
        {
            name: 'rhinoceros',
            height_style: 'h-[18rem] md:h-[20rem] lg:h-[20rem]'
        },
        {
            name: 'chameleon',
            height_style: 'h-[18rem] md:h-[20rem] lg:h-[20rem]'
        }
    ],
    farm: [
        {
            name: 'horse',
            height_style: 'h-[18rem] md:h-[20rem] lg:h-[20rem]'
        },
        {
            name: 'cow',
            height_style: 'h-[18rem] md:h-[20rem] lg:h-[20rem]'
        },
        {
            name: 'rooster',
            height_style: 'h-[14rem] md:h-[17rem] lg:h-[17rem]'
        },
        {
            name: 'hen',
            height_style: 'h-[14rem] md:h-[16rem] lg:h-[16rem]'
        },
        {
            name: 'duck',
            height_style: 'h-[16rem] md:h-[20rem] lg:h-[20rem]'
        },
        {
            name: 'goose',
            height_style: 'h-[16rem] md:h-[20rem] lg:h-[20rem]'
        },
        {
            name: 'pig',
            height_style: 'h-[15rem] md:h-[17rem] lg:h-[17rem]'

        },
        {
            name: 'sheep',
            height_style: 'h-[16rem] md:h-[20rem] lg:h-[20rem]'
        },
        {
            name: 'dog',
            height_style: 'h-[15rem] md:h-[17rem] lg:h-[17rem]'
        },
        {
            name: 'cat',
            height_style: 'h-[12rem] md:h-[17rem] lg:h-[17rem]'
        }
    ]
}

// PLAYER SETTINGS
let player = {
    score: 0,
    mode: '',
    has_clicked: false,
    geography: {
        number_question: 1,
        type: ''
    },
    color_codes: {
        bigger_than: 5,
        number_boxes: 2
    },
    guess_color: {
        colors: []
    }
}
let game_settings = document.getElementById('game-settings');
let game_container = document.getElementById('game-container');

// TIMER
function timer(){
    document.getElementById('timer').classList.remove('hidden');
    let time_left = 120;
    let timer = setInterval(function(){
        time_left--;
        if(time_left >= 0){
            document.getElementById('timer').innerHTML = `
                <div>
                    <p>${Math.round(time_left / 100)}:${time_left % 60}</p>
                </div>
            `;
        }
        else if(time_left < 0){
            document.getElementById('timer').classList.add('hidden');
            game_container.innerHTML = `
                <p class="text-5xl text-center">VRIJEME JE PROŠLO!</p>
                <p class="text-5xl text-center">BODOVI: ${player.score}</p>
            `;

            setTimeout(function(){
                game_settings.classList.toggle('hidden');
                game_container.classList.toggle('hidden');
            }, 2000);
            clearInterval(timer);
        }
    }, 1000);
}

// GEOGRAPHY
function startGeographyGame(type){
    game_settings.classList.toggle('hidden');
    game_container.classList.toggle('hidden');
    game_container.innerHTML = `
        <div class="flex flex-col flex-wrap">
            <p id="question" class="text-[2rem] font-extrabold">1. PITANJE</p>
            <p id="score" class="text-[2rem] font-extrabold">BODOVI: 0</p>
            <div id="timer" class="hidden p-[10px] text-2xl text-rose-500 bg-black">2:00</div>
        </div>
        <div id="flag-capital" class="flex flex-col justify-center items-center gap-[2rem]"></div>
    `;
    
    player.mode = document.querySelector('input[name="settings"]:checked').value;
    player.score = 0;
    player.has_clicked = false;
    player.geography.type = type;
    player.geography.number_question = 1;

    if(player.mode == 'timer'){
        timer();
    }

    callGeographyApi('first');
}

function callGeographyApi(version){
    fetch(`https://restcountries.com/v3.1/all?fields=name,${player.geography.type}`)
    .then(response => response.json())
    .then(country => {
        if(version == 'first'){
            createGeographyGame(country);
        }
        else {
            createGeographySecondVer(country);
        }
    })
    .catch(error => console.log(error))
}

function createGeographyGame(countries){
    document.getElementById('question').innerText = `${player.geography.number_question}. PITANJE`;
    document.getElementById('score').innerText = `BODOVI: ${player.score}`;
    player.has_clicked = false;

    let chosen_countries = [];
    let random_country = Math.round(Math.random() * (countries.length - 1));

    if(player.geography.type == 'flags'){
        chosen_countries.push({name: countries[random_country].name.official, flag: countries[random_country].flags.png, answer: true});
        for(let i = 1; i <= 3; i++){
            random_country = Math.round(Math.random() * (countries.length - 1));
            chosen_countries.push({name: countries[random_country].name.official, answer: false});
        }
        
        document.getElementById('flag-capital').innerHTML = `
            <p class="text-[2rem] font-bold">Kojoj državi pripada ova zastava?</p>
            <img src="${chosen_countries[0].flag}" alt="flag" class="border-2 border-black h-[15rem] w-[30rem]">
        `;
    }
    else {
        chosen_countries.push({name: countries[random_country].name.official, capital: countries[random_country].capital, answer: true});
        for(let i = 1; i <= 3; i++){
            random_country = Math.round(Math.random() * (countries.length - 1));
            chosen_countries.push({name: countries[random_country].name.official, answer: false});
        }

        document.getElementById('flag-capital').innerHTML = `
            <p class="text-[2rem] font-bold">Čiji je glavni grad ${chosen_countries[0].capital}?</p>
        `;
    }

    document.getElementById('flag-capital').innerHTML += `
        <div class="flex flex-wrap justify-evenly gap-[10px]">
            <button onClick="clickedCountry(this, ${chosen_countries[0].answer})" class="country bg-zinc-300 rounded-md p-[10px] text-lg">${chosen_countries[0].name}</button>
            <button onClick="clickedCountry(this, ${chosen_countries[1].answer})" class="country bg-zinc-300 rounded-md p-[10px] text-lg">${chosen_countries[1].name}</button>
            <button onClick="clickedCountry(this, ${chosen_countries[2].answer})" class="country bg-zinc-300 rounded-md p-[10px] text-lg">${chosen_countries[2].name}</button>
            <button onClick="clickedCountry(this, ${chosen_countries[3].answer})" class="country bg-zinc-300 rounded-md p-[10px] text-lg">${chosen_countries[3].name}</button>
        </div>
    `;

    document.querySelectorAll('.country').forEach(country => {
        let random_position = Math.floor(Math.random() * 4);
        country.style.order = random_position;
    });
}

function clickedCountry(e, answer){
    if(player.has_clicked === true) {
        return;
    }
    else {
        player.has_clicked = true;
    }
    
    player.geography.number_question++;

    if(answer === true){
        let sound = new soundEffect('../igre_stranice/sounds/correct.wav');
        sound.play();
        e.classList.toggle('bg-green-500');
        player.score++;
        
        setTimeout(function(){
            callGeographyApi('first');
        }, 500);
    }
    else {
        let sound = new soundEffect('../igre_stranice/sounds/wrong.wav');
        sound.play();
        e.classList.toggle('bg-rose-500');

        if(player.mode != 'strict'){
            setTimeout(function(){
                callGeographyApi('first');
            }, 500);
        }
        else {
            game_container.innerHTML = `
                <p class="text-5xl text-center">GOTOVA IGRA!</p>
                <p class="text-5xl text-center">BODOVI: ${player.score}</p>
            `;
            setTimeout(function(){
                game_settings.classList.toggle('hidden');
                game_container.classList.toggle('hidden');
            }, 2000);
        }
    }
}

function startGeographySecondVersion(){
    game_settings.classList.toggle('hidden');
    game_container.classList.toggle('hidden');
    game_container.innerHTML = `
        <div class="flex flex-col flex-wrap">
            <p id="question" class="text-[2rem] font-extrabold">1. PITANJE</p>
            <p id="score" class="text-[2rem] font-extrabold">BODOVI: 0</p>
            <div id="timer" class="hidden p-[10px] text-2xl text-rose-500 bg-black">2:00</div>
        </div>
        <div class="flex flex-col flex-wrap justify-center items-center gap-[2rem]">
            <div id="country"></div>
            <div id="flags" class="flex flex-row flex-wrap justify-center items-center gap-[2rem] relative"></div>
        </div>
    `;

    player.mode = document.querySelector('input[name="settings"]:checked').value;
    player.score = 0;
    player.has_clicked = false;
    player.geography.type = 'flags';
    
    if(player.mode == 'timer'){
        timer();
    }

    callGeographyApi('second');
}

function createGeographySecondVer(countries){
    document.getElementById('question').innerText = `${player.geography.number_question}. PITANJE`;
    document.getElementById('score').innerText = `BODOVI: ${player.score}`;
    document.getElementById('flags').innerHTML = '';
    player.has_clicked = false;

    let flags = [];
    for(let i = 1; i <= 4; i++){
        let random_country = Math.floor(Math.random() * countries.length);
        flags.push({
            name: countries[random_country].name.official,
            img: countries[random_country].flags.png,
            chosen: false
        });
    }

    let randomly_chosen = Math.floor(Math.random() * flags.length);
    flags[randomly_chosen].chosen = true;

    document.getElementById('country').innerHTML = `
        <p class="text-[2rem]">${flags[randomly_chosen].name}</p>
    `;

    flags.forEach(flag => {
        if(flag.chosen === true){
            document.getElementById('flags').innerHTML += `
                <img src="${flag.img}" alt="flag" onclick="chosenFlag(true)" class="border-2 border-black h-[5rem] md:h-[10rem] w-[10rem] md:w-[15rem]">
            `;
        }
        else {
            document.getElementById('flags').innerHTML += `
                <img src="${flag.img}" alt="flag" onclick="chosenFlag(false)" class="border-2 border-black h-[5rem] md:h-[10rem] w-[10rem] md:w-[15rem]">
            `;
        }
    })
}

function chosenFlag(answer){
    if(player.has_clicked === true) {
        return;
    }
    else {
        player.has_clicked = true;
    }
    
    player.geography.number_question++;
    let image_el = document.createElement('img');
    image_el.style.position = 'absolute';

    if(answer === true){
        image_el.src = '../igre_stranice/images/correct.png';
        let sound = new soundEffect('../igre_stranice/sounds/correct.wav');
        sound.play();
        player.score++;
        
        setTimeout(function(){
            callGeographyApi('second');
        }, 500);
    }
    else {
        image_el.src = '../igre_stranice/images/wrong.png';
        let sound = new soundEffect('../igre_stranice/sounds/wrong.wav');
        sound.play();

        if(player.mode != 'strict'){
            setTimeout(function(){
                callGeographyApi('second');
            }, 500);
        }
        else {
            game_container.innerHTML = `
                <p class="text-5xl text-center">GOTOVA IGRA!</p>
                <p class="text-5xl text-center">BODOVI: ${player.score}</p>
            `;
            setTimeout(function(){
                game_settings.classList.toggle('hidden');
                game_container.classList.toggle('hidden');
            }, 2000);
        }
    }
    document.getElementById('flags').appendChild(image_el);
}

// LOVAC NA BOJE / PICK RIGHT BALL
function startBallGame(){
    game_settings.classList.toggle('hidden');
    game_container.classList.toggle('hidden');
    game_container.innerHTML = `
        <div id="scoreboard" class="flex flex-row justify-between items-center text-center text-4xl mb-[1rem]">
            <p id="score">Bodovi:</p>
            <div id="timer" class="hidden p-[10px] text-rose-500 bg-black">2:00</div>
        </div>
        <div id="balls-container" class="flex flex-col"></div>
    `;
    
    player.mode = document.querySelector('input[name="settings"]:checked').value;
    player.score = 0;

    if(player.mode == 'timer'){
        timer();
    }
    createBallGame();
}

function createBallGame(){
    document.getElementById('score').innerText = `Bodovi: ${player.score}`;
    document.getElementById('balls-container').innerHTML = '';

    let chosen_ball = Math.round(Math.random() * (25 - 1));
    let random_hex_1 = ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
    let random_hex_2 = ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
    let random_hex_bg = ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");

    while(random_hex_1 == random_hex_2){
        random_hex_2 = ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
    }
    while(random_hex_1 == random_hex_bg || random_hex_2 == random_hex_bg){
        random_hex_bg = ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
    }
    game_container.style.backgroundColor = '#' + random_hex_bg;

    let number_div = 25 / 5;
    for(let i = 0; i < number_div; i++){
        let div_el = document.createElement('div');
        for(let j = 0; j < 5; j++){
            let ball_el = document.createElement('div');
            ball_el.classList.add('ball');
            ball_el.style.backgroundColor = '#' + random_hex_1;
            ball_el.addEventListener('click',  wrongBall);
            div_el.appendChild(ball_el);
        }
        document.getElementById('balls-container').appendChild(div_el);
    }

    document.getElementsByClassName('ball')[chosen_ball].style.backgroundColor = '#' + random_hex_2;
    document.getElementsByClassName('ball')[chosen_ball].removeEventListener('click', wrongBall);
    document.getElementsByClassName('ball')[chosen_ball].addEventListener('click', correctBall);
}

function wrongBall(){
    let sound = new soundEffect('sounds/click.wav');
    sound.play();

    if(player.mode == 'strict'){
        game_container.innerHTML = `
            <p class="text-5xl text-center">GOTOVA IGRA!</p>
            <p class="text-5xl text-center">BODOVI: ${player.score}</p>
        `;
        
        setTimeout(function(){
            game_settings.classList.toggle('hidden');
            game_container.classList.toggle('hidden');
        }, 2000);   
    }
    else {
        createBallGame();
    }
}

function correctBall(){
    let clickSound = new soundEffect('sounds/click.wav');
    clickSound.play();
    player.score++;
    createBallGame();
}

// COLOR CODES
function startColorCodeGame(){
    game_settings.classList.toggle('hidden');
    game_container.classList.toggle('hidden');
    game_container.innerHTML = `
        <div class="flex flex-col flex-wrap">
            <div class="flex flex-row justify-between items-center text-3xl">
                <p class="mt-[1rem]" id="score">Bodovi: 0</p>
                <div id="timer" class="hidden p-[10px] text-rose-500 bg-black">2:00</div>
            </div>
        </div>
        <div class="flex flex-row flex-wrap justify-center" id="color-codes-container">
        </div>
    `

    player.mode = document.querySelector('input[name="settings"]:checked').value;
    player.score = 0;
    player.has_clicked = false;
    player.color_codes.number_boxes = 2;

    if(player.mode == 'timer'){
        timer();
    }
    createColorCodeGame();
}

function createColorCodeGame(){
    let colors_array = [
        {
            name: 'crvena',
            eng_name: 'red',
            background: 'red',
            color_text: 'white'
        },
        {
            name: 'plava',
            eng_name: 'blue',
            background: 'blue',
            color_text: 'white'
        },
        {
            name: 'žuta',
            eng_name: 'yellow',
            background: 'yellow'
        },
        {
            name: 'narančasta',
            eng_name: 'orange',
            background: 'orange'
        },
        {
            name: 'zelena',
            eng_name: 'green',
            background: 'green',
            color_text: 'white'
        },
        {
            name: 'ljubičasta',
            eng_name: 'purple',
            background: '#A020F0',
            color_text: 'white'
        },
        {
            name: 'roza',
            eng_name: 'pink',
            background: 'pink'
        },
        {
            name: 'smeđa',
            eng_name: 'brown',
            background: '#964B00',
            color_text: 'white'
        },
        {
            name: 'siva',
            eng_name: 'gray',
            background: 'gray',
            color_text: 'white'
        },
        {
            name: 'bijela',
            eng_name: 'white',
            background: 'white'
        },
        {
            name: 'crna',
            eng_name: 'black',
            background: 'black',
            color_text: 'white'
        }
    ];
    player.has_clicked = false;
    document.getElementById('score').innerText = `Bodovi: ${player.score}`;
    document.getElementById('color-codes-container').innerHTML = '';

    if(player.score > player.color_codes.bigger_than && player.color_codes.number_boxes < 4){
        player.color_codes.number_boxes++;
        player.color_codes.bigger_than += 5;
    }

    let diff_box_place = Math.floor(Math.random() * player.color_codes.number_boxes);
    for(let i = 0; i < player.color_codes.number_boxes; i++){
        let div_el = document.createElement('div');
        let random_color = Math.floor(Math.random() * colors_array.length);

        if(i != diff_box_place){
            div_el.innerText = colors_array[random_color].name;
            div_el.dataset.colorName = colors_array[random_color].eng_name;
        }
        else {
            let diff_color = Math.floor(Math.random() * colors_array.length);
            while(random_color == diff_color){
                diff_color = Math.floor(Math.random() * colors_array.length);
            }
            
            div_el.innerText = colors_array[diff_color].name;
            div_el.dataset.colorName = colors_array[diff_color].eng_name;
        }

        div_el.style.backgroundColor = colors_array[random_color].background;
        div_el.style.color = colors_array[random_color].color_text;
        
        colors_array.splice(random_color, 1);
        div_el.classList.add('color-code');
        div_el.addEventListener('click', clickedColorCode);
        document.getElementById('color-codes-container').appendChild(div_el);
    }
}

function clickedColorCode(e){
    if(player.has_clicked === true) {
        return;
    }
    else {
        player.has_clicked = true;
    }

    let image_el = document.createElement('img');
    let target_background = e.target.style.backgroundColor;
    let target_name = e.target.getAttribute('data-color-name');

    if(target_background != target_name){
        let sound = new soundEffect('sounds/correct.wav');
        sound.play();
        e.target.style.boxShadow = '0 0 0 5px green';
        image_el.src = 'images/correct.png';
        player.score++;
        setTimeout(createColorCodeGame, 1000);
    }
    else {
        let sound = new soundEffect('sounds/wrong.wav');
        sound.play();

        if(player.mode == 'strict'){
            game_container.innerHTML = `
                <p class="text-5xl text-center">GOTOVA IGRA!</p>
                <p class="text-5xl text-center">BODOVI: ${player.score}</p>
            `;
            
            setTimeout(function(){
                game_settings.classList.toggle('hidden');
                game_container.classList.toggle('hidden');
            }, 2000);   
        }
        else {
            e.target.style.boxShadow = '0 0 0 5px red';
            image_el.src = 'images/wrong.png';
            setTimeout(createColorCodeGame, 1000);
        }
    }

    document.getElementById('color-codes-container').appendChild(image_el);
}

// ANIMALS.HTML 
let animal_div = document.getElementById('animalContainer');
let current_animal = 0;

function loadAnimal(animals_type){
    animal_div.innerHTML = 
    `
        <div class="flex items-center justify-center">
            <img src="animals/${animals_type}/${animals[animals_type][current_animal].name}.png" alt="${animals[animals_type][current_animal].name}" class="${animals[animals_type][current_animal].height_style} cursor-pointer" onclick="voiceWord('${animals[animals_type][current_animal].name}')">
        </div>
        <div class="flex flex-row justify-evenly items-center">
            <span class="text-[2rem] md:text-[2.6rem] lg:text-[2.6rem] text-white uppercase" onclick="voiceWord('${animals[animals_type][current_animal].name}')">${animals[animals_type][current_animal].name}</span>
            <i class="fa-solid fa-right-long text-[5rem] md:text-[7rem] lg:text-[7rem] text-amber-200 cursor-pointer" onclick="nextAnimal('${animals_type}')"></i>
        </div>
    `;
}

function prevAnimal(animals_type){
    current_animal--;
    if(current_animal != 0){
        animal_div.innerHTML = 
        `
            <div class="flex items-center justify-center">
                <img src="animals/${animals_type}/${animals[animals_type][current_animal].name}.png" alt="${animals[animals_type][current_animal].name}" class="${animals[animals_type][current_animal].height_style} cursor-pointer" onclick="voiceWord('${animals[animals_type][current_animal].name}')">
            </div>            
            <div class="flex flex-row justify-evenly items-center">
                <i class="fa-solid fa-left-long text-[5rem] md:text-[7rem] lg:text-[7rem] text-amber-200 cursor-pointer" onclick="prevAnimal('${animals_type}')"></i>
                <span class="text-[2rem] md:text-[2.6rem] lg:text-[2.6rem] text-white uppercase" onclick="voiceWord('${animals[animals_type][current_animal].name}')">${animals[animals_type][current_animal].name}</span>
                <i class="fa-solid fa-right-long text-[5rem] md:text-[7rem] lg:text-[7rem] text-amber-200 cursor-pointer" onclick="nextAnimal('${animals_type}')"></i>
            </div>
        `;
    }
    else {
        animal_div.innerHTML = 
        `
        <div class="flex items-center justify-center">
            <img src="animals/${animals_type}/${animals[animals_type][current_animal].name}.png" alt="${animals[animals_type][current_animal].name}" class="${animals[animals_type][current_animal].height_style} cursor-pointer" onclick="voiceWord('${animals[animals_type][current_animal].name}')">
        </div>        
        <div class="flex flex-row justify-evenly items-center">
            <p class="text-[2rem] md:text-[2.6rem] lg:text-[2.6rem] text-white uppercase" onclick="voiceWord('${animals[animals_type][current_animal].name}')">${animals[animals_type][current_animal].name}</p>
            <i class="fa-solid fa-right-long text-[5rem] md:text-[7rem] lg:text-[7rem] text-amber-200 cursor-pointer" onclick="nextAnimal('${animals_type}')"></i>
        </div>
        `;
    }
    voiceWord(animals[animals_type][current_animal].name);
}

function nextAnimal(animals_type){
    current_animal++;
    if(current_animal < animals[animals_type].length - 1){
        animal_div.innerHTML = 
        `
            <div class="flex items-center justify-center">
                <img src="animals/${animals_type}/${animals[animals_type][current_animal].name}.png" alt="${animals[animals_type][current_animal].name}" class="${animals[animals_type][current_animal].height_style} cursor-pointer" onclick="voiceWord('${animals[animals_type][current_animal].name}')">
            </div>
            <div class="flex flex-row justify-evenly items-center">
                <i class="fa-solid fa-left-long text-[5rem] md:text-[7rem] lg:text-[7rem] text-amber-200 cursor-pointer" onclick="prevAnimal('${animals_type}')"></i>
                <p class="text-[2rem] md:text-[2.6rem] lg:text-[2.6rem] text-white uppercase" onclick="voiceWord('${animals[animals_type][current_animal].name}')">${animals[animals_type][current_animal].name}</p>
                <i class="fa-solid fa-right-long text-[5rem] md:text-[7rem] lg:text-[7rem] text-amber-200 cursor-pointer" onclick="nextAnimal('${animals_type}')"></i>
            </div>
        `;
    }
    else {
        animal_div.innerHTML = 
        `
            <div class="flex items-center justify-center">
                <img src="animals/${animals_type}/${animals[animals_type][current_animal].name}.png" alt="${animals[animals_type][current_animal].name}" class="${animals[animals_type][current_animal].height_style} cursor-pointer" onclick="voiceWord('${animals[animals_type][current_animal].name}')">
            </div>
            <div class="flex flex-row justify-evenly items-center">
                <i class="fa-solid fa-left-long text-[5rem] md:text-[7rem] lg:text-[7rem] text-amber-200 cursor-pointer" onclick="prevAnimal('${animals_type}')"></i>
                <p class="text-[2rem] md:text-[2.6rem] lg:text-[2.6rem] text-white uppercase" onclick="voiceWord('${animals[animals_type][current_animal].name}')">${animals[animals_type][current_animal].name}</p>
            </div>
        `;
    }
    voiceWord(animals[animals_type][current_animal].name);
}

// MEMORIJ
let memory_cards;
let matched_cards = 0;
let has_flipped = false;
let lock_board = false;
let first_card, second_card;

function loadMemoryCard(){    
    document.getElementById('memory-game').innerHTML = '';
    document.getElementById('memory-container').style.display = 'block';
    document.getElementById('congratulations').classList.add('hidden');

    let image_card = ['ocean', 'farm', 'jungle'];
    let random_number = Math.floor(Math.random() * image_card.length);
    
    for(let i = 0; i < animals[image_card[random_number]].length; i++){
        let first_div = document.createElement('div');
        first_div.classList.add('memory-card');
        first_div.setAttribute('data-card', animals[image_card[random_number]][i].name);

        let second_div = document.createElement('div');
        second_div.classList.add('memory-card');
        second_div.setAttribute('data-card', animals[image_card[random_number]][i].name);

        let front_face = document.createElement('img');
        front_face.src = `../edukacijske_stranice/animals/${image_card[random_number]}/${animals[image_card[random_number]][i].name}.png`;
        front_face.classList.add('front-face');
        first_div.appendChild(front_face);

        front_face = document.createElement('img');
        front_face.src = `../edukacijske_stranice/animals/${image_card[random_number]}/${animals[image_card[random_number]][i].name}.png`;
        front_face.classList.add('front-face');
        second_div.appendChild(front_face);

        let back_face = document.createElement('img');
        back_face.src = 'images/card_logo.png';
        back_face.classList.add('back-face');
        first_div.appendChild(back_face);

        back_face = document.createElement('img');
        back_face.src = 'images/card_logo.png';
        back_face.classList.add('back-face');
        second_div.appendChild(back_face);

        document.getElementById('memory-game').appendChild(first_div)
        document.getElementById('memory-game').appendChild(second_div)
    }

    memory_cards = document.querySelectorAll('.memory-card');
    memory_cards.forEach(card => card.addEventListener('click', flippedCard));
    
    shuffleCards();
}

function shuffleCards(){
    memory_cards.forEach(card => {
        let random_position = Math.floor(Math.random() * 6);
        card.style.order = random_position;
    })
}

function flippedCard(){
    if(this == first_card) return;

    let flip_sound = new soundEffect('sounds/flip.ogg');
    flip_sound.play();

    if(lock_board == true){
        return;
    }

    this.classList.add('flip');
    
    if(!has_flipped == true){
        has_flipped = true;
        first_card = this;
        return;
    }
    
    second_card = this;
    checkForMatch();
}

function checkForMatch(){
    let is_match = first_card.dataset.card == second_card.dataset.card;
    if(is_match == true){
        disableCards();
    }
    else {
        unflipCards();
    }
}

function disableCards(){
    first_card.removeEventListener('click', flippedCard);
    second_card.removeEventListener('click', flippedCard);
    matched_cards += 2;
    resetBoard();
}

function unflipCards(){
    lock_board = true;
    setTimeout(() => {
        first_card.classList.remove('flip');
        second_card.classList.remove('flip');

        let flip_sound = new soundEffect('sounds/flip.ogg');
        flip_sound.play();

        resetBoard();
    }, 1000);
}

function resetBoard(){
    if(matched_cards == memory_cards.length){
        matched_cards = 0;

        document.getElementById('congratulations').classList.remove('hidden');
        let sound = new soundEffect('sounds/bravo.wav');
        sound.play();

        document.getElementById('memory-container').style.display = 'none';
    }
    else {
        first_card = null;
        second_card = null;
        has_flipped = false;
        lock_board = false;
    }
}

// PIXEL ART
let pixel_canvas;
let input_size;
let input_color;
let input_draw = false;

function loadPixelArt(size){
    pixel_canvas = document.getElementById('pixel-art-container');
    input_size = document.getElementById('size-input');
    input_color = document.getElementById('color-input');
    createPixels(input_size.value);

    document.getElementById('reset-pixels').addEventListener('click', resetPixelArt);
    document.getElementById('new-canvas').addEventListener('click', createNewPixelArt);
}

function createPixels(pixels){
    pixel_canvas.style.setProperty('--size', pixels)
    
    for(let i = 0; i < pixels * pixels; i++){
        let div_el = document.createElement('div');
        div_el.classList.add('pixel');
        
        div_el.addEventListener('mouseover', function(){
            if(!input_draw) return
            div_el.style.backgroundColor = input_color.value;
        });
        div_el.addEventListener('mousedown', function(){
            div_el.style.backgroundColor = input_color.value;
        });
        
        pixel_canvas.appendChild(div_el);
    }
}

function resetPixelArt(){
    for(let i = 0; i < document.querySelectorAll('.pixel').length; i++){
        document.getElementsByClassName('pixel')[i].style.backgroundColor = 'white';
    }
};

function createNewPixelArt(){
    pixel_canvas.innerHTML = '';
    if(input_size.value > 0 && input_size.value <= 64){
        loadPixelArt(input_size.value);
    }
};

window.addEventListener('mousedown', function(){
    input_draw = true;
});

window.addEventListener('mouseup', function(){
    input_draw = false;
});
  
function sendAudio(getAudio){
    let sound = new soundEffect(getAudio);
    sound.play();
}

// SIMON SAYS 
let simon_says = {
    started: false,
    strict_mode: false,
    score: 0,
    pattern: [],
    count: 0,
    player_count: 0
}

document.getElementById('simon-reset').addEventListener('click', resetSimonSays);
function resetSimonSays(){
    simon_says.started = false;
    simon_says.strict_mode = false;
    simon_says.score = 0;
    simon_says.pattern = [];
    simon_says.count = 0;
    simon_says.player_count = 0;

    document.getElementById('simon-score').innerText = '---';
    simon_says.strict_mode = false;
    document.getElementById('simon-strict').classList.add('bg-orange-500');
    document.getElementById('simon-strict').classList.remove('bg-orange-700');
}

document.getElementById('simon-strict').addEventListener('click', strictSimonSays);
function strictSimonSays(){
    if(simon_says.strict_mode === false){
        simon_says.strict_mode = true;
        document.getElementById('simon-strict').classList.remove('bg-orange-500');
        document.getElementById('simon-strict').classList.add('bg-orange-700');
    }
    else {
        simon_says.strict_mode = false;
        document.getElementById('simon-strict').classList.add('bg-orange-500');
        document.getElementById('simon-strict').classList.remove('bg-orange-700');
    }
}

document.getElementById('simon-start').addEventListener('click', startSimonSays);
function startSimonSays(){
    if(simon_says.started === true){
        return;
    }
    else {
        simon_says.started = true;
        loadSimonSays();
    };
}

function loadSimonSays(){
    document.getElementById('simon-score').innerText = simon_says.score;
    loadSimonPatterns('next');
}

function loadSimonPatterns(status){
    has_clicked = false;
    if(status == 'next'){
        simon_says.pattern.push(Math.floor(Math.random() * 4));
        document.querySelectorAll('#simon-button').forEach(button => {
            button.removeEventListener('click', inputSimonSays);
        });
    }

    document.querySelectorAll('#simon-button').forEach(button => {
        if(button.dataset.simon == simon_says.pattern[simon_says.count]){
            let sound = new soundEffect(`https://s3.amazonaws.com/freecodecamp/simonSound${simon_says.pattern[simon_says.count] + 1}.mp3`);
            sound.play();

            button.classList.remove('opacity-[0.4]');
            setTimeout(function(){
                button.classList.add('opacity-[0.4]');
            }, 800)
            return;
        }
    })

    if(simon_says.pattern.length === simon_says.count){
        document.querySelectorAll('#simon-button').forEach(button => {
            button.addEventListener('click', inputSimonSays);
        });
    }
    else {
        simon_says.count++;
        setTimeout(function(){

            loadSimonPatterns();
        }, 1000)
    }
}

function inputSimonSays(e){
    if(has_clicked === true) return;
    let player_input = []; 
    
    player_input.push(e.target.getAttribute('data-simon'));

    document.getElementsByTagName('button')[player_input].classList.remove('opacity-[0.4]');
    setTimeout(function(){
        document.getElementsByTagName('button')[player_input].classList.add('opacity-[0.4]');
    }, 200)

    let sound = new soundEffect(`https://s3.amazonaws.com/freecodecamp/simonSound${simon_says.pattern[simon_says.player_count] + 1}.mp3`);
    sound.play();

    if(simon_says.pattern[simon_says.player_count] != player_input){
        simon_says.count = 0;
        simon_says.player_count = 0;
        document.getElementById('simon-score').innerText = 'Wrong!';

        setTimeout(function(){
            if(simon_says.strict_mode === true){
                simon_says.score = 0;
                document.getElementById('simon-score').innerText = simon_says.score;
            }
            else {
                document.getElementById('simon-score').innerText = simon_says.score;
            }
            loadSimonPatterns();
        }, 800);

        return;
    }
    else {
        simon_says.player_count++;
    }

    if(simon_says.player_count == simon_says.pattern.length){
        has_clicked = true;
        simon_says.count = 0;
        simon_says.player_count = 0;
        simon_says.score++;
        document.getElementById('simon-score').innerText = simon_says.score;

        setTimeout(function(){
            loadSimonPatterns('next');
        }, 800)

        return;
    }
}

// GEOMETRY
function startGeometryGame(){
    game_settings.classList.toggle('hidden');
    game_container.classList.toggle('hidden');
    game_container.innerHTML = `
        <div class="flex flex-col gap-[2rem]">
            <p class="text-4xl">Odaberite navedeni oblik</p>
            <p id="chosen-shape" class="text-4xl"></p>
            <div class="flex flex-row justify-between">
                <p id="score" class="text-3xl">Bodovi: 0</p>
                <div id="timer" class="hidden p-[10px] text-rose-500 bg-black">2:00</div>
            </div>
        </div>
        <div id="geometry-grid" class="grid grid-rows-4 grid-cols-3 md:gap-[10px]"></div>
    `;

    player.mode = document.querySelector('input[name="settings"]:checked').value;
    player.score = 0;
    player.has_clicked = false;

    if(player.mode == 'timer'){
        timer();
    }
    createGeometryGame();
}

function createGeometryGame(){
    player.has_clicked = false;
    let geometry_shapes = [
        {
            shape: 'KRUG',
            chosen: false,
            createShape(){
                geometry_grid.innerHTML += `
                    <div>
                        <div onclick="clickedShape(${this.chosen})" class="cursor-pointer h-[80px] md:h-[100px] w-[80px] md:w-[100px] bg-[#${((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0")}] rounded-full border-black border-4"></div>
                    </div>
                `;
            }
        },
        {
            shape: 'TROKUT',
            chosen: false,
            createShape(){
                geometry_grid.innerHTML += `
                    <div>
                        <div onclick="clickedShape(${this.chosen})" class="cursor-pointer h-[0px] w-[0px] border-[#${((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0")}] border-x-[40px] md:border-x-[50px] border-b-[80px] md:border-b-[100px] border-solid border-x-transparent"></div>
                    </div>        
                `;
            }
        },
        {
            shape: 'KVADRAT',
            chosen: false,
            createShape(){
                geometry_grid.innerHTML += `
                    <div>
                        <div onclick="clickedShape(${this.chosen})" class="cursor-pointer h-[70px] md:h-[100px] w-[70px] md:w-[100px] bg-[#${((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0")}] border-black border-4"></div>
                    </div>    
                `;
            }
        },
        {
            shape: 'PRAVOKUTNIK',
            chosen: false,
            createShape(){
                geometry_grid.innerHTML += `
                    <div>
                        <div onclick="clickedShape(${this.chosen})" class="cursor-pointer h-[50px] md:h-[70px] w-[80px] md:w-[100px] md:w-[150px] bg-[#${((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0")}] border-black border-4"></div>
                    </div>        
                `;
            }
        },
        {
            shape: 'OVAL',
            chosen: false,
            createShape(){
                geometry_grid.innerHTML += `
                    <div>
                        <div onclick="clickedShape(${this.chosen})" style="border-radius: 100px/50px" class="cursor-pointer h-[50px] md:h-[80px] w-[100px] md:w-[150px] bg-[#${((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0")}] border-black border-4"></div>
                    </div>
                `;
            }
        },
        {
            shape: 'ZVIJEZDA',
            chosen: false,
            createShape(){
                geometry_grid.innerHTML += `
                    <div>
                        <i onclick="clickedShape(${this.chosen})" class="cursor-pointer  fa-solid fa-star fa-4x md:fa-6x text-[#${((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0")}]"></i>
                    </div>
                `
            }
        }
    ];
    let geometry_grid = document.getElementById('geometry-grid');
    geometry_grid.innerHTML = '';

    let chosen_shapes = [];
    for(let i = 0; i < 4; i++){
        let random_number = Math.round(Math.random() * (geometry_shapes.length - 1));
        chosen_shapes.push(geometry_shapes[random_number]);
        geometry_shapes.splice(random_number, 1);
    }
    document.getElementById('chosen-shape').innerHTML = chosen_shapes[0].shape;
    chosen_shapes[0].chosen = true;

    for(let i = 0; i < 8; i++){
        geometry_grid.appendChild(document.createElement('div'));
    }

    chosen_shapes.forEach(shape => {
        shape.createShape();
    })

    for(let i = geometry_grid.children.length; i >= 0; i--){
        geometry_grid.appendChild(geometry_grid.children[Math.floor(Math.random() * i)]);
    }
}

function clickedShape(answer){
    if(player.has_clicked === true) return;
    if(answer === true){
        let sound = new soundEffect('../igre_stranice/sounds/correct.wav');
        sound.play();

        player.score++
        document.getElementById('score').innerText = `Bodovi: ${player.score}`;

        setTimeout(function(){
            createGeometryGame();
        }, 500);
    }
    else if(answer === false){
        let sound = new soundEffect('../igre_stranice/sounds/wrong.wav');
        sound.play();

        if(player.mode != 'strict'){
            setTimeout(function(){
                createGeometryGame();
            }, 500);
        }
        else {
            game_container.innerHTML = `
                <p class="text-5xl text-center">GOTOVA IGRA!</p>
                <p class="text-5xl text-center">BODOVI: ${player.score}</p>
            `;
            setTimeout(function(){
                game_settings.classList.toggle('hidden');
                game_container.classList.toggle('hidden');
            }, 2000);
        }
    }
    player.has_clicked = true;
}

// GUESS COLOR
function startGuessColor(){
    game_settings.classList.toggle('hidden');
    game_container.classList.toggle('hidden');
    game_container.innerHTML = `
        <div class="flex flex-col flex-wrap">
            <div class="flex flex-row justify-between items-center text-3xl">
                <p class="mt-[1rem]" id="score">Bodovi: 0</p>
                <div id="timer" class="hidden p-[10px] text-rose-500 bg-black">2:00</div>
            </div>
        </div>
        <div class="flex flex-col flex-wrap justify-center items-center gap-[2rem]">
            <div id="chosen-color" class="w-[15rem] h-[15rem]"></div>
            <div id="guess-color-btns" class="flex flex-row justify-between gap-[2rem]">
            </div>
        </div>
    `;

    player.mode = document.querySelector('input[name="settings"]:checked').value;
    player.score = 0;
    player.has_clicked = false;

    if(player.mode == 'timer'){
        timer();
    }
    callColorApi();
}

function createGuessColor(color){
    player.guess_color.colors.push({
        name: color.name.value,
        hex_code: color.hex.value,
        chosen: false
    });
    if(player.guess_color.colors.length != 3){
        return callColorApi();
    }

    player.has_clicked = false;
    document.getElementById('score').innerText = `Bodovi: ${player.score}`;
    document.getElementById('guess-color-btns').innerHTML = '';

    let chosen_color = Math.round(Math.random() * (player.guess_color.colors.length - 1));
    player.guess_color.colors[chosen_color].chosen = true;
    document.getElementById('chosen-color').style.backgroundColor = `${player.guess_color.colors[chosen_color].hex_code}`;

    player.guess_color.colors.forEach(color => {
        if(color.chosen === true){
            document.getElementById('guess-color-btns').innerHTML += `
                <button onclick="guessedColor(this, ${color.chosen})" class="color bg-zinc-300 rounded-md p-[10px] text-lg">${color.name}</button>
            `;
        }
        else {
            document.getElementById('guess-color-btns').innerHTML += `
                <button onclick="guessedColor(this, ${color.chosen})" class="color bg-zinc-300 rounded-md p-[10px] text-lg">${color.name}</button>
            `;
        }
    })

    document.querySelectorAll('.color').forEach(country => {
        let random_position = Math.floor(Math.random() * 3);
        country.style.order = random_position;
    });
}

function guessedColor(e, answer){
    player.has_clicked = true;
    player.guess_color.colors = [];
    if(answer === true){
        let sound = new soundEffect('sounds/correct.wav');
        sound.play();
        e.classList.toggle('bg-green-500');
        player.score++

        setTimeout(function(){
            callColorApi();
        }, 500);
    }
    else {
        let sound = new soundEffect('sounds/wrong.wav');
        sound.play();
        e.classList.toggle('bg-rose-500');

        if(player.mode != 'strict'){
            setTimeout(function(){
                callColorApi();
            }, 500);
        }
        else {
            game_container.innerHTML = `
                <p class="text-5xl text-center">GOTOVA IGRA!</p>
                <p class="text-5xl text-center">BODOVI: ${player.score}</p>
            `;
            setTimeout(function(){
                game_settings.classList.toggle('hidden');
                game_container.classList.toggle('hidden');
            }, 2000);
        }
    }
}

function callColorApi(){
    fetch(`https://www.thecolorapi.com/id?hex=${((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0")}`)
    .then(res => res.json())
    .then(data => {
        createGuessColor(data);
    })
}