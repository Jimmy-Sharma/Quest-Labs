import { useSaveLocalStorage } from './useSaveLocalStorage';

export const useDragAndDrop = (columns, setColumns) => {
  const { saveToLocalStorage } = useSaveLocalStorage('data');

  const columnSwitch = (columns, columnId, source, destination) => {
    const columnCopy = [...columns];
    const index = columnCopy.findIndex(col => col.id === columnId);
    const currentDraggingItem = columnCopy[index];
    columnCopy.splice(source.index, 1);
    columnCopy.splice(destination.index, 0, currentDraggingItem);
    return columnCopy;
  };

  const reorderColumn = (
    columns,
    sourceList,
    draggingCard,
    source,
    destination
  ) => {
    const columnCopy = [...columns];
    const destinationList = { ...sourceList };
    sourceList.cards.splice(source.index, 1);
    destinationList.cards.splice(destination.index, 0, draggingCard);
    const index = columnCopy.findIndex(col => col.id === source.droppableId);
    columnCopy[index] = destinationList;
    return columnCopy;
  };
  const moveCard = (
    columns,
    sourceList,
    destinationList,
    draggingCard,
    source,
    destination
  ) => {
    const columnCopy = [...columns];
    sourceList.cards.splice(source.index, 1);
    destinationList.cards.splice(destination.index, 0, draggingCard);
    const srcIndex = columnCopy.findIndex(col => col.id === source.droppableId);
    const destIndex = columnCopy.findIndex(
      col => col.id === destination.droppableId
    );
    columnCopy[srcIndex] = sourceList;
    columnCopy[destIndex] = destinationList;
    return columnCopy;
  };
  const getSourceAndDest = (source, destination) => {
    const sourceIdx = columns.findIndex(col => col.id === source.droppableId);
    const destIdx = columns.findIndex(
      col => col.id === destination.droppableId
    );
    const sourceList = columns[sourceIdx];
    const destinationList = columns[destIdx];
    return { sourceList, destinationList };
  };

  const onDragEnd = result => {
    const { destination, source, draggableId, type } = result;

    // invalid destination
    if (!destination) return;
    const columnCopy = [...columns];

    // columns switch
    if (type === 'column') {
      const switchedCols = columnSwitch(
        columns,
        draggableId,
        source,
        destination
      );
      saveToLocalStorage(switchedCols);
      setColumns(switchedCols);
      return;
    }

    const { sourceList, destinationList } = getSourceAndDest(
      source,
      destination
    );
    const draggingCard = sourceList.cards.filter(
      (card, index) => `${sourceList.id}-${card.id}-${index}` === draggableId
    )[0];

    // drag column = drop column
    if (source.droppableId === destination.droppableId) {
      const columnsReorder = reorderColumn(
        columns,
        sourceList,
        draggingCard,
        source,
        destination
      );
      saveToLocalStorage(columnsReorder);
      setColumns(columnsReorder);
    } else {
      const newColumns = moveCard(
        columns,
        sourceList,
        destinationList,
        draggingCard,
        source,
        destination
      );
      saveToLocalStorage(newColumns);
      setColumns(newColumns);
    }
  };

  return { onDragEnd };
};
