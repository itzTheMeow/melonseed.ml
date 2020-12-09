window._ = function (id) {
  return document.getElementById(id);
};
setInterval(function () {
  _("content-loader").style.top = _("navbar").offsetHeight;
  _("content-loader").style.height = _("content").scrollHeight;
});
