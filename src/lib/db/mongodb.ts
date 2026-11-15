import { MongoClient, Db } from 'mongodb';
import dns from 'dns';

// Ensure reliable DNS resolution for MongoDB SRV records on Windows environments
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {
  // Ignore in environments where setting DNS servers is not allowed
}

const options = {};

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

/**
 * Returns true if the MONGODB_URI environment variable is defined and non-empty.
 */
export function isMongoConfigured(): boolean {
  const uri = process.env.MONGODB_URI;
  return Boolean(uri && uri.trim().length > 0 && (uri.startsWith('mongodb://') || uri.startsWith('mongodb+srv://')));
}

/**
 * Global MongoClient promise cached across hot reloads in development
 * and shared across serverless invocations in production.
 */
export function getMongoClientPromise(): Promise<MongoClient> | null {
  const uri = process.env.MONGODB_URI;
  if (!uri || !isMongoConfigured()) return null;

  if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
    }
    return global._mongoClientPromise || null;
  } else {
    if (!clientPromise) {
      client = new MongoClient(uri, options);
      clientPromise = client.connect();
    }
    return clientPromise;
  }
}

/**
 * Returns the MongoDB database instance.
 */
export async function getMongoDb(): Promise<Db | null> {
  const promise = getMongoClientPromise();
  if (!promise) return null;
  try {
    const connectedClient = await promise;
    const uri = process.env.MONGODB_URI || '';
    let dbName = 'bitnwit';
    try {
      const match = uri.match(/\/([^/?]+)(\?|$)/);
      if (match && match[1]) {
        dbName = match[1];
      }
    } catch {
      // Use fallback dbName
    }
    return connectedClient.db(dbName);
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    return null;
  }
}
