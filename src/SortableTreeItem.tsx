import React, { CSSProperties, HTMLAttributes, useMemo } from 'react';
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
  onCollapse?(id: string): void;

  onRemove?(id: string): void;

  wrapperRef?(node: HTMLLIElement): void;
}

const animateLayoutChanges: AnimateLayoutChanges = ({
  isSorting,
  isDragging,
}) => (isSorting || isDragging ? false : true);

type SortableTreeItemProps<
  T,
  TElement extends HTMLElement
> = TreeItemProps<T> & {
  id: string;
  TreeItemComponent: TreeItemComponentType<T, TElement>;
  disableSorting?: boolean;
};

const SortableTreeItemNotMemoized = function SortableTreeItem<
  T,
  TElement extends HTMLElement
>({
  id,
  depth,
  isLast,
  TreeItemComponent,
  parent,
  disableSorting,
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
    disabled: disableSorting,
  });
  const style: CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition: transition ?? undefined,
  };
  const localCollapse = useMemo(() => {
    if (!props.onCollapse) return undefined;
    return () => props.onCollapse?.(props.item.id);
  }, [props.item.id, props.onCollapse]);

  const localRemove = useMemo(() => {
    if (!props.onRemove) return undefined;

    return () => props.onRemove?.(props.item.id);
  }, [props.item.id, props.onRemove]);
  return (
    <TreeItemComponent
      {...props}
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
      onCollapse={localCollapse}
      onRemove={(event) => {event.stopPropagation(); localRemove(); }}
      disableSorting={disableSorting}
    />
  );
};

export const SortableTreeItem = React.memo(
  SortableTreeItemNotMemoized
) as typeof SortableTreeItemNotMemoized;
