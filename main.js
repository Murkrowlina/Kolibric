// Sidenav 
function open_closeSidenav(){
    document.getElementById('sidenav-menu').addEventListener('click', function(){
        document.getElementById('navbar-side').classList.toggle('w-64');
    });
    
    document.getElementById('sidenav-close').addEventListener('click', function(){
        document.getElementById('navbar-side').classList.toggle('w-64');
    });
}

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

function voiceWord(word){
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
    })
    .catch(err => console.log(err))
}


// const firebaseConfig = {
//     apiKey: "AIzaSyClyeDhakJu7u3TXDNArwh7vaJnIPFzjzY",
//     authDomain: "edit-projekt.firebaseapp.com",
//     projectId: "edit-projekt",
//     storageBucket: "edit-projekt.appspot.com",
//     messagingSenderId: "645695215772",
//     appId: "1:645695215772:web:4f4f78eb3847fda278b559",
//     measurementId: "G-N3MB3ZN4CN"
// };

// const firebaseApp = firebase.initializeApp(firebaseConfig);
// const db = firebaseApp.firestore();
// const auth = firebaseApp.auth();

// auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
// .then(() => {
//     return auth.signInWithEmailAndPassword(email, password);
// })
// .catch((error) => {
//     var errorCode = error.code;
//     var errorMessage = error.message;
// });

// auth.onAuthStateChanged(function(user){
//     if(user){
//         console.log('User is signed in:', user);
//         console.log(user.email)
//     }
//     else {
//         console.log('User is signed out');
//     }
// });

// function register() {
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;

//     auth.createUserWithEmailAndPassword(email, password)
//     .then((result) => {
//         console.log(result.user)
//     })
//     .catch((error) => {
//         alert(error.message);
//         console.log(error.code);
//         console.log(error.message);
//     })
// }

// function login(){
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;

//     auth.signInWithEmailAndPassword(email, password)
//     .then((result) => {
//         var authState = JSON.stringify({
//             email: email,
//             password: password
//         });
//         localStorage.setItem("authState", authState);
//     })
//     .catch((error) => {
//         alert(error.message);
//         console.log(error.code);
//         console.log(error.message);
//     })
// }

// function signOut() {
//     auth.signOut()
//     .then(function() {
//         console.log('User signed out');
//     })
//     .catch(function(error) {
//         console.error('Sign-out error:', error);
//     });
// }

// GEOGRAFIJA 
let geography_player = {
    number_question: 1,
    score: 0,
    type: '',
    mode: ''
}

function startGeographyGame(type){
    if(geography_player.mode == ''){
        geography_player.mode = document.querySelector('input[name="postavke"]:checked').value;

        if(geography_player.mode == 'timer'){
            let time_left = 120;
            document.getElementById('timer').classList.remove('hidden');
            if(geography_player.mode === 'timer'){
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
                        geography_player.number_question = 1;
                        geography_player.score = 0;
                        geography_player.type = '';
                        geography_player.mode = '';

                        document.getElementById('timer').classList.add('hidden');
                        document.getElementById('geography-game').innerHTML = `
                            <p class="text-5xl text-center">VRIJEME JE PROŠLO!</p>
                            <br/>
                            <p class="text-5xl text-center">BODOVI: ${geography_player.score}</p>
                        `;

                        setTimeout(function(){
                            document.getElementById('geography-game').innerHTML = `
                                <p class="text-5xl">Koji bi kviz zaigrali?</p>
                                <button onClick="startGeographyGame('flags')" class="bg-zinc-300 rounded-md p-[20px] text-4xl font-extrabold">Zastave</button>
                                <button onClick="startGeographyGame('capital')" class="bg-zinc-300 rounded-md p-[20px] text-4xl font-extrabold">Glavni grad</button>
                                <p class="text-4xl">Postavke igre:</p>
                                <div class="flex flex-wrap flex-col justify-center items-center gap-[10px] text-xl">
                                    <p><input type="radio" name="postavke" value="normal" class="scale-[1.2] accent-green-600" checked> Normalno - igraj koliko želiš</p>
                                    <p><input type="radio" name="postavke" value="strict" class="scale-[1.2] accent-green-600"> Strict - igraj sve dok ne pogriješiš</p>
                                    <p><input type="radio" name="postavke" value="timer" class="scale-[1.2] accent-green-600"> Timer - igraj sve dok ne istekne vrijeme</p>
                                </div>
                            `;
                        }, 2000);

                        clearInterval(timer);
                    }
                }, 1000);
            }
        }
    }

    fetch(`https://restcountries.com/v3.1/all?fields=name,${type}`)
    .then(response => response.json())
    .then(country => {
        geography_player.type = type;
        createGeographyGame(country);
    })
    .catch(error => console.log(error))
}

