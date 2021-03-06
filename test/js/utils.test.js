/* jshint strict: false */
/* globals  FT, asyncTest: false, deepEqual: false, equal: false, expect: false, module: false, notDeepEqual: false, notEqual: false, notStrictEqual : false, ok: false, QUnit: false, raises: false, start: false, stop: false, strictEqual: false, test: false, TEST: false */
/* these are the globals setup by Qunit, FT for our namespace and TEST for our mocks and helpers */
/* we also turn of use strict in the test as you may need to do something to do something strict mode won't allow in order to test/mock something */

(function (window, document, $, undefined) {
    function runTests() {
        QUnit.module('FT._ads.utils.isType methods');

        test('Utils object exists', function () {
            expect(1);
            ok($.type(FT._ads.utils) === 'object', 'The name space exists');
        });

        test('isArray method', function () {
            expect(12);
            ok($.type(FT._ads.utils.isArray) === 'function', 'The function exists');
            ok(FT._ads.utils.isArray([]), 'Array returns true');
            ok(!FT._ads.utils.isArray(), 'Call with no args returns false');
            ok(!FT._ads.utils.isArray(arguments), 'Array like object returns false');
            ok(!FT._ads.utils.isArray({}), 'Object returns false');
            ok(!FT._ads.utils.isArray("hello"), 'String returns false');
            ok(!FT._ads.utils.isArray(/hello/), 'Regex returns false');
            ok(!FT._ads.utils.isArray(1e6), 'Number returns false');
            ok(!FT._ads.utils.isArray(null), 'Null returns false');
            ok(!FT._ads.utils.isArray(true), 'Boolean returns false');
            ok(!FT._ads.utils.isArray(undefined), 'Undefined returns false');
            ok(!FT._ads.utils.isArray(function () {}), 'Function returns false');
        });

        test('isString method', function () {
            expect(11);
            ok($.type(FT._ads.utils.isString) === 'function', 'The function exists');
            ok(FT._ads.utils.isString("hello"), 'String returns true');
            ok(!FT._ads.utils.isString(), 'Call with no args returns false');
            ok(!FT._ads.utils.isString([]), 'Array returns false');
            ok(!FT._ads.utils.isString({}), 'Object returns false');
            ok(!FT._ads.utils.isString(/hello/), 'Regex returns false');
            ok(!FT._ads.utils.isString(1e6), 'Number returns false');
            ok(!FT._ads.utils.isString(null), 'Null returns false');
            ok(!FT._ads.utils.isString(undefined), 'Undefined returns false');
            ok(!FT._ads.utils.isString(true), 'Boolean returns false');
            ok(!FT._ads.utils.isString(function () {}), 'Function returns false');
        });

        test('isFunction method', function () {
            expect(11);
            ok($.type(FT._ads.utils.isFunction) === 'function', 'The function exists');
            ok(FT._ads.utils.isFunction(function () {}), 'Function returns true');
            ok(!FT._ads.utils.isFunction("hello"), 'String returns false');
            ok(!FT._ads.utils.isFunction(), 'Call with no args returns false');
            ok(!FT._ads.utils.isFunction([]), 'Array returns false');
            ok(!FT._ads.utils.isFunction({}), 'Object returns false');
            ok(!FT._ads.utils.isFunction(/hello/), 'Regex returns false');
            ok(!FT._ads.utils.isFunction(1e6), 'Number returns false');
            ok(!FT._ads.utils.isFunction(null), 'Null returns false');
            ok(!FT._ads.utils.isFunction(undefined), 'Undefined returns false');
            ok(!FT._ads.utils.isFunction(true), 'Boolean returns false');
        });

        test('isObject method', function () {
            expect(11);
            ok($.type(FT._ads.utils.isObject) === 'function', 'The function exists');
            ok(FT._ads.utils.isObject({}), 'Object returns true');
            ok(!FT._ads.utils.isObject(function () {}), 'Function returns false');
            ok(!FT._ads.utils.isObject(), 'Call with no args returns false');
            ok(!FT._ads.utils.isObject("hello"), 'String returns false');
            ok(!FT._ads.utils.isObject([]), 'Array returns false');
            ok(!FT._ads.utils.isObject(/hello/), 'Regex returns false');
            ok(!FT._ads.utils.isObject(1e6), 'Number returns false');
            ok(!FT._ads.utils.isObject(null), 'Null returns false');
            ok(!FT._ads.utils.isObject(undefined), 'Undefined returns false');
            ok(!FT._ads.utils.isObject(true), 'Boolean returns false');
        });

        test("isWindow method", function() {
            expect(14);
            ok($.type(FT._ads.utils.isWindow) === 'function', 'The function exists');
            ok(FT._ads.utils.isWindow(window), "window");
            ok(!FT._ads.utils.isWindow(), "empty");
            ok(!FT._ads.utils.isWindow(null), "null");
            ok(!FT._ads.utils.isWindow(undefined), "undefined");
            ok(!FT._ads.utils.isWindow(document), "document");
            ok(!FT._ads.utils.isWindow(document.documentElement), "documentElement");
            ok(!FT._ads.utils.isWindow(""), "string");
            ok(!FT._ads.utils.isWindow(1), "number");
            ok(!FT._ads.utils.isWindow(true), "boolean");
            ok(!FT._ads.utils.isWindow({}), "object");
            ok(!FT._ads.utils.isWindow({ setInterval: function(){} }), "fake window");
            ok(!FT._ads.utils.isWindow(/window/), "regexp");
            ok(!FT._ads.utils.isWindow(function(){}), "function");
        });

        test("isNonEmptyString method", function() {
            expect(14);
            ok($.type(FT._ads.utils.isNonEmptyString) === 'function', 'The function exists');
            ok(FT._ads.utils.isNonEmptyString('hello'), "string with length");
            ok(!FT._ads.utils.isNonEmptyString(""), "empty string");
            ok(!FT._ads.utils.isNonEmptyString(), "empty");
            ok(!FT._ads.utils.isNonEmptyString(null), "null");
            ok(!FT._ads.utils.isNonEmptyString(undefined), "undefined");
            ok(!FT._ads.utils.isNonEmptyString(document), "document");
            ok(!FT._ads.utils.isNonEmptyString(document.documentElement), "documentElement");
            ok(!FT._ads.utils.isNonEmptyString(1), "number");
            ok(!FT._ads.utils.isNonEmptyString(true), "boolean");
            ok(!FT._ads.utils.isNonEmptyString({}), "object");
            ok(!FT._ads.utils.isNonEmptyString({ setInterval: function(){} }), "fake window");
            ok(!FT._ads.utils.isNonEmptyString(/window/), "regexp");
            ok(!FT._ads.utils.isNonEmptyString(function(){}), "function");
        });

        test("isPlainObject method",function(){
            expect(15);
            ok($.type(FT._ads.utils.isPlainObject) === 'function', 'The function exists');

            // The use case that we want to match
            ok(FT._ads.utils.isPlainObject({}), "{}");

            // Not objects shouldn't be matched
            ok(!FT._ads.utils.isPlainObject(""), "string");
            ok(!FT._ads.utils.isPlainObject(0) && !FT._ads.utils.isPlainObject(1), "number");
            ok(!FT._ads.utils.isPlainObject(true) && !FT._ads.utils.isPlainObject(false), "boolean");
            ok(!FT._ads.utils.isPlainObject(null), "null");
            ok(!FT._ads.utils.isPlainObject(undefined), "undefined");

            // Arrays shouldn't be matched
            ok(!FT._ads.utils.isPlainObject([]), "array");

            // Instantiated objects shouldn't be matched
            ok(!FT._ads.utils.isPlainObject(new Date()), "new Date");

            var fnplain = function(){};

            // Functions shouldn't be matched
            ok(!FT._ads.utils.isPlainObject(fnplain), "fn");

            /** @constructor */
            var Fn = function() {};

            // Again, instantiated objects shouldn't be matched
            ok(!FT._ads.utils.isPlainObject(new Fn()), "new fn (no methods)");

            // Makes the function a little more realistic
            // (and harder to detect, incidentally)
            Fn.prototype["someMethod"] = function(){};

            // Again, instantiated objects shouldn't be matched
            ok(!FT._ads.utils.isPlainObject(new Fn()), "new fn");

            // DOM Element
            ok(!FT._ads.utils.isPlainObject(document.createElement("div")), "DOM Element");

            // Window
            ok(!FT._ads.utils.isPlainObject(window), "window");

            try {
                FT._ads.utils.isPlainObject( window.location );
                ok( true, "Does not throw exceptions on host objects");
            } catch ( e ) {
                ok( false, "Does not throw exceptions on host objects -- FAIL");
            }
        });

        QUnit.module('FT._ads.utils.extend');
        test("extend method", function() {
            expect(27);

            var settings = { "xnumber1": 5, "xnumber2": 7, "xstring1": "peter", "xstring2": "pan" },
                options = { "xnumber2": 1, "xstring2": "x", "xxx": "newstring" },
                optionsCopy = { "xnumber2": 1, "xstring2": "x", "xxx": "newstring" },
                merged = { "xnumber1": 5, "xnumber2": 1, "xstring1": "peter", "xstring2": "x", "xxx": "newstring" },
                deep1 = { "foo": { "bar": true } },
                deep2 = { "foo": { "baz": true }},
                deep2copy = { "foo": { "baz": true }},
                deepmerged = { "foo": { "bar": true, "baz": true }},
                arr = [1, 2, 3],
                nestedarray = { "arr": arr };

            FT._ads.utils.extend(settings, options);
            deepEqual( settings, merged, "Check if extended: settings must be extended" );
            deepEqual( options, optionsCopy, "Check if not modified: options must not be modified" );

            FT._ads.utils.extend(settings, null, options);
            deepEqual( settings, merged, "Check if extended: settings must be extended" );
            deepEqual( options, optionsCopy, "Check if not modified: options must not be modified" );

            FT._ads.utils.extend(true, deep1, deep2);
            deepEqual( deep1["foo"], deepmerged["foo"], "Check if foo: settings must be extended" );
            deepEqual( deep2["foo"], deep2copy["foo"], "Check if not deep2: options must not be modified" );
            ok( FT._ads.utils.extend(true, {}, nestedarray)["arr"] !== arr, "Deep extend of object must clone child array" );

            ok( jQuery.isArray( FT._ads.utils.extend(true, { "arr": {} }, nestedarray)["arr"] ), "Cloned array have to be an Array" );
            ok( jQuery.isPlainObject( FT._ads.utils.extend(true, { "arr": arr }, { "arr": {} })["arr"] ), "Cloned object have to be an plain object" );

            var empty = {};
            var optionsWithLength = { "foo": { "length": -1 } };
            FT._ads.utils.extend(true, empty, optionsWithLength);
            deepEqual( empty["foo"], optionsWithLength["foo"], "The length property must copy correctly" );

            empty = {};
            var optionsWithDate = { "foo": { "date": new Date() } };
            FT._ads.utils.extend(true, empty, optionsWithDate);
            deepEqual( empty["foo"], optionsWithDate["foo"], "Dates copy correctly" );

            /** @constructor */
            var MyKlass = function() {};
            var customObject = new MyKlass();
            var optionsWithCustomObject = { "foo": { "date": customObject } };
            empty = {};
            FT._ads.utils.extend(true, empty, optionsWithCustomObject);
            ok( empty["foo"] && empty["foo"]["date"] === customObject, "Custom objects copy correctly (no methods)" );

            // Makes the class a little more realistic
            MyKlass.prototype = { "someMethod": function(){} };
            empty = {};
            FT._ads.utils.extend(true, empty, optionsWithCustomObject);
            ok( empty["foo"] && empty["foo"]["date"] === customObject, "Custom objects copy correctly" );

            var MyNumber = Number;
            var ret = FT._ads.utils.extend(true, { "foo": 4 }, { "foo": new MyNumber(5) } );
            ok( parseInt(ret.foo, 10) === 5, "Wrapped numbers copy correctly" );

            var nullUndef;
            nullUndef = FT._ads.utils.extend({}, options, { "xnumber2": null });
            ok( nullUndef["xnumber2"] === null, "Check to make sure null values are copied");

            nullUndef = FT._ads.utils.extend({}, options, { "xnumber2": undefined });
            ok( nullUndef["xnumber2"] === options["xnumber2"], "Check to make sure undefined values are not copied");

            nullUndef = FT._ads.utils.extend({}, options, { "xnumber0": null });
            ok( nullUndef["xnumber0"] === null, "Check to make sure null values are inserted");

            var target = {};
            var recursive = { foo:target, bar:5 };
            FT._ads.utils.extend(true, target, recursive);
            deepEqual( target, { bar:5 }, "Check to make sure a recursive obj doesn't go never-ending loop by not copying it over" );

            ret = FT._ads.utils.extend(true, { foo: [] }, { foo: [0] } ); // 1907
            equal( ret.foo.length, 1, "Check to make sure a value with coersion 'false' copies over when necessary to fix #1907" );

            ret = FT._ads.utils.extend(true, { foo: "1,2,3" }, { foo: [1, 2, 3] } );
            ok( typeof ret.foo !== "string", "Check to make sure values equal with coersion (but not actually equal) overwrite correctly" );

            ret = FT._ads.utils.extend(true, { foo:"bar" }, { foo:null } );
            ok( typeof ret.foo !== "undefined", "Make sure a null value doesn't crash with deep extend, for #1908" );

            var obj = { foo:null };
            FT._ads.utils.extend(true, obj, { foo:"notnull" } );
            equal( obj.foo, "notnull", "Make sure a null value can be overwritten" );

            function func() {}
            FT._ads.utils.extend(func, { key: "value" } );
            equal( func.key, "value", "Verify a function can be extended" );

            var defaults = { xnumber1: 5, xnumber2: 7, xstring1: "peter", xstring2: "pan" },
                defaultsCopy = { xnumber1: 5, xnumber2: 7, xstring1: "peter", xstring2: "pan" },
                options1 = { xnumber2: 1, xstring2: "x" },
                options1Copy = { xnumber2: 1, xstring2: "x" },
                options2 = { xstring2: "xx", xxx: "newstringx" },
                options2Copy = { xstring2: "xx", xxx: "newstringx" },
                merged2 = { xnumber1: 5, xnumber2: 1, xstring1: "peter", xstring2: "xx", xxx: "newstringx" };

            settings = FT._ads.utils.extend({}, defaults, options1, options2);
            deepEqual( settings, merged2, "Check if extended: settings must be extended" );
            deepEqual( defaults, defaultsCopy, "Check if not modified: options1 must not be modified" );
            deepEqual( options1, options1Copy, "Check if not modified: options1 must not be modified" );
            deepEqual( options2, options2Copy, "Check if not modified: options2 must not be modified" );
        });

        QUnit.module('FT._ads.utils miscellanious methods');
        test("css class methods", function() {
            expect(6);
            /* jshint -W044 */
            //just hint complains about all the crazy string escaping in here, but that's what we're testing
            var $node = $('<div class="test cr@zy-c|-|@r/\cter$">'),
            node = $node[0];

            ok( FT._ads.utils.hasClass(node, 'cr@zy-c|-|@r/\cter$'), "the node has the class cr@zy-c|-|@r/\cter$" );
            ok( FT._ads.utils.hasClass(node, 'test'), "the node has the class test" );
            ok( !FT._ads.utils.hasClass(node, 'tes'), "the node doesn't the class tes" );
            ok( !FT._ads.utils.hasClass(node, 'r/\cter$'), "the node doesn't the class r/\cter$" );

            FT._ads.utils.addClass(node, 'hello');
            ok( $node.hasClass('hello'), "the node hello was added" );

            FT._ads.utils.removeClass(node, 'hello');
            ok( !$node.hasClass('hello'), "the node hello was removed" );
            /* jshint +W044 */
        });

        test("hash method", function() {
            var result, test = "a:1,b:2,c:3,a:12";
            expect(6);
            result = FT._ads.utils.hash( test, ",", ":" );

            ok( FT._ads.utils.isObject( result ), "the result is an object" );
            deepEqual( result.b, '2', "Key b properly hashed (as string data)" );
            deepEqual( result.c, '3', "Key c properly hashed" );
            deepEqual( result.a, '12', "Duplicate keys properly hashed" );

            result = FT._ads.utils.hash( [], ",", ":" );
            ok( FT._ads.utils.isObject( result ), "Attempting to hash a invlid type returns an object." );
            equal( Object.keys(result).length, 0, "the object is empty." );

        });

        /*test('attach method', function () {
            expect(3);
            window.attached = function(str){
                return str;
            };

            TEST.sinon.attached = sinon.spy(window, "attached");
            // initial number of scripts
            var initialScripts = $('script').size();

            FT._ads.utils.attach('../js/util/attach.js');
            equal($('script').size() - initialScripts, 1, 'a new script tag has been added to the page.' );
            equal($('script[o-ads]').size(), 1, 'the script tag has an o-ads attribute');
            // wait for a maximum of 5 seconds for the google code to load
            // the display methods is tested to see if the lib is available

            QUnit.stop();

            var totalTime = 0,
                maxTime = 5000,
                interval = 100,
                timer = setInterval(function () {
                    totalTime += interval;
                    if (!!TEST.sinon.attached.calledOnce) {
                        ok(true, 'The script is executed after ' + totalTime / 1000 + ' seconds');
                        clearInterval(timer);
                        QUnit.start();
                    } else if (interval === maxTime) {
                        ok(false, 'The script was not executed after ' + maxTime / 1000 + ' seconds');
                        clearInterval(timer);
                        QUnit.start();
                    }
                }, interval);
        });  */

       test("writeScript method",function(){
            expect(1);
            ok($.type(FT._ads.utils.writeScript) === 'function', 'The function exists');
        });


       test("isScriptAlreadyLoaded method when script is not present", function(){
            expect(1);
            var url = "http://local.ft.com/null.js";
            ok(!FT._ads.utils.isScriptAlreadyLoaded(url), 'The function returns false when a script with the given url is not present in the page dom');
              }
        );
        test("isScriptAlreadyLoaded method when script is present", function(){
            expect(1);
            var url = location.protocol + "//"  + location.host + "/base/test/mocks/null.js",
                tag = document.createElement('script'),
                node = document.getElementsByTagName('script')[0];
            tag.setAttribute('src', url);
            node.parentNode.insertBefore(tag, node);
            ok(FT._ads.utils.isScriptAlreadyLoaded(url), "The function returns true when a script with the given url is present in the page dom");
            node.parentNode.removeChild(tag);
            }
        );
    }

    $(runTests);
}(window, document, jQuery));
