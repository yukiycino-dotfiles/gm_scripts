// ==UserScript==
// @name         Perplexity AI Auto Search
// @version      1.0
// @description  Insert query click search button for Perplexity AI
// @author       Yuki Yano
// @match        https://www.perplexity.ai/*
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
      const textArea = document.querySelector("textarea[autofocus]");
      if (textArea) {
        clearInterval(checkExist);
        callback(textArea);
      }
    }, 100);
  }

  async function autoSearch(textArea) {
    const query = getQueryParam("query");
    if (!query) return;

    const searchButton = document.querySelector("button[aria-label='Submit']");
    if (!searchButton) return;

    textArea.setSelectionRange(textArea.value.length, textArea.value.length);
    document.execCommand("insertText", false, query);

    await sleep(100);

    searchButton.click();
  }

  waitForTextarea(autoSearch);
})();
