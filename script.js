/** @type {HTMLCanvasElement} */
const canvas1 = document.getElementById('canvas1');
const ctx1 = canvas1.getContext('2d');
canvas1.width = 400;
canvas1.height = 400;

const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas2.getContext('2d');
canvas2.width = 400;
canvas2.height = 400;

const canvas3 = document.getElementById('canvas3');
const ctx3 = canvas3.getContext('2d');
canvas3.width = 400;
canvas3.height = 400;

const canvas4 = document.getElementById('canvas4');
const ctx4 = canvas4.getContext('2d');
canvas4.width = 400;
canvas4.height = 400;

const canvas5 = document.getElementById('canvas5');
const ctx5 = canvas5.getContext('2d');
canvas5.width = 400;
canvas5.height = 400;

const download = document.getElementById('download');
const ctx = download.getContext('2d');
download.width = 400;
download.height = 400;

const slimeSelected = document.getElementById('slime-selected');
const slimeSelectedImage = document.getElementById('slime-selected-image');
const slimeSelectedText = document.getElementById('slime-selected-text');
const slimeArrow = document.getElementById('slime-arrow');
const slimeList = document.getElementById('slime-list');
const slimeOptions = document.getElementsByClassName('slime-option');
const backgroundSelected = document.getElementById('background-selected');
const backgroundSelectedImage = document.getElementById('background-selected-image');
const backgroundSelectedText = document.getElementById('background-selected-text');
const backgroundArrow = document.getElementById('background-arrow');
const backgroundList = document.getElementById('background-list');
const backgroundOptions = document.getElementsByClassName('background-option');
const colorContainer = document.getElementById('color-container');
const toolContainer = document.getElementById('tool-container');
const settingContainer = document.getElementById('setting-container');

const pixelSize = 10;
const pixelGrids = [];
let canvasPosition = canvas5.getBoundingClientRect();
let drawingMode = false;
let backgroundImage = new Image();
let slimeImage = new Image();
let colorVal = '#211f33';
let slimeOpen = false;
let backgroundOpen = false;
let slimeNum = -1;
let backgroundNum = -1;
ctx3.fillStyle = colorVal;
ctx4.fillStyle = colorVal;

/** 그리드 세팅 */
class Grid{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.width = pixelSize;
        this.height = pixelSize;
    }

    draw(){
        ctx5.strokeRect(this.x, this.y, this.width, this.height);
    }
}

const mouse = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
}

function detectCollision(obj1, obj2){
    if(!(   obj1.x > obj2.x + obj2.width || 
            obj2.x > obj1.x + obj1.width || 
            obj1.y > obj2.y + obj2.height || 
            obj2.y > obj1.y + obj1.height )){
                return true;
    }
}

function createGrid(){
    for(let y = 0; y < canvas5.height; y += pixelSize){
        for(let x = 0; x < canvas5.width; x += pixelSize){
            pixelGrids.push(new Grid(x,y));
        }
    }

    ctx5.lineWidth = 0.1;
    ctx5.strokeStyle = "#a4a4a7";

    for(let i = 0; i < pixelGrids.length; i++){
        pixelGrids[i].draw();
    }
}

createGrid();

const slimeFiles = [
    "sprites/Slime_01.png",
    "sprites/Slime_02.png",
    "sprites/Slime_03.png",
    "sprites/Slime_04.png",
    "sprites/Slime_05.png",
    "sprites/Slime_06.png",
    "sprites/Slime_07.png",
    "sprites/Slime_08.png",
    "sprites/Slime_09.png",
    "sprites/Slime_10.png"
];

const backgroundFiles = [
    "sprites/Background_01.png",
    "sprites/Background_02.png",
    "sprites/Background_03.png",
    "sprites/Background_04.png",
    "sprites/Background_05.png",
    "sprites/Background_06.png",
    "sprites/Background_07.png",
    "sprites/Background_08.png",
    "sprites/Background_09.png",
    "sprites/Background_10.png"
];

