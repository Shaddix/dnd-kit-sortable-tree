# dnd-kit-sortable-tree

This is a Tree component extracted from [dndkit](https://github.com/clauderic/dnd-kit) examples and abstracted a bit.
Here's how it could look like (visuals are completely customizable via css though)
[![img.png](img.png)](https://shaddix.github.io/dnd-kit-sortable-tree)

Play around in [examples](https://shaddix.github.io/dnd-kit-sortable-tree) to check the API and see what it can do.

## Install

    npm install dnd-kit-sortable-tree

## How-to use

Check out the Storybook for code samples and play around.

Shortly, you need to render:

```tsx
<SortableTree
  items={/* array of your tree items */}
  onItemsChanged={/* callback when items are reordered */}
  TreeItemComponent={/* component that renders a single tree item */}
/>
```

And `TreeItemComponent` is usually your data wrapped in `SimpleTreeItemWrapper` or `FolderTreeItemWrapper`:

```tsx
React.forwardRef((props, ref) => (
  <SimpleTreeItemWrapper {...props} ref={ref}>
    <div>{props.item.value}</div>
  </SimpleTreeItemWrapper>
));
```

Note that wrapping in `forwardRef` and passing `ref` to `SimpleTreeItemWrapper` is very important!

## Examples

1. Here's the very minimal code to add a Sortable Tree. You shouldn't use it as is in your project, but it could be easier to grasp what's going on.
   ```jsx
   export const Minimal = () => {
     const [items, setItems] = useState(initialMinimalData);
     return (
       <SortableTree
         items={items}
         onItemsChanged={setItems}
         {
           /*
            * You need to pass the component rendering a single item via TreeItemComponent props.
            * This component will receive the data via `props.item`.
            * In this example we inline the component, but in reality you should extract it into a const.
            */ ...{}
         }
         TreeItemComponent={React.forwardRef((props, ref) => (
           <SimpleTreeItemWrapper {...props} ref={ref}>
             {/* HERE GOES THE ACTUAL CONTENT OF YOUR COMPONENT */}
             <div>{props.item.id}</div>
           </SimpleTreeItemWrapper>
         ))}
       />
     );
   };
   /*
    * Configure the tree data.
    */
   const initialMinimalData = [
     { id: '1', children: [{ id: '4' }, { id: '5' }] },
     { id: '2' },
     { id: '3' },
   ];
   ```
2. Here's the minimal viable example that you could potentially copy&paste to your project to start from.

   ```tsx
   export const MinimalViable = () => {
     const [items, setItems] = useState(initialViableMinimalData);
     return (
       <SortableTree
         items={items}
         onItemsChanged={setItems}
         TreeItemComponent={MinimalTreeItemComponent}
       />
     );
   };
   type MinimalTreeItemData = {
     value: string;
   };
   /*
    * Here's the component that will render a single row of your tree
    */
   const MinimalTreeItemComponent = React.forwardRef<
     HTMLDivElement,
     TreeItemComponentProps<MinimalTreeItemData>
   >((props, ref) => (
     /* you could also use FolderTreeItemWrapper if you want to show vertical lines.  */
     <SimpleTreeItemWrapper {...props} ref={ref}>
       <div>{props.item.value}</div>
     </SimpleTreeItemWrapper>
   ));

   /*
    * Configure the tree data.
    */
   const initialViableMinimalData: TreeItems<MinimalTreeItemData> = [
     {
       id: '1',
       value: 'Jane',
       children: [
         { id: '4', value: 'John' },
         { id: '5', value: 'Sally' },
       ],
     },
     { id: '2', value: 'Fred', children: [{ id: '6', value: 'Eugene' }] },
     { id: '3', value: 'Helen', canHaveChildren: false },
   ];
   ```

## API

### Data configuration (each TreeItem element could define them):

- `canHaveChildren` - Default: `true`. If set to `false`, prevents any node from being dragged into the current one
- `disableSorting` - Default: `false`. If set to `true`, prevents node from being dragged (i.e. it can't be sorted or moved to another node)

### Tree configuration (props of `<SortableTree>`)

- `items` - _mandatory_, items shown in a tree
- `onItemsChanged` - _mandatory_, callback that is called when dragging of certain item is finished. You should preserve new state and adjust the value of `items` prop as needed.
- `TreeItemComponent` - _mandatory_, component that renders a single tree row.
- `indentationWidth` - _optional_, padding used for children
- `disableSorting` - _optional_, you could set this to `true` to completely disable the sorting

# Troubleshooting

1. If your dragged item is shown at the end of a list, make sure you that:
   1. You wrapped your `TreeItem` component in `React.forwardRef` and passing the `ref` to `SimpleTreeItemWrapper`
   1. You pass the `styles` prop from `TreeItem` to `SimpleTreeItemWrapper`
