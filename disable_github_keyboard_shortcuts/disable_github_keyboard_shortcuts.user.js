// ==UserScript==
// @name           Disable github keyboard shortcuts
// @namespace      http://sites.google.com/site/958site/
// @description    github のキーボードショートカットを殺す
// @include        https://github.com/*
// @include        https://gist.github.com/*
// ==/UserScript==
unsafeWindow.$(document).unbind('keydown.hotkey');
