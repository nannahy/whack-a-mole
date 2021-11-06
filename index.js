const buttons = document.querySelectorAll(".button button");
const boxes = document.querySelectorAll('.parent>div');
const score_board = document.querySelector('#score_board');
const flags = Array(9);
//내가 누른 키가 올바른 값인지 확인하기 위한 map
const correct = new Map([
    ['7', 0], ['8', 1], ['9', 2],
    ['4', 3], ['5', 4], ['6', 5],
    ['1', 6], ['2', 7], ['3', 8],
])

let score = 0;
let miss = 0;

console.log(boxes);
console.log(score_board)

flags.fill(0);  // flags를 0으로 다 채우기

function draw() {
    for (let i = 0; i < 9; i++) {
        if (flags[i] === 1) {
            boxes[i].style.backgroundColor="gold";
        } else {
            boxes[i].style.backgroundColor="white";
        }
    }
    let total = (score*2)-miss;
    score_board.innerText = `${total}`;
}

// start 클릭
buttons.forEach(function(button) {
    button.onclick = function() {
        const status = button.innerText
        console.log(status)
        if (status == "START") {
            //일정 시간 후에 함수 실행
            // setTimeout(function() {
            //     const rand1 = Math.floor(Math.random() * 9);
            //     flags[rand1] = 1;
            //     draw();
            // }, 1500)

            play = setInterval(function() {
                for (let i = 0; i < 9; i++) {
                    if (flags[i] === 1) miss++;
                    flags[i] = 0;
                }
                const rand1 = Math.floor(Math.random() * 9);
                flags[rand1] = 1;
                const rand2 = Math.floor(Math.random() * 9);
                flags[rand2] = 1;
                draw();
            }, 750)

            window.addEventListener("keydown", function(e) {
                const keytype = e.key;
                const idx = correct.get(keytype);
                
                if (idx === undefined) return;
                if (flags[idx] === 1) {
                    score += 1;
                    flags[idx] = 0;
                    draw();
                }
            });

            boxes.forEach(function(item) {
                item.onclick = function() {
                    const clicktype = item.innerText
                    const idx = correct.get(clicktype)
                    if (idx === undefined) return;
                    if (flags[idx] === 1) {
                    score += 1;
                    flags[idx] = 0;
                    draw();
                    }
                }
            });

        } else if (status == "PAUSE") {
            clearInterval(play);
            for (let i = 0; i < 9; i++) {
                flags[i] = 0;
            }
            draw();
        } else {
            clearInterval(play);
            for (let i = 0; i < 9; i++) {
                flags[i] = 0;
            }
            score = 0;
            miss = 0;
            draw();
        }
        }
    });

