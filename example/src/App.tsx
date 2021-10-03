import React, { useState } from 'react';
import './App.css';
import { SortableTree, TreeItems } from 'dnd-kit-sortable-tree';
import { TreeItem } from './components/TreeItem';
import type { TreeItemData } from './components/TreeItem';

export const initialItems2: TreeItems<TreeItemData> = [
  {
    id: 'Home1',
    children: [],
    text: 'Home1',
    date: new Date(),
    canHaveChildren: false,
  },
  {
    id: 'Home2',
    children: [],
    text: 'Home2',
    date: new Date(),
    canHaveChildren: false,
  },
  {
    id: 'Home3',
    children: [],
    text: 'Home3',
    date: new Date(),
    canHaveChildren: false,
  },
];
export const initialItems: TreeItems<TreeItemData> = [
  {
    id: 'Home',
    children: [],
    text: 'Home1',
    date: new Date(),
  },
  {
    id: 'Collections',
    text: 'Collections1',
    date: new Date(),
    children: [
      {
        id: 'Spring',
        children: [],
        text: 'Spring1',
        date: new Date(),
        canHaveChildren: false,
      },
      { id: 'Summer', children: [], text: 'Summer1', date: new Date() },
      {
        id: 'Fall',
        children: [],
        text: 'Fall1',
        date: new Date(),
        canHaveChildren: false,
      },
      { id: 'Winter', children: [], text: 'Winter1', date: new Date() },
    ],
  },
  {
    id: 'About Us',
    text: 'About Us1',
    date: new Date(),
    children: [],
  },
  {
    id: 'My Account',
    text: 'My Account1',
    date: new Date(),
    children: [
      { id: 'Addresses', children: [], text: 'Addresses3', date: new Date() },
      {
        id: 'Order History',
        children: [],
        text: 'Order History2',
        date: new Date(),
      },
    ],
  },
];

function App() {
  const [items, setItems] = useState(initialItems);
  return (
    <div className="App">
      <SortableTree
        collapsible
        indentationWidth={10}
        // removable
        items={items}
        onItemsChanged={setItems}
        TreeItemComponent={TreeItem}
      />
    </div>
  );
}

export default App;
