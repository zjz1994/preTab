var BackgroundPage = chrome.extension.getBackgroundPage();
var closedTabs = BackgroundPage.closedTabs;
var list = document.getElementById("Tabs");
var c;
for (var i = closedTabs.length; i > 0; i--) {
    if (closedTabs[i]) {
        var tmp_li = document.createElement("li");
        var tmp_a = document.createElement("a");
        var tmp_title = document.createTextNode(closedTabs[i].title);
        tmp_a.appendChild(tmp_title);
        tmp_a.href = closedTabs[i].url;
        tmp_a.title = closedTabs[i].title;
        tmp_a.target = '_blank';
        tmp_a.onclick = function(e) {
            delid = e.target.dataset['id'];
            BackgroundPage.closedTabs.splice(delid, 1)
        };
        tmp_a.dataset['id'] = i;
        tmp_li.appendChild(tmp_a);
        list.appendChild(tmp_li);
    }
}