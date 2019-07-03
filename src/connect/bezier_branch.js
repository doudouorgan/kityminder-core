/**
 * @fileOverview
 *
 * 提供折线相连的方法
 *
 * @author: techird
 * @copyright: Baidu FEX, 2014
 */

define(function (require, exports, module) {
    var kity = require('../core/kity');
    var connect = require('../core/connect');

    connect.register('bezier_branch', function (node, parent, connection) {

        // 连线起点和终点
        var po = parent.getLayoutVertexOut(),
            pi = node.getLayoutVertexIn();

        // 连线矢量和方向
        var v = parent.getLayoutVectorOut().normalize();

        var r = Math.round;
        var abs = Math.abs;

        var pathData = [];
        var startPoint = new kity.Point(r(po.x - 30), r(po.y - 20)),
            startOffsetPoint = new kity.Point(r(po.x - 30), r(po.y + 20));
        pathData.push('M', startPoint.x, startPoint.y);

        // 枝丫图
        if (abs(v.x) > abs(v.y)) {
            // x - direction
            var hx = (pi.x + startPoint.x) / 2;

            pathData.push('C', hx, startPoint.y, hx, pi.y, pi.x, pi.y);
            pathData.push('C', hx + (pi.y > po.y ? -1 : 1) * 30, pi.y, hx, startOffsetPoint.y, startOffsetPoint.x, startOffsetPoint.y);
            pathData.push('L', startPoint.x, startPoint.y);
            pathData.push('Z');
        } else {
            // y - direction
            var hy = (pi.y + po.y) / 2;
            pathData.push('C', po.x, hy, pi.x, hy, pi.x, pi.y);
        }

        connection.setMarker(null);
        connection.setPathData(pathData).fill(connection.node.getAttribute('stroke'));
    });
});
