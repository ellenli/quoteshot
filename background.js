// Generates a context menu
// Select text, right click, and ... take a quoteshot???

const REQUEST_SELECTION = 'copy-selection-url-to-clipboard';

// support Firefox and Chrome
if (!browser) {
  var browser = chrome;
}

browser.contextMenus.create({
    id: REQUEST_SELECTION,
    title: "Take Quoteshot", // future: Take Quoteshot of “selected text goes here”
    contexts: ["selection"],
    onclick: handleQuoteshotRequest
});

function handleQuoteshotRequest(info, tab) {
    // check in which context the command was clicked

    var newURL = 'quoteshot.html';
    chrome.tabs.create({ url: newURL });


    const useSelection = info.menuItemId === REQUEST_SELECTION;
    chrome.tabs.sendMessage(tab.id,
        {tabUrl: tab.url,
         tabTitle: tab.title,
         useSelection: useSelection
    });
}