slimeSelected.addEventListener('click', function(){
    slimeList.classList.toggle('slime-hide');
    slimeArrow.classList.toggle('slime-arrow-rotate');
    slimeOpen = !slimeOpen;
    setZIndex();
})

for(let slimeOption of slimeOptions){
slimeOption.addEventListener('click', function(){
    if(backgroundNum == findColorNum(this.textContent) ){
        window.alert("배경과 동일한 색상의 슬라임은 선택할 수 없습니다.\nYou cannot select a slime with the same color as the background.");
    }else{
        slimeList.classList.toggle('slime-hide');
        slimeArrow.classList.toggle('slime-arrow-rotate');
        slimeSelectedText.innerHTML = this.textContent;
        slimeSelectedImage.src = slimeFiles[findColorNum(this.textContent)];
        slimeImage.src = slimeFiles[findColorNum(this.textContent)];
        ctx2.clearRect(0,0, canvas2.width, canvas2.height);
        ctx2.drawImage(slimeImage, 0, 0, canvas2.width, canvas2.height);
        slimeOpen = !slimeOpen;
        slimeNum = findColorNum(this.textContent);
        setZIndex();
    }
})
}

backgroundSelected.addEventListener('click', function(){
    backgroundList.classList.toggle('background-hide');
    backgroundArrow.classList.toggle('background-arrow-rotate');
    backgroundOpen = !backgroundOpen;
    setZIndex();
})

for(let backgroundOption of backgroundOptions){
backgroundOption.addEventListener('click', function(){
    if(slimeNum == findColorNum(this.textContent)){
        window.alert("슬라임과 동일한 색상의 배경은 선택할 수 없습니다.\nYou cannot select a background with the same color as the slime.");
    }else{
    backgroundList.classList.toggle('background-hide');
    backgroundArrow.classList.toggle('background-arrow-rotate');
    backgroundSelectedText.innerHTML = this.textContent;
    backgroundSelectedImage.src = backgroundFiles[findColorNum(this.textContent)];
    backgroundImage.src = backgroundFiles[findColorNum(this.textContent)];
    ctx1.clearRect(0,0, canvas2.width, canvas2.height);
    ctx1.drawImage(backgroundImage, 0, 0, canvas1.width, canvas1.height);
    backgroundOpen = !backgroundOpen;
    backgroundNum = findColorNum(this.textContent);
    setZIndex();
}
})
}

function setZIndex(){
    if(!slimeOpen && !backgroundOpen){
        canvas5.style.zIndex = 1;
    }else{
        canvas5.style.zIndex = -1;
    }
}

function findColorNum(str){
    if(str.includes('Red')){
        return 0;
    }else if(str.includes('Orange')){
        return 1;
    }else if(str.includes('Yellow')){
        return 2;
    }else if(str.includes('Green')){
        return 3;
    }else if(str.includes('Teal')){
        return 4;
    }else if(str.includes('Blue')){
        return 5;
    }else if(str.includes('Purple')){
        return 6;
    }else if(str.includes('Pink')){
        return 7;
    }else if(str.includes('White')){
        return 8;
    }else if(str.includes('Black')){
        return 9;
    }
}

function downloadImage(){

    ctx.drawImage(canvas1, 0, 0);
    ctx.drawImage(canvas2, 0, 0);
    ctx.drawImage(canvas3, 0, 0);

    let a = document.createElement("a");
    a.href = download.toDataURL();

    let fileName = "download.png";
    a.setAttribute("download", fileName); 

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);
};

function isCanvasBlank(canvas) {
    return !canvas.getContext('2d')
      .getImageData(0, 0, canvas.width, canvas.height).data
      .some(channel => channel !== 0);
}

function update(){
    
    ctx4.clearRect(0, 0, canvas4.width, canvas4.height);
    for(let i = 0; i < pixelGrids.length; i++){
        if(mouse.x && mouse.y && detectCollision(pixelGrids[i], mouse))
        ctx4.fillRect(pixelGrids[i].x, pixelGrids[i].y, pixelGrids[i].width, pixelGrids[i].height);
    }

    requestAnimationFrame(update);
}

