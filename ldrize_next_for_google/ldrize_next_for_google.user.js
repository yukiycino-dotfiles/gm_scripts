// ==UserScript==
// @name         LDRize Next for Google
// @namespace    https://github.com/yuki-ycino
// @version      0.4
// @author       Yuki Yano, takker
// @include       /^https://www.google.com/search?.*/
// ==/UserScript==
"use strict";

class Manager {
  constructor() {
    this.cursor = 0;
    this.searchResult = [];
    this.started = false;
  }

  start() {
    if (this.started) return;
    // div.gが読み込まれたら初期化を開始する
    const timer = setInterval(() => {
      if (document.querySelectorAll("div.g").length === 0) return;
      this.updateItems();
      this.present.select();
      document.addEventListener("keydown", (event) => {
        // Nothing is done when the search form is focused.
        const searchForm = document.querySelector("input[class]");
        if (document.activeElement === searchForm) {
          if (event.key === "Escape" || (event.key === "[" && event.ctrlKey)) {
            event.preventDefault();
            event.stopPropagation();
            searchForm.blur();
            return false;
          }
          return true;
        }
        switch (event.key) {
          case "i":
            event.preventDefault();
            event.stopPropagation();
            searchForm.focus();
            break;
          case "j":
            this.selectNext();
            break;
          case "k":
            this.selectPrev();
            break;
          case "o":
            this.open({ newTab: true });
            break;
          case "v":
            this.open();
            break;
          case "p":
            this.togglePin();
            break;
        }
        return false;
      });
      clearInterval(timer);
    }, 100);
    this.started = true;
  }

  get present() {
    return this.searchResult[this.cursor];
  }
  get next() {
    return this.searchResult[this.cursor + 1];
  }
  get prev() {
    return this.searchResult[this.cursor - 1];
  }

  selectNext() {
    if (this.next) {
      this.present.deselect();
      this.cursor++;
      this.present.select();
    } else {
      // Reload search cards when the last card is already selected.
      // This function is for something like AutoPagerize.
      this.updateItems();
    }
    this.present.scrollIntoView(true);
    window.scrollBy(0, -(window.innerHeight * 0.12));
  }
  selectPrev() {
    // Go backword only when the previous card exists.
    if (this.prev) {
      this.present.deselect();
      this.cursor--;
      this.present.select();
    }
    this.present.scrollIntoView(true);
    window.scrollBy(0, -(window.innerHeight * 0.12));
  }

  open({ newTab = false } = {}) {
    if (!newTab) {
      document.location.href = this.present.link;
      return;
    }
    const pinCards = this.getPinCards();
    if (pinCards.length === 0) {
      window.open(this.present.link);
    } else {
      pinCards.forEach((item) => {
        window.open(item.link);
        item.unpin();
      });
    }
  }

  togglePin() {
    this.present.togglePin();
    // Go forward after pinning the present card
    this.selectNext();
  }
  updateItems() {
    this.searchResult = [...document.querySelectorAll("div.g")]
      .filter((item) => item.classList.contains("g"))
      .map((item) => new linkCard(item));
  }
  getPinCards() {
    return this.searchResult.filter((item) => item.pinned);
  }
}
class linkCard {
  constructor(card) {
    if (card?.match?.("div.g")) throw Error("An invalid element");
    this._card = card;
    this._selected = false;
    this._pinned = false;
  }

  get pinned() {
    return this._pinned;
  }
  get selected() {
    return this._selected;
  }

  get link() {
    return this._card
      .getElementsByTagName("div")?.[0]
      ?.getElementsByTagName("a")?.[0]?.href;
  }

  togglePin() {
    if (!this.pinned) {
      this._setPin();
      this._pinned = true;
    } else {
      this.clear();
      if (this.selected) this._setSelect();
      this._pinned = false;
    }
  }
  pin() {
    if (this.pinned) return;
    this.togglePin();
  }
  unpin() {
    if (!this.pinned) return;
    this.togglePin();
  }

  select() {
    if (this.selected) return;
    this._setSelect();
    if (this.pinned) this._setPin();
    this._selected = true;
  }
  deselect() {
    if (!this.selected) return;
    this.clear();
    if (this.pinned) this._setPin();
    this._selected = false;
  }

  clear() {
    this._card.style = "";
  }
  scrollIntoView() {
    this._card.scrollIntoView(true);
  }

  // private functions
  _setPin() {
    this._card.style.borderLeft = "#E4645C 4px solid";
    this._card.style.paddingLeft = "4px";
  }
  _setSelect() {
    this._card.style.background = "#EFF4F8";
    this._card.style.border = "#C4E6F8 2px solid";
  }
}

// execute
const manager = new Manager();
manager.start();
