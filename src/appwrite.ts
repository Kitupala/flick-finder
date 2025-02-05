import { Client, Databases, ID, Query } from "appwrite";
import { config } from "./lib/config.ts";

const {
  appwrite: { projectId, databaseId, collectionId },
} = config;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(projectId);

const database = new Databases(client);

export const updateSearchCount = async (searchTerm: string, movie: Movie) => {
  // 1. Use Appwrite SDK to check if the search term exists in the database
  try {
    const result = await database.listDocuments(databaseId, collectionId, [
      Query.equal("searchTerm", searchTerm),
    ]);

    // 2. If it does, update the count
    if (result.documents.length > 0) {
      const document = result.documents[0];

      await database.updateDocument(databaseId, collectionId, document.$id, {
        count: document.count + 1,
      });

      // 3. If it doesn't, create a new document with the search term and count as 1
    } else {
      await database.createDocument(databaseId, collectionId, ID.unique(), {
        searchTerm,
        count: 1,
        movie_id: movie.id,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getTrendingMovies = async () => {
  try {
    const result = await database.listDocuments(databaseId, collectionId, [
      Query.limit(5),
      Query.orderDesc("count"),
    ]);

    return result.documents;
  } catch (error) {
    console.error(error);
  }
};
