// ==UserScript==
// @name         Felo AI Auto Search
// @version      1.0
// @description  Insert query click search button for Felo AI
// @author       Yuki Yano
// @match        https://felo.ai/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }

  function waitForTextarea(callback) {
    const checkExist = setInterval(() => {
      const textArea = document.querySelector("textarea");
      if (textArea) {
        clearInterval(checkExist);
        callback(textArea);
      }
    }, 100);
  }

  async function autoSearch(textArea) {
    const query = getQueryParam("query");
    if (!query) return;

    const searchButton = document.querySelector("button[type='submit']");
    if (!searchButton) return;

    textArea.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    textArea.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
    textArea.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    await sleep(100);

    textArea.value = query;
    textArea.dispatchEvent(new Event("input", { bubbles: true }));

    await sleep(100);

    textArea.focus();
    textArea.setSelectionRange(textArea.value.length, textArea.value.length); // **カーソルを末尾に移動**
    document.execCommand("insertText", false, " ");

    await sleep(100);

    searchButton.click();
  }

  waitForTextarea(autoSearch);
})();
