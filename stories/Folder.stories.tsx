import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { FolderRoot } from './components/folder/FolderRoot';

export default {
  title: 'Folder',
  component: FolderRoot,
} as ComponentMeta<typeof FolderRoot>;

const Template: ComponentStory<typeof FolderRoot> = (args) => (
  <FolderRoot {...args} />
);

export const Folder = Template.bind({});
Folder.args = {
  disableSorting: false,
  indicator: false,
  indentationWidth: 10,
  hideCollapseButton: false,
};
