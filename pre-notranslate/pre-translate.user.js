// ==UserScript==
// @name         Pre notranslate
// @namespace    https://github.com/yukiycino-dotfiles/gm_scripts
// @version      0.1
// @author       Yuki Yano
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
  for (const element of Array.from(document.getElementsByTagName("pre"))) {
    element.classList.add("notranslate");
  }
})();
