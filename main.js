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