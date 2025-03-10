for(let i = 1; i < 11; i++){
    const HoverArea = document.getElementById('HoverArea' + i);
    const fadeText = document.getElementById('button' + i);

    HoverArea.addEventListener('mouseover', function() {
        fadeText.style.visibility = 'visible';
        fadeText.style.opacity = '1';
    });

    HoverArea.addEventListener('mouseout', function() {
        fadeText.style.opacity = '0';
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const HoverArea11 = document.getElementById('HoverArea11');
    const fadeText = document.getElementById('go_title');

    HoverArea11.addEventListener('mouseover', function() {
        fadeText.style.visibility = 'visible';
        fadeText.style.opacity = '1';
    });

    HoverArea11.addEventListener('mouseout', function() {
        fadeText.style.opacity = '0';
    });
});