function createGeographyGame(countries){
    let chosen_countries_array = [];
    let random_country = Math.round(Math.random() * (countries.length - 1));

    if(geography_player.type === 'flags'){
        chosen_countries_array.push({name: countries[random_country].name.official, flag: countries[random_country].flags.png, answer: true});
        for(let i = 1; i <= 3; i++){
            random_country = Math.round(Math.random() * (countries.length - 1));
            chosen_countries_array.push({name: countries[random_country].name.official, answer: false});
        }
    
        document.getElementById('geography-game').innerHTML = `
            <div class="text-center">
                <p class="text-[2rem] font-extrabold">${geography_player.number_question}. pitanje</p>
                <p class="text-[2rem] font-extrabold">Bodovi: ${geography_player.score}</p>
                <p class="text-[2rem] font-bold">Kojoj državi pripada ova zastava?</p>
            </div>
            <img src="${chosen_countries_array[0].flag}" alt="flag" class="border-2 border-black h-[15rem] w-[30rem]">
        `;
    }
    else if(geography_player.type === 'capital'){
        chosen_countries_array.push({name: countries[random_country].name.official, capital: countries[random_country].capital, answer: true});
        for(let i = 1; i <= 3; i++){
            random_country = Math.round(Math.random() * (countries.length - 1));
            chosen_countries_array.push({name: countries[random_country].name.official, answer: false});
        }

        document.getElementById('geography-game').innerHTML = `
            <div class="text-center">
                <p class="text-[2rem] font-extrabold">${geography_player.number_question}. pitanje</p>
                <p class="text-[2rem] font-extrabold">Bodovi: ${geography_player.score}</p>
                <p class="text-[2rem] font-bold">Čiji je glavni grad ${chosen_countries_array[0].capital}?</p>
            </div>
        `;
    }

    document.getElementById('geography-game').innerHTML += `
        <div class="flex flex-wrap justify-evenly gap-[10px]">
            <button onClick="clickedCountry(${chosen_countries_array[0].answer})" class="country bg-zinc-300 rounded-md p-[10px] text-lg">${chosen_countries_array[0].name}</button>
            <button onClick="clickedCountry(${chosen_countries_array[1].answer})" class="country bg-zinc-300 rounded-md p-[10px] text-lg">${chosen_countries_array[1].name}</button>
            <button onClick="clickedCountry(${chosen_countries_array[2].answer})" class="country bg-zinc-300 rounded-md p-[10px] text-lg">${chosen_countries_array[2].name}</button>
            <button onClick="clickedCountry(${chosen_countries_array[3].answer})" class="country bg-zinc-300 rounded-md p-[10px] text-lg">${chosen_countries_array[3].name}</button>
        </div>
    `;

    document.querySelectorAll('.country').forEach(country => {
        let random_position = Math.floor(Math.random() * 4);
        country.style.order = random_position;
    });
}

