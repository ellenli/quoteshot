// take clipboard (selection text)
// save last line as url, then cut it off...  show it somewhere..

// take remaining text and put it into ... this?: https://github.com/hemanth/make-quote

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
