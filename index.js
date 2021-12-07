const g_state = {} ;
g_state.board_div = document.querySelector('#board'); 


function init(){
    //creation of balls
    g_state.div_ball_top = document.createElement('div');
    g_state.div_ball_left = document.createElement('div');
    g_state.div_ball_bottom = document.createElement('div');
    g_state.div_ball_right = document.createElement('div');
    g_state.div_msgbox = document.createElement('div');
    //adding id attribute for each ball
    g_state.div_ball_top.setAttribute('id','ball_top');
    g_state.div_ball_bottom.setAttribute('id','ball_bottom');
    g_state.div_ball_left.setAttribute('id','ball_left');
    g_state.div_ball_right.setAttribute('id','ball_right');
    g_state.div_msgbox.setAttribute('id', 'msg');

    g_state.div_msgbox.className = 'msgbox';
    g_state.div_msgbox.style.visibility = 'hidden';
    

    //class name for each one for the style
    g_state.div_ball_top.className = 'ball1';
    g_state.div_ball_left.className ='ball2';
    g_state.div_ball_right.className ='ball3' ;
    g_state.div_ball_bottom.className = 'ball';
    
    g_state.div_ball_top.color = 'red';
    g_state.div_ball_left.color = 'green';
    g_state.div_ball_right.color = 'yellow';
    g_state.div_ball_bottom.color = 'black';
    //appending all balls to the board 
    
    g_state.board_div.appendChild(g_state.div_ball_bottom);
    g_state.board_div.appendChild(g_state.div_ball_top);
    g_state.board_div.appendChild(g_state.div_ball_left);
    g_state.board_div.appendChild(g_state.div_ball_right);
    g_state.board_div.appendChild(g_state.div_msgbox);


    //create a bool property for each ball 
    g_state.div_ball_top.isExist = true; 
    g_state.div_ball_bottom.isExist = true; 
    g_state.div_ball_left.isExist = true; 
    g_state.div_ball_right.isExist = true; 

    // flag object
    g_state.flag = false ;
    g_state.remove_children_counter = 0;
    g_state.flag_timer = false;

    //to locate the balls randomly in each side of the rectangle
    g_state.div_ball_top.style.left = (Math.random() * (g_state.board_div.clientWidth-30) + g_state.board_div.offsetLeft) + 'px';

    g_state.div_ball_left.style.top = (Math.random() * (g_state.board_div.clientHeight-30) + g_state.board_div.offsetTop) + 'px';

    g_state.div_ball_right.style.left = (g_state.board_div.clientWidth + g_state.board_div.offsetLeft - 30) + 'px';
    g_state.div_ball_right.style.top = (Math.random() * (g_state.board_div.clientHeight-40) + g_state.board_div.offsetTop) + 'px';

    g_state.div_ball_bottom.style.top = (g_state.board_div.clientHeight + g_state.board_div.offsetTop - 30) + 'px';
    g_state.div_ball_bottom.style.left = (Math.random() * (g_state.board_div.clientWidth-30) + g_state.board_div.offsetLeft) + 'px';
    
    //initialize the spead of each ball
    g_state.div_ball_top.speed_x = parseInt(Math.random()* 10 + 1);
    g_state.div_ball_bottom.speed_x = parseInt(Math.random()* 10 + 1);
    g_state.div_ball_left.speed_x = parseInt(Math.random()* 10 + 1);
    g_state.div_ball_right.speed_x = parseInt(Math.random()* 10 + 1);

    g_state.div_ball_top.speed_y = parseInt(Math.random()* 10 + 1);
    g_state.div_ball_bottom.speed_y = parseInt(Math.random()* 10 + 1);
    g_state.div_ball_left.speed_y = parseInt(Math.random()* 10 + 1);
    g_state.div_ball_right.speed_y = parseInt(Math.random()* 10 + 1);
}



init();

