import clsx from 'clsx';
import React, { forwardRef } from 'react';
import type {
  TreeItemComponentType,
  TreeItemComponentProps,
} from '../../types';
import './SimpleTreeItemWrapper.css';

export const SimpleTreeItemWrapper: TreeItemComponentType<{}, HTMLDivElement> =
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
          'dnd-sortable-tree_simple_wrapper',
          clone && 'dnd-sortable-tree_simple_clone',
          ghost && 'dnd-sortable-tree_simple_ghost',
          disableSelection && 'dnd-sortable-tree_simple_disable-selection',
          disableInteraction && 'dnd-sortable-tree_simple_disable-interaction',
        )}
        ref={wrapperRef}
        {...rest}
        style={{
          ...style,
          paddingLeft: clone ? indentationWidth : indentationWidth * depth,
        }}
      >
        <div className={'dnd-sortable-tree_simple_tree-item'} ref={ref}>
          <div className={'dnd-sortable-tree_simple_handle'} {...handleProps} />
          {props.children}
        </div>
      </li>
    );
  });
