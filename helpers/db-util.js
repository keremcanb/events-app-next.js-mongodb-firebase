import { MongoClient } from 'mongodb';

export const connectDatabase = async () => {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PW}@${process.env.MONGO_URI}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );
  return client;
};
// Add email
export const insertDocument = async (client, collection, document) => {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);
  return result;
};
// Get comments
export const getAllDocuments = async (client, collection, sort) => {
  const db = client.db();
  // Get as array
  const documents = await db.collection(collection).find().sort(sort).toArray();
  return documents;
};
