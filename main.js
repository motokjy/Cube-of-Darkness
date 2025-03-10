const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

window.addEventListener("resize",()=>{
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
})

setInterval(drawAll,30)
function drawAll(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    loop();
    shota();
}