import React, { useState } from 'react';
import './App.css';
import { SortableTree } from 'dnd-kit-sortable-tree';
import { TreeItem } from './components/TreeItem';
export var initialItems = [
    {
        id: 'Home',
        children: [],
        text: 'Home1'
    },
    {
        id: 'Collections',
        text: 'Collections1',
        children: [
            { id: 'Spring', children: [], text: 'Spring1' },
            { id: 'Summer', children: [], text: 'Summer1' },
            { id: 'Fall', children: [], text: 'Fall1' },
            { id: 'Winter', children: [], text: 'Winter1' },
        ]
    },
    {
        id: 'About Us',
        text: 'About Us1',
        children: []
    },
    {
        id: 'My Account',
        text: 'My Account1',
        children: [
            { id: 'Addresses', children: [], text: 'Addresses3' },
            { id: 'Order History', children: [], text: 'Order History2' },
        ]
    },
];
function App() {
    var _a = useState(initialItems), items = _a[0], setItems = _a[1];
    return (React.createElement("div", { className: "App" },
        React.createElement(SortableTree, { collapsible: true, items: items, onItemsChanged: setItems, TreeItemComponent: TreeItem })));
}
export default App;
//# sourceMappingURL=App.js.map