import {
  SortableTree,
  SortableTreeProps as SortableTreePropsInner,
} from './SortableTree';
import type {
  TreeItems as TreeItemsInner,
  TreeItemComponentProps as TreeItemComponentPropsInner,
} from './types';

export type TreeItemComponentProps<T> = TreeItemComponentPropsInner<T>;
export type SortableTreeProps<T> = SortableTreePropsInner<T>;
export type TreeItems<T> = TreeItemsInner<T>;
export { SortableTree };
