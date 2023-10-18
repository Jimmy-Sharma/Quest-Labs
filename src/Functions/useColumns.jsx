import { useSaveLocalStorage } from './useSaveLocalStorage';
import { useCallback } from 'react';

export const useColumns = (columns, setColumns) => {
  const { saveToLocalStorage } = useSaveLocalStorage('data');

  const onChange = useCallback(
    (action, columnId, cardIdx, content) => {
      let newColumns = [...columns];
      console.log(newColumns);

      newColumns.forEach((col, index) => {
        if (col.id === columnId) {
          switch (action) {
            case 'changeTitle':
              newColumns[index].title = content;
              break;
            case 'changeCard':
              col.cards[cardIdx].content = content;
              break;
            case 'deleteColumn':
              newColumns.splice(index, 1);
              break;
            case 'deleteCard':
              col.cards.splice(cardIdx, 1);
              break;
            case 'addCard':
              const newId = col.cards.length;
              newColumns[index].cards.push({
                id: `card-${newId}`,
                content: '',
                image: '',
              });
              break;
            case 'changeImage':
              if (content) {
                let image = content[0];
                let reader = new FileReader();
                reader.readAsDataURL(image);
                reader.onload = () => {
                  newColumns[index].cards[cardIdx].image = reader.result;
                  saveToLocalStorage(newColumns);
                  setColumns(newColumns);
                };
              }
              break;
          }
          if (action !== 'changeImage') {
            saveToLocalStorage(newColumns);
            setColumns(newColumns);
          }
        }
      });
    },
    [columns]
  );

  const addColumn = useCallback(() => {
    const newId = columns.length;
    const newColumns = [
      ...columns,
      {
        id: `${newId}`,
        title: '',
        cards: [],
      },
    ];
    saveToLocalStorage(newColumns);
    setColumns(newColumns);
  }, [columns]);

  return {
    addColumn,
    onChange,
  };
};
