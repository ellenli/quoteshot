// take clipboard (selection text)
// save last line as url, then cut it off...  show it somewhere..

// take remaining text and put it into ... this?: https://github.com/hemanth/make-quote

$(function () {
  $('.authorToggle').change(function () {
     $('#author').toggle(!this.checked);
  }).change(); //ensure visible state matches initially
});

$(function () {
  $('.titleToggle').change(function () {
     $('#title').toggle(!this.checked);
  }).change(); //ensure visible state matches initially
});
