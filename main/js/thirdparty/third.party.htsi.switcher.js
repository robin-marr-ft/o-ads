  /**
 * @fileOverview
 * Third party library for use with google publisher tags.
 *
 * @author Robin Marr, robin.marr@ft.com
 */

(function (win, doc, undefined) {
    "use strict";

    function switcher() {
      var mode = FT.ads.config('ftads:mode');
      if (mode === 'gpt') {
          FT.env.adCall = function () {
            FT.ads.slots.initSlot.apply(FT.ads.slots, arguments);
          };

          // for HTSI
          FT.env.advert = function () {
            FT.ads.slots.initSlot.apply(FT.ads.slots, arguments);
          };

          FT.ads.config('formats', {
            banlb: {
              sizes: [[728,90], [468,60], [970,90]],
              outOfPage: true
            },
            mpu: {
              sizes: [[300,250],[336,280]]
            },
            mpu2: {
              sizes: [[300,250],[336,280]]
            },
            hlfmpu: {
              sizes: [[300,600],[336,850],[300,250],[336,280]]
            }
          });

          FT.ads.config('collapseEmpty', 'ft');
          FT.ads.config('krux', {id: 'IgnVxTJW'});

          FT.ads.gpt.init();
      }
    }

    switcher();
}(window, document));
