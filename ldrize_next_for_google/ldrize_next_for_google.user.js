// ==UserScript==
// @name         LDRize Next for Google
// @namespace    https://github.com/yuki-ycino
// @version      0.1
// @author       Yuki Yano
// @include       /^https://www.google.com/search?.*/
// @grant        GM_openInTab
// ==/UserScript==

const SELECTED_STYLE = "background: #EEEEEE;";
const PINNED_STYLE = "border-left: #E4645C 4px solid; padding-left: 4px;";

const initialize = (cursor, target, searchResult, pinList) => {
  let link;

  document.addEventListener("keydown", (event) => {
    event.preventDefault();

    if (event.code === "KeyJ") {
      if (searchResult[cursor + 1] != null) {
        target.style = "";
        cursor += 1;
        target = searchResult[cursor];
        if (pinList.includes(target)) {
          target.style = `${PINNED_STYLE} ${SELECTED_STYLE}`;
        } else {
          target.style = SELECTED_STYLE;
        }
        link = getLinkFromElement(target);
      } else {
        searchResult = Array.from(document.querySelectorAll("div.g")).filter(
          (item) => item.getAttribute("class") === "g"
        );
      }
      target.scrollIntoView(true);
      scrollBy(0, -400);
    }
    if (event.code === "KeyK" && cursor >= 0) {
      if (searchResult[cursor - 1] != null) {
        target.style = "";
        cursor -= 1;
        target = searchResult[cursor];
        if (pinList.includes(target)) {
          target.style = `${PINNED_STYLE} ${SELECTED_STYLE}`;
        } else {
          target.style = SELECTED_STYLE;
        }
        link = getLinkFromElement(target);
      } else {
        searchResult = Array.from(document.querySelectorAll("div.g")).filter(
          (item) => item.getAttribute("class") === "g"
        );
      }
      target.scrollIntoView(true);
      scrollBy(0, -400);
    }
    pinList.forEach((_target) => {
      if (pinList.includes(_target) && target === _target) {
        _target.style = `${PINNED_STYLE} ${SELECTED_STYLE}`;
      } else if (pinList.includes(_target)) {
        _target.style = PINNED_STYLE;
      } else if (target === _target) {
        _target.style = SELECTED_STYLE;
      }
    });

    if (event.code === "KeyV") {
      if (target == null) {
        target = searchResult[0];
      }
      document.location.href = getLinkFromElement(target).getAttribute("href");
    }

    if (event.code === "KeyO") {
      if (target == null) {
        target = searchResult[0];
      }
      if (pinList.length === 0) {
        window.open(getLinkFromElement(target).getAttribute("href"));
      } else {
        pinList.forEach((target) => {
          window.open(getLinkFromElement(target).getAttribute("href"));
        });
      }
      pinList.forEach((_target) => {
        if (pinList.includes(_target)) {
          _target.style = "";
        } else if (target === _target) {
          _target.style = SELECTED_STYLE;
        }
      });
      pinList = [];
    }

    if (event.code === "KeyP") {
      target = searchResult[cursor];
      target.style = PINNED_STYLE;
      if (searchResult[cursor + 1] != null) {
        target.style = "";
        if (
          !pinList
            .map((_target) => getLinkFromElement(_target).getAttribute("href"))
            .includes(getLinkFromElement(target).getAttribute("href"))
        ) {
          pinList = [...pinList, target];
        } else {
          pinList = pinList.filter(
            (_target) =>
              getLinkFromElement(_target).getAttribute("href") !==
              getLinkFromElement(target).getAttribute("href")
          );
        }
        cursor += 1;
        target = searchResult[cursor];
        if (pinList.includes(getLinkFromElement(target))) {
          target.style = `${PINNED_STYLE} ${SELECTED_STYLE}`;
        } else {
          target.style = SELECTED_STYLE;
        }
        target.scrollIntoView(true);
        scrollBy(0, -400);
      }
      pinList.forEach((_target) => {
        if (pinList.includes(_target) && target === _target) {
          _target.style = `${PINNED_STYLE} ${SELECTED_STYLE}`;
        } else if (pinList.includes(_target)) {
          _target.style = `${PINNED_STYLE}`;
        } else if (target === _target) {
          _target.style = SELECTED_STYLE;
        }
      });
    }
  });
};

const openUrl = (url, method) => {
  if (method === "view") {
    document.location.href = url;
  }
  if (method === "tab") {
    GM_openInTab(url, { active: false });
  }
};

const getLinkFromElement = (element) => {
  return element
    .querySelector("div")
    .firstElementChild.getElementsByTagName("a")[0];
};

(function () {
  "use strict";
  let cursor = 0;
  let target = null;
  let searchResult = [];
  let pinList = [];

  const timer = setInterval(() => {
    if (Array.from(document.querySelectorAll("div.g")).length > 0) {
      searchResult = Array.from(document.querySelectorAll("div.g")).filter(
        (item) => item.getAttribute("class") === "g"
      );
      target = searchResult[cursor] != null ? searchResult[cursor] : null;
      target.style = SELECTED_STYLE;

      initialize(cursor, target, searchResult, pinList);
      clearInterval(timer);
    }
  }, 100);
})();
