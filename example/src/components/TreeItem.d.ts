import React from 'react';
import type { TreeItemComponentProps } from 'dnd-kit-sortable-tree';
export declare type TreeItemData = {
    text: string;
};
export declare const TreeItem: React.ForwardRefExoticComponent<TreeItemComponentProps<TreeItemData> & React.RefAttributes<HTMLDivElement>>;
