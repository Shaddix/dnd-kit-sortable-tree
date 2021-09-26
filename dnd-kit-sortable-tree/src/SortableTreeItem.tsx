import React, { CSSProperties, HTMLAttributes } from 'react';
import { AnimateLayoutChanges, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { iOS } from './utilities';
import type { FlattenedItem, TreeItem, TreeItemComponentType } from './types';

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
  isLast: boolean;
  parent: FlattenedItem<T> | null;
  onCollapse?(): void;

  onRemove?(): void;

  wrapperRef?(node: HTMLLIElement): void;
}

const animateLayoutChanges: AnimateLayoutChanges = ({
  isSorting,
  isDragging,
}) => (isSorting || isDragging ? false : true);

type SortableTreeItemProps<
  T,
  TElement extends HTMLElement,
> = TreeItemProps<T> & {
  id: string;
  TreeItemComponent: TreeItemComponentType<T, TElement>;
};

export function SortableTreeItem<T, TElement extends HTMLElement>({
  id,
  depth,
  isLast,
  TreeItemComponent,
  parent,
  ...props
}: SortableTreeItemProps<T, TElement>) {
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
      isLast={isLast}
      parent={parent}
      handleProps={{
        ...attributes,
        ...listeners,
      }}
      {...props}
    />
  );
}
