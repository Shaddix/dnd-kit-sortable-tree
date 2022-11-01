import React, { useState, useCallback } from 'react';
import { SortableTree, TreeItems } from '../../../src';
import { FolderTreeItem } from './FolderTreeItem';
import { TreeItemData } from '../TreeItemData';

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
      {
        id: 'Summer (sorting disabled)',
        children: [],
        disableSorting: true,
        text: 'Summer1',
        date: new Date(),
      },
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

export type Props = {
  indentationWidth: number;
  indicator: boolean;
  disableSorting: boolean;
  hideCollapseButton: boolean;
};

export const FolderRoot: React.FC<Props> = (props) => {
  const [items, setItems] = useState(initialItems);
  return (
    <SortableTree
      {...props}
      items={items}
      onItemsChanged={useCallback(
        (newItems, reason) => {
          console.log('change reason', reason);
          setItems(newItems);
        },
        [setItems]
      )}
      TreeItemComponent={FolderTreeItem}
    />
  );
};
