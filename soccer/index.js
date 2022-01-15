const main = document.getElementById('main');
const words = document.getElementById('t-body');
const btn2 = document.getElementById('btn-2');

function csv_data(dataPath) {
    
    const request = new XMLHttpRequest(); // HTTPでファイルを読み込む
    request.open('GET', dataPath, true); // csvのパスを指定
    request.send();
    request.addEventListener('load', (event) => { // ロードさせ実行
        const response = event.target.responseText; // 受け取ったテキストを返す
        let word_list = csv_array(response) //csv_arrayの関数を実行
        
        
        for (let i = 0; i < word_list.length; i++) {
            let word_tr = document.createElement("tr");
            let en_td = document.createElement("td");
            let ja_td = document.createElement("td");
            
            console.log(i)
            en_td.textContent = word_list[i][0].trim()
            ja_td.textContent = word_list[i][1]
            word_tr.appendChild(en_td)
            word_tr.appendChild(ja_td)
            
            words.appendChild(word_tr)
        }
    });
}

function csv_array(data) {
    const dataArray = []; //配列を用意
    const dataString = data.split('\n'); //改行で分割
    for (let i = 0; i < dataString.length; i++) { //あるだけループ
        dataArray[i] = dataString[i].split(',');
    }
    return dataArray
}


csv_data('../book.csv');



const start_quiz = document.getElementById("quiz-start")
const word_table = document.getElementById("word-table")
let quiz_words = []

start_quiz.addEventListener("click", () => {
    let q_words = []
    for (let row of words.rows) {
        let temp_arr = []
        for (let ch of row.children) {
            temp_arr.push(ch.textContent)
        }
        q_words.push(temp_arr)
    }
    
    word_table.style.display ="none";
    start_quiz.style.display ="none";
    btn2.style.display ="inline";
    quiz_words = q_words
})


// array[Math.floor(Math.random() * array.length)];
const quiz_main = document.getElementById("quiz-main")


btn2.addEventListener("click", () => {
    
    while(quiz_main.lastChild){
        quiz_main.removeChild(quiz_main.lastChild);
    }
    
    let ans = document.createElement("p");
    let ind = []
    let quarr = []
    while (ind.length < 4) {
        let num = Math.floor(Math.random() * quiz_words.length)
        if (!ind.includes(num)) {
            ind.push(num)
        }
    }
    for (let i = 0; i < 4; i++) {
        quarr.push(quiz_words[ind[i]])
        if (i == 0) {
            quarr[i].push(true)
        } else {
            quarr[i].push(false)
        }
    }
    
    let statement = document.createElement("p");
    statement.textContent = quarr[0][0]
    quiz_main.appendChild(statement)
    
    quarr = shuffle(quarr)
    
    for (let i = 0; i < 4; i++) {
        let choice = document.createElement("button");
        choice.textContent = quarr[i][1]
        // choice.onclick = checkAns(quarr, i);
        choice.onclick = function() {
            if (quarr[i][2]) {
                ans.textContent = "正解です"
            } else {
                ans.textContent = "間違いです"
            }
            quiz_main.appendChild(ans)
        }
        quiz_main.appendChild(choice)
    }
    
    btn2.textContent = "次へ"
})

// シャッフル
const shuffle = ([...array]) => {
    for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// 正誤判定
const checkAns = (arr, ind) => {
    
    let ans = document.createElement("p");
    if (arr[ind][2]) {
        ans.textContent = "正解です"
    } else {
        ans.textContent = "間違いです"
    }
    quiz_main.appendChild(ans)
}