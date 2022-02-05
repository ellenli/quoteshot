// take clipboard (selection text)
// save last line as url, then cut it off...  show it somewhere..

// take remaining text and put it into ... this?: https://github.com/hemanth/make-quote

$(() => {
  const urlSearchParams = new URLSearchParams(window.location.search)
  const params = Object.fromEntries(urlSearchParams.entries())
  ;['url', 'title', 'quote', 'author'].forEach(x => {

    $('#input-' + x).val(params[x] || '')

    $('[data-text=' + x + ']').text(params[x] || '')
    $('#input-' + x).change(function() {
      $('[data-text=' + x + ']').text(this.value)
    }).change()

    $('#toggle-' + x).change(function() {
       $('#' + x).toggle(this.checked)
    }).change()
  })
})
