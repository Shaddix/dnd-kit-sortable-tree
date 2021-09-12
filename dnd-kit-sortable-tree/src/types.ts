import type { MutableRefObject, RefAttributes } from 'react';

export type TreeItem<T> = {
  children: TreeItem<T>[];
  id: string;
  collapsed?: boolean;
} & T;

export type TreeItems<T> = TreeItem<T>[];
export type TreeItemComponentProps<T> = {
  item: TreeItem<T>;
  childCount?: number;
  clone?: boolean;
  collapsed?: boolean;
  depth: number;
  disableInteraction?: boolean;
  disableSelection?: boolean;
  ghost?: boolean;
  handleProps?: any;
  indicator?: boolean;
  indentationWidth: number;
  style?: React.CSSProperties;
  onCollapse?(): void;
  onRemove?(): void;
  wrapperRef?(node: HTMLLIElement): void;
};
export type TreeItemComponentType<T> = React.FC<
  TreeItemComponentProps<T> & RefAttributes<HTMLDivElement>
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