g_state.btn_strt = document.querySelector('#btn_start');
g_state.btn_strt.addEventListener('click' ,start);
g_state.timer_val = document.querySelector('#userInput');



function start(){

if(g_state.flag_timer == false)
{
    g_state.timer_val.style.visibility = 'hidden';
}

    if(g_state.flag == false)
    {
        g_state.flag = true;
        g_state.interval = setInterval(handle_func,30);
    }
}

function handle_func() {
    let arr = new Array(g_state.div_ball_top,g_state.div_ball_left,g_state.div_ball_right,g_state.div_ball_bottom);
    let ball_top = g_state.div_ball_top;
    let ball_left = g_state.div_ball_left;
    let ball_bottom = g_state.div_ball_bottom;
    let ball_right = g_state.div_ball_right;

    move(ball_top);
    move(ball_left);
    move(ball_bottom);
    move(ball_right);

    check_balls_board_collision(ball_top);
    check_balls_board_collision(ball_left);
    check_balls_board_collision(ball_bottom);
    check_balls_board_collision(ball_right);

    check_ball_to_ball_collision(arr);
    if(g_state.remove_children_counter == (arr.length-1))
    {
        if(g_state.flag_timer == true)
        {
             clearInterval(g_state.interval_timer);
        }
        let winner_ball_color = check_winner(arr);
        stop();
       
        g_state.div_msgbox.style.visibility = 'visible';
        g_state.div_msgbox.innerHTML = 'The '+ winner_ball_color + ' ball won!\n' + 'GAME OVER!!!';
        g_state.flag = true;
        
    }
}

function move(ball)
{
    let x = ball.getBoundingClientRect().x;
    let y = ball.getBoundingClientRect().y;
    x += ball.speed_x ;
    y += ball.speed_y ;
    ball.style.left = x + 'px';
    ball.style.top = y + 'px';
}


function check_balls_board_collision(ball)
{
    let x = ball.getBoundingClientRect().x ;
    let y = ball.getBoundingClientRect().y ;
    let width = ball.getBoundingClientRect().width ;
    let height = ball.getBoundingClientRect().height ;
    let right = ball.getBoundingClientRect().right;
    let bottom = ball.getBoundingClientRect().bottom;

    let x_board = g_state.board_div.getBoundingClientRect().x ;
    let y_board =g_state.board_div.getBoundingClientRect().y ;
    let width_board = g_state.board_div.getBoundingClientRect().width ;
    let height_board = g_state.board_div.getBoundingClientRect().height ;
    let right_board= g_state.board_div.getBoundingClientRect().right ;
    let bottom_board = g_state.board_div.getBoundingClientRect().bottom ;


    if(right > right_board)
    {
        //change ball speed
        ball.speed_x *= -1 ;
        ball.style.left = to_pixel(g_state.board_div.clientWidth + g_state.board_div.offsetLeft - width);
        //ball.speed_y is not change
    } 
    if(x < x_board)
    {
        ball.speed_x *= -1 ;
        ball.style.left = to_pixel(x_board);
    }

    if(bottom > bottom_board)
    {
        //change ball speed
        ball.speed_y *= -1 ;
        ball.style.top=to_pixel(bottom_board - height);
        //ball.speed_y is not change
    } 
    if(y < y_board)
    {
        ball.speed_y *= -1 ;
        ball.style.top = to_pixel(y_board);
    }

}

function to_pixel(num)
{
    return num +"px";
}

