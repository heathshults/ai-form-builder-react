import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = process.env.MONGODB_CONNECTION;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function mongoConn() {
  let dbName, dbConn
  try {

    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    dbName = await client.db(process.env.MONGODB_NAME);
    
    return dbConn = dbName
    
  
  } catch (error) {
    console.error('Database connection error:', error);
    await client.close();
  }
}

export default client