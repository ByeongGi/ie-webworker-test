
(function (window) {


    var Util = {};



    Util.initWorkerFallback = function initWebWoker(){
        // URL.createObjectURL를 사용하기 위해서 
        window.URL = window.URL || window.webkitURL; // Window에 URL에 브라우져 별 구현체 할당
    
        var response = "self.onmessage=function(e){self.postMessage('Worker: '+e.data);}";
        var blob; // String 형태의 스크립트(raw data)를 넣어서  Blob 를 생성한다. 
    
        try {
            blob = new Blob([response], {type: 'application/javascript; charset=utf-8'});
        } catch (e) { 
            // 브라우저별 Blob 빌더 구현체 할당     
            window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;
            blob = new BlobBuilder();
            blob.append(response);
            blob = blob.getBlob();
        }
    
    
        var worker = new Worker(URL.createObjectURL(blob)); // IE 10 에서 에러 발생 
    
        worker.onmessage = function(e) { 
            alert('Response: ' + e.data);
        };
        worker.postMessage('Test');
    }

    Util.initWorkerFallback2 = function initWebWoker(){
        // URL.createObjectURL를 사용하기 위해서 
        window.URL = window.URL || window.webkitURL; // Window에 URL에 브라우져 별 구현체 할당
    
        function workerFun(){
            setf =this;
            self.onmessage= function(e){
                self.postMessage('Worker: '+e.data);
            };
        
        }
        var rawWorkerFun ='('+ workerFun+ ')'+'()';
        var blob; // String 형태의 스크립트(raw data)를 넣어서  Blob 를 생성한다. 
        try {
            blob = new Blob([rawWorkerFun.replace('"use strict";','')], {type: 'application/javascript; charset=utf-8'});
        } catch (e) { 
            // 브라우저별 Blob 빌더 구현체 할당     
            window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;
            blob = new BlobBuilder();
            blob.append(workerFun);
            blob = blob.getBlob();
        }
    
    
        var worker = new Worker(URL.createObjectURL(blob)); // IE 10 에서 에러 발생 
    
        worker.onmessage = function(e) { 
            alert('Response: ' + e.data);
        };
        worker.postMessage('Test');
    }


    Util.initWebWoker = function(){
                
        var worker = new Worker('./javascripts/worker.js');

        worker.onmessage = function (e) {
            alert('Response: ' + e.data);
        };
        worker.postMessage('Test');

    }
    

    Util.browserCheck = function () {
        var agent = window.navigator.userAgent.toLowerCase(),
            name = window.navigator.appName,
            browser;

        // MS 계열 브라우저를 구분하기 위함.
        if (name === 'Microsoft Internet Explorer' || agent.indexOf('trident') > -1 || agent.indexOf('edge/') > -1) {
            browser = 'ie';
            if (name === 'Microsoft Internet Explorer') { // IE old version (IE 10 or Lower)
                agent = /msie ([0-9]{1,}[\.0-9]{0,})/.exec(agent);
                browser += parseInt(agent[1]);
            } else { // IE 11+
                if (agent.indexOf('trident') > -1) { // IE 11 
                    browser += 11;
                } else if (agent.indexOf('edge/') > -1) { // Edge
                    browser = 'edge';
                }
            }
        } else if (agent.indexOf('safari') > -1) { // Chrome or Safari
            if (agent.indexOf('opr') > -1) { // Opera
                browser = 'opera';
            } else if (agent.indexOf('chrome') > -1) { // Chrome
                browser = 'chrome';
            } else { // Safari
                browser = 'safari';
            }
        } else if (agent.indexOf('firefox') > -1) { // Firefox
            browser = 'firefox';
        }

        return browser;
        // IE: ie7~ie11, Edge: edge, Chrome: chrome, Firefox: firefox, Safari: safari, Opera: opera
    }

    window.Util  = Util;
})(window);
