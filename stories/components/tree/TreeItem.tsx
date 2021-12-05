import React, { forwardRef } from 'react';
import styles from './TreeItem.module.scss';
import type { TreeItemComponentProps } from '../../../src';
import { SimpleTreeItemWrapper } from '../../../src';
import { TreeItemData } from '../TreeItemData';

export const TreeItem = forwardRef<
  HTMLDivElement,
  TreeItemComponentProps<TreeItemData>
>((props, ref) => {
  const { childCount, clone, onRemove, item } = props;

  return (
    <SimpleTreeItemWrapper
      {...props}
      ref={ref}
      hideCollapseButton={true}
      showDragHandle={true}
      // manualDrag={true}
    >
      <span className={styles.Text}>{item.text}</span>
      <span className={styles.Text}>{item.date.getDate()}</span>
      {!clone && onRemove && <button onClick={onRemove}>X</button>}
      {clone && childCount && childCount > 1 ? (
        <span className={styles.Count}>{childCount}</span>
      ) : null}
    </SimpleTreeItemWrapper>
  );
});
