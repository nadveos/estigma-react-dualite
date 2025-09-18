import PocketBase from 'pocketbase';

// Initialize PocketBase client
export const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL || 'http://127.0.0.1:8090');

// Auto-refresh authentication
pb.authStore.onChange((auth) => {
  console.log('Auth changed:', auth);
});

export default pb;
