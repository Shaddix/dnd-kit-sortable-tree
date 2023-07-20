import React, { forwardRef } from 'react';
import styles from './TreeItem.module.css';
import type { TreeItemComponentProps } from '../../../src';
import { SimpleTreeItemWrapper } from '../../../src';
import { TreeItemData } from '../TreeItemData';

export const TreeItem = forwardRef<
  HTMLDivElement,
  TreeItemComponentProps<TreeItemData>
>((props, ref) => {
  const { childCount, clone, onRemove, item, isOver } = props;

  const enableCustomStyleWhenOver =
    document.location.href.includes('vs-code-like');

  return (
    <SimpleTreeItemWrapper
      {...props}
      contentClassName={
        enableCustomStyleWhenOver && isOver ? styles.over : undefined
      }
      ref={ref}
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
    </SimpleTreeItemWrapper>
  );
});
