// Generates a context menu
// Select text, right click, and ... take a quoteshot???


function urlencode(obj) {
  return Object.entries(obj).map(kv => {
    return encodeURIComponent(kv[0]) + '=' + encodeURIComponent(kv[1])
  }).join('&')
}

// support Firefox and Chrome
if (!browser) {
  var browser = chrome;
}

browser.contextMenus.create({
  id: "quoteshot-take",
  title: "Take Quoteshot",
  contexts: ["selection"],
})

browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId != "quoteshot-take")
    return
  // check in which context the command was clicked
  const code = `
    (() => {
      const authorElem = document.querySelector('meta[name=author]')
      const author = (authorElem && authorElem.getAttribute('content')) || ''
      const selection = window.getSelection().toString()
      return [author, selection]
    })()
  `

  browser.tabs.executeScript(tab.id, { code }, result => {
    const [ author, selection ] = result[0]
    const newTabReq = browser.tabs.create({
      url: 'http://localhost:8000/quoteshot.html?' + urlencode({
        url: tab.url,
        title: tab.title,
        author: author,
        quote: selection,
      })
    })
  })
});
