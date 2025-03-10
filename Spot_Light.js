"use strict";
const spot = document.querySelector(".spot");
const cubeContainer = document.getElementById("cubeContainer");

const createCube = (x, y) => {
    const cube = document.createElement('div');
    cube.className = 'cube';
    cube.style.left = `${x}px`;
    cube.style.top = `${y}px`;
    cubeContainer.appendChild(cube);
};


//  以下ブロック描写関数
const generateCubes1 = () => {
    for (let x = 0; x <= 660; x += 5) {
        for (let y = 975; y <= 1054; y += 5) {
            createCube(x, y);
        }
    }
};

const generateCubes2 = () => {
    for (let x = 740; x <= 1694; x += 5) {
        for (let y = 975; y <= 1054; y += 5) {
            createCube(x, y);
        }
    }
};

const generateCubes3 = () => {
    for (let x = 390; x <= 450; x += 5) {
        for (let y = 900; y <= 975; y += 5) {
            createCube(x, y);
        }
    }
};

const generateCubes4 = () => {
    for (let x = 520; x <= 580; x += 5) {
        for (let y = 825; y <= 975; y += 5) {
            createCube(x, y);
        }
    }
};

const generateCubes5 = () => {
    for (let x = 720; x <= 905; x += 5) {
        for (let y = 770; y <= 830; y += 5) {
            createCube(x, y);
        }
    }
};

const generateCubes6 = () => {
    for (let x = 1030; x <= 1215; x += 5) {
        for (let y = 740; y <= 800; y += 5) {
            createCube(x, y);
        }
    }
};



//  以下スポットライトの関数

const spotLight = (event) => {
    const { clientX, clientY } = event;
    spot.setAttribute(
        "style",
        `background-image:
        radial-gradient(circle at ${clientX}px ${clientY}px,
        transparent 0px, transparent 100px, rgba(0,0,0,1) 150px)`
    );

    const cubes = document.querySelectorAll('.cube');
    cubes.forEach(cube => {
        const cubeRect = cube.getBoundingClientRect();
        const cubeCenterX = cubeRect.left + cubeRect.width / 2;
        const cubeCenterY = cubeRect.top + cubeRect.height / 2;
        const distance = Math.sqrt(Math.pow(cubeCenterX - clientX, 2) + Math.pow(cubeCenterY - clientY, 2));
        if (distance < 100) {
            cube.style.backgroundColor = "black";
        } else {
            cube.style.backgroundColor = "white";
        }
    });
};

document.addEventListener("mousemove", spotLight);

generateCubes1(); // キューブを指定した位置に配置
generateCubes2(); // キューブを指定した位置に配置
generateCubes3(); // キューブを指定した位置に配置
generateCubes4(); // キューブを指定した位置に配置
generateCubes5(); // キューブを指定した位置に配置
generateCubes6(); // キューブを指定した位置に配置