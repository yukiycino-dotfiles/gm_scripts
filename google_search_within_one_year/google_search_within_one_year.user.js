// ==UserScript==
// @name          Google search within 1 year
// @namespace     Google search within 1 year
// @include       /^https://www.google.com/search?.*/
// @author        Yuki Yano

// ==/UserScript==
(function () {
  "use strict";

  const elem = document.getElementById("result-stats");
  let link = document.createElement("span");

  link.style = "margin-right: 1rem;";
  link.innerHTML = "<a>1年&日本語</a>";
  link.onclick = () => {
    window.location.href = `${window.location.href}&tbs=qdr:y&lr=lang_ja`;
  };
  elem.prepend(link);

  link = document.createElement("span");
  link.style = "margin-right: 1rem;";
  link.innerHTML = "<a>日本語</a>";
  link.onclick = () => {
    window.location.href = `${window.location.href}&lr=lang_ja`;
  };
  elem.prepend(link);

  link = document.createElement("span");
  link.style = "margin-right: 1rem;";
  link.innerHTML = "<a>1年</a>";
  link.onclick = () => {
    window.location.href = `${window.location.href}&tbs=qdr:y`;
  };
  elem.prepend(link);
})();
