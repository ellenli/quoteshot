// controlling/editing the quoteshot content
$(() => {
  const urlSearchParams = new URLSearchParams(window.location.search)
  const params = Object.fromEntries(urlSearchParams.entries())
  ;['url', 'title', 'quote', 'author'].forEach(x => {

    const unknownVal = 'Unknown ' + x
    const initialval = params[x] || unknownVal
    $('#input-' + x).val(initialval)

    if (initialval == unknownVal)
      $('#toggle-' + x).prop('checked', false)

    $('[data-text=' + x + ']').text(params[x] || '')
    $('#input-' + x).on('input', function() {
      $('[data-text=' + x + ']').text(this.value)
      if (this.value != unknownVal)
        $('#toggle-' + x).prop('checked', true).change()
    }).trigger("input")

    $('#toggle-' + x).change(function() {
      $('#' + x).toggle(this.checked)
    }).change()
  })
})

// save quoteshot locally
function capture() {
  const captureElement = document.querySelector('.quoteshot-container')
  html2canvas(captureElement)
    .then(canvas => {
      canvas.style.display = 'none'
      document.body.appendChild(canvas)
      return canvas
    })
    .then(canvas => {
      const image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
      const a = document.createElement('a')
      const filename = 'quoteshot-' + Date.now() + '.png'
      a.setAttribute('download', filename)
      a.setAttribute('href', image)
      a.click()
      window.alert(filename + " downloaded.")
      canvas.remove()
    })
}
const download = document.querySelector('#downloadButton')
download.addEventListener('click', capture)


// copy quoteshot image to clipboard
function copyToClipboard() {
  var domNode = document.getElementById('capture');
  domNode.classList.add("on");

  // reference: https://codepen.io/karannagupta/pen/RXpddB
  const captureElement = document.getElementById('capture');
  html2canvas(captureElement).then(function(canvas) (
    canvas.toBlob(function(blob) {
        navigator.clipboard
          .write([
          new ClipboardItem(
            Object.defineProperty({}, blob.type, {
              value: blob,
              enumerable: true
            })
          )
        ])
          .then(function() {
            window.alert("Quoteshot image copied to clipboard.");
            domNode.classList.remove("on");
        });
      })
    );
  window.alert("Quoteshot image copied to clipboard.");
  domNode.classList.remove("on");
}
const copy = document.querySelector('#copyButton');
copy.addEventListener('click', copyToClipboard);
