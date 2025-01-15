// ==UserScript==
// @name         Claude AI Auto Input
// @version      1.4
// @description  Claude AI Auto Input and Search
// @author       Yuki Yano
// @match        https://claude.ai/*
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

  function waitForInputField(callback) {
    const checkExist = setInterval(() => {
      const editableDiv = document.querySelector("div[contenteditable='true']");
      if (editableDiv) {
        clearInterval(checkExist);
        callback(editableDiv);
      }
    }, 100);
  }

  function insertTextAtCursor(editableDiv, text) {
    const selection = window.getSelection();
    const range = document.createRange();

    editableDiv.innerHTML = "";

    const textNode = document.createTextNode(text);
    editableDiv.appendChild(textNode);

    range.selectNodeContents(editableDiv);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  async function autoInput(editableDiv) {
    const query = getQueryParam("query");
    if (!query) return;

    editableDiv.focus();

    await sleep(100);

    insertTextAtCursor(editableDiv, query);
    editableDiv.dispatchEvent(new Event("input", { bubbles: true }));

    await sleep(100);

    const searchButton = document.querySelector(
      "button[aria-label='Send Message']",
    );
    searchButton.click();
  }

  waitForInputField(autoInput);
})();
