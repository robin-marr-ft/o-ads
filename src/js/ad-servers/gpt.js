/*globals googletag: true */

/**
* @fileOverview
* Third party library for use with google publisher tags.
*
* @author Robin Marr, robin.marr@ft.com
*/

/**
* The FT.ads.gpt object
* @name gpt
* @memberof FT.ads
* @function
*/
"use strict";
var ads;
var proto = GPT.prototype;
var slots = require('../slots');
/**
* The GPT class defines an FT.ads.gpt instance.
* @class
* @constructor
*/
function GPT() {
    return this;
}
/**
* Register methods with the publisher services to display the ad via GPT
* sets slot targeting and collapse configuration
* @name defineSlot
* @memberof GPT
* @lends GPT
*/
proto.defineSlot = function (slotName) {
    var context = this,
        slot = ads.slots[slotName],
        slotId = slotName + '-gpt',
        wrap = ads.slots.addContainer(slot.container, slotId),
        responsive = ads.config('responsive'),
        canonical = context.canonical = ads.config('canonical');

    ads.utils.addClass(wrap, 'wrap');
    googletag.cmd.push(function (context, slot, slotName, slotId) {
        return function () {
            var currentSize;
            if(ads.utils.isObject(responsive) && ads.utils.isObject(slot.config.sizes)) {
                currentSize = slot.config.sizes[context.responsive()];
                var sizeMapping = context.buildSizeMapping(responsive, slot.config.sizes);
                slot.gptSlot = googletag.defineSlot(context.getUnitName(slotName), [0,0], slotId);
                slot.gptSlot.defineSizeMapping(sizeMapping);
            } else {
                currentSize = slot.config.sizes;
                slot.gptSlot = googletag.defineSlot(context.getUnitName(slotName), slot.config.sizes, slotId);
            }
            slot.gptSlot.addService(googletag.pubads());

            context.setSlotCollapseEmpty(slot.gptSlot, slot.config);
            context.setSlotTargeting(slot.gptSlot, slot.config.targeting);

            context.setSlotURL(slot.gptSlot, canonical);
            context.addCompanionService(slot);
            if (currentSize !== false) {
              googletag.cmd.push(googletag.display(slotId));
            }

        };
    }(this, slot, slotName, slotId));

    if (slot.config.outOfPage) {
        googletag.cmd.push(
            this.defineOutOfPage(this, slotName)
        );
    }

    return slot;
};

/**
* creates a container for an out of page ad
* Calls the GPT module to define the slot in the GPT service
* @name defineOutOfPage
* @memberof Slots
* @lends Slots
*/
proto.defineOutOfPage = function (context, slotName) {
    var slot = ads.slots[slotName],
        slotId = slotName + '-oop';

    ads.slots.addContainer(slot.container, slotId);
    return function() {
        var oopSlot;

        oopSlot = googletag.defineOutOfPageSlot(context.getUnitName(slotName), slotId);
        oopSlot.addService(googletag.pubads());

        slot.oopSlot = oopSlot;

        context.setSlotTargeting(oopSlot, slot.config.targeting);
        context.setSlotURL(oopSlot, context.canonical);

        googletag.cmd.push(googletag.display(slotId));
    };
};

/**
* Given the slot name will return the GPT unit name for the slot.
* the unit name is made up of network, dfp_site, dfp_zone, slot name
* @name getUnitName
* @memberof GPT
* @lends GPT
*/
proto.getUnitName = function (slotName) {
    var unitName,
        gptUnitName = ads.config('gptUnitName'),
        site = ads.config('dfp_site'),
        zone = ads.config('dfp_zone');

    if (ads.utils.isNonEmptyString(gptUnitName)) {
        unitName = gptUnitName;
    } else {
        unitName = '/' + ads.config('network');
        unitName += ads.utils.isNonEmptyString(site)  ? '/' + site : '';
        unitName += ads.utils.isNonEmptyString(zone ) ? '/' + zone : '';
    }
    return unitName;
};

/**
* Adds key values from FT.ads.targeting to GPT ad calls
* @name setPageTargeting
* @memberof GPT
* @lends GPT
*/
proto.setPageTargeting = function () {
    var param,
        targeting = ads.targeting();

    function setTargeting(key, value) {
        return function () {
            googletag.pubads().setTargeting(key, value);
        };
    }

    for (param in targeting) {
        googletag.cmd.push(setTargeting(param, targeting[param]));
    }

    return targeting;
};

