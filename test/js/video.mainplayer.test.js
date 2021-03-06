/* jshint strict: false */
/* globals  FT, asyncTest: false, deepEqual: false, equal: false, expect: false, module: false, notDeepEqual: false, notEqual: false, notStrictEqual : false, ok: false, QUnit: false, raises: false, start: false, stop: false, strictEqual: false, test: false, TEST: false */
/* these are the globals setup by Qunit, FT for our namespace and TEST for our mocks and helpers */
/* we also turn of use strict in the test as you may need to do something to do something strict mode won't allow in order to test/mock something */

(function (window, doc, $, undefined) {
    function runTests() {
    	QUnit.module('Video Main-player tests',  {
            setup: function () {
            },
            teardown: function () {
            }
        });

        test('buildURLForVideo returns correct URL base when vidoe-hub is set', function () {
            expect(1);
            var result;
            TEST.beginNewPage({
        	   config: {'video' : true, 'dfp_site' : 'ftcom.5887.video', 'dfp_zone' : 'video-hub'}
            });
            result = FT.ads.buildURLForVideo("uk","video",{});
            strictEqual(result.urlStem,'http://pubads.g.doubleclick.net/gampad/ads?env=vp&gdfp_req=1&impl=s&output=xml_vast2&iu=/5887/ftcom.5887.video/video-hub&sz=592x333&unviewed_position_start=1&scp=pos%3Dvideo');

        });
    }
    
    $(runTests);
}(window, document, jQuery));