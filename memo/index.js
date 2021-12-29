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
let pageArr = []

let n = arr.length / 100

let page_menu = document.getElementById("page_menu")


let start = 0;
let end = 100;
for (let i = 0; i < n; i++) {
  pageArr.push(arr.slice(start,end))
  start += 100
  end += 100
  
  let pb = document.createElement("button");
  pb.textContent = i + 1
  
  pb.onclick = function() {
    while(words.lastChild){
      words.removeChild(words.lastChild);
    }
    render(this.textContent - 1)
  }
  
  page_menu.appendChild(pb)
}

let page = 0;


let render = (page) => {
  
  for (let i = 0; i < pageArr[page].length; i++) {
    
    let word_tr = document.createElement("tr");
    let en_td = document.createElement("td");
    let ja_td = document.createElement("td");
    
    en_td.textContent = pageArr[page][i][0]
    ja_td.textContent = pageArr[page][i][1]
    
    word_tr.appendChild(en_td)
    word_tr.appendChild(ja_td)
    words.appendChild(word_tr)
  }
  
}

render(page)