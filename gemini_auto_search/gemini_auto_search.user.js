// ==UserScript==
// @name         Gemini Auto Search with Model Selection
// @version      1.0
// @description  Gemini で自動検索を行うスクリプトです。
// @author       Yuki Yano
// @match        https://gemini.google.com/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const TARGET_MODEL = "2.0 Experimental Advanced";

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }

  function waitForTextarea(callback) {
    const checkExist = setInterval(() => {
      const textArea = document.querySelector("div.ql-editor.textarea");
      if (textArea) {
        clearInterval(checkExist);
        callback(textArea);
      }
    }, 100);
  }

  async function openModelMenu() {
    const modelSwitcherButton = document.querySelector(
      "button[data-test-id='bard-mode-menu-button']",
    );
    if (!modelSwitcherButton) {
      return;
    }

    await sleep(200);
    const clickEvent = new MouseEvent("click", { bubbles: true });
    modelSwitcherButton.dispatchEvent(clickEvent);

    await sleep(150);
  }

  async function selectModel() {
    await openModelMenu();

    const targets = document.querySelectorAll("span.gds-label-l");

    for (let i = 0; i < targets.length; i++) {
      if (targets[i].textContent.includes(TARGET_MODEL)) {
        targets[i].click();
        break;
      }
    }
  }

  async function autoSearch(textArea) {
    const query = getQueryParam("query");

    await sleep(200);
    textArea.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    textArea.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
    textArea.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    if (query || query === "") {
      await sleep(100);
      textArea.focus();
      document.execCommand("insertText", false, query);

      await sleep(100);
      textArea.dispatchEvent(new Event("input", { bubbles: true }));
      textArea.dispatchEvent(new Event("change", { bubbles: true }));
    }

    await sleep(200);
    await selectModel();

    if (query || query === "") {
      const sendButton = document.querySelector(
        "button[aria-label='メッセージを送信']",
      );
      if (!sendButton) {
        return;
      }

      await sleep(500);
      sendButton.click();
    }
  }

  waitForTextarea(autoSearch);
})();
