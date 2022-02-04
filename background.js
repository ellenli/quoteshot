// Generates a context menu
// Select text, right click, and take a quoteshot

const REQUEST_SELECTION = 'copy-selection-url-to-clipboard';

// support Firefox and Chrome
if (!browser) {
  var browser = chrome;
}

browser.contextMenus.create({
    id: REQUEST_SELECTION,
    title: "Take Quoteshot of “selected text goes here eventually and will be truncated”",
    contexts: ["selection"],
    onclick: handleCopyRequest
});

function handleCopyRequest(info, tab) {
    // check in which context the command was clicked
    const useSelection = info.menuItemId === REQUEST_SELECTION;
    chrome.tabs.sendMessage(tab.id,
        {tabUrl: tab.url,
         tabTitle: tab.title,
         useSelection: useSelection
    });
}
