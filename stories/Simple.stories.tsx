import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { TreeRoot } from './components/tree/TreeRoot';

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
