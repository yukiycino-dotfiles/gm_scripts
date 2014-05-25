// ==UserScript==
// @name           EndTime2
// @namespace      http://blog.toodledotips.jp/?p=206
// @description    Toodledoの見積もり時間をリアルタイムに表示する
// @include        http://www.toodledo.com/tasks/*
// ==/UserScript==

(function(){
    //tipの削除
    var tip = document.getElementById("tip");
    tip.parentNode.removeChild(tip);
    
    tt_navi=2;
    tt_fnt=1;
    tt_lang='en';
    tt_due=0;
    tt_star=0;
    tt_dot=0;
    if(document.domain.indexOf("www.toodledo.com")!=-1){
        if($("tasks")!=null&&$("tasks").innerHTML.indexOf("Loading...")==-1){
            var dotttled=0;
            function getendtime(){
                if (typeof(tt_open)  == "undefined") {tt_open = 0;}
                if (typeof(tt_fix)   == "undefined") {tt_fix  = 0;}
                if (typeof(tt_top)   == "undefined") {tt_top  = 3;}
                if (typeof(tt_left)  == "undefined") {tt_left = 700;}
                if (typeof(tt_lang)  == "undefined") {tt_lang = 'jp';}
                if (typeof(tt_star)  == "undefined") {tt_star = 0;}
                if (typeof(tt_due)   == "undefined") {tt_due = 0;}
                if (typeof(tt_lineh)   == "undefined") {tt_lineh = '1.5em';}
                if (typeof(tt_navi)  == "undefined") {tt_navi = 0;}
                if (typeof(tt_ttlon) == "undefined") {tt_ttlon = 1;}
                if (typeof(tt_tsklg) == "undefined") {tt_tsklg = 1;}
                if (typeof(tt_wid)   == "undefined") {tt_wid = 170;}
                if (typeof(tt_fnt)   == "undefined") {tt_fnt = 1;}
                if (typeof(tt_dot)   == "undefined") {tt_dot = 0}
                var tdldivbdr;
                var tdldivbg;
                tdldivbdr = '#D6D7CE';
                tdldivbg  = '#ffffff';
                if(tt_lang=='jp'){
                    var tt_cur = '\u73fe\u5728\u6642\u523b';
                    var tt_end = '\u7d42\u4e86\u4e88\u5b9a';
                    var tt_est = '\u898b\u7a4d\u6642\u9593';
                    var tt_hrs = '\u6642\u9593';
                    var tt_log_inp = '\u958B\u59CB\u65E5\u6642\u3092\u5165\u529B';
                    var tt_log_cmp = '\u5B8C\u4E86\uFF06\u65E5\u6642\u5165\u529B';
                    var tt_log_srt = '\u30BF\u30A4\u30DE\u30FC\u3092\u958B\u59CB';
                }else{
                    var tt_cur = 'Current';
                    var tt_end = 'End time';
                    var tt_est = 'Lengths';
                    var tt_hrs = 'hours';
                    var tt_log_inp = 'Input Start';
                    var tt_log_cmp = 'Complete Task';
                    var tt_log_srt = 'Start Timer';
                }
                if(tt_fnt==1){
                    var tt_mystl = 'font-family:Arial, Helvetica, Sans-serif;font-size:1.5em;font-weight:bold;color:#666;';
                }
                
                var tdlimgurl = tdlimgurl || (("https:" == document.location.protocol) ? "/images/" : "http://images.toodledo.com/t/images/");
                
                var o=0;
                var o2='';
                var o3=0;
                var s='';
                var sd='';
                var myto=0;
                var it='';
                var v=0;
                var d=document.body.innerHTML;
                var ttl='';
                var stttimeh='';
                var lentimem='';
                var chktime=0;
                var tt_sep=$$('.sep');
                var tt_ch=$$('.ch');
                var cdownx=0;
                var cdowna=0;
                var cdownb=0;
                var logicon='';
                var tsklgchk=0;
                var tsktmcnt=0;
                var dotttl='';
                var dotttlbk='Toodledo : Your To-Do List';
                var dotdisp='0';
                var dotdispx=0;
                tmid='';
                
                if(tt_sep[0] != null|| tt_sep[0] != undefined){
                    for(i=0;i<tt_sep.length;i++){
                        if(i+1==tt_sep.length){
                            myto=d.indexOf('hiddenarea');
                        }else{
                            myto=d.indexOf(tt_sep[i+1].innerHTML);
                        }
                        s=d.substring(d.indexOf(tt_sep[i].innerHTML),myto);
                        sd=s.match(/len[^>]+>([^<]+)<\/span>/ig);
                        if(sd != null|| sd != undefined){
                            for(j=0;j<sd.length;j++){
                                if(sd[j].indexOf('none')<1){
                                    sd[j].match(/len(\d+).+?(\d*\.?\d+) min|len(\d+).+?(\d*\.?\d+) hour/i);
                                    var id = RegExp.$1+RegExp.$3;
                                    if($("check"+id)){
                                        if($("check"+id).up().hasClassName("chd")){
                                            o=o+0;
                                        }else{
                                            if(tt_star == 1 && tt_due == 1){
                                                if($("star"+id).hasClassName("sprt_tlbr bstared") && $("due"+id).innerHTML=="Today"){
                                                    o=o+(isNaN(RegExp.$2)?0:RegExp.$2-0)+((isNaN(RegExp.$4)?0:RegExp.$4-0)*60);
                                                }
                                            }else if(tt_star == 1){
                                                if($("star"+id).hasClassName("sprt_tlbr bstared")){
                                                    o=o+(isNaN(RegExp.$2)?0:RegExp.$2-0)+((isNaN(RegExp.$4)?0:RegExp.$4-0)*60);
                                                }
                                            }else if(tt_due == 1){
                                                if($("due"+id).innerHTML=="Today"){
                                                    o=o+(isNaN(RegExp.$2)?0:RegExp.$2-0)+((isNaN(RegExp.$4)?0:RegExp.$4-0)*60);
                                                }
                                            }else{
                                                o=o+(isNaN(RegExp.$2)?0:RegExp.$2-0)+((isNaN(RegExp.$4)?0:RegExp.$4-0)*60);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if(typeof tt_sep[i].innerText=='undefined'){
                            it=tt_sep[i].textContent;
                        }else{
                            it=tt_sep[i].innerText;}v=(o-0)/60;o2=o2+it+'  -  <span id="tdlcon" style="' + tt_mystl + '"> ' + v.toFixed(2) + '</span>&nbsp;' + tt_hrs + '<br>';o3=o3+v;o=0;
                    }
                }else{
                    if($("lenTot")){
                        $("lenTot").innerHTML.match(/(\d*\.?\d+) min|(\d*\.?\d+) hour/i);o=(isNaN(RegExp.$1)?0:RegExp.$1-0)+((isNaN(RegExp.$2)?0:RegExp.$2-0)*60);v=(o-0)/60;o3=v;
                    }
                }

                if(tt_dot != 0){
                    if(tt_ch[0] != null|| tt_ch[0] != undefined){
                        for(i=0;i<tt_ch.length;i++){
                            if(tt_dot == 3){
                                if(tt_star == 1 && tt_due == 1){
                                    if($("star"+id).hasClassName("sprt_tlbr bstared") && $("due"+id).innerHTML=="Today"){
                                        dotdispx = dotdispx + 1;
                                    }
                                }else if(tt_star == 1){
                                    if($("star"+id).hasClassName("sprt_tlbr bstared")){
                                        dotdispx = dotdispx + 1;
                                    }
                                }else if(tt_due == 1){
                                    if($("due"+id).innerHTML=="Today"){
                                        dotdispx = dotdispx + 1;
                                    }
                                }else{
                                    dotdispx = tt_ch.length;}dotdisp = dotdispx;
                            }
                            tt_ch[i].innerHTML.match(/check(\d+)/ig);
                            var id = RegExp.$1;
                            if($("tig"+id) != null && $("tig"+id) != undefined && $("tig"+id).title=='pause timer' && tsktmcnt == 0){
                                dotttl += $('tsk'+id).innerHTML;
                                tsktmcnt ++;
                                tmid = id;
                                if(tt_dot == 1){
                                    $("tim"+id).innerHTML.match(/(\d+):(\d+)/ig);
                                    timtimeh = RegExp.$1;
                                    timtimem = RegExp.$2;
                                    timtime = (((timtimeh - 0) * 60) + (timtimem - 0));dotdisp = timtime;
                                }else if(tt_dot == 2){
                                    $("tim"+id).innerHTML.match(/(\d+):(\d+)/ig);
                                    timtimeh = RegExp.$1;
                                    timtimem = RegExp.$2;
                                    timtime = (((timtimeh - 0) * 60) + (timtimem - 0));
                                    if($("len"+id).innerHTML!='none'){
                                        $("len"+id).innerHTML.match(/(\d*\.?\d+) min|(\d*\.?\d+) hour/i);
                                        lentime = (isNaN(RegExp.$1)?0:RegExp.$1-0)+((isNaN(RegExp.$2)?0:RegExp.$2-0)*60);
                                    }else{
                                        lentime = 0;
                                    }
                                    dotdisp = lentime - timtime;
                                    if(dotdisp<0){
                                        dotdisp = '+' + (dotdisp * -1);
                                    }
                                }
                            }
                        }
                        
                        if(tsktmcnt != 0 || dotdisp != 0){
                            if(dotttl == ''){
                                dotttl = dotttlbk;
                            }
                            document.title = '(' + dotdisp + ') ' + dotttl;
                            if(dotttled == 0 && Prototype.Browser.IE){
                                viewByClick();
                            }
                            dotttled=1;
                        }
                    }
                    if(tsktmcnt == 0 && dotdisp == 0 && document.title != dotttlbk){
                        document.title = dotttlbk;
                    }
                }
                var tt_position,tt_shadow;
                if(tt_fix==1){
                    tt_position = 'absolute';
                    tt_shadow   = '';
                    tt_shadowie = '';
                }else{
                    tt_position = 'fixed';
                    tt_shadow   = '3px 3px 3px #666';
                    tt_shadowie = 'progid:DXImageTransform.Microsoft.Shadow(color=#666666, Direction=135, Strength=4)';
                }
                d=new Date();
                var o5=d.getHours()+':'+('0'+d.getMinutes()).slice(-2);
                d.setMinutes(d.getMinutes()+(o3*60));
                var o4=d.getHours()+':'+('0'+d.getMinutes()).slice(-2);
                var ttlg = '';
                if(tt_navi==0){
                    
                    var eout = '<div id="tdlh" style="padding:2px 7px;"><span id="tddr" style="width: 13px;height: 16px;background: url(https://d1h9d4exwfthxc.cloudfront.net/images/css/sprites_icons_4.png) no-repeat -81px -406px;"><img src="' + tdlimgurl + 's.gif" style="width:18px;height:16px;"></span><span>' + tt_cur + ' - </span><span id="tdlnow" style="'+tt_mystl+'">'+o5+'</span>&nbsp;&nbsp;<div></div><span style="background:url(https://d1h9d4exwfthxc.cloudfront.net/images/css/sprites_icons_4.png) no-repeat -35px -259px transparent;height:16px;margin:0;width:13px;"><img src="' + tdlimgurl + 's.gif" style="width:18px;height:16px;"></span><span class="tdclk">' + tt_end + ' - </span><span id="tdlend" class="tdclk" style="'+tt_mystl+'">'+o4+'</span></div><div id="tdlb" style="padding:2px 7px;margin-top:2px;border-top:1px solid ' + tdldivbdr + ';"><span id="tdlcon">'+o2+'</span>' + tt_est + ': <span id="tdlmit" style="'+tt_mystl+'">'+o3.toFixed(2)+'</span> ' + tt_hrs + '</div>';
                    
                }else{
                    
                    var eout = '<div id="tdlh" style="padding:2px 7px;"><span id="tddr" style="width: 13px;height: 16px;background: url(https://d1h9d4exwfthxc.cloudfront.net/images/css/sprites_icons_4.png) no-repeat -81px -406px;"><img src="' + tdlimgurl + 's.gif" style="width:18px;height:16px;"></span><span>' + tt_cur + ' - </span><span id="tdlnow" style="'+tt_mystl+'">'+o5+'</span>&nbsp;&nbsp;<div></div><span style="background:url(https://d1h9d4exwfthxc.cloudfront.net/images/css/sprites_icons_4.png) no-repeat -35px -259px transparent;height:16px;margin:0;width:13px;"><img src="' + tdlimgurl + 's.gif" style="width:18px;height:16px;"></span><span class="tdclk">' + tt_end + ' - </span><span id="tdlend" class="tdclk" style="'+tt_mystl+'">'+o4+'</span></div><div id="tdlb" style="padding:2px 7px;margin-top:2px;border-top:1px solid ' + tdldivbdr + ';"><span id="tdlcon">'+o2+'</span>' + tt_est + ': <span id="tdlmit" style="'+tt_mystl+'">'+o3.toFixed(2)+'</span> ' + tt_hrs + '</div>';
                    
                }if($("ttjpendtime")==null||$("ttjpendtime")=="undefined"){
                    if(tt_navi==0){
                        var ttjpendtime = document.createElement('div');
                        ttjpendtime.id = 'ttjpendtime';
                        document.body.appendChild(ttjpendtime);
                        
                        Element.setStyle(ttjpendtime, {'padding':'0','font-weight':'normal','position':tt_position,'z-index':'999','top': tt_top + 'px','left': tt_left + 'px','margin':'0','box-shadow':tt_shadow,'-webkit-box-shadow':tt_shadow,'-moz-box-shadow':tt_shadow,'filter':tt_shadowie,'border':'1px solid ' + tdldivbdr,'background-color':tdldivbg,'line-height':tt_lineh
});
                        if(tt_wid>1){
                            Element.setStyle(ttjpendtime, {'width':tt_wid + 'px'});
                        }
                        $("ttjpendtime").innerHTML=eout;
                    }else{
                        var ttjpendtime = document.createElement('div');
                        ttjpendtime.id = 'ttjpendtime';
                        if(tt_navi==1){
                            $("left_side").insertBefore(ttjpendtime,$("tabs"));
                        }else{
                            $("left_side").appendChild(ttjpendtime);
                        }
                        
                        Element.setStyle(ttjpendtime, {'padding':'0','font-weight':'normal','z-index':'999','margin':'0','border-bottom':'1px solid ' + tdldivbdr,'border-right':'1px solid ' + tdldivbdr,'background-color':tdldivbg,'line-height':tt_lineh});
                        
                        $("ttjpendtime").innerHTML=eout;
                    }
                }else{
                    $("tdlnow").innerHTML=o5;
                    $("tdlend").innerHTML=o4;
                    $("tdlcon").innerHTML=o2;
                    $("tdlmit").innerHTML=o3.toFixed(2);
                }
            }

            if($("ttjpendtime")==null||$("ttjpendtime")=="undefined"){
                getendtime();
                setInterval(function() {getendtime();},60000);
                var Drag = {
                    obj : null, init : function(o, oRoot, minX, maxX, minY, maxY, bSwapHorzRef, bSwapVertRef, fXMapper, fYMapper){
                        o.onmousedown= Drag.start;
                        o.hmode= bSwapHorzRef ? false : true ;
                        o.vmode= bSwapVertRef ? false : true ;
                        o.root = oRoot && oRoot != null ? oRoot : o ;
                        if (o.hmode  && isNaN(parseInt(o.root.style.left  ))) o.root.style.left   = "0px";
                        if (o.vmode  && isNaN(parseInt(o.root.style.top   ))) o.root.style.top    = "0px";
                        if (!o.hmode && isNaN(parseInt(o.root.style.right ))) o.root.style.right  = "0px";
                        if (!o.vmode && isNaN(parseInt(o.root.style.bottom))) o.root.style.bottom = "0px";
                        o.minX= typeof minX != 'undefined' ? minX : null;
                        o.minY= typeof minY != 'undefined' ? minY : null;
                        o.maxX= typeof maxX != 'undefined' ? maxX : null;
                        o.maxY= typeof maxY != 'undefined' ? maxY : null;
                        o.xMapper = fXMapper ? fXMapper : null;
                        o.yMapper = fYMapper ? fYMapper : null;
                        o.root.onDragStart= new Function();
                        o.root.onDragEnd= new Function()
                        ;o.root.onDrag= new Function();
                    },
                    start : function(e){
                        var o = Drag.obj = this;
                        e = Drag.fixE(e);
                        var y = parseInt(o.vmode ? o.root.style.top  : o.root.style.bottom);
                        var x = parseInt(o.hmode ? o.root.style.left : o.root.style.right );
                        o.root.onDragStart(x, y);
                        o.lastMouseX= e.clientX;
                        o.lastMouseY= e.clientY;
                        if (o.hmode) {
                            if (o.minX != null) o.minMouseX= e.clientX - x + o.minX;
                            if (o.maxX != null) o.maxMouseX= o.minMouseX + o.maxX - o.minX;
                        } else {
                            if (o.minX != null) o.maxMouseX = -o.minX + e.clientX + x;
                            if (o.maxX != null) o.minMouseX = -o.maxX + e.clientX + x;
                        }if (o.vmode) {
                            if (o.minY != null) o.minMouseY= e.clientY - y + o.minY;
                            if (o.maxY != null) o.maxMouseY= o.minMouseY + o.maxY - o.minY;
                        } else {
                            if (o.minY != null) o.maxMouseY = -o.minY + e.clientY + y;
                            if (o.maxY != null) o.minMouseY = -o.maxY + e.clientY + y;
                        }

                        document.onmousemove= Drag.drag;
                        document.onmouseup= Drag.end;
                        return false;
                    },
                    drag : function(e){
                        e = Drag.fixE(e);
                        var o = Drag.obj;
                        var ey= e.clientY;
                        var ex= e.clientX;
                        var y = parseInt(o.vmode ? o.root.style.top  : o.root.style.bottom);
                        var x = parseInt(o.hmode ? o.root.style.left : o.root.style.right );
                        var nx, ny;
                        if (o.minX != null) ex = o.hmode ? Math.max(ex, o.minMouseX) : Math.min(ex, o.maxMouseX);
                        if (o.maxX != null) ex = o.hmode ? Math.min(ex, o.maxMouseX) : Math.max(ex, o.minMouseX);
                        if (o.minY != null) ey = o.vmode ? Math.max(ey, o.minMouseY) : Math.min(ey, o.maxMouseY);
                        if (o.maxY != null) ey = o.vmode ? Math.min(ey, o.maxMouseY) : Math.max(ey, o.minMouseY);
                        nx = x + ((ex - o.lastMouseX) * (o.hmode ? 1 : -1));
                        ny = y + ((ey - o.lastMouseY) * (o.vmode ? 1 : -1));
                        if (o.xMapper) nx = o.xMapper(y);
                        else if (o.yMapper) ny = o.yMapper(x);
                        
                        Drag.obj.root.style[o.hmode ? "left" : "right"] = nx + "px";
                        Drag.obj.root.style[o.vmode ? "top" : "bottom"] = ny + "px";
                        Drag.obj.lastMouseX= ex;Drag.obj.lastMouseY= ey;Drag.obj.root.onDrag(nx, ny);
                        return false;
                    },
                    end : function(){
                        document.onmousemove = null;
                        document.onmouseup   = null;
                        Drag.obj.root.onDragEnd(parseInt(Drag.obj.root.style[Drag.obj.hmode ? "left" : "right"]), 
                                                parseInt(Drag.obj.root.style[Drag.obj.vmode ? "top" : "bottom"]));
                        Drag.obj = null;
                    },
                    fixE : function(e){
                        if (typeof e == 'undefined') e = window.event;
                        if (typeof e.layerX == 'undefined') e.layerX = e.offsetX;
                        if (typeof e.layerY == 'undefined') e.layerY = e.offsetY;
                        return e;
                    }
                };

                Drag.init($("ttjpendtime"));
                
                function settdpst() {
                    var item = $("ttjpendtime");
                    var ret = Element.getStyle(item, "position");
                    Element.getStyle(item, "left").match(/([0-9]+)/);
                    var getleft = Number(RegExp.$1);
                    Element.getStyle(item, "top").match(/([0-9]+)/);
                    var gettop = Number(RegExp.$1);
                    var scrltop = document.documentElement.scrollTop || document.body.scrollTop;
                    if(ret == 'absolute'){
                        
                        Element.setStyle(item, {'position':'fixed','box-shadow':'3px 3px 3px #666','-webkit-box-shadow':'3px 3px 3px #666','-moz-box-shadow':'3px 3px 3px #666','filter':'progid:DXImageTransform.Microsoft.Shadow(color=#666666, Direction=135, Strength=4)','top':gettop - scrltop + 'px'
});
                        
                    }else{
                        Element.setStyle(item, {'position':'absolute','box-shadow':'','-webkit-box-shadow':'','-moz-box-shadow':'','filter':'','top':gettop + scrltop + 'px'});
                    }
                }

                function settimbg() {
                    if(tmid != ''){
                        $("row" + tmid).setAttribute("style","background-color:#FFFFD6");
                    }
                }

                if($('tddr') != null|| $('tddr') != undefined){
                    $("ttjpendtime").observe("click", settimbg);
                    if(tt_navi==0){
                        $("ttjpendtime").observe("dblclick", settdpst);
                    }
                }

                Event.observe(window.document,'keyup',
                              function(e) {
                                  if (e.keyCode == 13){
                                      getendtime();
                                  }
                              },false);
                Event.observe(window.document,'click',
                              function() {
                                  getendtime();
                              },false);

                Event.observe(window.document,'mouseup',
                              function(){
                                  setTimeout(function() {
                                      getendtime();
                                  }, 2500);
                              },false);
            }
            
            var scripts = document.getElementsByTagName('script');
            for (var k=0; k<scripts.length; k++) {
                var script = scripts[k];
                if (/\/et2.js$/.test(script.src)) {
                    window.setTimeout(
                        function() {
                            script.parentNode.removeChild(script);
                        }, 1);
                    break;
                }
            }
        }
    }
})();