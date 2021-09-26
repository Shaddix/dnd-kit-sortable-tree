import clsx from 'clsx';
import React, { forwardRef } from 'react';
import type {
  TreeItemComponentType,
  TreeItemComponentProps,
} from '../../types';
import './FolderTreeItemWrapper.css';

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
      ...rest
    } = props;
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
        {Array.from({ length: depth }).map(() => (
          <div className={'dnd-sortable-tree_folder_line'} />
        ))}
        <div className={'dnd-sortable-tree_folder_tree-item'} ref={ref}>
          <div className={'dnd-sortable-tree_folder_handle'} {...handleProps} />
          {props.children}
        </div>
      </li>
    );
  });
