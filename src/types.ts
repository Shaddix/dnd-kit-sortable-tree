import type { MutableRefObject, RefAttributes } from 'react';

export type TreeItem<T> = {
  children?: TreeItem<T>[];
  id: string;
  /*
  Default: false.
   */
  collapsed?: boolean;

  /*
  If false, doesn't allow to drag&drop nodes so that they become children of current node.
  If you are showing files&directories it makes sense to set this to `true` for folders, and `false` for files.
  Default: true.
   */
  canHaveChildren?: boolean;
} & T;

export type TreeItems<T extends Record<string, any>> = TreeItem<T>[];
export type TreeItemComponentProps<T = {}> = {
  item: TreeItem<T>;
  parent: FlattenedItem<T> | null;

  /*
  Total number of children (including nested children)
   */
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

  /*
  Property is passed through from <SortableTree> props.
  True if sorting is disabled (so, drag handle should not be shown)
   */
  disableSorting?: boolean;
  /*
  True if the item is the last one among it's parent children.
  Might be important for e.g. FolderTreeItemWrapper to show correct images.
   */
  isLast: boolean;

  /*
  If false, dragging is handled automatically (whole child node is a drag Handle).
  If true, the children should handle dragging manually (by assigning handleProps to some div that will be the Handle).
  Default: false.
 */
  manualDrag?: boolean;

  /*
  If true, Collapse button is not shown within the Wrapper (implies, that it's shown in Children)
  If false, Collapse button is show as part of Wrapper. Styling could be adjusted via CSS.
  Default: false.
   */
  hideCollapseButton?: boolean;

  /*
  If false, click on the whole item triggers collapse/expand.
  If true, this behavior is disabled and you should either rely on default CollapseButton (managed by `hideCollapseButton` props)
  or you should call `collapse` method yourself when needed.
  Default: false.
   */
  disableCollapseOnItemClick?: boolean;

  /*
  ONLY makes sens if `manualDrag` is true! If `manualDrag` is false `showDragHandle` is automatically false.
  If true, the special drag Handle is shown within a Wrapper.
  If false, it's up to the developer to either handle drag by himself, or use automatic dragging (by ensuring that `manualDrag` is false)
   */
  showDragHandle?: boolean;

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
  /*
  How deep in the tree is current item.
  0 - means the item is on the Root level,
  1 - item is child of Root level parent,
  etc.
   */
  depth: number;
  index: number;

  /*
  Is item the last one on it's deep level.
  This could be important for visualizing the depth level (e.g. in case of FolderTreeItemWrapper)
   */
  isLast: boolean;
  parent: FlattenedItem<T> | null;
} & TreeItem<T>;

export type SensorContext<T> = MutableRefObject<{
  items: FlattenedItem<T>[];
  offset: number;
}>;
