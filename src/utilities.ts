import { arrayMove } from '@dnd-kit/sortable';

import type { FlattenedItem, TreeItem, TreeItems } from './types';
import { UniqueIdentifier } from '@dnd-kit/core';

export const iOS = /iPad|iPhone|iPod/.test(navigator.platform);

function getDragDepth(offset: number, indentationWidth: number) {
  return Math.round(offset / indentationWidth);
}

let _revertLastChanges = () => {};
export function getProjection<T>(
  items: FlattenedItem<T>[],
  activeId: UniqueIdentifier | null,
  overId: UniqueIdentifier | null,
  dragOffset: number,
  indentationWidth: number
) {
  _revertLastChanges();
  _revertLastChanges = () => {};
  if (!activeId || !overId) return null;
  const overItemIndex = items.findIndex(({ id }) => id === overId);
  const activeItemIndex = items.findIndex(({ id }) => id === activeId);
  const activeItem = items[activeItemIndex];
  const newItems = arrayMove(items, activeItemIndex, overItemIndex);
  const previousItem = newItems[overItemIndex - 1];
  const nextItem = newItems[overItemIndex + 1];
  const dragDepth = getDragDepth(dragOffset, indentationWidth);
  const projectedDepth = activeItem.depth + dragDepth;
  const maxDepth = getMaxDepth({
    previousItem,
  });
  const minDepth = getMinDepth({ nextItem });
  let depth = projectedDepth;

  if (projectedDepth >= maxDepth) {
    depth = maxDepth;
  } else if (projectedDepth < minDepth) {
    depth = minDepth;
  }

  let parent: FlattenedItem<T> | null = previousItem;
  let previousItemOnDepth: FlattenedItem<T> | null = null;
  let currentDepth = previousItem ? previousItem.depth + 1 : 0;
  const isLast = (nextItem?.depth ?? -1) < depth;
  while (depth !== currentDepth) {
    currentDepth--;
    previousItemOnDepth = parent;
    parent = parent?.parent ?? null;
  }

  if (previousItemOnDepth && previousItemOnDepth.isLast) {
    _revertLastChanges = () => {
      previousItemOnDepth!.isLast = true;
    };
    previousItemOnDepth.isLast = false;
  }
  return {
    depth,
    maxDepth,
    minDepth,
    parentId: getParentId(),
    parent,
    isLast,
  };

  function getParentId() {
    if (depth === 0 || !previousItem) {
      return null;
    }

    if (depth === previousItem.depth) {
      return previousItem.parentId;
    }

    if (depth > previousItem.depth) {
      return previousItem.id;
    }

    const newParent = newItems
      .slice(0, overItemIndex)
      .reverse()
      .find((item) => item.depth === depth)?.parentId;

    return newParent ?? null;
  }
}

function getMaxDepth<T>({ previousItem }: { previousItem: FlattenedItem<T> }) {
  if (previousItem) {
    return previousItem.canHaveChildren === false
      ? previousItem.depth
      : previousItem.depth + 1;
  }

  return 0;
}

function getMinDepth<T>({ nextItem }: { nextItem: FlattenedItem<T> }) {
  if (nextItem) {
    return nextItem.depth;
  }

  return 0;
}

function flatten<T>(
  items: TreeItems<T>,
  parentId: UniqueIdentifier | null = null,
  depth = 0,
  parent: FlattenedItem<T> | null = null
): FlattenedItem<T>[] {
  return items.reduce<FlattenedItem<T>[]>((acc, item, index) => {
    const flattenedItem: FlattenedItem<T> = {
      ...item,
      parentId,
      depth,
      index,
      isLast: items.length === index + 1,
      parent: parent,
    };
    return [
      ...acc,
      flattenedItem,
      ...flatten(item.children ?? [], item.id, depth + 1, flattenedItem),
    ];
  }, []);
}

export function flattenTree<T>(items: TreeItems<T>): FlattenedItem<T>[] {
  return flatten(items);
}

export function buildTree<T>(flattenedItems: FlattenedItem<T>[]): TreeItems<T> {
  const root: TreeItem<T> = { id: 'root', children: [] } as any;
  const nodes: Record<string, TreeItem<T>> = { [root.id]: root };
  const items = flattenedItems.map((item) => ({ ...item, children: [] }));

  for (const item of items) {
    const { id } = item;
    const parentId = item.parentId ?? root.id;
    const parent = nodes[parentId] ?? findItem(items, parentId);

    nodes[id] = item;
    parent?.children?.push(item);
  }

  return root.children ?? [];
}

export function findItem<T>(items: TreeItem<T>[], itemId: UniqueIdentifier) {
  return items.find(({ id }) => id === itemId);
}

export function findItemDeep<T>(
  items: TreeItems<T>,
  itemId: UniqueIdentifier
): TreeItem<T> | undefined {
  for (const item of items) {
    const { id, children } = item;

    if (id === itemId) {
      return item;
    }

    if (children?.length) {
      const child = findItemDeep(children, itemId);

      if (child) {
        return child;
      }
    }
  }

  return undefined;
}

export function removeItem<T>(items: TreeItems<T>, id: string) {
  const newItems = [];

  for (const item of items) {
    if (item.id === id) {
      continue;
    }

    if (item.children?.length) {
      item.children = removeItem(item.children, id);
    }

    newItems.push(item);
  }

  return newItems;
}

export function setProperty<TData, T extends keyof TreeItem<TData>>(
  items: TreeItems<TData>,
  id: string,
  property: T,
  setter: (value: TreeItem<TData>[T]) => TreeItem<TData>[T]
) {
  for (const item of items) {
    if (item.id === id) {
      item[property] = setter(item[property]);
      continue;
    }

    if (item.children?.length) {
      item.children = setProperty(item.children, id, property, setter);
    }
  }

  return [...items];
}

function countChildren<T>(items: TreeItem<T>[], count = 0): number {
  return items.reduce((acc, { children }) => {
    if (children?.length) {
      return countChildren(children, acc + 1);
    }

    return acc + 1;
  }, count);
}

export function getChildCount<T>(items: TreeItems<T>, id: UniqueIdentifier) {
  if (!id) {
    return 0;
  }

  const item = findItemDeep(items, id);

  return item ? countChildren(item.children ?? []) : 0;
}

export function removeChildrenOf<T>(
  items: FlattenedItem<T>[],
  ids: UniqueIdentifier[]
) {
  const excludeParentIds = [...ids];

  return items.filter((item) => {
    if (item.parentId && excludeParentIds.includes(item.parentId)) {
      if (item.children?.length) {
        excludeParentIds.push(item.id);
      }
      return false;
    }

    return true;
  });
}
