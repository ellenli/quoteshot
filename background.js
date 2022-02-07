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
    const code = `
        (() => {
            const authorElem = document.querySelector('meta[name=author]')
            const author = (authorElem && authorElem.getAttribute('content')) || ''
            const selection = window.getSelection().toString()
            return [author, selection]
        })()
    `

    chrome.tabs.executeScript(tab.id, { code }, result => {
        const [ author, selection ] = result[0]
        const newTabReq = chrome.tabs.create({
            url: 'http://localhost:8000/quoteshot.html?' + urlencode({
                url: tab.url,
                title: tab.title,
                author: author,
                quote: selection,
            })
        })
    })
}
