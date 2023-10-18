export const useSaveLocalStorage = storageTitle => {
    const saveToLocalStorage = data => {
      try {
        localStorage.setItem(storageTitle, JSON.stringify(data));
      } catch (error) {
        console.log('Not able to save');
      }
    };
    return { saveToLocalStorage };
  };
  