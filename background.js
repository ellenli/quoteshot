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

function urlencode(obj) {
    return Object.entries(obj).map(kv => {
        return encodeURIComponent(kv[0]) + '=' + encodeURIComponent(kv[1])
    }).join('&')
}

function handleQuoteshotRequest(info, tab) {
    // check in which context the command was clicked

    chrome.tabs.executeScript(tab.id, {
        code: "window.getSelection().toString()"
    }, result => {
        const newTabReq = chrome.tabs.create({
            url: 'http://localhost:8000/quoteshot.html?' + urlencode({
                url: tab.url,
                title: tab.title,
                quote: result[0],
            })
        })
    })
}
