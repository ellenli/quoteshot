// take clipboard (selection text)
// save last line as url, then cut it off...  show it somewhere..

// take remaining text and put it into ... this?: https://github.com/hemanth/make-quote

$(() => {
  const urlSearchParams = new URLSearchParams(window.location.search)
  const params = Object.fromEntries(urlSearchParams.entries())
  $('#url-input').val(params.url)
  $('#title-input').val(params.title)

  $('.authorToggle').change(function() {
     $('#author').toggle(!this.checked)
  }).change()

  $('.titleToggle').change(function() {
     $('#title').toggle(!this.checked)
  }).change()
})
