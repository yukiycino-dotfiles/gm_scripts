// ==UserScript==
// @name           Amazon short URI
// @namespace      http://www.misao.gr.jp/~koshian/
// @description    Short URI for amazon.
// @include        https://www.amazon.co.jp/*
// @include        https://amazon.co.jp/*
// @include        https://www.amazon.jp/*
// @include        https://amazon.jp/*
// ==/UserScript==

(function() {
    var asin = document.getElementById('ASIN');
    if (asin == null) {
        asin = document.getElementsByName('ASIN.0')[0];
    }
    var base = 'https://amazon.jp/';
    var dirs = ['dp/', 'o/ASIN/', 'gp/product/'];
    var panel;

    if (asin) {
        var target = document.getElementById('navbar');
        var block = document.createElement('div');
        block.setAttribute('style', 'text-align: right;');

        panel = '<select id="ASUselect" onChange="' + 
            'document.getElementById(\'ASUtext\').value =\'' + base +'\'+' +
            'document.getElementById(\'ASUselect\').value + ' +
            'document.getElementById(\'ASIN\').value; ">';

        for( var i = 0; i < dirs.length; i++ ){
            var el = '<option value="ASUValue" selected>ASUValue</option>';
            if(location.pathname.indexOf(dirs[i]) != 1) {
                el = el.replace(/ selected/g, "");
        }
        panel += el.replace(/ASUValue/g, dirs[i]);
      }

      panel += '</select>';
      panel += '<input type="text" size="40" id="ASUtext"' +
          'readonly="readonly" onfocus="this.select();">';
      panel += '<input type="button" value = "Go!" ' +
          'onClick="location.href = ASUtext.value;">';
      block.innerHTML = panel;
      target.appendChild(block);

      var view = document.getElementById('ASUtext');
      var select = document.getElementById('ASUselect');

      view.value = base + select.value + asin.value;
    }
})();
