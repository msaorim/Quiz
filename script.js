// initial data
let current_question = 0;
let correct_answers = 0;
let correct_answers_percent = 0
let total_questions = questions.length

document.querySelector('.score-area button').addEventListener('click', reset_game);

show_question();

// functions
function show_question(){
    if(questions[current_question]){
        q = questions[current_question];
        let percent_questions = Math.floor((current_question / total_questions) * 100)
        
        document.querySelector('.progress--bar').style.width = `${percent_questions}%`;
        document.querySelector('.score-area').style.display = 'none';
        document.querySelector('.question-area').style.display = 'block';
        document.querySelector('.question').innerHTML = q.question;
        
        let options_html = '';
        for(let i in q.options){
            options_html += `<div data-op=${i} class="option"><span>${parseInt(i)+1}</span> ${q.options[i]}</div>`
        }
        document.querySelector('.options').innerHTML = options_html;
        
        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', option_click_event);
        })
    } else{
        game_over()
    }
}

function option_click_event(e){
    clicked_option = parseInt(e.target.getAttribute('data-op'))

    if(questions[current_question].answer === clicked_option){
        correct_answers += 1
    }
    current_question += 1
    show_question()
}

function game_over(){
    correct_answers_percent = Math.floor(correct_answers / total_questions * 100);
    if(correct_answers_percent < 30){
        document.querySelector('.scoreText1').style.color = 'red'
        document.querySelector('.scoreText1').innerHTML = 'Foi Mal :('
        document.querySelector('.score-area img').style.display = 'none'

    } else if(correct_answers_percent >=30 && correct_answers_percent < 70){
        document.querySelector('.scoreText1').style.color = 'orange'
        document.querySelector('.scoreText1').innerHTML = 'Está na Média :|'
        document.querySelector('.score-area img').style.display = 'block'
    } else {
        document.querySelector('.scoreText1').style.color = '#0D630D'
        document.querySelector('.scoreText1').innerHTML = 'Parabéns :)'
        document.querySelector('.score-area img').style.display = 'block'
    }
    document.querySelector('.scorePct').innerHTML = `Você acertou ${correct_answers_percent}%`
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${total_questions} questões e acertou ${correct_answers}.`
    document.querySelector('.progress--bar').style.width = `100%`;
    document.querySelector('.question-area').style.display = 'none';
    document.querySelector('.score-area').style.display = 'block';
    
}

function reset_game(){
    correct_answers_percent = 0;
    current_question = 0;
    correct_answers = 0;
    show_question();
}
