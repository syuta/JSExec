//ブラウザで選択されているテキストをそのまま貼りつけ
function pasteSelection() {
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.sendRequest(tab.id, {method: "getSelection"}, function (response) {
	  var area = document.getElementById('area'); 
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
       log("error=" + e);
    }
}

//ログ出力用
function log(str) {
  var logArea = document.getElementById('logArea');
  var message = ">" + str + "\n";
  logArea.value += message;

}

