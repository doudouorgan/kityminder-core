/**
 * @fileOverview
 *
 * 圆弧连线
 *
 * @author: techird
 * @copyright: Baidu FEX, 2014
 */

define(function (require, exports, module) {
    var kity = require('../core/kity');
    var connect = require('../core/connect');

    var connectMarker = new kity.Marker().pipe(function () {
        var r = 7;
        var dot = new kity.Circle(r - 1);
        this.addShape(dot);
        this.setRef(r - 1, 0).setViewBox(-r, -r, r + r, r + r).setWidth(r).setHeight(r);
        this.dot = dot;
        this.node.setAttribute('markerUnits', 'userSpaceOnUse');
    });

    connect.register('arc_branch', function (node, parent, connection, width, color) {

        var box = node.getLayoutBox(),
            pBox = parent.getLayoutBox();

        var offsetWidth = 15;

        var end, vector;
        var abs = Math.abs;
        var pathData = [];
        var side = box.x > pBox.x ? 'right' : 'left';

        node.getMinder().getPaper().addResource(connectMarker);

        var start1 = new kity.Point(pBox.cx - offsetWidth, pBox.cy),
            start2 = new kity.Point(pBox.cx + offsetWidth, pBox.cy);
        end = side === 'left' ?
            new kity.Point(box.right + node.getStyle('main-connect-margin') || 2, box.cy) :
            new kity.Point(box.left - node.getStyle('main-connect-margin') || 2, box.cy);

        vector = kity.Vector.fromPoints(new kity.Point(pBox.cx, pBox.cy), end);
        pathData.push('M', start1);
        pathData.push('A', abs(vector.x), abs(vector.y), 0, 0, (vector.x * vector.y > 0 ? 0 : 1), end);
        pathData.push('A', abs(vector.x), abs(vector.y), 0, 0, (vector.x * vector.y > 0 ? 1 : 0), start2.x, start2.y);
        pathData.push('Z');

        connection.setMarker(connectMarker);
        connectMarker.dot.fill(node.getStyle('color-type') ? 'transparent' : color);
        connection.setPathData(pathData).fill(connection.node.getAttribute('stroke'));
    });
});
