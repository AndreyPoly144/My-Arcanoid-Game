//АУДИО
const music1 = new Audio('music/music1.wav');
    music1.volume=0.08;
    music1.loop=true;
const music2 = new Audio('music/music2.mp3');
const music3 = new Audio('music/music3.mp3');
const startSound = new Audio('music/menu-start.mp3')
const endSound = new Audio('music/lose.mp3')
    endSound.volume=0.3;
const winSound = new Audio('music/win.mp3')
    winSound.volume=0.5;
const s3= new Audio('music/sfx-3.mp3');
    s3.volume=0.2;
const s4= new Audio('music/sfx-4.mp3');
    s4.volume=0.2;
const s5= new Audio('music/sfx-5.mp3');
    s5.volume=0.1


startText.addEventListener('click', startGame)         

endRestart.addEventListener('click', ()=>history.go(0));   

//ПОДЗСКАЗКИ
const arrEndText = ['DONT GIVE UP!', 'MOVE YOUR MOUSE FASTER!', 'DONT DROP ALL THE BALLS!', 'U HAVE TO HIT ALL BLOCKS FOR WIN!', "AREN'T YOU TIRED?"]
let randomEndText = arrEndText[Math.floor(Math.random() * arrEndText.length)];    
endHints.textContent=randomEndText;

//СТОРОНЫ
let TOP = topWall.getBoundingClientRect().height;
let BOTTOM =leftWall.getBoundingClientRect().height - bottomWall.getBoundingClientRect().height;
let RIGHT = rightWall.getBoundingClientRect().left;              
let LEFT =leftWall.getBoundingClientRect().width +leftWall.getBoundingClientRect().left; 

//БИТА
let bStyle = bita.getBoundingClientRect();
let WBITA = bStyle.width;                     
let HBITA = bStyle.height;                    
let posBitaY = bStyle.top;                     
       
//МЯЧИ
let vx = 1, vy = 3; 
let vx1 = 1,vy1 = 3;
let vx2 = 1,vy2 = 3;
ball.style.left=bStyle.left+bStyle.width/2+'px';                    
ball.style.top=bStyle.top-ball.getBoundingClientRect().width/16+'px';     
let ballStyle = ball.getBoundingClientRect();
let BW = ballStyle.width / 2; 
let posX = ballStyle.left + BW, posY = ballStyle.top + BW; 
let ballStyle1 = ball1.getBoundingClientRect();
let ballStyle2 = ball2.getBoundingClientRect();
ball1.hidden = true;                                   
ball2.hidden = true;

//БЛОКИ
const blockS = document.querySelectorAll(".b");             
const block = blockS[0];            
const bWidth = block.getBoundingClientRect().width;
const bHeight = block.getBoundingClientRect().height;
let randomBlock1 = blockS[Math.floor(Math.random() * blockS.length)];           
randomBlock1.setAttribute("b1", "inside");         
let randomBlock2 = blockS[Math.floor(Math.random() * blockS.length)];              
randomBlock2.setAttribute("b2", "inside");
const blockClasses = ['blueblock', 'blueblock2', 'greenblock', 'orangeblock', 'pinkblock', 'redblock']
let randomClass = blockClasses[Math.floor(Math.random() * blockClasses.length)];
blockS.forEach((e)=>{e.classList.add(randomClass)});

//НАЧ КООРДИНАТЫ 1 МЯЧА
let posX1 = randomBlock1.getBoundingClientRect().left + bWidth / 2;
let posY1 = randomBlock1.getBoundingClientRect().top + bHeight / 2;
(ball1.style.top = posY1 + "px"), (ball1.style.left = posX1 + "px");
//НАЧ КООРДИНАТЫ 2 МЯЧА
let posX2 = randomBlock2.getBoundingClientRect().left + bWidth / 2;
let posY2 = randomBlock2.getBoundingClientRect().top + bHeight / 2;
(ball2.style.top = posY2 + "px"), (ball2.style.left = posX2 + "px");


