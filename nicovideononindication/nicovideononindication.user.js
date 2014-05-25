// ==UserScript==
// @name		NicovideoNonIndication
// @author		dionore
// @namespace		http://d.hatena.ne.jp/dionore/
// @include		http://www.nicovideo.jp/watch/*
// ==/UserScript==

(function(){
    var style = document.getElementById("flvplayer_container").style;
    style.height = "0px";

    var input = document.createElement("input");
    input.type = "button";
    input.className = "submit";
    input.value = "表示/非表示";
    input.addEventListener("click", function(){
        style.height == "0px" ? style.height = "512px" : style.height = "0px";
    }, false);
    
    document.getElementById("WATCHHEADER").appendChild(input);
})();
