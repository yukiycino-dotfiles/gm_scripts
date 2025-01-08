// ==UserScript==
// @name         Kagi Summarizer & Discuss (Linked Tab)
// @namespace    https://kagi.com/
// @version      1.0
// @description  現在のタブの隣にKagi SummarizerとDiscussのタブを開く（Firefox対応）
// @author       Yuki Yano
// @match        *://*/*
// @grant        GM_openInTab
// ==/UserScript==

(function () {
  document.addEventListener("keydown", function (event) {
    if (
      event.key === "K" &&
      !event.ctrlKey &&
      !event.metaKey &&
      !event.altKey
    ) {
      const activeElement = document.activeElement;
      if (
        activeElement &&
        (activeElement.tagName === "INPUT" ||
          activeElement.tagName === "TEXTAREA" ||
          activeElement.isContentEditable)
      ) {
        return;
      }

      // 現在のURLを取得してエンコード
      const query = window.location.href;
      const summarizerUrl =
        "https://kagi.com/summarizer/index.html?target_language=JA&summary=takeaway&url=" +
        encodeURIComponent(query);
      const discussUrl =
        "https://kagi.com/discussdoc?url=" + encodeURIComponent(query);

      // 現在のタブの隣に開く
      window.open(summarizerUrl, "_blank", "noopener");
      GM_openInTab(discussUrl, { active: false, insert: true });

      event.preventDefault();
    }
  });
})();
