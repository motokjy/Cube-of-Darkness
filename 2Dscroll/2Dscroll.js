const width = 1700,height = 800;
const lw = 1;
const ms = 32; //1マスの大きさ
const g = 0.7; //重力 
let currentStage = 0;
let player;
let blocks = []; 
let goal;
let clearFrag=0;
let  totalSeconds; //タイマーの制限時間
let GoalTime=null;
const clearbutton =document.getElementById('clearbutton');
const selectbutton=document.getElementById('titlebutton');
let cooltime=document.getElementById('cooltime-container');
let cooltimeBar=document.getElementById('cooltime-bar');
let BarWidth;

//ステージの描画関数
function start(stage = currentStage){
    clearFrag=0;
    totalSeconds=120;

    map = stages[stage];
    blocks = [];
    for(let i=0; i < map.length; i++){
        for(let j=0; j < map[0].length;j++){
            let m = map[i][j];
            if(m==1)blocks.push(new Block(j*ms,i*ms));
            if(m==2)player = new Player(j*ms+3,i*ms+6);
            if(m==3)goal = new Goal(j*ms,i*ms);
       }
    } 
}

//ステージ選択画面からの情報を受ける
function getStageFromUrl(){
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get("stage")||"0",10);
}

//クリア後に次のステージに行くボタン
function nextstage(){
    document.getElementById("clearbutton1").addEventListener("click",function(){
        currentStage+=1;
        window.location.search=`?stage=${currentStage}`;
        const starContainer = document.getElementById('star-container');
        starContainer.style.display=`none`;
        clearbutton.style.display=`none`;
    })
}

//クリア後にステージセレクトに行くボタン
function stageSelect1(){
    document.getElementById("clearbutton2").addEventListener("click",function(){
        window.location.href=`../stage_select/Stage_Select.html`;
    })
}

//ゲームオーバー後に現在のステージをリトライするボタン
function nowstage(){
    document.getElementById("gameoverbutton1").addEventListener("click", function(){
        window.location.reload();
    });
}

//ゲームオーバー後にステージセレクトに行くボタン
function stageSelect2(){
    document.getElementById("gameoverbutton2").addEventListener("click",function(){
        window.location.href=`../stage_select/Stage_Select.html`;
    })
}

//すべてクリアしてタイトルへ
function titlebutton(){
    document.getElementById("titlebutton").addEventListener("click",function(){
        window.location.href=`../index.html`;
    })
}

//全部のステージクリア時の文字
function complete(){
    var complete=document.getElementById("complete");
    if(complete){
        complete.style.display="block";
    }
}

let keyD = false,keyA = false,keySpace = false;

addEventListener("keydown",(e)=> {
    if(e.key == "d")keyD = true;
    if(e.key == "a")keyA = true;
    if(e.key == " ")keySpace = true;
    if(e.key == "r") start();
});

addEventListener("keyup",(e)=>{
    if(e.key == "d")keyD = false;
    if(e.key == "a")keyA = false;
    if(e.key == " ")keySpace = false;
})

class Rect{
    constructor(x,y,w=ms,h=ms,col,stroke){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.col = col;
        this.stroke = stroke;
    }

    draw(){
        drawRect(this.x,this.y,this.w,this.h,this.col,this.stroke);
    }
}

//ステージの地面、床の詳細
class Block extends Rect{
    constructor(x,y,col="black",stroke){
        super(x,y,ms,ms,col,stroke);
    }
}

//ゴールの詳細
class Goal extends Rect{
    constructor(x,y,col="yellow",stroke){
        super(x,y,ms,ms,col,stroke);
    }
}

//プレイヤーの詳細
class Player extends Rect{
    constructor(x,y){
        super(x,y,26,26,"blue",true);
        this.vx = 0;
        this.vy = 0;
        this.speed = 5;
        this.dir = 1;

        this.sjumpSpeed = -4.5;
        this.jumpSpeed = this.sjumpSpeed;
    }

