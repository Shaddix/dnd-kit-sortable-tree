import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import {
  Announcements,
  closestCenter,
  defaultDropAnimation,
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  DropAnimation,
  // KeyboardSensor,
  Modifier,
  PointerSensor,
  PointerSensorOptions,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import {
  buildTree,
  flattenTree,
  getChildCount,
  getProjection,
  removeChildrenOf,
  removeItem,
  setProperty,
} from './utilities';
import type {
  FlattenedItem,
  SensorContext,
  TreeItemComponentType,
  TreeItems,
} from './types';
// import { sortableTreeKeyboardCoordinates } from './keyboardCoordinates';
import { SortableTreeItem } from './SortableTreeItem';

// const measuring = {
//   droppable: {
//     strategy: MeasuringStrategy.Always,
//   },
// };

const dropAnimation: DropAnimation = {
  ...defaultDropAnimation,
  dragSourceOpacity: 0.5,
};

export type SortableTreeProps<TData, TElement extends HTMLElement> = {
  items: TreeItems<TData>;
  onItemsChanged(items: TreeItems<TData>): void;
  TreeItemComponent: TreeItemComponentType<TData, TElement>;
  indentationWidth?: number;
  indicator?: boolean;
  pointerSensorOptions?: PointerSensorOptions;
  disableSorting?: boolean;
};
const defaultPointerSensorOptions: PointerSensorOptions = {
  activationConstraint: {
    distance: 10,
  },
};
export function SortableTree<
  TreeItemData,
  TElement extends HTMLElement = HTMLDivElement
>({
  items,
  indicator,
  indentationWidth = 20,
  onItemsChanged,
  TreeItemComponent,
  pointerSensorOptions,
  disableSorting,
  ...rest
}: SortableTreeProps<TreeItemData, TElement>) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const [offsetLeft, setOffsetLeft] = useState(0);
  const [currentPosition, setCurrentPosition] = useState<{
    parentId: string | null;
    overId: string;
  } | null>(null);

  const flattenedItems = useMemo(() => {
    const flattenedTree = flattenTree(items);
    const collapsedItems = flattenedTree.reduce<string[]>(
      (acc, { children, collapsed, id }) =>
        collapsed && children?.length ? [...acc, id] : acc,
      []
    );

    const result = removeChildrenOf(
      flattenedTree,
      activeId ? [activeId, ...collapsedItems] : collapsedItems
    );
    return result;
  }, [activeId, items]);
  const projected = getProjection(
    flattenedItems,
    activeId,
    overId,
    offsetLeft,
    indentationWidth
  );
  const sensorContext: SensorContext<TreeItemData> = useRef({
    items: flattenedItems,
    offset: offsetLeft,
  });
  // const [coordinateGetter] = useState(() =>
  //   sortableTreeKeyboardCoordinates(sensorContext, indentationWidth)
  // );
  const sensors = useSensors(
    useSensor(
      PointerSensor,
      pointerSensorOptions ?? defaultPointerSensorOptions
    )
    // useSensor(KeyboardSensor, {
    //   coordinateGetter,
    // })
  );

  const sortedIds = useMemo(
    () => flattenedItems.map(({ id }) => id),
    [flattenedItems]
  );
  const activeItem = activeId
    ? flattenedItems.find(({ id }) => id === activeId)
    : null;

  useEffect(() => {
    sensorContext.current = {
      items: flattenedItems,
      offset: offsetLeft,
    };
  }, [flattenedItems, offsetLeft]);

  const announcements: Announcements = {
    onDragStart(id) {
      return `Picked up ${id}.`;
    },
    onDragMove(id, overId) {
      return getMovementAnnouncement('onDragMove', id, overId);
    },
    onDragOver(id, overId) {
      return getMovementAnnouncement('onDragOver', id, overId);
    },
    onDragEnd(id, overId) {
      return getMovementAnnouncement('onDragEnd', id, overId);
    },
    onDragCancel(id) {
      return `Moving was cancelled. ${id} was dropped in its original position.`;
    },
  };
  const itemsRef = useRef(items);
  itemsRef.current = items;
  const handleRemove = useCallback(
    (id: string) => {
      onItemsChanged(removeItem(itemsRef.current, id));
    },
    [onItemsChanged]
  );

  const handleCollapse = useCallback(
    function handleCollapse(id: string) {
      onItemsChanged(
        setProperty(itemsRef.current, id, 'collapsed', ((value: boolean) => {
          return !value;
        }) as any)
      );
    },
    [onItemsChanged]
  );

  return (
    <DndContext
      announcements={announcements}
      sensors={disableSorting ? undefined : sensors}
      modifiers={indicator ? modifiersArray : undefined}
      collisionDetection={closestCenter}
      // measuring={measuring}
      onDragStart={disableSorting ? undefined : handleDragStart}
      onDragMove={disableSorting ? undefined : handleDragMove}
      onDragOver={disableSorting ? undefined : handleDragOver}
      onDragEnd={disableSorting ? undefined : handleDragEnd}
      onDragCancel={disableSorting ? undefined : handleDragCancel}
    >
      <SortableContext
        items={sortedIds}
        strategy={disableSorting ? undefined : verticalListSortingStrategy}
      >
        {flattenedItems.map((item) => {
          return (
            <SortableTreeItem
              {...rest}
              key={item.id}
              id={item.id}
              item={item}
              childCount={item.children?.length}
              depth={
                item.id === activeId && projected ? projected.depth : item.depth
              }
              indentationWidth={indentationWidth}
              indicator={indicator}
              collapsed={Boolean(item.collapsed && item.children?.length)}
              onCollapse={item.children?.length ? handleCollapse : undefined}
              onRemove={(event) => {event.stopPropagation(); handleRemove(); }}
              isLast={
                item.id === activeId && projected
                  ? projected.isLast
                  : item.isLast
              }
              parent={
                item.id === activeId && projected
                  ? projected.parent
                  : item.parent
              }
              TreeItemComponent={TreeItemComponent}
              disableSorting={disableSorting}
            />
          );
        })}
        {createPortal(
          <DragOverlay dropAnimation={dropAnimation}>
            {activeId && activeItem ? (
              <TreeItemComponent
                {...rest}
                item={activeItem}
                children={[]}
                depth={activeItem.depth}
                clone
                childCount={getChildCount(items, activeId) + 1}
                indentationWidth={indentationWidth}
                isLast={false}
                parent={activeItem.parent}
              />
            ) : null}
          </DragOverlay>,
          document.body
        )}
      </SortableContext>
    </DndContext>
  );

  function handleDragStart({ active: { id: activeId } }: DragStartEvent) {
    setActiveId(activeId);
    setOverId(activeId);

    const activeItem = flattenedItems.find(({ id }) => id === activeId);

    if (activeItem) {
      setCurrentPosition({
        parentId: activeItem.parentId,
        overId: activeId,
      });
    }

    document.body.style.setProperty('cursor', 'grabbing');
  }

  function handleDragMove({ delta }: DragMoveEvent) {
    setOffsetLeft(delta.x);
  }

  function handleDragOver({ over }: DragOverEvent) {
    setOverId(over?.id ?? null);
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    resetState();

    if (projected && over) {
      const { depth, parentId } = projected;
      const clonedItems: FlattenedItem<TreeItemData>[] = flattenTree(items);
      const overIndex = clonedItems.findIndex(({ id }) => id === over.id);
      const activeIndex = clonedItems.findIndex(({ id }) => id === active.id);
      const activeTreeItem = clonedItems[activeIndex];

      clonedItems[activeIndex] = { ...activeTreeItem, depth, parentId };
      const sortedItems = arrayMove(clonedItems, activeIndex, overIndex);
      const newItems = buildTree(sortedItems);
      onItemsChanged(newItems);
    }
  }

  function handleDragCancel() {
    resetState();
  }

  function resetState() {
    setOverId(null);
    setActiveId(null);
    setOffsetLeft(0);
    setCurrentPosition(null);

    document.body.style.setProperty('cursor', '');
  }

  function getMovementAnnouncement(
    eventName: string,
    activeId: string,
    overId?: string
  ) {
    if (overId && projected) {
      if (eventName !== 'onDragEnd') {
        if (
          currentPosition &&
          projected.parentId === currentPosition.parentId &&
          overId === currentPosition.overId
        ) {
          return;
        } else {
          setCurrentPosition({
            parentId: projected.parentId,
            overId,
          });
        }
      }

      const clonedItems: FlattenedItem<TreeItemData>[] = flattenTree(items);
      const overIndex = clonedItems.findIndex(({ id }) => id === overId);
      const activeIndex = clonedItems.findIndex(({ id }) => id === activeId);
      const sortedItems = arrayMove(clonedItems, activeIndex, overIndex);

      const previousItem = sortedItems[overIndex - 1];

      let announcement;
      const movedVerb = eventName === 'onDragEnd' ? 'dropped' : 'moved';
      const nestedVerb = eventName === 'onDragEnd' ? 'dropped' : 'nested';

      if (!previousItem) {
        const nextItem = sortedItems[overIndex + 1];
        announcement = `${activeId} was ${movedVerb} before ${nextItem.id}.`;
      } else {
        if (projected.depth > previousItem.depth) {
          announcement = `${activeId} was ${nestedVerb} under ${previousItem.id}.`;
        } else {
          let previousSibling: FlattenedItem<TreeItemData> | undefined =
            previousItem;
          while (previousSibling && projected.depth < previousSibling.depth) {
            const parentId: string | null = previousSibling.parentId;
            previousSibling = sortedItems.find(({ id }) => id === parentId);
          }

          if (previousSibling) {
            announcement = `${activeId} was ${movedVerb} after ${previousSibling.id}.`;
          }
        }
      }

      return announcement;
    }

    return;
  }
}

const adjustTranslate: Modifier = ({ transform }) => {
  return {
    ...transform,
    y: transform.y - 25,
  };
};
const modifiersArray = [adjustTranslate];
