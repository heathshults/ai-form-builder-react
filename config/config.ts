
import nc from 'next-connect'
import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGODB_CONNECTION;
export const apiurl = `${process.env.API_BASE_URL}${process.env.API_PORT}${process.env.API_PATH}`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
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




export default function config() {
  return {
    api: {
      baseURL: process.env.API_BASE_URL,
      path: process.env.API_PATH,
      port: process.env.API_PORT,
      key: process.env.API_KEY
    },
    db: {
      connect: process.env.MONGODB_CONNECTION,
      client: client,
    },
    mail: {
      smtp: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USERNAME,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.MAIL_FROM,
    },
  }
}

export const dbclient = client;


/* AVAILABLE METHODS
axios#request(config)
axios#get(url[, config])
axios#delete(url[, config])
axios#head(url[, config])
axios#options(url[, config])
axios#post(url[, data[, config]])
axios#put(url[, data[, config]])
axios#patch(url[, data[, config]])
axios#getUri([config])
*/