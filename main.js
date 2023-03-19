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
    this.sound.style.display = 'none';

    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
};

// Pick the right ball
let broj_loptica = 0;
let loptica_score = -1;

function loadBallGame(){
    let clickSound = new soundEffect('sounds/click.wav');

    document.getElementById('ball-scores').innerText = `Bodovi: ${++loptica_score}`;
    document.getElementById('balls-container').innerHTML = '';
    document.getElementById('ball-message').innerText = '';

    if(broj_loptica < 25){
        broj_loptica += 5;
    }
    let broj_div_el = broj_loptica / 5;
    let izabrana_loptica = Math.round(Math.random() * --broj_loptica);
    ++broj_loptica;

    let random_hex_1 = ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
    let random_hex_2 = ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");

    while(random_hex_1 == random_hex_2){
        random_hex_2 = ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
    }
    
    for(let i = 0; i < broj_div_el; i++){
        let div_el = document.createElement('div');
        for(let j = 0; j < 5; j++){
            let loptica_el = document.createElement('div');
            loptica_el.classList.add('ball');
            loptica_el.style.backgroundColor = '#' + random_hex_1;

            if(j != izabrana_loptica){
                loptica_el.addEventListener('click', function(){
                    document.getElementById('ball-message').innerText = 'Wrong';
                });
            }

            div_el.appendChild(loptica_el);
        }
        document.getElementById('balls-container').appendChild(div_el);
    }
    
    document.getElementsByClassName('ball')[izabrana_loptica].style.backgroundColor = '#' + random_hex_2;
    document.getElementsByClassName('ball')[izabrana_loptica].addEventListener('click', loadBallGame);
    clickSound.play();
};

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
        image_el.src = 'images/checkmark.png'
        
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

function sendAudio(getAudio){
    let sound = new soundEffect(getAudio);
    sound.play();
}

// ANIMALS.HTML 
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