import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id' });
    },
  });

// Added logic to putDb method that accepts content and adds it to the database
export const putDb = async (content) => {
  try {
    const editorDb = await openDB('jate', 1);
    const tx = editorDb.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    await store.put({ id: 1, value: content });
  } catch (error) {
    console.error('putDb not implemented');
  }
};

// Added logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    const editorDb = await openDB('jate', 1);
    const tx = editorDb.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const request = store.get(1);
    const result = await request;
    return result.value;
  } catch (error) {
    console.error('getDb not implemented');
  }
};

initdb();
