// ==UserScript==
// @name         ChatGPT Auto Search with Model Selection
// @version      1.0
// @description  ChatGPT で自動検索を行うスクリプトです。
// @author       Yuki Yano
// @match        https://chatgpt.com/*
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

  async function openModelMenu() {
    const modelSwitcherButton = document.querySelector(
      "button[data-testid='model-switcher-dropdown-button']",
    );
    if (!modelSwitcherButton) {
      return;
    }

    await sleep(100);
    modelSwitcherButton.dispatchEvent(
      new PointerEvent("pointerdown", { bubbles: true }),
    );
    await sleep(150);
    modelSwitcherButton.dispatchEvent(
      new PointerEvent("pointerup", { bubbles: true }),
    );

    await sleep(150);
  }

  async function selectModel(targetModel) {
    if (!targetModel) return;

    await openModelMenu();

    const menu = document.querySelector("div[role='menu']");
    if (!menu) {
      return;
    }

    let modelOptions = Array.from(
      menu.querySelectorAll("div[role='menuitem']"),
    );

    modelOptions = modelOptions
      .map((option) => {
        const clonedOption = option.cloneNode(true);
        clonedOption
          .querySelectorAll(".text-token-text-secondary")
          .forEach((el) => el.remove());
        return { element: option, text: clonedOption.innerText.trim() };
      })
      .sort((a, b) => a.text.length - b.text.length); // 短い順にソート

    for (const { element, text } of modelOptions) {
      if (text.toLowerCase().includes(targetModel.toLowerCase())) {
        element.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
        element.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
        await sleep(150);
        element.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        await sleep(150);
        return;
      }
    }
  }

  async function autoSearch(textArea) {
    const query = getQueryParam("query");
    const targetModel = getQueryParam("targetModel");

    await sleep(200);

    textArea.focus();
    textArea.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    textArea.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
    textArea.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    if (query || query === "") {
      await sleep(100);
      textArea.focus();
      textArea.setSelectionRange(textArea.value.length, textArea.value.length);
      document.execCommand("insertText", false, query);

      await sleep(100);
      textArea.dispatchEvent(new Event("input", { bubbles: true }));
      textArea.dispatchEvent(new Event("change", { bubbles: true }));
    }

    if (targetModel) {
      await sleep(200);
      await selectModel(targetModel);
    }

    if (query || query === "") {
      const sendButton = document.querySelector(
        "button[data-testid='send-button']",
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
