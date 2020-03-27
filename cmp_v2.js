// Quantcast Choice. Consent Manager Tag v1.3
(function() {
    var host = 'www.puretrend.com';
    var element = document.createElement('script');
    var firstScript = document.getElementsByTagName('script')[0];
    var milliseconds = (new Date).getTime();
    var url = 'https://quantcast.mgr.consensu.org'
      .concat('/choice/', 'tgAXBXy0wYmWc', '/', host, '/choice.js')
      .concat('?timestamp=', milliseconds);
    element.async = true;
    element.type = 'text/javascript';
    element.src = url;
    element.setAttribute('importance', 'high');
    firstScript.parentNode.insertBefore(element, firstScript);
  })();
  var cmpStubFunction = function() {
    var arg = arguments;
    if (typeof window.__cmp.a !== "object") {
      setTimeout(function() {
        window.__cmp.apply(window.__cmp, arg);
      }, 500);
    }
  };
  var checkIfCmpIsReady = function() {
    if (window.__cmp === cmpStubFunction) {
      console.warn("CMP not loaded after 6 seconds. Trying again.");
    } else {
      clearInterval(cmpInterval);
    }
  };
  if (typeof window.__cmp === "undefined") {
    window.__cmp = cmpStubFunction;
    var cmpInterval = setInterval(checkIfCmpIsReady, 6000);
  }