/**
 * Created with JetBrains WebStorm.
 * User: andrew.tekle-cadman
 * Date: 05/04/2013
 * Time: 16:31
 * To change this template use File | Settings | File Templates.
 */

/**
 * Created with JetBrains WebStorm.
 * User: andrew.tekle-cadman
 * Date: 25/03/13
 * Time: 11:12
 * To change this template use File | Settings | File Templates.
 */

/*jshint strict: false */

/*globals FT, clientAds */

/*members onVisibilityChange, enableVisibilitySupportForOlderBrowsers, pop,
 event, isVisible, type, addEventListener, onblur, onfocus, onfocusin,
 onfocusout, hasOwnProperty, detectPageVisibility, Refresh, refreshTime, runningTimer, log,
  startRefreshTimer, handleW3CVisibility, handleAlentyVisibility, getElementById, innerHTML,
  env,asset, handleRefreshLogic, name, pageVisibilityScope,decorateHandler, pageVisibilityScope,
 refreshDelayMs,pageRefresh,userInteracting,cookie, location,href,reloadWindow,userInteractionTimer,
 reload */

FT.Refresh = (function () {
    return {

        refreshTime: null,
        runningTimer: null,
        refreshDelayMs: 2000,

        /** handle refresh logic migrated from FT.advertising */
        handleRefreshLogic: function (obj, timeout) {
            clientAds.log("FT.Refresh.handleRefreshLogic(" + obj.name + ", " + timeout + ")");
            // TODO: no test case for this yet.
            timeout = timeout || 30 * 60 * 1000;  // give it 30 minutes
            if ((obj.name === 'refresh') && (FT.env.asset === 'page')) {
                this.refreshTime = timeout;
            }
        },

        /** startRefreshTimer logic transferred from FT.advertising namespace */
        startRefreshTimer: function (delay) {
            clientAds.log("FT.Refresh.startRefreshTimer(" + delay + ")");
            var scope = returnPreservedScope() || this;

            this.runningTimer = setTimeout(function () {
                // call doTrackRefresh from Track.js
                clientAds.log("refreshTimer callback()");
                scope.pageRefresh(delay);
            }, delay);
        },

        /**

        /** pageRefresh logic transferred from FT.advertising namespace */
        pageRefresh: function(delay) {
            var scope = returnPreservedScope() || this;
            if (!FT.userInteracting && FT.PageVisibility.isPageVisible()) {
                document.cookie = "TRK_REF=" + window.location.href;
                setTimeout(function () { scope.reloadWindow(false); }, this.refreshDelayMs);
            } else {
                // Kick page refresh timer off again
                scope.userInteractionTimer = setTimeout(function () {
                    scope.pageRefresh(delay);
                }, delay);

            }

        },

        /** reloadWindow logic transferred from FT.advertising namespace */
        reloadWindow: function(b) {
            window.location.reload(b);
        }

    };

}());


            // var scope = returnPreservedScope() || this;
            // if (FT.PageVisibility.isPageVisible) {
            //     //now we stop the timer if it is running down
            //     if (scope.runningTimer !== null){
            //         clearTimeout(scope.runningTimer);
            //     }
            //     clientAds.log('The page has lost visibility.');
            // } else {
            //     //restart the timer when visibility is regained
            //     if (scope.refreshTime !== null)  {
            //         scope.startRefreshTimer(scope.refreshTime);
            //     }
            //     clientAds.log('The page has gained visibility.');
            // }
