import { TreeItem } from './TreeItem';
import React, { useState } from 'react';
import { SortableTree, TreeItems } from '../../../src';
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
    text: 'My Account01',
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
};

export const TreeRoot: React.FC<Props> = (props) => {
  const [items, setItems] = useState(initialItems);

  return (
    <SortableTree
      indentationWidth={props.indentationWidth}
      indicator={props.indicator}
      disableSorting={props.disableSorting}
      items={items}
      onItemsChanged={setItems}
      TreeItemComponent={TreeItem}
    />
  );
};
