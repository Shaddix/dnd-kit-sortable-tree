import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import {
  TreeRoot,
  TreeRootWithChangeableItems,
  initialItems,
} from './components/tree/TreeRoot';
import {
  SimpleTreeItemWrapper,
  SortableTree,
  TreeItemComponentProps,
  TreeItems,
} from '../src';
import { WithInput } from './components/WithInput';

export default {
  title: 'Simple',
  component: TreeRoot,
} as ComponentMeta<typeof TreeRoot>;

const Template: ComponentStory<typeof TreeRoot> = (args) => (
  <TreeRoot {...args} />
);

export const Simple = Template.bind({});
Simple.args = {
  disableSorting: false,
  indicator: false,
  indentationWidth: 10,
};

export const Simple2 = Template.bind({});
Simple2.args = {
  disableSorting: false,
  indicator: false,
  indentationWidth: 20,
};

export const NoDropAnimation = Template.bind({});
NoDropAnimation.args = {
  sortableProps: {
    animateLayoutChanges: () => false,
  },
  dropAnimation: null,
};
export const NoNewRootChildren = Template.bind({});
NoNewRootChildren.args = {
  canRootHaveChildren: false,
};

export const VSCodeLike = Template.bind({});
VSCodeLike.args = {
  keepGhostInPlace: true,
};

export const Minimal = () => {
  const [items, setItems] = useState(initialMinimalData);
  return (
    <SortableTree
      items={items}
      onItemsChanged={setItems}
      {
        /*
         * You need to pass the component rendering a single item via TreeItemComponent props.
         * This component will receive the data via `props.item`.
         * In this example we inline the component, but in reality you should extract it into a const.
         */ ...{}
      }
      TreeItemComponent={React.forwardRef<
        HTMLDivElement,
        TreeItemComponentProps
      >((props, ref) => (
        <SimpleTreeItemWrapper {...props} ref={ref}>
          {/* HERE GOES THE ACTUAL CONTENT OF YOUR COMPONENT */}
          <div>{props.item.id}</div>
        </SimpleTreeItemWrapper>
      ))}
    />
  );
};
/*
 * Configure the tree data.
 */
const initialMinimalData: TreeItems<{}> = [
  { id: '1', children: [{ id: '4' }, { id: '5' }] },
  { id: '2' },
  { id: '3' },
];

export const MinimalViable = () => {
  const [items, setItems] = useState(initialViableMinimalData);
  return (
    <SortableTree
      items={items}
      onItemsChanged={setItems}
      TreeItemComponent={MinimalTreeItemComponent}
    />
  );
};
type MinimalTreeItemData = {
  value: string;
};
/*
 * Here's the component that will render a single row of your tree
 */
const MinimalTreeItemComponent = React.forwardRef<
  HTMLDivElement,
  TreeItemComponentProps<MinimalTreeItemData>
>((props, ref) => (
  <SimpleTreeItemWrapper {...props} ref={ref}>
    <div>{props.item.value}</div>
  </SimpleTreeItemWrapper>
));
/*
 * Configure the tree data.
 */
const initialViableMinimalData: TreeItems<MinimalTreeItemData> = [
  {
    id: 1,
    value: 'Jane',
    children: [
      { id: 4, value: 'John' },
      { id: 5, value: 'Sally' },
    ],
  },
  { id: 2, value: 'Fred', children: [{ id: 6, value: 'Eugene' }] },
  {
    id: 3,
    value: 'Helen',
    canHaveChildren: (dragItem) => (dragItem.id === 2 ? false : true),
  },
];
export { WithInput };

export const SimpleWithChangedItems: ComponentStory<typeof TreeRoot> = (
  args
) => {
  return <TreeRootWithChangeableItems {...args} />;
};
