export const config = {
  apiBaseUrl: "https://api.themoviedb.org/3",
  apiKey: import.meta.env.VITE_TMDB_API_KEY,
  apiOptions: {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  },
  appwrite: {
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    collectionId: import.meta.env.VITE_APPWRITE_COLLECTION_ID,
  },
};
