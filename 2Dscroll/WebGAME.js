let pressW =0;
let ball = []
rg = 255;
loo = 0;
const clearTime = 4000;


function initializeBalls(){
    ball = [];
    rg = 255;
    for(let i = 0; i<576;  i++ ){
        // i = 36,  ( ボール35個) i = 18 角度を10度ずつ変える
        ball[i] = {
            x: player.x + player.w / 2,
            y: player.y,
            speedX: 6 * Math.cos(Math.PI * i/288), 
            speedY: 6 * Math.sin(Math.PI * i/288), 
            radius: 3,
            isCrash: false
        };
    }
}


//ボールの描画
function drawBall(){
    if(++loo > 65 && rg > 0){
        /* console.log(rg) */
    rg -= 2;
}

    for(let i in ball){
        if(ball[i].isCrash){
            ctx.beginPath();
            ctx.rect(Math.floor(ball[i].x - ball[i].radius), Math.floor(ball[i].y - ball[i].radius),Math.floor(ball[i].radius * 1),Math.floor(ball[i].radius * 1)); //四角を描く
            ctx.fillStyle = "yellow";
            ctx.fill();
            ctx.closePath();
        }else{
            ctx.beginPath(); 
            ctx.arc(ball[i].x, ball[i].y, ball[i].radius, 0, Math.PI * 2); //円を描く
            ctx.fillStyle = `rgb(${rg},${rg},0`;
            ctx.fill();
            ctx.closePath();
        }
    }
}

//ボールを消す
function clearBall(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

//ボールの移動
function moveBall(){
    for(let i in ball){
        if(!ball[i].isCrash){
        ball[i].x += ball[i].speedX;
        ball[i].y -= ball[i].speedY;
        }
    }
}

//衝突検出関数
function checkCollision(){
    ball.forEach((b,i) => {
        blocks.forEach(block => {
            if (b.isCrash==false && b.x + b.radius >= block.x &&  //ボールの右端がブロックの左端を越えているか
                b.x - b.radius <= block.x + block.w &&            //ボールの左端がブロックの右端を越えているか
                b.y + b.radius >= block.y  &&                     //ボールの下端がブロックの上端を越えているか
                b.y - b.radius <= block.y + block.h ){            //ボールの上端がブロックの端を越えているか
                b.isCrash = true;
                if(b.y + b.radius >= block.y && b.y + b.radius <= block.y+block.h && Math.abs(block.y - b.y + b.radius) <= 6){
                    b.y = block.y
                }else if(b.y >= block.y && block.y + block.h <= b.y && Math.abs(block.y + block.h - b.y) <= 6){
                    b.y = block.y + block.h
                }
                if(b.x + b.radius >= block.x && b.x + b.radius <= block.x + block.w && Math.abs(block.x - b.x + b.radius) <= 6){
                    b.x = block.x
                }else if(b.x >= block.x && block.x + block.w >= b.x && Math.abs(block.x + block.w - b.x) <= 6){
                    b.x = block.x + block.w
                }
 
            }
        });
    });
}
 



//ボールの再発射
function resetAndShootBalls(){
    pressW = 0;
    initializeBalls();
}

//ボールの発射
function shota(){
    if(pressW==1){
        moveBall();
        checkCollision();
        drawBall();
    }
}

//ユーザー入力に応じてボールを発射
document.addEventListener("keydown",function(e){
    if(e.key == "w" && pressW == 0){ //Wキーでボールを発射
        if(clearFrag==0){
        pressW=1;
        initializeBalls();
        BarController();
        setTimeout(() => { 
            clearBall(); 
            resetAndShootBalls(); // クリアして再発射 
        }, clearTime); 
        }

    }
});