  //右クリック実行時のコールバック
  function copySelectionString(str) {
    var message = str.pageUrl + "\n" + str.selectionText;
    alert(message);
  }

  //テキスト選択して右クリックメニュー
  var selection = chrome.contextMenus.create(
{"title": "Clip JSExec", "contexts":["selection"],"onclick":copySelectionString});