function check_ball_to_ball_collision(arr)
{
    for(i=0 ; i < arr.length ; i++)
    {
        if(arr[i].isExist == true)
            for( j = i + 1 ; j < arr.length ; j++)
            {
                if(arr[j].isExist ==  true)
                {
                    if((arr[i].getBoundingClientRect().right >= arr[j].getBoundingClientRect().x && arr[i].getBoundingClientRect().x <= arr[j].getBoundingClientRect().right)
                     && (arr[i].getBoundingClientRect().bottom >= arr[j].getBoundingClientRect().y && arr[i].getBoundingClientRect().y <= arr[j].getBoundingClientRect().bottom))
                    {

                        if(Math.abs(arr[i].speed_x) >= Math.abs(arr[j].speed_x) && Math.abs(arr[i].speed_y) >= Math.abs(arr[j].speed_y)){
                            arr[i].speed_x *= -1 ;
                            let id_object = arr[j].getAttribute('id');
                            let current_ball = document.querySelector('#'+ id_object);
                            let balls = document.querySelector('#board');
                            arr[j].isExist = false;
                            g_state.remove_children_counter++ ;
                            balls.removeChild(current_ball);
                        }
                        else
                        {
                            arr[j].speed_x *= -1 ;
                            let id_object = arr[i].getAttribute('id');
                            let current_ball = document.querySelector('#'+ id_object);
                            let balls = document.querySelector('#board');
                            arr[i].isExist = false;
                            g_state.remove_children_counter++ ;
                            balls.removeChild(current_ball);
                        }
                    }
                }
            }

    }
}

function check_winner(arr)
{
    for(i =0 ; i< arr.length ; i++)
    {
        if(arr[i].isExist)
        {
           return arr[i].color;
        }
    }
}

g_state.btn_stp = document.querySelector('#btn_stop');
g_state.btn_stp.addEventListener('click' ,stop);

function stop(){
    clearInterval(g_state.interval);
    g_state.flag = false;
}

g_state.btn_rstrt = document.querySelector('#btn_reset');
g_state.btn_rstrt.addEventListener('click', restart);

function restart(){
    let ball_top = document.querySelector('#ball_top');
    let ball_bottom = document.querySelector('#ball_bottom');
    let ball_right = document.querySelector('#ball_right');
    let ball_left = document.querySelector('#ball_left');

    let balls = document.querySelector('#board');
    if(g_state.div_ball_top.isExist == true)
        balls.removeChild(ball_top);
    if(g_state.div_ball_bottom.isExist == true)    
        balls.removeChild(ball_bottom);
    if(g_state.div_ball_right.isExist == true)
        balls.removeChild(ball_right);
    if(g_state.div_ball_left.isExist == true)
        balls.removeChild(ball_left);
    stop();
    g_state.div_msgbox.remove();
    clearInterval(g_state.interval_timer);
    g_state.timer_val.value = '0';
    document.getElementById("btn_stop").disabled = false;
    document.getElementById("userInput").disabled = false;
    g_state.timer_val.style.visibility = 'visible';
    
    init();
}

g_state.btn_strt_timer = document.querySelector('#strt_timer');
g_state.btn_strt_timer.addEventListener('click', start_timer);



function start_timer(){
    document.getElementById("btn_stop").disabled = true;
    document.getElementById("userInput").disabled = true;
    if(g_state.flag_timer == false)
    {
        g_state.flag_timer = true;
         g_state.interval_timer = setInterval(changeTime, 1000);
    }


}
    


function stop_timer(){
   
    clearInterval(g_state.interval_timer);
    g_state.div_msgbox.style.visibility = 'visible';
    g_state.div_msgbox.innerHTML = 'RUN OUT OF TIME!';

}

function changeTime()
{
  
    if(g_state.timer_val.value < 0)
    {
        //user alert of inValide input;
        g_state.div_msgbox.style.visibility = 'visible'; 
        g_state.div_msgbox.innerHTML = 'In valid input\nPlease try again!';
        g_state.timer_val.value= "0";  
    }
    if(g_state.timer_val.value > 0)
    {
            g_state.timer_val.value--;
            start();
            g_state.flag_timer = true;

        
    }
    if (g_state.timer_val.value <= 0){
        
      stop_timer();
      stop();
      g_state.timer_val.value= "0";  
    }
    
    
}

window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
    e.returnValue = '';
});
