// The MIT License (MIT)

// Copyright (c) 2022, Claudio Guarnieri

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

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

        return _lib;
    }


    if (typeof(window.isLockdown) === 'undefined') {
        window.isLockdown = isLockdown();
    }
})(window);
