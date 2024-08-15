import { persistStore } from 'redux-persist';
import { store } from './store'; // Import your store

const persistor = persistStore(store);

persistor.purge().then(() => {
  console.log('Persisted state cleared');
});
