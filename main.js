// Pick the right ball
let broj_loptica = 0;
let loptica_score = -1;

function loadBallGame(){
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

            console.log(izabrana_loptica)
            div_el.appendChild(loptica_el);
        }
        document.getElementById('balls-container').appendChild(div_el);
    }
    document.getElementsByClassName('ball')[izabrana_loptica].style.backgroundColor = '#' + random_hex_2;
    document.getElementsByClassName('ball')[izabrana_loptica].addEventListener('click', loadBallGame);
}

// PIXEL ART
let pixel_canvas = document.getElementById('pixel-art-container');
let input_size = document.getElementById('size-input');
let new_size = input_size.value;
let input_color = document.getElementById('color-input');
let input_draw = false;

function createPixels(size){
    pixel_canvas.style.setProperty('--size', size)

    for(let i = 0; i < size * size; i++){
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

window.addEventListener('mousedown', function(){
    input_draw = true;
});

window.addEventListener('mouseup', function(){
    input_draw = false;
});

document.getElementById('reset-pixels').addEventListener('click', function(){
    for(let i = 0; i < document.querySelectorAll('.pixel').length; i++){
        document.getElementsByClassName('pixel')[i].style.backgroundColor = 'white';
    }
});

document.getElementById('new-canvas').addEventListener('click', function(){
    pixel_canvas.innerHTML = '';
    new_size = input_size.value;
    if(new_size > 0 && new_size <= 64){
        createPixels(new_size);
    }
})

// const accessKey = 'UKhct7FDyDd6ymCMHtSsv2OLw_3YdXVdR6R7_JqqD_w';
// const query = 'pixel for kids';
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

