import React, { useState } from 'react';
import './App.css';
import { SortableTree, TreeItems } from 'dnd-kit-sortable-tree';
import { TreeItem } from './components/TreeItem';
import type { TreeItemData } from './components/TreeItem';

export const initialItems: TreeItems<TreeItemData> = [
  {
    id: 'Home',
    children: [],
    text: 'Home1',
  },
  {
    id: 'Collections',
    text: 'Collections1',
    children: [
      { id: 'Spring', children: [], text: 'Spring1' },
      { id: 'Summer', children: [], text: 'Summer1' },
      { id: 'Fall', children: [], text: 'Fall1' },
      { id: 'Winter', children: [], text: 'Winter1' },
    ],
  },
  {
    id: 'About Us',
    text: 'About Us1',
    children: [],
  },
  {
    id: 'My Account',
    text: 'My Account1',
    children: [
      { id: 'Addresses', children: [], text: 'Addresses3' },
      { id: 'Order History', children: [], text: 'Order History2' },
    ],
  },
];

function App() {
  const [items, setItems] = useState(initialItems);
  return (
    <div className="App">
      <SortableTree<TreeItemData>
        collapsible
        items={items}
        onItemsChanged={setItems}
        TreeItemComponent={TreeItem}
      />
    </div>
  );
}

export default App;