function clickedCountry(answer, type){
    geography_player.number_question++;

    if(answer === true){
        let sound = new soundEffect('../igre_stranice/sounds/correct.wav');
        sound.play();
        geography_player.score++;

        setTimeout(function(){
            startGeographyGame(geography_player.type);
        }, 500);
    }
    else {
        let sound = new soundEffect('../igre_stranice/sounds/wrong.wav');
        sound.play();

        if(geography_player.mode != 'strict'){
            setTimeout(function(){
                startGeographyGame(geography_player.type);
            }, 500);
        }
        else {
            geography_player.number_question = 1;
            geography_player.score = 0;
            geography_player.type = '';
            geography_player.mode = '';

            document.getElementById('geography-game').innerHTML = '<p class="text-4xl text-center">IZGUBILI STE IGRU!</p>';
    
            setTimeout(function(){
                document.getElementById('geography-game').innerHTML = `
                    <p class="text-5xl">Koji bi kviz zaigrali?</p>
                    <button onClick="startGeographyGame('flags')" class="bg-zinc-300 rounded-md p-[20px] text-4xl font-extrabold">Zastave</button>
                    <button onClick="startGeographyGame('capital')" class="bg-zinc-300 rounded-md p-[20px] text-4xl font-extrabold">Glavni grad</button>
                    <p class="text-4xl">Postavke igre:</p>
                    <div class="flex flex-wrap flex-col justify-center items-center gap-[10px] text-xl">
                        <p><input type="radio" name="postavke" value="normal" class="scale-[1.2] accent-green-600" checked> Normalno - igraj koliko želiš</p>
                        <p><input type="radio" name="postavke" value="strict" class="scale-[1.2] accent-green-600"> Strict - igraj sve dok ne pogriješiš</p>
                        <p><input type="radio" name="postavke" value="timer" class="scale-[1.2] accent-green-600"> Timer - igraj sve dok ne istekne vrijeme</p>
                    </div>
                `;
            }, 2000);
        }
    }
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

// Pick the right ball
let broj_loptica = 25;
let loptica_score = 0;

function loadBallGame(){
    document.getElementById('ball-scores').innerText = `Bodovi: ${loptica_score}`;
    document.getElementById('balls-container').innerHTML = '';

    let broj_div_el = broj_loptica / 5;
    let izabrana_loptica = Math.round(Math.random() * (broj_loptica - 1));

    let random_hex_1 = ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
    let random_hex_2 = ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
    let random_hex_bg = ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");

    while(random_hex_1 == random_hex_2){
        random_hex_2 = ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
    }

    while(random_hex_1 == random_hex_bg || random_hex_2 == random_hex_bg){
        random_hex_bg = ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
    }

    document.getElementById('pick-right-ball-bg').style.backgroundColor = '#' + random_hex_bg;
    
    for(let i = 0; i < broj_div_el; i++){
        let div_el = document.createElement('div');
        for(let j = 0; j < 5; j++){
            let loptica_el = document.createElement('div');
            loptica_el.classList.add('ball');
            loptica_el.style.backgroundColor = '#' + random_hex_1;
            loptica_el.addEventListener('click',  wrongBall);
            div_el.appendChild(loptica_el);
        }
        document.getElementById('balls-container').appendChild(div_el);
    }

    document.getElementsByClassName('ball')[izabrana_loptica].style.backgroundColor = '#' + random_hex_2;
    document.getElementsByClassName('ball')[izabrana_loptica].removeEventListener('click', wrongBall);
    document.getElementsByClassName('ball')[izabrana_loptica].addEventListener('click', correctBall);
};

function wrongBall(){
    let clickSound = new soundEffect('sounds/click.wav');
    clickSound.play();

    loptica_score = 0;
    loadBallGame();
}

function correctBall(){
    let clickSound = new soundEffect('sounds/click.wav');
    clickSound.play();

    loptica_score++;
    loadBallGame();
}

// Color Codes
let color_codes_score = 0;
let number_boxes = 2;

function loadColorCodeGame(){
    setTimeout(function(){
        createColorCodeGame();
    }, 1000)
}

function createColorCodeGame(){
    document.getElementById('color-codes-scores').innerText = `Bodovi: ${color_codes_score}`;
    document.getElementById('color-codes-container').innerHTML = '';

    if(color_codes_score > 10){
        number_boxes = 4;
    }
    else if(color_codes_score > 5){
        number_boxes = 3;
    }

    let diff_box_place = Math.floor(Math.random() * number_boxes);
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

    for(let i = 0; i < number_boxes; i++){
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
        div_el.addEventListener('click', colorCodes);
        document.getElementById('color-codes-container').appendChild(div_el);
    }
}

function colorCodes(e){
    let target_background = e.target.style.backgroundColor;
    let target_name = e.target.getAttribute('data-color-name');
    for(let i = 0; i < document.querySelectorAll('.color-code').length; i++){
        document.getElementsByClassName('color-code')[i].removeEventListener('click', colorCodes);
    } 
    
    let image_el = document.createElement('img');
    if(target_background != target_name){
        color_codes_score++;
        e.target.style.boxShadow = '0 0 0 5px green';
        image_el.src = 'images/correct.png'
        
        let correct_sound = new soundEffect('sounds/correct.wav');
        correct_sound.play();
        setTimeout(createColorCodeGame, 1000);
    }
    else {
        e.target.style.boxShadow = '0 0 0 5px red';
        image_el.src = 'images/wrong.png';
        number_boxes = 2;
        color_codes_score = 0;

        let wrong_sound = new soundEffect('sounds/wrong.wav');
        wrong_sound.play();
        setTimeout(createColorCodeGame, 1000);
    }
    document.getElementById('color-codes-container').appendChild(image_el);
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
        front_face.src = `../engleski_stranice/animals/${image_card[random_number]}/${animals[image_card[random_number]][i].name}.png`;
        front_face.classList.add('front-face');
        first_div.appendChild(front_face);

        front_face = document.createElement('img');
        front_face.src = `../engleski_stranice/animals/${image_card[random_number]}/${animals[image_card[random_number]][i].name}.png`;
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


// const accessKey = 'UKhct7FDyDd6ymCMHtSsv2OLw_3YdXVdR6R7_JqqD_w';
// const query = 'dolphin';
// fetch(`https://api.unsplash.com/search/photos?query=${query}`, {
//     headers: {
//         Authorization: `Client-ID ${accessKey}`
//     }
// })
// .then(response => response.json())
// .then(data => {
//     data.results.forEach(photo => {
//         const img = document.createElement('img');
//         img.src = photo.urls.regular;
//         document.body.appendChild(img);
//     });
// })
// .catch(error => {
//     console.log(error);
// });


// const encodedParams = new URLSearchParams();
// encodedParams.append("source_language", "hr");
// encodedParams.append("target_language", "en");
// encodedParams.append("text", "Moje ime je Nikolina");

// const options = {
//     method: 'POST',
//     headers: {
//         'content-type': 'application/x-www-form-urlencoded',
//         'X-RapidAPI-Key': '5c034aba24msh260b25bd35fbbd7p1a75bejsn54b6d9190803',
//         'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
//     },
//     body: encodedParams
// };

// fetch('https://text-translator2.p.rapidapi.com/translate', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));