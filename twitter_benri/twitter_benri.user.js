// ==UserScript==
// @name          Twitter Benri
// @namespace     Twitter Benri
// @include       /^https://twitter.com/*
// @author        Yuki Yano
// @grant         GM_addStyle
// @run-at        document-start

// ==/UserScript==

(function () {
  "use strict";

  GM_addStyle(`
body a[data-testid=AppTabBar_Explore_Link] {
  display: none !important;
}
body div[data-testid=sidebarColumn] > div > div > div > div > div.css-1dbjc4n > div:not(:first-child):not(:last-child):not(:nth-child(3)):not(.r-195d4m8):not(.r-ahm1il):not(.r-1h3ijdo):not(.r-1mwlp6a):not(.r-1ninfw3) {
  display: none !important;
}

body div[data-testid=sidebarColumn] > div > div > div > div > div.css-1dbjc4n > div > nav {
  display: none !important;
}

body div[data-testid=sidebarColumn] > div > div > div > div > div.css-1dbjc4n > div:nth-child(3):not(.r-14lw9ot):not(.r-yfoy6g):not(.r-kemksi) {
  display: none !important;
}
body div[data-testid=sidebarColumn] > div > div > div > div > div.css-1dbjc4n section[aria-labelledby^=accessible-list-] {
  display: none !important;
}
body div[data-testid=sidebarColumn] > div > div > div > div > div.css-1dbjc4n > div:first-child.r-1ihkh82,
body div[data-testid=sidebarColumn] > div > div > div > div > div.css-1dbjc4n > div:first-child.r-1uaug3w,
body div[data-testid=sidebarColumn] > div > div > div > div > div.css-1dbjc4n > div:first-child.r-1ysxnx4 {
  display: none !important;
}

a[aria-label=リスト],
a[aria-label=ブックマーク],
a[aria-label=ツイートする] {
  display: none !important;
}

#layers > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) {
  display: none !important;
}
`);
})();