/**
* Add a companion service to the GPT slot if companions are on and the slot
* configuration doesn't exclude the slot
* @name addCompanionService
* @memberof GPT
* @lends GPT
*/
proto.addCompanionService = function (slot) {
    if (ads.config('companions') && slot.config.companion !== false) {
        slot.gptSlot.addService(googletag.companionAds());
    }
    return slot;
};

/**
* Add a companion service to the GPT slot if companions are on and the slot
* configuration doesn't exclude the slot
* @name addCompanionService
* @memberof GPT
* @lends GPT
*/
proto.updateCorrelator = function (slot) {
    googletag.cmd.push(function () {
        googletag.pubads().updateCorrelator();
    });
};

proto.refresh = function (slotsForRefresh) {
    var slot, slots = ads.slots;
    slotsForRefresh = slotsForRefresh || [];
    if ( slotsForRefresh.length === 0 ) {
        for (slot in slots) {
            slot = slots[slot];
            if (slot.gptSlot && slot.timer === undefined) {
                slot.gptSlot.setTargeting('rfrsh', 'true');
                slotsForRefresh.push(slot.gptSlot);
            }
        }
    }
    googletag.pubads().refresh(slotsForRefresh);
};

/**
 * Starts a timer to refresh all ads on the page after
 * a time specified in config refreshTime, maximum number of
 * refreshes defaults to infinity but can be set via the
 * maxRefresh config property
 * @name setPageRefresh
 * @memberof GPT
 * @lends GPT

*/
proto.startRefresh = function () {
    var refreshConfig = ads.config('refresh') || {},
        pageType = ads.metadata.getPageType(),
        time = (refreshConfig[pageType] && refreshConfig[pageType].time) || refreshConfig.time || false,
        max = (refreshConfig[pageType] && refreshConfig[pageType].max) || refreshConfig.max || 0;

    if (time) {
        this.refreshTimer = ads.utils.timers.create(time, function() {
            ads.gpt.refresh();
        }, max);
    }
};

proto.pauseRefresh = function  () {
    if (this.refreshTimer) {
        this.refreshTimer.pause();
    }
};

proto.resumeRefresh = function  () {
    if (this.refreshTimer) {
        this.refreshTimer.resume();
    }
};

proto.stopRefresh = function  () {
    if (this.refreshTimer) {
        this.refreshTimer.stop();
    }
};

/**
* Sets the GPT collapse empty mode for the page
* values can be 'after', 'before', 'never', 'ft'
* after as in after ads have rendered is the default
* true is synonymous with before
* false is synonymous with never
* @name setPageTargeting
* @memberof GPT
* @lends GPT
*/
proto.setPageCollapseEmpty = function () {
    var mode = ads.config('collapseEmpty');

    if (mode === 'after' || mode === undefined) {
        mode = undefined;
    } else if (mode === 'before' || mode === true) {
        mode = true;
    } else if (mode === 'never' || mode === false) {
        mode = false;
    }
    googletag.cmd.push( function () {
        googletag.pubads().collapseEmptyDivs(mode);
    });
    return mode;
};

/**
* Enables video ads
* @name enableVideo
* @memberof GPT
* @lends GPT
*/
proto.enableVideo = function () {
    if (ads.config('video'))   {
        /**
        * In order for the video companion service to work on mobile devices we need to attach the GPT Proxy script
        */
        var url = 'http://s0.2mdn.net/instream/html5/gpt_proxy.js';
        if (!ads.utils.isScriptAlreadyLoaded(url)){
            ads.utils.attach(url, true);
        }
        googletag.pubads().enableVideoAds();
    }
};


/**
* When companions are enabled we delay the rendering of ad slots until
* either a master is returned or all slots are returned without a master
* @name enableCompanions
* @memberof GPT
* @lends GPT
*/
proto.enableCompanions = function () {
    if (ads.config('companions'))   {
        googletag.pubads().disableInitialLoad();
        googletag.companionAds().setRefreshUnfilledSlots(true);
    }
};

proto.buildSizeMapping = function (viewports, slotSizes) {
  var size, viewport,
    mapping = googletag.sizeMapping();
  for ( viewport in slotSizes) {
    if (slotSizes[viewport]) {
      mapping.addSize(viewports[viewport], slotSizes[viewport]);
    }
  }

  mapping = mapping.build();
  return mapping;
};

