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

let arr = getCsv('idiom.csv')
const words = document.getElementById('t-body');


console.log(arr)
for (let i = 0; i < arr.length; i++) {
    let word_tr = document.createElement("tr");
    let en_td = document.createElement("td");
    let ja_td = document.createElement("td");
    
    en_td.textContent = arr[i][0].trim()
    ja_td.textContent = arr[i][1].trim()
    word_tr.appendChild(en_td)
    word_tr.appendChild(ja_td)
    
    words.appendChild(word_tr)
}