import React, { CSSProperties, HTMLAttributes } from 'react';
import { AnimateLayoutChanges, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { iOS } from './utilities';
import type { TreeItem, TreeItemComponentType } from './types';

export interface TreeItemProps<T> extends HTMLAttributes<HTMLLIElement> {
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
  item: TreeItem<T>;

  onCollapse?(): void;

  onRemove?(): void;

  wrapperRef?(node: HTMLLIElement): void;
}

const animateLayoutChanges: AnimateLayoutChanges = ({
  isSorting,
  isDragging,
}) => (isSorting || isDragging ? false : true);

type SortableTreeItemProps<T> = TreeItemProps<T> & {
  id: string;
  TreeItemComponent: TreeItemComponentType<T>;
};

export function SortableTreeItem<T>({
  id,
  depth,
  TreeItemComponent,
  ...props
}: SortableTreeItemProps<T>) {
  const {
    attributes,
    isDragging,
    isSorting,
    listeners,
    setDraggableNodeRef,
    setDroppableNodeRef,
    transform,
    transition,
  } = useSortable({
    id,
    animateLayoutChanges,
  });
  const style: CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition: transition ?? undefined,
  };

  return (
    <TreeItemComponent
      ref={setDraggableNodeRef}
      wrapperRef={setDroppableNodeRef}
      style={style}
      depth={depth}
      ghost={isDragging}
      disableSelection={iOS}
      disableInteraction={isSorting}
      handleProps={{
        ...attributes,
        ...listeners,
      }}
      {...props}
    />
  );
}
