import clsx from 'clsx';
import React, { forwardRef } from 'react';
import type {
  TreeItemComponentType,
  TreeItemComponentProps,
  FlattenedItem,
} from '../../types';
import './FolderTreeItemWrapper.css';

function flattenParents<T>(
  parent: FlattenedItem<T> | null,
): FlattenedItem<T>[] {
  if (!parent) return [];
  return [...flattenParents(parent.parent), parent];
}

export const FolderTreeItemWrapper: TreeItemComponentType<{}, HTMLDivElement> =
  forwardRef<HTMLDivElement, TreeItemComponentProps<{}>>((props, ref) => {
    const {
      clone,
      depth,
      disableSelection,
      disableInteraction,
      ghost,
      handleProps,
      indentationWidth,
      indicator,
      collapsed,
      onCollapse,
      onRemove,
      item,
      wrapperRef,
      style,
      isLast,
      parent,
      ...rest
    } = props;
    const flattenedParents = flattenParents(parent);
    return (
      <li
        className={clsx(
          'dnd-sortable-tree_folder_wrapper',
          clone && 'dnd-sortable-tree_folder_clone',
          ghost && 'dnd-sortable-tree_folder_ghost',
          disableSelection && 'dnd-sortable-tree_folder_disable-selection',
          disableInteraction && 'dnd-sortable-tree_folder_disable-interaction',
        )}
        ref={wrapperRef}
        {...rest}
        style={{
          ...style,
          // paddingLeft: clone ? indentationWidth : indentationWidth * depth,
        }}
      >
        {flattenedParents.map((item) => (
          <div
            className={
              item.isLast
                ? 'dnd-sortable-tree_folder_line-last'
                : 'dnd-sortable-tree_folder_line'
            }
          />
        ))}
        <div
          className={
            isLast
              ? 'dnd-sortable-tree_folder_line-to_self-last'
              : 'dnd-sortable-tree_folder_line-to_self'
          }
        />
        <div className={'dnd-sortable-tree_folder_tree-item'} ref={ref}>
          <div className={'dnd-sortable-tree_folder_handle'} {...handleProps} />
          {props.children}
        </div>
      </li>
    );
  });