update();

canvas5.addEventListener('mousemove', function(e){
    mouse.x = e.x - canvasPosition.left;
    mouse.y = e.y - canvasPosition.top;

    if(drawingMode){
        for(let i = 0; i < pixelGrids.length; i++){
            if(mouse.x && mouse.y && detectCollision(pixelGrids[i], mouse))
            ctx3.fillRect(pixelGrids[i].x, pixelGrids[i].y, pixelGrids[i].width, pixelGrids[i].height);
        }

        if(colorVal == '#ffffff00'){
            for(let i = 0; i < pixelGrids.length; i++){
                if(mouse.x && mouse.y && detectCollision(pixelGrids[i], mouse))
                ctx3.clearRect(pixelGrids[i].x, pixelGrids[i].y, pixelGrids[i].width, pixelGrids[i].height);
            }
        }
    }
});

canvas5.addEventListener('mouseleave', function(){
    mouse.x = undefined;
    mouse.y = undefined;
});

canvas5.addEventListener('mousedown', function(){
    drawingMode = true;

    for(let i = 0; i < pixelGrids.length; i++){
        if(mouse.x && mouse.y && detectCollision(pixelGrids[i], mouse))
        ctx3.fillRect(pixelGrids[i].x, pixelGrids[i].y, pixelGrids[i].width, pixelGrids[i].height);
    }

    if(colorVal == '#ffffff00'){
        for(let i = 0; i < pixelGrids.length; i++){
            if(mouse.x && mouse.y && detectCollision(pixelGrids[i], mouse))
            ctx3.clearRect(pixelGrids[i].x, pixelGrids[i].y, pixelGrids[i].width, pixelGrids[i].height);
        }
    }
})

canvas5.addEventListener('mouseup', function(){
    drawingMode = false;
})

colorContainer.addEventListener('click', function(e){
    colorVal = getComputedStyle(this).getPropertyValue(e.target.getAttribute('id'));
    ctx3.fillStyle = colorVal;
    ctx4.fillStyle = colorVal;
})

toolContainer.addEventListener('click',function(e){
    if(e.target.getAttribute('id') == 'outline'){
        colorVal = '#211f33';
    }else if(e.target.getAttribute('id') == 'eraser'){
        colorVal = '#ffffff00';
    }
    ctx3.fillStyle = colorVal;
    ctx4.fillStyle = colorVal;
})

settingContainer.addEventListener('click', function(e){
    if(e.target.getAttribute('id') == 'download'){
        if(!isCanvasBlank(canvas1) && !isCanvasBlank(canvas2) && !isCanvasBlank(canvas3)){
            downloadImage();}else{
                if(isCanvasBlank(canvas2)){
                    window.alert("슬라임을 선택해주세요!\nSelect a slime!");
                }else if(isCanvasBlank(canvas1)){
                    window.alert("배경을 선택해주세요!\nSelect a background!");
                }else if(isCanvasBlank(canvas3)){
                    window.alert("슬라임을 꾸며주세요!\nDecorate a slime!");
                }
            }
    }else if(e.target.getAttribute('id') == 'reset'){
        ctx1.clearRect(0,0,canvas1.width,canvas1.height);
        ctx2.clearRect(0,0,canvas2.width,canvas2.height);
        ctx3.clearRect(0,0,canvas3.width,canvas3.height);

        slimeSelectedText.innerHTML = "Select a Slime";
        slimeSelectedImage.src = slimeFiles[0];
        backgroundSelectedText.innerHTML = "Select a BG";
        backgroundSelectedImage.src = backgroundFiles[0];
        slimeNum = -1;
        backgroundNum = -1;
    }
})

window.addEventListener('resize', function() {
    canvasPosition = canvas5.getBoundingClientRect();
})

window.addEventListener('scroll', function() {
    canvasPosition = canvas5.getBoundingClientRect();
})