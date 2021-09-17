import type { MutableRefObject, RefAttributes } from 'react';

export type TreeItem<T> = {
  children?: TreeItem<T>[];
  id: string;
  collapsed?: boolean;
} & T;

export type TreeItems<T> = TreeItem<T>[];
export type TreeItemComponentProps<T> = {
  item: TreeItem<T>;
  childCount?: number;
  /*
  Ghost and Clone are two properties that are set to True for an item that is being dragged.
  Item that is being dragged is shown in 2 places:
  - as an overlay item (for which clone=true, ghost=false)
  - as an item within a tree (for which ghost=true, clone=false)
   */
  clone?: boolean;
  /*
  Ghost and Clone are two properties that are set to True for an item that is being dragged.
  Item that is being dragged is shown in 2 places:
  - as an overlay item (for which clone=true, ghost=false)
  - as an item within a tree (for which ghost=true, clone=false)
   */
  ghost?: boolean;
  /*
  True if item has children which are not shown (collapsed)
   */
  collapsed?: boolean;
  /*
  The level of depth current item is at. Should be used to calculate paddingLeft for an item
  (by using depth * indentationWidth)
   */
  depth: number;
  /*
  While dragging it makes sense to disable selection/interaction for all other items
  (to prevent unneeded text selection).
  So, it's true for all nodes that are NOT dragged (if some other is being dragged)
   */
  disableInteraction?: boolean;
  /*
  While dragging it makes sense to disable selection/interaction for all other items
  (to prevent unneeded text selection)
  So, it's true for all nodes that are NOT dragged (if some other is being dragged)
   */
  disableSelection?: boolean;
  handleProps?: any;
  indicator?: boolean;
  indentationWidth: number;
  style?: React.CSSProperties;
  onCollapse?(): void;
  onRemove?(): void;
  wrapperRef?(node: HTMLLIElement): void;
};
export type TreeItemComponentType<T, TElement extends HTMLElement> = React.FC<
  TreeItemComponentProps<T> & RefAttributes<TElement>
>;

export type FlattenedItem<T> = {
  parentId: null | string;
  depth: number;
  index: number;
} & TreeItem<T>;

export type SensorContext<T> = MutableRefObject<{
  items: FlattenedItem<T>[];
  offset: number;
}>;