/**
* Sets the GPT collapse empty mode for a given slot
* values can be 'after', 'before', 'never'
* after as in after ads have rendered is the default
* true is synonymous with before
* false is synonymous with never
* @name setPageTargeting
* @memberof GPT
* @lends GPT
*/
proto.setSlotCollapseEmpty = function (gptSlot, config) {
    var globalMode = ads.config('collapseEmpty'),
        mode = config.collapseEmpty;

    if (mode === true || mode === 'after') {
        gptSlot.setCollapseEmptyDiv(true);
    } else if (mode === 'before') {
        gptSlot.setCollapseEmptyDiv(true, true);
    } else if (mode === false || mode === 'never') {
        gptSlot.setCollapseEmptyDiv(false);
    }
    return mode;
};

/**
* Sets canonical url to be sent to google
* prevents later url changes via javascript from breaking the ads
* @name setSlotURL
* @memberof GPT
* @lends GPT
*/
proto.setSlotURL = function(gptSlot, url) {
    if (ads.utils.isNonEmptyString(url)) {
        gptSlot.set("page_url", url);
    }
    return gptSlot;
};

/**
* Adds key values from a given targetingObj to a given GPT ad slot
* @name setSlotTargeting
* @memberof GPT
* @lends GPT
*/
proto.setSlotTargeting = function (gptSlot, targetingObj) {
    if (ads.utils.isPlainObject(targetingObj)) {
        var targetKey;
        for (targetKey in targetingObj) {
            if (targetingObj.hasOwnProperty(targetKey)) {
                gptSlot.setTargeting(targetKey, targetingObj[targetKey]);
            }
        }
    }
};


/**
* Initialises GPT on the page
* @name setSlotTargeting
* @memberof GPT
* @lends GPT
*/
proto.init = function (impl) {
    ads = impl;
    if (!window.googletag){
        // set up a place holder for the gpt code downloaded from google
        window.googletag = {};
        // this is a command queue used by GPT any methods added to it will be
        // executed when GPT code is available, if GPT is already available they
        // will be executed immediately
        window.googletag.cmd = [];
    }
    var context = this,
    responsive = ads.config('responsive');
    ads.utils.attach('//www.googletagservices.com/tag/js/gpt.js', true);
    this.setPageTargeting();
    //TODO: this is FT specific content needs to be removed
    if (window.FT && FT.env && (!ads.utils.isFunction(FT.env.refreshCancelFilter) || !FT.env.refreshCancelFilter())) {
          this.startRefresh();
     }

    function onViewportChange(viewport){
        var slot, slotName, slots = ads.slots, slotsForRefresh = [];
        for (slotName in slots) {
            slot = slots[slotName];
            if (slot.gptSlot && ads.utils.isObject(slot.config.sizes)) {
                if (slot.config.sizes[viewport] === false) {
                    slot.collapse();
                } else {
                    if (!slot.isDisplayed) {
                      slot.isDisplayed = true;
                      googletag.display(slot.gptSlot.getSlotId().getDomId());
                    } else {
                      slotsForRefresh.push(slot.gptSlot);
                    }
                    slot.uncollapse();
                }
            }
        }

        if (!!slotsForRefresh.length) {
          context.refresh(slotsForRefresh);
        }
    }

    if ( ads.utils.isObject(responsive) ) {
        this.responsive = ads.utils.responsive(responsive, onViewportChange);
    }

    this.setPageCollapseEmpty();

    googletag.cmd.push(function () {
        context.enableVideo();
        context.enableCompanions();
        googletag.pubads().enableAsyncRendering();
        googletag.pubads().addEventListener('slotRenderEnded', function(event) {
            if (ads.utils.isFunction(ads.renderEnded)) {
                var gptSlotId = event.slot.getSlotId();
                var domId = gptSlotId.getDomId().split('-');
                var iframeId = 'google_ads_iframe_' + gptSlotId.getId();

                event.iframe = document.getElementById(iframeId);
                var name = event.name = domId[0];
                event.slotType = domId[1];
                event.slot = ads.slots[name];
                ads.renderEnded(event);
            }
        });
        googletag.enableServices();
    });

    return this;
};

module.exports = new GPT();
