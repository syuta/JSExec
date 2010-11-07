//ブラウザで選択されているテキストをそのまま貼りつけ
function pasteSelection() {
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.sendRequest(tab.id, {method: "getSelection"}, function (response) {
	  var area = document.getElementById('area');
	  area.value += "/*" + tab.url + "*/\n\n";
	  area.value += response.data;
    });
  });
}

//入力されたJavaScriptを実行する
function exec() {
    var area = document.getElementById('area');
    try {
       eval(area.value);
    }catch(err) {
       for(var i in err){
	   log(i + ":" + err[i]);
       }
       log("error=" + err);
    }
}

//結果領域をクリアする
function clearLog() {
    var logArea = document.getElementById('logArea');
    logArea.value = "";
}

//入力されたJavaScriptを実行する
function copy() {
    //var area = document.getElementById('area');
    document.getElementById('area').select();
    document.getElementById('area').focus();
    document.execCommand("Copy");

}

//ログ出力用
function log(str) {
  var logArea = document.getElementById('logArea');
  var message = ">" + str + "\n";
  logArea.value += message;
}

