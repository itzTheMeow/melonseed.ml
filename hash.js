if (!window.location.hash.includes("/")) window.location.hash = "/";

window.HashJS = {};

window.onload = function () {
  let currentHash = "";

  setInterval(function () {
    if (currentHash == window.location.hash) return;
    currentHash = window.location.hash;

    let hashPage =
      (currentHash.substring(1) == "/" ? "/index" : currentHash.substring(1)) +
      ".html";

    HashJS.hash = currentHash;
    HashJS.page = hashPage;

    function includeHTML(path) {
      _("content-loader-box").style.display = "inline";
      _("content").style["pointer-events"] = "none";
      let xhttp;
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            document.getElementById("content").innerHTML = this.responseText;
            var scripts = document
              .getElementById("content")
              .querySelectorAll("script");
            scripts.forEach((script) => {
              (0, eval)(script.textContent);
            });
          } else if (this.status == 404) {
            includeHTML("src/404.html");
          }
          _("content-loader-box").style.display = "none";
          _("content").style["pointer-events"] = "all";
        }
      };
      xhttp.open("GET", path, true);
      xhttp.send();

      console.log(`Fetching page "${path}".`);
      return xhttp;
    }

    HashJS.request = includeHTML("src" + hashPage);

    HashJS.includeHTML = includeHTML;
    HashJS.refresh = function () {
      includeHTML("src" + hashPage);
    };
  }, 50);
};
