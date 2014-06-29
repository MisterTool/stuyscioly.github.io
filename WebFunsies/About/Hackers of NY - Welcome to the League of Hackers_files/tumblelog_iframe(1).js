/*! scripts/tumblr.js */
(typeof Tumblr!=="undefined")||(Tumblr={});
/*! scripts/tumblr/post_message_channel.js */
this.Tumblr||(this.Tumblr={});(function(){var d=window.JSON;if(!(d&&d.stringify)){var j=document.createElement("iframe");document.body.appendChild(j);d=j.contentWindow.JSON;document.body.removeChild(j)}var r=[].slice,l=[].push,e=function(v,w){return function(){return v.apply(w,arguments)}},f=Object.prototype.toString;function k(v){return typeof v=="string"||v&&typeof v=="object"&&f.call(v)=="[object String]"||false}function h(){if(arguments.length==1){console.log(window.location.hostname+" - ",arguments[0])}else{if(arguments.length==2){console.log(window.location.hostname+" - ",arguments[0],arguments[1])}else{if(arguments.length===3){console.log(window.location.hostname+" - ",arguments[0],arguments[1],arguments[2])}else{if(arguments.length===4){console.log(window.location.hostname+" - ",arguments[0],arguments[1],arguments[2],arguments[3])}}}}}function s(){this.length=0}s.prototype={slice:r,indexOf:Array.prototype.indexOf};s.prototype.push=function(){if(this.triggered_with){var v=1<=arguments.length?r.call(arguments,0):[];for(var w=0;w<v.length;w+=1){v[w].apply(null,this.triggered_with)}}return l.apply(this,arguments)};s.prototype.trigger=function(){var w=1<=arguments.length?r.call(arguments,0):[];var v=this.length;this.triggered_with=w;for(var x=0;x<v;x+=1){this[x].apply(null,this.triggered_with)}return this};function a(){this._on_resolved=new s();this._on_rejected=new s();this.then=e(this.then,this);this.fail=e(this.fail,this);this.resolve=e(this.resolve,this);this.reject=e(this.reject,this)}a.prototype.then=function(){this._on_resolved.push.apply(this._on_resolved,arguments);return this};a.prototype.success=a.prototype.then;a.prototype.fail=function(){this._on_resolved.push.apply(this._on_rejected,arguments);return this};a.prototype.resolve=function(){if(this.resolved||this.rejected){return}this._on_resolved.trigger.apply(this._on_resolved,arguments);this.resolved=true;return this};a.prototype.reject=function(){if(this.resolved||this.rejected){return}this._on_rejected.trigger.apply(this._on_rejected,arguments);this.rejected=true;return this};a.prototype.reject_timeout=function(){var v=1<=arguments.length?r.call(arguments,0):[];var w=v.shift();setTimeout(e(function(){this.reject.apply(this,v)},this),w);return this};a.prototype.promise=function(){var w=this;function v(){var A=this;this.fail=function x(){w.fail.apply(w,arguments);return A};this.then=function z(){w.then.apply(w,arguments);return A};this.success=this.then;this.reject_timeout=function y(){w.reject_timeout.apply(w,arguments);return A};this.cid=w.cid}return new v()};var i=0;var q={};var b=[];function u(){var v=new a();v.cid=++i;q[v.cid]=v;return v}(function(){var x=window.addEventListener?"addEventListener":"attachEvent";var w=window[x];var v=x=="attachEvent"?"onmessage":"message";w(v,function(z){var A;if(typeof z.data!=="string"){return}try{A=d.parse(z.data)}catch(B){}if(A){for(var y=b.length-1;y>=0;y--){b[y].message_callback(z,A)}}},false)})();function m(w){w||(w={});if(!(d&&d.stringify&&d.parse)){throw ("Must have JSON parsing and stringify")}if(w.iframe){w.window=w.iframe.contentWindow;if(!w.origin){var y=w.iframe.src;var v=y.match(/^(http(?:s)?:\/\/[\w_\-\.]+(?::\d+)?)\/?/);if(v){w.origin=v[1]}}}this.window=w.window;this.namespace=w.namespace?w.namespace+":":"";this.origin=w.origin||"*";this.responders={_method_callback_responder:o,_syn:e(this._syn,this)};this._on_connected=new s();this._unanswered_calls={};this.on_connection(e(this.enable_sending_post_message,this));b.push(this);if(this.window){var x=this.send("_syn");x.then(e(function(z,A){if(A==="ack"){this._is_connected()}},this))}}m.prototype.match_origin=function(v){if(this.origin==="*"){return true}else{return this.origin===v}};m.prototype.message_callback=function(w,x){var v;if(this.window&&(w.source!==this.window)){return}if(!this.match_origin(w.origin)){return}if(x.method){if(x.method.slice(0,this.namespace.length)===this.namespace){v=x.method.slice(this.namespace.length,x.method.length)}}if(x.args&&k(x.args)){try{x.args=d.parse(x.args)}catch(y){if(window.Tumblr&&Tumblr.Utils&&Tumblr.Utils.exceptions){Tumblr.Utils.exceptions(y)}return}}this.call_responder(v,w,x)};m.prototype.call_responder=function(w,x,y){var v,z;if(!w){return}y.args||(y.args=[]);z=this.responders[w];if(!z){this._unanswered_calls[w]||(this._unanswered_calls[w]=[]);this._unanswered_calls[w].push(arguments);return}v=z.apply(x,y.args);if(y.cid&&w!=="_method_callback_responder"){this.send_to_window(x.source,"_method_callback_responder",{cid_response:y.cid,response:v})}};function o(w){var v=this;if(w.cid_response&&(w.cid_response in q)){var x=q[w.cid_response];x.resolve.call(null,v,w.response)}}m.prototype._syn=function(){this._is_connected();return"ack"};m.prototype._is_connected=function(){if(this.connected){return}this.connected=true;this._on_connected.trigger(this)};m.prototype.on_connection=function(v){this._on_connected.push.apply(this._on_connected,arguments);return this};m.prototype.method=function c(v){var x=this;var w=function w(){var y=1<=arguments.length?r.call(arguments,0):[];y.unshift(v);return x.send.apply(x,y)};return w};m.prototype.send=function g(){if(!this.window){console.warn("no window specified on channel");return}var v=1<=arguments.length?r.call(arguments,0):[];v.unshift(this.window);return this.send_to_window.apply(this,v)};m.prototype.send_to_window=function p(A,x){var w=3<=arguments.length?r.call(arguments,2):[];var v=u();try{var y=d.stringify({method:this.namespace+x,args:w,cid:v.cid});if(x==="_syn"||x==="_method_callback_responder"){n.call(this,A,y)}else{this.send_post_message(A,y)}}catch(z){v.reject(z)}return v.promise()};function n(x,w,v){v||(v=this.origin);x.postMessage(w,v)}m.prototype.send_post_message=function t(){this._delayed_sent_messages||(this._delayed_sent_messages=[]);this._delayed_sent_messages.push(arguments)};m.prototype.enable_sending_post_message=function(){this.send_post_message=n;if(this._delayed_sent_messages){for(var v=0;v<this._delayed_sent_messages.length;v+=1){n.apply(this,this._delayed_sent_messages[v])}delete this._delayed_sent_messages}};m.prototype.listening_to=function(v){return(v in this.responders)};m.prototype.listen_to=function(z,v){if(!v){var y=z;for(z in y){if(y.hasOwnProperty(z)){this.listen_to(z,y[z])}}return}if(z in this.responders){console.warn("already listening to this method, turn it off first");return}this.responders[z]=v;if(this._unanswered_calls[z]){var x=this._unanswered_calls[z],A;delete this._unanswered_calls[z];for(var w=0;w<x.length;w+=1){A=x[w];this.call_responder.apply(this,A)}}};m.prototype.stop_listen_to=function(v){if(v=="_method_callback_responder"){console.warn("cannot disable the method callback responder");return}delete this.responders[v]};Tumblr.PostMessageChannel=m})();
/*! scripts/tumblr/post_message_listener.js */
Tumblr.PostMessageListener=(function(){return{initialize:function(d){d=d||function(){};var c=window.addEventListener?"addEventListener":"attachEvent";var b=window[c];var a=c=="attachEvent"?"onmessage":"message";b(a,function(g){var f=g.data.split(";");d(f,g.origin)},false)}}})();
/*! scripts/tumblr/iframe.js */
(function(e,v){var l=window.l10n_str||{};var s={},d,n,q;var i=function(w){return document.getElementById(w)};var p=function(w){return document.querySelector(w)};var f=function(w){return document.querySelectorAll(w)};var g={};var c="http://www.tumblr.com",j="https://www.tumblr.com";if(!window.location.href.match(/^[^\/]+\/\/[^\/]+\.tumblr\.com\//i)){c=window.location.href.replace(/^([^\/]+\/\/[^\/]+).*/i,"$1");j=c}function u(z,w,y,x){if(window===window.parent){return false}if(typeof y==="undefined"){y=-1}if(typeof x==="undefined"){x=decodeURIComponent(s.origin)}return _t.delay(function(){t("resize_iframe",z,w)},y)}function a(){if(!(s.get.name&&s.get.name.length)){return false}if(i("btn_follow_join")){i("btn_follow_join").href=j+"/register/follow/"+s.get.name}if(i("btn_follow")){i("btn_follow").href=j+"/register/follow/"+s.get.name}if(i("btn_join")){i("btn_join").href=j+"/register/join_tumblr?referring_blog="+s.get.name}}function t(){var w=1<=arguments.length?Array.prototype.slice.call(arguments,0):[];w.push(_t.protocol_host());return _t.postMessage(w,decodeURIComponent(s.origin),window.parent)}if(Tumblr.PostMessageChannel){var k=new Tumblr.PostMessageChannel({window:window.parent,namespace:"reblog_iframe"})}function m(x){var w={name:"mobile",pretty_name:"mobile",mobile:false};if(typeof x==="undefined"){x=(navigator.userAgent||navigator.vendor||window.opera)}if(x.match(/iphone/i)){w.name="iphone";w.pretty_name="iPhone";w.mobile=true}else{if(x.match(/ipad/i)){w.name="ipad";w.pretty_name="iPad";w.mobile=true}else{if(x.match(/android/i)||_t.is_mobile()){w.name="android";w.pretty_name="android";w.mobile=true}}}return w}function b(C,w){if(!C){return false}var A=f("[data-translation]");for(var x=A.length-1;x>=0;x--){var y=A[x],z=y.getAttribute("data-translation");if(l[n]&&l[n][z]){var B=l[n][z];if(B.indexOf("%1$s")!==-1&&s.get.name){B=B.replace("%1$s",s.get.name)}y.textContent=B;if(w){y.parentNode.setAttribute("title",l[n][z])}}}return true}var h=(function(){return{standard:function(){},pill:function(w){var x=i("iframe_controls");if(!w&&s.get.name&&s.get.name.length){i("btn_follow_join").href=j+"/register/follow/"+s.get.name;i("btn_join").href=j+"/register/join_tumblr?referring_blog="+s.get.name}_t.addClass(x,"controls_pill");_t.removeClass(document.body,"loading");if(Tumblr.IframeSizing){Tumblr.IframeSizing.init(function(y){u(3+y,26)})}},bluebar:function(w,y){if(y&&!w){t("mobile_iframe")}a();var x=i("iframe_controls");_t.addClass(x,"controls_bluebar");_t.removeClass(document.body,"loading")},o_pill:function(){var F=i("iframe_controls"),B=i("sliding_tray"),D=["follow","tumblr"],z={},y=s.get.context||"index",x={poll:false,postmessage:false},G={margin:{top:0,right:0,bottom:0,left:0},open:{width:0,height:0,tray:0},closed:{width:0,height:0,tray:0},overshoot:0},E={measure_open:function(){_t.addClass(document.body,"measuring");_t.addClass(document.body,"open");G.open.width=F.offsetWidth;G.open.height=F.offsetHeight;G.overshoot=Math.max(10,Math.ceil(0.15*G.open.width));_t.removeClass(document.body,"measuring");_t.removeClass(document.body,"open");document.body.style.minWidth=(G.open.width+G.margin.left+G.margin.right+G.overshoot)+"px";document.body.style.minHeight=(G.open.height+G.margin.top+G.margin.bottom)+"px"},measure_margins:function(H){G.margin.top=parseInt(_t.getStyle(F,"margin-top"),10);G.margin.right=parseInt(_t.getStyle(F,"margin-right"),10);G.margin.bottom=parseInt(_t.getStyle(F,"margin-bottom"),10);G.margin.left=parseInt(_t.getStyle(F,"margin-left"),10);if(typeof H==="undefined"){H=0}if(isNaN(G.margin.top)){G.margin.top=H}if(isNaN(G.margin.right)){G.margin.right=H}if(isNaN(G.margin.bottom)){G.margin.bottom=H}if(isNaN(G.margin.left)){G.margin.left=H}}};_t.each(D,function(I,H){D[I]=z[H]=i("btn_"+H)});z.tumblr.href=j+"/?referring_blog="+s.get.name;z.follow.href=j+"/register/follow/"+s.get.name;var A=i("tumblelog_avatar_img");var w=i("tumblelog_avatar");var C=i("tumblelog_name");if(C){C.innerHTML=_t.sanitize(s.get.name,true)}if(A){A.src=_t.sanitize(s.get.avatar,true)}if(w){w.style.backgroundImage="url('"+_t.sanitize(s.get.avatar,true)+"')";w.href=j+"/register/follow/"+s.get.name}if(s.get.avatar==="hide"){_t.addClass(document.body,"hide_avatar")}t("teaser_iframe","initialize",s.get.page_slide||"slide");z.tumblr.addEventListener("mouseover",function(){if(!g.teaser){return true}t("teaser_iframe","open")});_t.delay(function(){E.measure_margins(5);E.measure_open();u(G.open.width+G.margin.left+G.margin.right+G.overshoot,G.open.height+G.margin.top+G.margin.bottom);_t.addClass(document.body,"animated");_t.removeClass(document.body,"loading")})},follow_nag:function(){var H=i("iframe_controls"),A=i("sliding_tray"),G=i("x_button"),D=["follow"],y={},x={poll:false,postmessage:false},J={margin:{top:5,right:5,bottom:5,left:5},open:{width:300,height:99}},F={show:function(){_t.removeClass(H,"closed")}};if(_t.getCookie("hide_follow_nag").value=="1"){return false}_t.each(D,function(L,K){D[L]=y[K]=i("btn_"+K)});G.addEventListener("click",function(K){_t.addClass(H,"closed");_t.setCookie("hide_follow_nag",1,3);K.preventDefault();t("follow_iframe","dismiss")});y.follow.href=j+"/register/follow/"+s.get.name+"/2";var z=i("tumblelog_avatar_img");var w=i("tumblelog_avatar");var E=i("tumblelog_name_title");var C=i("tumblelog_name");var B=i("tumblelog_title");var I=i("tumblr_logo");if(C){C.innerHTML=_t.sanitize(s.get.name,true)}if(B){if(s.get.title){B.innerHTML=_t.sanitize(s.get.title,true).replace(/\+/g," ")}else{B.innerHTML=_t.sanitize(s.get.name,true)}}if(z){z.src=decodeURIComponent(s.get.avatar)}if(E){E.href=j+"/register/follow/"+s.get.name}if(w){w.style.backgroundImage="url('"+decodeURIComponent(s.get.avatar)+"')";w.href=j+"/register/follow/"+s.get.name}if(I){I.href=j+"/register/?referring_blog="+decodeURIComponent(s.get.name)}if(!s.get.title||s.get.title===s.get.name){_t.addClass(E,"no_title")}J.open.width=H.offsetWidth||300;J.open.height=H.offsetHeight||99;_t.addClass(H,"closed");g.follow_show=F.show;_t.delay(function(){var L=J.open.width+J.margin.left+J.margin.right;var K=J.open.height+J.margin.top+J.margin.bottom;t("follow_iframe","resize",L,K);_t.removeClass(document.body,"loading")})},mobile:function(D,A){if(A){var E=c+"/dashboard/iframe?"+decodeURIComponent(_t.serialize(s.get));E+="&mobile_corner=true";document.location.replace(E);return}a();var z=i("iframe_buttons")||{};var C=i("tumblelog_name");var y=i("btn_open_in_app");var x=m();if(C){C.innerHTML=_t.sanitize(s.get.name,true)}if(x.mobile){var w={blogName:s.get.name,page:"blog"};if(s.get.pid){w.page="permalink";w.postID=s.get.pid}var B="blog?"+_t.serialize(w);if(y){y.href=c+"/open/app?"+_t.serialize({referrer:"mobile_banner",app_args:B});y.target="";if(x.name==="android"){y.target="_blank"}}}if(document.getElementsByClassName){(function(){var G=document.getElementsByClassName("chrome");var H=function(){this.blur()};for(var F=0;F<G.length;F++){G[F].addEventListener("touchend",H);H.call(G[F])}})()}_t.removeClass(document.body,"loading");t("resize_iframe",z.offsetWidth||204,z.offsetHeight||35)}}}());Tumblr.Iframe={initialize:function(z,y){s.get=_t.getVars();s.origin=decodeURIComponent(s.get.src);d=z;if(!(d&&typeof h[d]==="function")){d="standard"}var w=_t.isLoggedIn(),A=(!y&&!s.get.v&&(w||s.get.iphone)&&!s.get.no_redirect)||s.get.force_redirect;if(!w&&s.get.brag){window.onload=function(){u(1,1)};return false}if(!w&&!s.get.brag){t("tagged_teaser_iframe","show");t("follow_iframe","enable")}window.onbeforeunload=function(){if(window!==window.parent){t("location_change")}};if(A&&d!=="mobile"){document.location.replace(c+"/dashboard/iframe?"+decodeURIComponent(_t.serialize(s.get)));return}Tumblr.PostMessageListener.initialize(function(B){Tumblr.Iframe.post_message_event(B)});var x=["standard","pill","o_pill","mobile"];if(Tumblr.LikeButtonRequests&&x.indexOf(z)>=0){Tumblr.PostMessageListener.initialize(function(C,B){Tumblr.LikeButtonRequests.get_like_states(C);Tumblr.LikeButtonRequests.send_like(C,B);Tumblr.LikeButtonRequests.send_unlike(C,B)});Tumblr.LikeButtonRequests.loaded()}window.onload=function(){n=(window.navigator.userLanguage||window.navigator.language||"en_US").toLowerCase();n=(window.l10n_keys&&window.l10n_keys[n])?window.l10n_keys[n]:n;n=n.toLowerCase().replace("_","-");q=window.l10n_str[n]||window.l10n_str["en-us"];b(q,false);_t.addClass(document.body,"version_"+d);h[d](w,A);if(w&&Tumblr.IframeButtons){Tumblr.IframeButtons.init()}};if(window!==window.parent){t("request_keywords")}},post_message_event:function(w){if(w[0]==="parent_scroll"){if(typeof g.scroll_callback==="function"){g.scroll_callback(w[1],w[2],w[3],w[4])}}if(w[0]==="follow_teaser"){if(typeof g.follow_show==="function"){if(w.length>1&&w[1]==="show"){g.follow_show()}}}if(w[0]==="teaser"){if(w.length<2){return}switch(w[1]){case"enable":g.teaser=true;return;case"disable":g.teaser=false;return}}},sendPostMessage:t,getSecureHost:function(){return j},getUnsecureHost:function(){return c}};if(!e){return}var r={init:function(y){var w=e(".btn:not(.hidden)"),x=0;w.each(function(){var z=e(this);x+=z.outerWidth(true)});if(e(".btn.unfollow.hidden").length){x+=15}if(typeof(y)==="function"){y(x)}}};v.IframeSizing=r;var o={init:function(){e(".iframe_controls").on("click",".btn.reblog",function(w){var B=e(this),y=w.shiftKey,z=B.attr("data-form-key"),C=B.attr("data-reblog-key"),D=B.attr("data-reblog-id");if(w.altKey){if(!C.length){B.addClass("animated shake");window.setTimeout(function(){B.removeClass("shake")},1000);return false}if(!B.hasClass("reblogged")){B.addClass("reblogged");B.addClass("animated").addClass("poof");window.setTimeout(function(){B.addClass("final_state")},1000);var A=e.ajax({url:"/fast_reblog",type:"POST",data:{form_key:z,reblog_key:C,reblog_post_id:D,queue:y}});A.error(function(){B.removeClass("reblogged");window.alert(l.ajax_error)})}w.preventDefault()}else{if(Tumblr.Flags.bool("reblog_on_blog")&&k){w.preventDefault();var x=B.data();x.origin=j;var E=k.send("reblog_post",x);E.reject_timeout(75);E.fail(function(){window.top.location.href=w.target.href})}}});e(".iframe_controls").on("click",".btn.follow, .btn.unfollow, .btn.like, .btn.unlike",function(y){y.stopPropagation();y.preventDefault();var x=e(this),w=false,z={};x.addClass("hidden");if(x.hasClass("follow")){w=Tumblr.follow;z={tumblelog:x.attr("data-tumblelog-name"),source:"FOLLOW_SOURCE_IFRAME"};x.siblings(".unfollow").removeClass("hidden")}if(x.hasClass("unfollow")){w=Tumblr.unfollow;z={tumblelog:x.attr("data-tumblelog-name"),source:"UNFOLLOW_SOURCE_IFRAME"};x.siblings(".follow").removeClass("hidden")}if(x.hasClass("like")){w=Tumblr.like;z={id:x.attr("data-id"),key:x.attr("data-key"),source:"LIKE_SOURCE_IFRAME"};x.siblings(".unlike").removeClass("hidden")}if(x.hasClass("unlike")){w=Tumblr.unlike;z={id:x.attr("data-id"),key:x.attr("data-key"),source:"UNLIKE_SOURCE_IFRAME"};x.siblings(".like").removeClass("hidden")}if(w){w(z,{success:function(){},error:function(){window.alert(l.ajax_error)}})}})}};v.IframeButtons=o})(window.jQuery,Tumblr);
/*! scripts/tumblr/like_button_requests.js */
l10n_str=window.l10n_str||{};Tumblr.LikeButtonRequests={loaded:function(){Tumblr.LikeButtonRequests.post_to_parent({},"logged_in_iframe_loaded")},get_like_states:function(b){if(b[0]==="get_like_states"){if(typeof jQuery==="undefined"||!jQuery){return}var a=jQuery("#tumblelog_name").data("tumblelog-name");var e=JSON.parse(b[1]);var d=jQuery("#tumblr_form_key").attr("content");var c={form_key:d,tumblelog_name:a};if(e){if(e.page){c.page=e.page}if(e.ids){c.ids=e.ids}}if(c.ids||c.page){if(c.ids&&c.ids.length===1&&Tumblr.LikeButtonRequests.has_single_post_like()){if(Tumblr.LikeButtonRequests.get_single_post_like()){return}}jQuery.ajax({url:"/svc/like_state",type:"post",data:c,success:function(f){Tumblr.LikeButtonRequests.post_to_parent(f)}})}}},get_single_post_like:function(){var e=jQuery(".like",jQuery("#iframe_controls")),a=jQuery(".unlike",jQuery("#iframe_controls")),f=e.data("id")===a.data("id")?e.data("id"):false,b=e.hasClass("hidden"),d=a.hasClass("hidden"),c;if(f===false||b===d){return false}c=[{post_id:f,state:b}];Tumblr.LikeButtonRequests.post_to_parent(c);return true},has_single_post_like:function(){return(jQuery(".like",jQuery("#iframe_controls")).length===1)},send_like:function(c,a){if(a!=="http://assets.tumblr.com"){return}if(c[0]==="like"){var d=JSON.parse(c[1]);var b=d.post_id;var e=d.reblog_key;if(b&&e){d={id:b,key:e,source:"LIKE_SOURCE_TUMBLELOG_INLINE"};Tumblr.like(d,{success:function(){var f={post_id:b,state:true};Tumblr.LikeButtonRequests.post_to_parent(f)},error:function(){alert(l10n_str.ajax_error)}})}}},send_unlike:function(c,a){if(a!=="http://assets.tumblr.com"){return}if(c[0]==="unlike"){var d=JSON.parse(c[1]);var b=d.post_id;var e=d.reblog_key;if(b&&e){d={id:b,key:e,source:"UNLIKE_SOURCE_TUMBLELOG_INLINE"};Tumblr.unlike(d,{success:function(){var f={post_id:b,state:false};Tumblr.LikeButtonRequests.post_to_parent(f)},error:function(){alert(l10n_str.ajax_error)}})}}},post_to_parent:function(b,a){if(!a){a="like_state_update"}var d=a+";"+JSON.stringify(b);try{window.parent.postMessage(d,"*")}catch(c){}}};
/*! scripts/polyfills/add_event_listener.js */
(function(e,d){if(e.addEventListener){return}function a(g){var f=d[g];d[g]=function(h){return b(f(h))}}function c(f,h,g){return(g=this).attachEvent("on"+f,function(i){i=i||e.event;i.preventDefault=i.preventDefault||function(){i.returnValue=false};i.stopPropagation=i.stopPropagation||function(){i.cancelBubble=true};h.call(g,i)})}function b(g,f){if(f=g.length){while(f--){g[f].addEventListener=c}}else{g.addEventListener=c}return g}b([d,e]);if("Element" in e){e.Element.prototype.addEventListener=c}else{d.attachEvent("onreadystatechange",function(){b(d.all)});a("getElementsByTagName");a("getElementById");a("createElement");b(d.all)}})(window,document);
/*! scripts/_t.js */
var _t=(function(){var a={};if(!Array.prototype.indexOf){Array.prototype.indexOf=function(e,g){if(this===null){throw new TypeError()}var f=this;var c=f.length>>>0;if(c===0){return -1}var h=0;if(arguments.length>1){h=Number(arguments[1]);if(h!=h){h=0}else{if(h!==0&&h!=Infinity&&h!=-Infinity){h=(h>0||-1)*Math.floor(Math.abs(h))}}}if(h>=c){return -1}var d=h>=0?h:Math.max(c-Math.abs(h),0);for(;d<c;d++){if(d in f&&f[d]===e){return d}}return -1}}return{isLoggedIn:function(){return(document.cookie.indexOf("logged_in=1")!=-1)},sanitize:function(c,d){if(d){c=decodeURIComponent(c)}return c.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;")},getVars:function(){var c={};window.location.hash.replace(/[#?&]+([^=&]+)(=[^&]*)?/gi,function(d,e,f){c[e]=(f===undefined)?true:f.substring(1);if(c[e].indexOf("/")!==-1){c[e]=encodeURIComponent(c[e])}});window.location.search.replace(/[?&]+([^=&]+)(=[^&]*)?/gi,function(d,e,f){c[e]=(f===undefined)?true:f.substring(1)});return c},objSize:function(d){var c=0,e;for(e in d){if(d.hasOwnProperty(e)){c++}}return c},randomProperty:function(e){var c,d=0,f;for(f in e){if(Math.random()<1/d++){c=f}}return c},findParent:function(e,d){var c=e.parentNode;while(!_t.matchesSelector(c,d)){if(!c.parentNode){return false}c=c.parentNode}return c},containsElement:function(e,f,d){if(!e||!f){return false}if(!d&&e===f){return false}var c=f;do{if(e===c){return true}}while((c=c.parentNode));return false},matchesSelector:function(f,c){if(!f){return false}if(f.webkitMatchesSelector){return f.webkitMatchesSelector(c)}if(f.mozMatchesSelector){return f.mozMatchesSelector(c)}var d=document.querySelectorAll(c);for(var g in d){return d[g]===f}return false},addClass:function(c,d){if((" "+c.className+" ").indexOf(" "+d+" ")==-1){c.className=c.className===""?d:c.className+" "+d}},removeClass:function(d,c){if(d.className.indexOf(c)==-1){return}var e=d.className.split(" ");e.splice(e.indexOf(c),1);d.className=e.join(" ")},addClasses:function(e,d){for(var c=0;c<d.length;c++){_t.addClass(e,d[c])}},removeClasses:function(e,d){for(var c=0;c<d.length;c++){_t.removeClass(e,d[c])}},toggleClass:function(d,c){if(hasClass(d,c)){_t.removeClass(d,c)}else{_t.addClass(d,c)}},hasClass:function(d,c){if(!d){return}var e=d.className;return(e.split(" ").indexOf(c)!==-1)},serialize:function(g,e){var h=[];for(var f in g){var d=e?e+"["+f+"]":f,c=g[f];h.push(typeof c=="object"?serialize(c,d):encodeURIComponent(d)+"="+encodeURIComponent(c))}return h.join("&")},relativeDate:function(d){var c=new Date();if(d){c.setTime(c.getTime()+d)}return c},getRootDomain:function(d,c){if(!d){d=document.location.href}var e=d.replace(/^[^\/]+\/\/([^\/]+).*/i,"$1");var g=e.split(".");if(g.length<2){return e}var f=g.slice(c?1:-2).join(".");if(f.toLowerCase()==="tumblr.net"){return e}return f},getCookie:function(f){var e=document.cookie;var j,h=e.split(";");var g,d=h.length;for(g=0;g<d;g+=1){if((j=h[g].replace(/^\s+|\s+$/g,"").split("="))[0]==f){return{name:j[0],value:j[1]}}}return false},setCookie:function(c,h,j,e){e=e||{};var d=new Date();var i=(typeof(e.path)!=="undefined")?e.path:"/";var g=(typeof(e.is_secure)!=="undefined")?true:false;var f=(typeof(e.domain)!=="undefined")?e.domain:"";d.setDate(d.getDate()+j);if(typeof(e.expire_date)!=="undefined"){expire_dates=true;d=e.expire_date}document.cookie=c+"="+escape(h)+((j===null)?"":";expires="+d.toGMTString())+";path="+i+((g===false)?"":";secure")+((f==="")?"":";domain="+f)},unsetCookie:function(c){_t.setCookie(c,"",-1)},getStyle:function(e,c){if(!e){return false}var d;if(typeof e.currentStyle!="undefined"){d=e.currentStyle}else{d=document.defaultView.getComputedStyle(e,null)}return d[c]||false},sortObj:function(g,f){var h=[];for(var e in g){if(g.hasOwnProperty(e)){h.push(e)}}if(typeof f==="function"){h.sort(f)}else{if(f==="value"){h.sort(function(k,j){var i=g[k];var l=g[j];return((i<l)?-1:((i>l)?1:0))})}else{h.sort()}}var c={};for(var d=0;d<h.length;d++){c[h[d]]=g[h[d]]}return c},reverseObj:function(g){var h=[];var e={};for(var f in g){var d={};d.key=f;d.val=g[f];h.push(d)}h.reverse();for(var c in h){e[h[c].key]=h[c].val}return e},protocol_host:function(){return document.location.protocol+"//"+document.location.host},postMessage:function(e,c,d){if(!d){d=parent}if(typeof e!=="string"){e=e.join(";")}if(d!==window){d.postMessage(e,c)}},each:function(e,d){for(var c=0;c<e.length;c++){if(d.apply(this,[c,e[c]])===false){return}}},trim:function(c){return c.replace(/\s*(.*\S)?\s*/i,"$1")},delay:function(f,e,c,d){if(!c){c=this}if(!d){d=[]}if(e<0){f.apply(c,d);return false}return setTimeout(function(){f.apply(c,d)},e)},is_mobile:function(c){if(typeof c==="undefined"){c=(navigator.userAgent||navigator.vendor||window.opera)}return !!(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(c)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(c.substr(0,4)))},getCleanObject:function b(c){if(c in a){return a[c]}var d=document.createElement("iframe");document.body.appendChild(d);a[c]=d.contentWindow[c];document.body.removeChild(d);return a[c]}}})();
/*! scripts/tumblelog_iframe.js */
