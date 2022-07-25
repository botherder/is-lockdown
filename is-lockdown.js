'use strict';

(function(window) {
    function isLockdown() {
        var _lib = {};

        _lib.isWebGLAvailable = function() {
            return !!(window.WebGLRenderingContext);
        }

        _lib.isWebRTCAvailable = function() {
            let rtcFunctions = [
                'RTCIceGatherer',
                'RTCPeerConnection',
                'webkitRTCPeerConnection',
                'mozRTCPeerConnection',
            ];

            var rtcAvailable = false;
            rtcFunctions.forEach(function(item) {
                if (rtcAvailable)
                    return;

                if (item in window)
                    rtcAvailable = true;
            });

            return rtcAvailable;
        }

        _lib.isMathMLAvailable = function() {
            let testId = 'isLockdownMathMLTest';
            let div = document.createElement('div');
            div.setAttribute('id', testId);
            div.innerHTML = '<math style="display: none"><mrow mathcolor=\"red\"><mn>1</mn></mrow></math>';
            document.body.appendChild(div);
            let mathMLAvailable = window.getComputedStyle(div.firstChild.firstChild, null).color === 'rgb(255, 0, 0)';
            document.body.removeChild(document.getElementById(testId));
            return mathMLAvailable;
        }

        _lib.isLockdownAvailable = function() {
            if (/iP(hone|od|ad)/.test(navigator.platform) == false)
                return false

            let version = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
            let majorVersion = parseInt(version[1], 10)
            return majorVersion >= 16
        }

        _lib.isLockdownEnabled = function() {
            if (_lib.isLockdownAvailable() && !_lib.isWebGLAvailable()
                && !_lib.isWebRTCAvailable() && !_lib.isMathMLAvailable())
                return true;

            return false;
        }

        // _lib.createWidget = function() {
        //     let linkToLockdown = "https://www.apple.com/newsroom/2022/07/apple-expands-commitment-to-protect-users-from-mercenary-spyware/";
        //     let topBarHeight = '2em';
        //     let topBar = document.createElement('div');
        //     topBar.setAttribute('id', 'isLockdownWidget');
        //     topBar.style.cssText = 'position: absolute; top: 0; width: 100%; height: ' + topBarHeight + '; background-color: black; color: white; ';
        //     topBar.innerHTML = "For better security <a style=\"color: white; text-decoration: underline;\" " +
        //                        "href=\"" + linkToLockdown + "\">enable Lockdown Mode!</a>";
        //     document.body.appendChild(topBar);
        //     document.body.style.cssText += 'padding-top: ' + topBarHeight;
        // }

        return _lib;
    }


    if (typeof(window.isLockdown) === 'undefined') {
        window.isLockdown = isLockdown();
    }
})(window);
