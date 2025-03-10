document.addEventListener("DOMContentLoaded", function() {
    const HoverArea = document.getElementById('HoverArea');
    const fadeText = document.getElementById('STARTbutton');

    HoverArea.addEventListener('mouseover', function() {
        fadeText.style.visibility = 'visible';
        fadeText.style.opacity = '1';
    });

    HoverArea.addEventListener('mouseout', function() {
        fadeText.style.opacity = '0';
    });
});
