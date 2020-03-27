(function(w, d) {
    // CMP init
    if (!w.__cmp) {
        w.__cmp = (function() {
            var listen = w.attachEvent || w.addEventListener;
            listen('message', function(event) {
                w.__cmp.receiveMessage(event);
            }, false);
 
            function addLocatorFrame() {
                if (!w.frames['__cmpLocator']) {
                    if (d.body) {
                        var frame = d.createElement('iframe');
                        frame.style.display = 'none';
                        frame.name = '__cmpLocator';
                        d.body.appendChild(frame);
                    } else {
                        setTimeout(addLocatorFrame, 5);
                    }
                }
            }
            addLocatorFrame();

            var commandQueue = [];
            var cmp = function(command, parameter, callback) {
                if (command === 'ping') {
                if (callback) {
                    callback({
                        gdprAppliesGlobally: !!(w.__cmp && w.__cmp.config && w.__cmp.config.gdprAppliesGlobally),
                        cmpLoaded: false
                    });
                }
                } else {
                commandQueue.push({
                    command: command,
                    parameter: parameter,
                    callback: callback
                });
                }
            };
            cmp.commandQueue = commandQueue;
            cmp.receiveMessage = function(event) {
                var data = event && event.data && event.data.__cmpCall;
                if (data) {
                commandQueue.push({
                    callId: data.callId,
                    command: data.command,
                    parameter: data.parameter,
                    event: event
                });
                }
            };
            cmp.config = {
                forceLocale:'fr',
                storeConsentGlobally:false,
                customPolicyLocation:'/site/cookies'
            };
            return cmp;
        }());
        // Script injection
        var t = d.createElement('script');
        t.async = false;
        t.charset = 'UTF-8';
        t.src = 'https://cmp.webedia.mgr.consensu.org/cmp.bundle.js';
        var tag = d.getElementsByTagName('head')[0];
        tag.appendChild(t);
    }
 
    // Custom implementation
    function acceptOnScroll() {
        var scrollY = w.pageYOffset | d.documentElement.scrollTop;
        if (Math.abs(scrollY - w.initScrollY) > 200) {
            w.__cmp('setConsents', null, function() {
                w.__cmp('showConsentBanner', false);
                // w.__cmp('getVendorList', null, function(result) {
                // sendEvent('Scroll', { result });
                // });
            });
            w.removeEventListener('scroll', acceptOnScroll);
        }
    }
 
    function handleConsentResult(vendorList, vendorConsents) {
        if (!vendorConsents || !vendorConsents.created || (vendorConsents.vendorListVersion !== vendorList.vendorListVersion)) {
            w.__cmp('showConsentBanner', true, function () {
                // auto-accept after scroll
                w.initScrollY = w.pageYOffset | d.documentElement.scrollTop;
                w.addEventListener('scroll', acceptOnScroll);
            });
        }
    }

    w.__cmp('addEventListener', 'cmpReady', function () {
        w.__cmp('getVendorList', null, function (vendorList) {
            var timeout = setTimeout(function () {
                handleConsentResult(w.__cmp, vendorList);
            }, 100);
            w.__cmp('getVendorConsents', null, function (vendorConsents) {
                clearTimeout(timeout);
                handleConsentResult(vendorList, vendorConsents);
            });
        });
    });
})(window, document);