function getCsv(url){
    //CSVファイルを文字列で取得。
    var txt = new XMLHttpRequest();
    txt.open('get', url, false);
    txt.send();
    
    //改行ごとに配列化
    var arr = txt.responseText.split('\n');
  
    //1次元配列を2次元配列に変換
    var res = [];
    for(var i = 0; i < arr.length; i++){
      //","ごとに配列化
      res[i] = arr[i].split(',');
    }
  
    return res;
}

let arr = getCsv('gramQuiz.csv')
let ans_num = 0
// console.log(arr)

// let num = Math.floor(Math.random() * quiz_words.length)

const rem_but = document.getElementById("rem-start")
const quiz_but = document.getElementById("quiz-start")
const ans = document.getElementById("answer")
const open_ans = document.getElementById("open-ans")
const ques = document.getElementById("question")

rem_but.addEventListener("click", () => {
  
  quiz_but.style.display ="none";
  rem_but.textContent = "次へ"
  let num = Math.floor(Math.random() * arr.length)
  ques.textContent = arr[num][0]
  ans.textContent = arr[num][1]
  
})

quiz_but.addEventListener("click", () => {
  
  rem_but.style.display ="none";
  open_ans.style.display ="inline";
  ans.textContent = ""
  quiz_but.textContent = "次へ"
  let num = Math.floor(Math.random() * arr.length)
  ques.textContent = arr[num][0]
  ans_num = num
  
})

open_ans.addEventListener("click", () => {
  ans.textContent = arr[ans_num][1]
  open_ans.style.display ="none";
})