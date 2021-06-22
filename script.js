"use strict";
function randomNumber(min, max) {
    const r = Math.random() * (max - min) + min
    return Math.floor(r)
}
function roll(max) {
    return Math.floor((Math.random() * max));
}
function appearElement(element, id, status, block) {
    element.id = id;
    element.status = status;
    element.block = block;
}
function swapElements(element1, element2) {
    let temp = element1.block;
    element1.block = element2.block;
    element2.block = temp;

    temp = element1.status;
    element1.status = element2.status;
    element2.status = temp;

    temp = element1.id;
    element1.id = element2.id;
    element2.id = temp;
}
function reprintElement(y, x) {

    let el = 'row' + x + 'col' + y;
    let printEl = document.getElementById(el);

    let blockStatus = '';
    if (arr[y][x].block != 'empty') {
        blockStatus += arr[y][x].block;
        if (arr[y][x].id == 0) blockStatus += 'Virus';
        else if (arr[y][x].id == arr[y][x - 1].id) blockStatus += 'Right';
        else if (arr[y][x].id == arr[y][x + 1].id) blockStatus += 'Left';
        else if (arr[y][x].id == arr[y + 1][x].id) blockStatus += 'Up';
        else if (arr[y][x].id == arr[y - 1][x].id) blockStatus += 'Down';
        else blockStatus += 'Block';
    }
    else blockStatus = 'Block';
    printEl.className = blockStatus;
}
function clearElement(element) {
    element.block = 'empty';
    element.status = 'none';
    element.id = 0;
}
function print() {
    let printer = document.getElementById("cont");
    printer.innerHTML = "<div>\n";
    for (let i = 0; i < 20; i++) {
        for (let j = 1; j < 9; j++) {
            let blockID = 'row' + j + 'col' + i;
            let blockStatus = '';
            if (['blue', 'yellow', 'brown'].includes(arr[i][j].block)) {
                blockStatus += arr[i][j].block;
                if (arr[i][j].id == 0) blockStatus += 'Virus';
                else if (arr[i][j].id == arr[i][j - 1].id) blockStatus += 'Right';
                else if (arr[i][j].id == arr[i][j + 1].id) blockStatus += 'Left';
                else if (arr[i][j].id == arr[i + 1][j].id) blockStatus += 'Up';
                else if (arr[i][j].id == arr[i - 1][j].id) blockStatus += 'Down';
                else blockStatus += 'Block';
                //console.log(blockStatus)
            }
            else blockStatus = 'Block';

            printer.innerHTML += '<div id="' + blockID + '" class="' + blockStatus + '"></div >';
        }
    }
    let next = document.getElementById("next");

    next.innerHTML = '';
    let blockStatus = temparr[0] + 'Left';
    next.innerHTML += '<div class="' + blockStatus + '"></div >';
    blockStatus = temparr[1] + 'Right';
    next.innerHTML += '<div class="' + blockStatus + '"></div >';

}
function create(tab) {
    for (let i = 0; i < 21; i++) {
        tab[i] = [];
        for (let j = 0; j < 10; j++) {
            tab[i][j] = {
                block: 'border',
                id: idcount,
                status: 'border',
            }
        }
    }
    for (let i = 0; i < 20; i++) {
        for (let j = 1; j < 9; j++) {
            tab[i][j] = {
                block: 'empty',
                id: idcount,
                status: 'none',
            }
        }
    }
}
function generateViruses(num) {
    for (let i = 0; i < num; i++) {
        let y = randomNumber(8, 19);
        let x = randomNumber(1, 9);
        if (arr[y][x].block != 'empty') i--;
        else {
            switch (roll(3)) {
                case 0:
                    arr[y][x].block = 'blue';
                    break;
                case 1:
                    arr[y][x].block = 'brown';
                    break;
                case 2:
                    arr[y][x].block = 'yellow';
                    break;
            }
        }
        arr[y][x].id = 0;
        arr[y][x].status = 'locked';
    }
}
function sequence(elx, ely, diagx, diagy) {
    let n = 1;
    let rmflag;
    //console.log(ely, elx)
    for (let i = 1; i < 5; i++) {
        if (arr[ely + (diagy * i)][elx + (diagx * i)].block == arr[ely][elx].block) { n++ }
        else break;
    }
    for (let i = 1; i < 5; i++) {
        if (arr[ely - (diagy * i)][elx - (diagx * i)].block == arr[ely][elx].block) { n++ }
        else break;
    }
    if (n >= 4) {
        rmflag = true;
        for (let i = 1; i < 5; i++) {
            if (arr[ely + (diagy * i)][elx + (diagx * i)].block == arr[ely][elx].block && arr[ely + (diagy * i)][elx + (diagx * i)].status == 'locked') {
                clearElement(arr[ely + (diagy * i)][elx + (diagx * i)])
            }
            else break;
        }
        for (let i = 1; i < 5; i++) {
            if (arr[ely - (diagy * i)][elx - (diagx * i)].block == arr[ely][elx].block && arr[ely - (diagy * i)][elx - (diagx * i)].status == 'locked') {
                clearElement(arr[ely - (diagy * i)][elx - (diagx * i)])
            }
            else break;
        }
    }
    return rmflag;
}
function removeSequences() {
    //poziome
    let seqcount = 1;
    let seqflag = false;
    for (let i = 19; i >= 0; i--) {
        for (let j = 1; j <= 8; j++) {
            if (arr[i][j].block == arr[i][j + 1].block && arr[i][j].block != "empty") { seqcount++; }
            //usuwanie bloczkow
            else if (seqcount >= 4) {
                for (let k = 0; k < seqcount; k++) {

                    let el = 'row' + (j - k) + 'col' + i;
                    let printEl = document.getElementById(el);

                    let blockStatus = arr[i][j - k].block;
                    if (arr[i][j - k].id == 0) blockStatus += 'X';
                    else blockStatus += 'O';
                    console.log(blockStatus);
                    printEl.className = blockStatus;
                    setTimeout(function () {
                        printEl.className = "Block";
                    }, 200)
                    arr[i][j - k].id = -1;
                }
                seqcount = 1;
            }
            else seqcount = 1;
        }
    }
    for (let j = 1; j <= 8; j++) {
        for (let i = 0; i < 20; i++) {
            if (arr[i + 1][j].block == arr[i][j].block && arr[i][j].block != "empty") seqcount++;
            //usuwanie bloczkow
            else if (seqcount >= 4) {
                for (let k = 0; k < seqcount; k++) {
                    let el = 'row' + j + 'col' + (i - k);
                    let printEl = document.getElementById(el);

                    let blockStatus = arr[i - k][j].block;
                    if (arr[i - k][j].id == 0) blockStatus += 'X';
                    else blockStatus += 'O';
                    console.log(blockStatus);
                    printEl.className = blockStatus;
                    setTimeout(function () {
                        printEl.className = "Block";
                    }, 200)
                    arr[i - k][j].id = -1;
                }
                seqcount = 1;
            }
            else seqcount = 1;
        }
    }
    for (let j = 1; j <= 8; j++) {
        for (let i = 0; i < 20; i++) {
            if (arr[i][j].id == -1) {
                arr[i][j].block = "empty";
                arr[i][j].status = "none";
                arr[i][j].id = 0;
                seqflag = true;
            }
        }
    }
    //print();
    if (seqflag == true) fellDownElements();
    else setTimeout(function () {
        createElement();
    }, 200)

}
function isLegalToFell() {
    if (y1 > 19 || y2 > 19) return false
    else if (arr[y1 + 1][x1].status == 'locked' || arr[y2 + 1][x2].status == 'locked') return false
    else if (arr[y1 + 1][x1].status == 'border' || arr[y2 + 1][x2].status == 'border') return false
    else return true;
}
function elementFell(y, x) {
    if (arr[y + 1][x].block == 'empty' && arr[y][x].block != 'empty' && arr[y][x].id != 0) {
        if (arr[y][x + 1].id == arr[y][x].id && arr[y + 1][x + 1].block != 'empty') return false;
        if (arr[y][x - 1].id == arr[y][x].id && arr[y + 1][x - 1].block != 'empty') return false;
        else return true;
    }
    else return false;
}
function fellDownElements() {
    let fellFlag = false;
    for (let i = 18; i >= 0; i--) {
        for (let j = 8; j > 0; j--) {
            if (elementFell(i, j) == true) {
                appearElement(arr[i + 1][j], arr[i][j].id, arr[i][j].status, arr[i][j].block);
                clearElement(arr[i][j]);
                reprintElement(i, j);
                reprintElement(i + 1, j)
                fellFlag = true;
            }
        }
    }
    setTimeout(function () {
        if (fellFlag == true) fellDownElements();
        else removeSequences();
    }, 200)
}
function downfall(ms) {
    fellinterval = setTimeout(function () {
        //console.log(isLegalToFell())
        if (isLegalToFell() == false) {
            arr[y1][x1].status = 'locked';
            arr[y2][x2].status = 'locked';
            removeSequences();
        }
        else {
            if (flag == false) {
                swapElements(arr[y2][x2], arr[y2 + 1][x2])
                swapElements(arr[y1][x1], arr[y1 + 1][x1])

                reprintElement(y2, x2);
                reprintElement(y2 + 1, x2);
                reprintElement(y1, x1);
                reprintElement(y1 + 1, x1);
                y1++;
                y2++;
                downfall(ms);
            }
            else {
                document.removeEventListener("keydown", logKey);
                quickfall();
            }
        }
        //print();
    }, ms)
}
function quickfall() {
    setTimeout(function () {
        //console.log(isLegalToFell())
        if (isLegalToFell() == false) {
            arr[y1][x1].status = 'locked';
            arr[y2][x2].status = 'locked';
            document.addEventListener('keydown', logKey)
            flag = false;
            removeSequences();
        }
        else {
            swapElements(arr[y2][x2], arr[y2 + 1][x2])
            swapElements(arr[y1][x1], arr[y1 + 1][x1])

            reprintElement(y2, x2);
            reprintElement(y2 + 1, x2);
            reprintElement(y1, x1);
            reprintElement(y1 + 1, x1);

            y1++;
            y2++;
            quickfall()
        }
    }, 20)
}
function moveLeft() {
    if (x1 > 1 && ['none', 'current'].includes(arr[y1][x1 - 1].status) && ['none', 'current'].includes(arr[y2][x2 - 1].status)) {
        swapElements(arr[y1][x1 - 1], arr[y1][x1])
        swapElements(arr[y2][x2 - 1], arr[y2][x2])
        reprintElement(y1, x1 - 1);
        reprintElement(y1, x1);
        reprintElement(y2, x2 - 1);
        reprintElement(y2, x2);
        x1--;
        x2--;
    }
}
function moveRight() {
    if (x2 < 8 && ['none', 'current'].includes(arr[y1][x1 + 1].status) && ['none', 'current'].includes(arr[y2][x2 + 1].status)) {
        swapElements(arr[y2][x2 + 1], arr[y2][x2])
        swapElements(arr[y1][x1 + 1], arr[y1][x1])
        reprintElement(y2, x2 + 1);
        reprintElement(y2, x2);
        reprintElement(y1, x1 + 1);
        reprintElement(y1, x1);
        x1++;
        x2++;
    }
}
function logKey(e) {
    switch (`${e.code}`) {
        case 'ArrowLeft':
        case 'KeyA':
            if (moveflag == false) {
                moveflag = true;
                moveLeft();
                leftInterval = setInterval(function () {
                    moveLeft();
                }, 150)
            }
            break;
        case 'ArrowRight':
        case 'KeyD':
            if (moveflag == false) {
                moveflag = true;
                moveRight();
                leftInterval = setInterval(function () {
                    moveRight();
                }, 150)
            }
            //moveRight();
            break;
        case 'ArrowUp':
        case 'KeyW':
            if (x1 + 1 == x2 && y1 > 0 && arr[y1 - 1][x1].status == "none") {
                x2--;
                x1++;
                swapElements(arr[y1 - 1][x1 - 1], arr[y1][x1])
                reprintElement(y1 - 1, x1 - 1);
                reprintElement(y1, x1)
                reprintElement(y2, x2)
                x1--;
                y1--;
            }
            else if (x2 < 8 && y1 + 1 == y2 && arr[y2][x2 + 1].status == "none") {
                swapElements(arr[y2][x2 + 1], arr[y2][x2])
                swapElements(arr[y1 + 1][x1], arr[y1][x1])
                reprintElement(y2, x2 + 1)
                reprintElement(y2, x2)
                reprintElement(y1 + 1, x1)
                reprintElement(y1, x1)
                y1++;
                x2++;
            }
            else if (x2 == 8 && y1 + 1 == y2 && arr[y2][x2 - 1].status == "none") {
                appearElement(arr[y1 + 1][x1 - 1], arr[y1][x1].id, arr[y1][x1].status, arr[y1][x1].block)
                clearElement(arr[y1][x1])
                y1++;
                x1--;
                reprintElement(y1, x1)
                reprintElement(y2, x2)
                reprintElement(y1 - 1, x1 + 1)
            }
            break;
        case 'ShiftLeft':
        case 'ShiftRight':
            if (x1 + 1 == x2 && y1 > 0) {
                appearElement(arr[y1 - 1][x1], arr[y1][x1].id, arr[y1][x1].status, arr[y1][x1].block)
                appearElement(arr[y1][x1], arr[y2][x2].id, arr[y2][x2].status, arr[y2][x2].block)
                clearElement(arr[y2][x2]);
                y1--;
                x2--;
                reprintElement(y1, x1);
                reprintElement(y2, x2);
                reprintElement(y1, x1 + 1);
                reprintElement(y2, x2 + 1);
            }
            else if (x2 < 8 && y1 + 1 == y2 && arr[y2][x2 + 1].status == "none") {
                appearElement(arr[y1 + 1][x1 + 1], arr[y1][x1].id, arr[y1][x1].status, arr[y1][x1].block)
                clearElement(arr[y1][x1])
                y1++;
                x2++;
                reprintElement(y1, x1);
                reprintElement(y2, x2);
                reprintElement(y1 - 1, x1);
                reprintElement(y2 - 1, x2);
            }
            break;
        case 'ArrowDown':
        case 'KeyS':
            if (downflag == false) {
                downflag = true;
                flag = true;
                document.removeEventListener('keydown', logKey);
                quickfall();
                clearInterval(leftInterval);
                clearInterval(rightInterval);
                clearTimeout(fellinterval);
            }
            break;
        default:
        //console.log('Sorry, we are out of ' + `${e.code}` + '.');
    }
}
function logFlags(e) {
    switch (`${e.code}`) {
        case 'ArrowLeft':
        case 'ArrowRight':
        case 'KeyA':
        case 'KeyD':
            moveflag = false;
            clearInterval(leftInterval);
            clearInterval(rightInterval);
            break;
        case 'KeyS':
        case 'ArrowDown':
            downflag = false;
        default:
        //console.log('KeyUp ' + `${e.code}` + '.');
    }
}
function gameOver() {
    //console.log("Game over!")

}
function createElement() {
    x1 = 4;
    y1 = 4;
    x2 = 5;
    y2 = 4;

    arr[y1][x1].block = temparr[0];
    arr[y2][x2].block = temparr[1];

    switch (roll(3)) {
        case 0:
            temparr[0] = 'blue';
            break;
        case 1:
            temparr[0] = 'brown';
            break;
        case 2:
            temparr[0] = 'yellow';
            break;
    }
    switch (roll(3)) {
        case 0:
            temparr[1] = 'blue';
            break;
        case 1:
            temparr[1] = 'brown';
            break;
        case 2:
            temparr[1] = 'yellow';
            break;
    }
    print();

    clearTimeout(leftInterval);
    clearTimeout(rightInterval);

    if (arr[y1][x1].status != 'empty' || arr[y1][x1].status != 'empty') gameOver();

    idcount++;

    arr[y1][x1].status = 'current';
    arr[y2][x2].status = 'current';
    arr[y1][x1].id = idcount;
    arr[y2][x2].id = idcount;

    reprintElement(y1, x1)
    reprintElement(y2, x2)
    downfall(500);
}
function startGame() {
    switch (roll(3)) {
        case 0:
            temparr[0] = 'blue';
            break;
        case 1:
            temparr[0] = 'brown';
            break;
        case 2:
            temparr[0] = 'yellow';
            break;
    }
    switch (roll(3)) {
        case 0:
            temparr[1] = 'blue';
            break;
        case 1:
            temparr[1] = 'brown';
            break;
        case 2:
            temparr[1] = 'yellow';
            break;
    }
    document.removeEventListener('keydown', logKey);
    clearTimeout(fellinterval);

    create(arr);
    generateViruses(10);
    document.addEventListener('keydown', logKey);
    document.addEventListener('keyup', logFlags);
    createElement();
    print();
}

let flag = false;
let moveflag = false;
let idcount = 0;
let x1;
let y1;
let x2;
let y2;
let posVector = [];
let fellinterval;
let leftInterval;
let rightInterval;
let downflag = false;
let arr = [];
let temparr = [];
create(arr);
let start = document.getElementById("start");
start.addEventListener("click", startGame);

print();