function startGame(){
start.style.display='none'
music1.play()
document.addEventListener("mousemove", moveBita); 
let idGo = setInterval(playGame, 0);

//МЕХАНИКА МЯЧЕЙ
function playGame() {
    //СО СТЕНАМИ И БИТОЙ
    let bStyle1 = bita.getBoundingClientRect();
    posX += vx, posY += vy;
    if (posX - BW <= LEFT) {vx = -vx; s5.currentTime=0; s5.play(); }
    if (posY + BW >= BOTTOM) {
        posY = BOTTOM - BW;
        clearInterval(idGo);
        document.removeEventListener("mousemove", moveBita); endSound.play(); music1.pause();
        end.classList.remove('end-none');
    }
    if (posY - BW <= TOP) {vy = -vy; s5.currentTime=0; s5.play();}
    if (posX + BW >= RIGHT) { vx = -vx; s5.currentTime=0; s5.play(); }
    if (posY+BW >= bStyle1.top && posX > bStyle1.left && posX < bStyle1.left + bStyle1.width) {
        if (Math.sign(vy)===1) { vy = -vy; s4.currentTime=0;  s4.play();}}
              if (posY+BW >= bStyle1.top && posX+BW>=bStyle1.left && posX<=bStyle1.left){vx=-vx}
              if (posY+BW >=bStyle1.top && posX-BW<=bStyle1.left+bStyle1.width && posX>=bStyle1.left + bStyle1.width){vx=-vx}
    (ball.style.top = posY + "px"), (ball.style.left = posX + "px");
    //МЯЧ1
    if (ball1.hidden === false) {
        posX1 += vx1, posY1 += vy1;
        if (posX1 - BW <= LEFT) {
            vx1 = -vx1; s5.currentTime=0;  s5.play();
        }
        if (posY1 + BW >= BOTTOM) {
            posY1 = BOTTOM - BW;
            clearInterval(idGo);
            document.removeEventListener("mousemove", moveBita); endSound.play(); music1.pause();
            end.classList.remove('end-none');
        }
        if (posY1 - BW <= TOP) {vy1 = -vy1; s5.currentTime=0;  s5.play();}
        if (posX1 + BW >= RIGHT) {vx1 = -vx1; s5.currentTime=0; s5.play() }
        if (posY1  >=  bStyle1.top && posX1 >= bStyle1.left && posX1 <= bStyle1.left + bStyle1.width) {
            if (Math.sign(vy1)===1) { vy1 = -vy1; s4.currentTime=0;  s4.play();}}
            if (posY1+BW >= bStyle1.top && posX1+BW>=bStyle1.left && posX1<=bStyle1.left){vx1=-vx1}
            if (posY1+BW >=bStyle1.top && posX1-BW<=bStyle1.left+bStyle1.width && posX1>=bStyle1.left + bStyle1.width){vx1=-vx1}
        (ball1.style.top = posY1 + "px"), (ball1.style.left = posX1 + "px");
    }
    //МЯЧ2
    if (ball2.hidden === false) {
posX2 += vx2, posY2 += vy2;
        if (posX2 - BW <= LEFT) {vx2 = -vx2; s5.currentTime=0; s5.play()}
        if (posY2 + BW >= BOTTOM) {
            posY2 = BOTTOM - BW;
            clearInterval(idGo);
            document.removeEventListener("mousemove", moveBita); endSound.play(); music1.pause();
            end.classList.remove('end-none');
        }
        if (posY2 - BW <= TOP) {vy2 = -vy2; s5.currentTime=0; s5.play()}
        if (posX2 + BW >= RIGHT) { vx2 = -vx2; s5.currentTime=0; s5.play()}
        if (posY2 >= bStyle1.top && posX2 >= bStyle1.left && posX2 <= bStyle1.left + bStyle1.width) {
            if (Math.sign(vy2)===1) { vy2 = -vy2; s4.currentTime=0;  s4.play();}}
            if (posY2+BW >= bStyle1.top && posX2+BW>=bStyle1.left && posX2<=bStyle1.left){vx2=-vx2}
            if (posY2+BW >=bStyle1.top && posX2-BW<=bStyle1.left+bStyle1.width && posX2>=bStyle1.left + bStyle1.width){vx2=-vx2}
        ball2.style.top = posY2 + "px", ball2.style.left = posX2 + "px";
    }
    //С БЛОКАМИ
    let blocksOpacity=0;  
    blockS.forEach((elem) => {
        if (elem.style.opacity === "0") {
            blocksOpacity++;
            if (blocksOpacity===blockS.length) {
            clearInterval(idGo);
            music1.pause(); winSound.play()
            document.removeEventListener("mousemove", moveBita); endSound.play();
            win.classList.remove('win-none');
            }
            return;}
        if (posY - BW <= elem.getBoundingClientRect().top + bHeight && posY + BW >= elem.getBoundingClientRect().top &&
            posX >= elem.getBoundingClientRect().left && posX <= elem.getBoundingClientRect().left + bWidth) {     //снизу сверху блока
            if (elem.hasAttribute("b1")) {ball1.hidden = false; 
                bita.style.width=bita.getBoundingClientRect().width*0.8+'px'
                }
            if (elem.hasAttribute("b2")) {  ball2.hidden = false;
                bita.style.width=bita.getBoundingClientRect().width*0.8+'px'
                }
            elem.style.opacity = "0";
            vy = -vy; s3.currentTime=0; 
            s3.play();
        }
        if ( posY >= elem.getBoundingClientRect().top && posY <= elem.getBoundingClientRect().top + bHeight &&
            posX + BW >= elem.getBoundingClientRect().left && posX - BW <= elem.getBoundingClientRect().left + bWidth
        ) {                                               //справа слева блока
            if (elem.hasAttribute("b1")) { ball1.hidden = false;
                bita.style.width=bita.getBoundingClientRect().width*0.8+'px'
               
            }
            if (elem.hasAttribute("b2")) { ball2.hidden = false;
                bita.style.width=bita.getBoundingClientRect().width*0.8+'px'            
            }
            elem.style.opacity = "0";
            vx = -vx; s3.currentTime=0; 
            s3.play();            
        }
        //МЯЧ1
        if (ball1.hidden === false) {
            if ( posY1 - BW <= elem.getBoundingClientRect().top + bHeight && posY1 + BW >= elem.getBoundingClientRect().top && posX1 >= elem.getBoundingClientRect().left &&  posX1 <= elem.getBoundingClientRect().left + bWidth
            ) {
                //снизу сверху блока
                if (elem.hasAttribute("b1")) {ball1.hidden = false; }
                if (elem.hasAttribute("b2")) {  ball2.hidden = false;}
                elem.style.opacity = "0";
                vy1 = -vy1; s3.currentTime=0; 
                s3.play();
            }
            if (
                posY1 >= elem.getBoundingClientRect().top && posY1 <= elem.getBoundingClientRect().top + bHeight && posX1 + BW >= elem.getBoundingClientRect().left && posX1 - BW <= elem.getBoundingClientRect().left + bWidth
            ) {
                //справа слева блока
                if (elem.hasAttribute("b1")) { ball1.hidden = false; }
                if (elem.hasAttribute("b2")) { ball2.hidden = false;}
                elem.style.opacity = "0";
                vx1 = -vx1; s3.currentTime=0; 
                s3.play();
            }
        }
        //МЯЧ2
        if (ball2.hidden === false) {
            if (
                posY2 - BW <= elem.getBoundingClientRect().top + bHeight && posY2 + BW >= elem.getBoundingClientRect().top && posX2 >= elem.getBoundingClientRect().left && posX2 <= elem.getBoundingClientRect().left + bWidth
            ) {
                //снизу сверху блока
                if (elem.hasAttribute("b1")) { ball1.hidden = false; }
                if (elem.hasAttribute("b2")) { ball2.hidden = false;}
                elem.style.opacity = "0";
                vy2 = -vy2;s3.currentTime=0; 
                s3.play();
            }
            if ( posY2 >= elem.getBoundingClientRect().top && posY2 <= elem.getBoundingClientRect().top + bHeight && posX2 + BW >= elem.getBoundingClientRect().left && posX2 - BW <= elem.getBoundingClientRect().left + bWidth) {
                //справа слева блока
                if (elem.hasAttribute("b1")) {ball1.hidden = false;}
                if (elem.hasAttribute("b2")) {ball2.hidden = false;}
                elem.style.opacity = "0";
                vx2 = -vx2; s3.currentTime=0; 
                s3.play();
            }
        }
    });
}
//МЕХАНИКА БИТЫ
function moveBita(e) {
    bitaX = e.clientX;
    if (bitaX <= LEFT) {
        bitaX = LEFT;
    }
    if (bitaX + WBITA >= RIGHT) {
        bitaX = RIGHT - WBITA;
    }
    bita.style.left = bitaX + "px";   
}}
