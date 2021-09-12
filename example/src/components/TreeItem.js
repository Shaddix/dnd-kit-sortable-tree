import { __assign, __rest } from "tslib";
import clsx from 'clsx';
import React, { forwardRef } from 'react';
import styles from './TreeItem.module.css';
export var TreeItem = forwardRef(function (props, ref) {
    var childCount = props.childCount, clone = props.clone, depth = props.depth, disableSelection = props.disableSelection, disableInteraction = props.disableInteraction, ghost = props.ghost, handleProps = props.handleProps, indentationWidth = props.indentationWidth, indicator = props.indicator, collapsed = props.collapsed, onCollapse = props.onCollapse, onRemove = props.onRemove, item = props.item, wrapperRef = props.wrapperRef, style = props.style, rest = __rest(props, ["childCount", "clone", "depth", "disableSelection", "disableInteraction", "ghost", "handleProps", "indentationWidth", "indicator", "collapsed", "onCollapse", "onRemove", "item", "wrapperRef", "style"]);
    if (item.text === 'Spring1') {
        console.log('qwe', props);
    }
    return (React.createElement("li", __assign({ className: clsx(styles.Wrapper, clone && styles.clone, ghost && styles.ghost, indicator && styles.indicator, disableSelection && styles.disableSelection, disableInteraction && styles.disableInteraction), ref: wrapperRef }, rest, { style: __assign(__assign({}, style), { paddingLeft: indentationWidth * depth + "px" }) }),
        React.createElement("div", { className: styles.TreeItem, ref: ref },
            React.createElement("button", __assign({}, handleProps), "..."),
            onCollapse && (React.createElement("button", { onClick: onCollapse, className: clsx(styles.Collapse, collapsed && styles.collapsed) }, collapseIcon)),
            React.createElement("span", { className: styles.Text }, item.text),
            !clone && onRemove && React.createElement("button", { onClick: onRemove }, "X"),
            clone && childCount && childCount > 1 ? (React.createElement("span", { className: styles.Count }, childCount)) : null)));
});
var collapseIcon = (React.createElement("svg", { width: "10", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 70 41" },
    React.createElement("path", { d: "M30.76 39.2402C31.885 40.3638 33.41 40.995 35 40.995C36.59 40.995 38.115 40.3638 39.24 39.2402L68.24 10.2402C69.2998 9.10284 69.8768 7.59846 69.8494 6.04406C69.822 4.48965 69.1923 3.00657 68.093 1.90726C66.9937 0.807959 65.5106 0.178263 63.9562 0.150837C62.4018 0.123411 60.8974 0.700397 59.76 1.76024L35 26.5102L10.24 1.76024C9.10259 0.700397 7.59822 0.123411 6.04381 0.150837C4.4894 0.178263 3.00632 0.807959 1.90702 1.90726C0.807714 3.00657 0.178019 4.48965 0.150593 6.04406C0.123167 7.59846 0.700153 9.10284 1.75999 10.2402L30.76 39.2402Z" })));
//# sourceMappingURL=TreeItem.js.map