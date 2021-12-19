import clsx from 'clsx';
import React, { forwardRef } from 'react';
import type {
  TreeItemComponentProps,
  FlattenedItem,
  TreeItemComponentType,
} from '../../types';
import './FolderTreeItemWrapper.css';

function flattenParents<T>(
  parent: FlattenedItem<T> | null
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
          disableInteraction && 'dnd-sortable-tree_folder_disable-interaction'
        )}
        ref={wrapperRef}
        {...rest}
        style={style}
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
        {props.manualDrag && props.showDragHandle && !props.disableSorting && (
          <div className={'dnd-sortable-tree_folder_handle'} {...handleProps} />
        )}
        {!props.manualDrag &&
          !props.hideCollapseButton &&
          !!onCollapse &&
          !!props.childCount && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onCollapse?.();
              }}
              className={clsx(
                'dnd-sortable-tree_folder_tree-item-collapse_button',
                collapsed &&
                  'dnd-sortable-tree_folder_tree-item-collapse_button-collapsed'
              )}
            />
          )}
        <div
          className={'dnd-sortable-tree_folder_tree-item'}
          ref={ref}
          {...(props.manualDrag ? undefined : handleProps)}
          onClick={
            props.disableCollapseOnItemClick ? undefined : props.onCollapse
          }
        >
          {props.children}
        </div>
      </li>
    );
  });
