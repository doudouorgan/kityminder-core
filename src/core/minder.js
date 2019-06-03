/**
 * @fileOverview
 *
 * KityMinder 类，暴露在 window 上的唯一变量
 *
 * @author: techird
 * @copyright: Baidu FEX, 2014
 */
define(function (require, exports, module) {
    var kity = require('./kity');
    var utils = require('./utils');

    var _initHooks = [];

    var Minder = kity.createClass('Minder', {
        constructor: function (options) {
            this._options = utils.extend({}, options);
            this.colorPool= ['#FAC6D2', '#F384AE', '#F15A23', '#C41230', '#7DCDC2', '#55BEED', '#31A8E0', '#0076B3', '#B296C7', '#662C90'
                , '#C1D18A', '#80BC42', '#00A650', '#16884A', '#E9D4A7', '#FDB813', '#F68B1F', '#F1753F', '#9F8759', '#924517', '#CFD0D2'
                , '#98A2AB', '#8A8B8F', '#381E11'];

            var initHooks = _initHooks.slice();

            var initHook;
            while (initHooks.length) {
                initHook = initHooks.shift();
                if (typeof(initHook) == 'function') {
                    initHook.call(this, this._options);
                }
            }

            this.fire('finishInitHook');
        }
    });

    Minder.version = '1.4.43';

    Minder.registerInitHook = function (hook) {
        _initHooks.push(hook);
    };

    module.exports = Minder;
});
