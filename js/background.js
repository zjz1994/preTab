"use strict"
var allTabs = {};
var closedTabs = [];
chrome.tabs.onCreated.addListener(function(tab) {
    if (tab.id) {
        allTabs[tab.id] = {
            title: tab.title,
            url: tab.url,
            history: []
        };
    }
});
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.favIconUrl) {
        allTabs[tabId]['icon'] = changeInfo.favIconUrl;
    }
    if (changeInfo.status == "loading") {
        if (allTabs[tabId]) {
            allTabs[tabId]['history'].push({
                title: allTabs[tabId]['title'],
                url: allTabs[tabId]['url']
            });
            allTabs[tabId]['title'] = tab.title;
            allTabs[tabId]['url'] = tab.url;
        }
    }
    if (changeInfo.title) {
        allTabs[tabId]['title'] = tab.title;
    }
});
chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
    if (allTabs[tabId].url != 'chrome://newtab/') {
        closedTabs.push(allTabs[tabId]);
    }
});