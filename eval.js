//ブラウザで選択されているテキストをそのまま貼りつけする
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
	//var execStr = localStorage.getItem("test") + "\n";
	//TODO require(..)を探し、ストレージから検索、文字列を取得して置換える
	var execStr = area.value;
	eval(execStr);
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

//srcAreaにある値をコピーする
function copy() {
    //var area = document.getElementById('area');
    document.getElementById('area').select();
    document.getElementById('area').focus();
    document.execCommand("Copy");

}

//srcAreaの値を保存する
function save() {

    var moduleName = document.getElementById('moduleName').value;
    var area = document.getElementById('area');
    log("moduleName=" + moduleName);
    log("area.value=" + area.value);
    try {
	localStorage.removeItem(moduleName);
	localStorage.setItem(moduleName, area.value);
    } catch (err) {
	log(err);
	throw err;
    }
}

//インポート
function require(moduleName) {
    if(moduleName === null || moduleName.length === 0) {
	throw Error("moduleName is invelid.");
    }

    var moduleStr = localStorage.getItem(moduleName);
    log(moduleStr);
    if(moduleStr === null || moduleStr.length === 0) {
	throw Error("module is not found.");
    }
    
    try {
	if(moduleStr);
    }catch(err) {
       for(var i in err){
	   log(i + ":" + err[i]);
       }
       log("error=" + err);
    }
    
}



//ログ出力用
function log(str) {
  var logArea = document.getElementById('logArea');
  var message = ">" + str + "\n";
  logArea.value += message;
}

//タブ変更
function tabChange(tabNo) {
    var i;
    var tabCount = 3;

    for (i = 1; i <= tabCount; i++) {
        document.getElementById("tabsel" + i).className = "tab_selector";
        document.getElementById("tab" + i).className = "noshow";
    }

    document.getElementById("tabsel" + tabNo).className="tab_selector selected";

    document.getElementById("tab" + tabNo).className="tab";
}
