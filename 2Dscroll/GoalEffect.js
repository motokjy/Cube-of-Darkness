function displayStars(GoalTime){
    const starContainer=document.getElementById('star-container');
    starContainer.innerHTML=' ';

    let starCount;
    if(GoalTime>90){
        starCount=3;
    }else if(GoalTime>60){
        starCount=2;
    }else if(GoalTime>30){
        starCount=1;
    }else{
        starCount=0;
    }
    console.log(starCount);
    starContainer.style.display=``;


    for(let i=0;i<starCount;i++){
        const star = document.createElement('span');
        star.className='star';
        star.textContent='★';
        starContainer.appendChild(star);
        /* console.log(i); */
    }
}