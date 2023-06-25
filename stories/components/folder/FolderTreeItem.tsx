// import clsx from 'clsx';
import React, { forwardRef } from 'react';
import styles from './FolderTreeItem.css';
import type { TreeItemComponentProps } from '../../../src';
import { FolderTreeItemWrapper } from '../../../src';
import { TreeItemData } from '../TreeItemData';

export const FolderTreeItem = forwardRef<
  HTMLDivElement,
  TreeItemComponentProps<TreeItemData>
>((props, ref) => {
  const { childCount, clone, onRemove, item } = props;

  return (
    <FolderTreeItemWrapper
      {...props}
      ref={ref}
      // hideCollapseButton={true}
      // showDragHandle={true}
      // manualDrag={true}
    >
      <span className={styles.Text}>{item.text}</span>
      <span className={styles.Text}>{item.date.getDate()}</span>
      {!clone && onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          X
        </button>
      )}
      {clone && childCount && childCount > 1 ? (
        <span className={styles.Count}>{childCount}</span>
      ) : null}
    </FolderTreeItemWrapper>
  );
});