    move(){
        if(clearFrag==0){
        if(keyD) this.dir = 1;
        if(keyA) this.dir = -1;
        if(keyD || keyA)this.vx = this.speed*this.dir;
        else this.vx = 0;

        this.vy += g;

        if(keySpace){
            if(this.jumpSpeed < 0){
                this.vy += this.jumpSpeed;
            }
            this.jumpSpeed += g;
        }else{
            this.jumpSpeed = 0;
        }

        this.beforColl()

        this.x += this.vx;
        this.y += this.vy;

        this.checkGoal()
        }
    }

//接触判定 
    beforColl(){
        blocks.forEach(b =>{
            if(this.y+this.h+this.vy>b.y&&this.y+this.vy<b.y+b.h){
                if(this.vy > 0&&this.x+this.w>b.x&&this.x<b.x+b.w){
                    this.y = b.y-this.h;
                    this.vy = 0;

                    if(!keySpace){
                        this.jumpSpeed = this.sjumpSpeed;
                    }
                }
            }
            if(this.y+this.vy<b.y+b.h&&this.y+this.h+this.vy>b.y){
                if(this.vy<0&&this.x+this.w>b.x&&this.x<b.x+b.w){
                    this.y=b.y+b.h;
                    this.vy=0;
                }
            }
            if(this.x+this.w+this.vx>b.x && this.x+ this.vx<b.x+b.w){
                if(this.y<b.y+b.h&&this.y+this.h>b.y){
                    if(this.vx>0){
                        this.x=b.x-this.w;
                    }else{
                        this.x=b.x+b.w;
                    }
                    this.vx=0;
                }
            }
        })
    }

    //ゴール時の判定
    checkGoal(){
        if(this.x+this.w>=goal.x && this.x<=goal.x+goal.w && this.y<=goal.y+goal.h && this.y+this.h>=goal.y){
        if(clearFrag==0){
            if(currentStage == stages.length - 1){
                clearInterval(timerInterval);
                complete();
                selectbutton.style.display=``;
                clearFrag=1;
            }else{
                clearInterval(timerInterval);
                GoalTime = totalSeconds;
                console.log(GoalTime);
                displayStars(GoalTime);
                clearbutton.style.display=``;
                clearFrag=1;
            }
        }
        }/* (currentStage < stages.length - 1) これを入れると最後のステージで処理を変えれる */
    }
}

//クールタイムバーを表示
function BarController(){
    BarWidth=0;
    cooltime.style.display=``;
    /* cnsole.log(player.x); */

    
    const barmove =setInterval(() => {
  
        clearInterval(barmove);
    }, 1);
    const interval = setInterval(() => {
        if(BarWidth<=100){
            cooltimeBar.style.width=BarWidth+'%';
            BarWidth++;
        }else{
            cooltime.style.display=`none`;
            clearInterval(interval);
        }
    }, 40);

    updateBarPosition();
}

//バーの位置を更新
function updateBarPosition(){
    cooltime.style.left=`${player.x-6}px`;
    cooltime.style.top=`${player.y-15}px`;    
    
    requestAnimationFrame(updateBarPosition);
}

function drawRect(x,y,w,h,col,stroke=false){
    ctx.fillStyle = col;
    ctx.fillRect(x,y,w,h)
    if(stroke){
        ctx.strokeRect(x+lw/2,y+lw/2,w-lw,h-lw)
    }
}

function drawRect(x,y,w,h,col,stroke=false){
    ctx.fillStyle = col;
    ctx.fillRect(x,y,w,h)
    if(stroke){
        ctx.strokeRect(x+lw/2,y+lw/2,w-lw,h-lw)
    }
}

function init(){
    canvas.width = width;
    canvas.height = height;
    ctx.lineWidth = lw;

    currentStage = getStageFromUrl();
    start(currentStage); 

    stageSelect1();
    stageSelect2();
    nowstage();
    titlebutton();
    nextstage();
    updateTimerDisplay();
    loop();
}



//タイマーの関数
function timer(){
        totalSeconds--;
        if(totalSeconds < 0){
            clearInterval(timerInterval);
            displayTimeUp();
        }else{
            updateTimerDisplay();
        }
        console.log(totalSeconds);
}

//タイマーを表示
function updateTimerDisplay(){
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    document.getElementById("timerDisplay").innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;  
}

const timerInterval =setInterval(timer,1000); 

//タイムアップ時の処理
function displayTimeUp(){
    var element=document.getElementById("TimeUp");
    if(element){
        element.style.display = "block";
    }
}

function loop(){
    drawRect(0,0,width,height,"black");

    goal.draw();
    if(player){
        player.move();
        player.draw();
    }
    blocks.forEach(block=>block.draw());
    
}

onload = init;
