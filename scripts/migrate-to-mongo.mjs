import fs from 'fs';
import path from 'path';
import dns from 'dns';
import { MongoClient } from 'mongodb';

// Ensure reliable DNS resolution for MongoDB SRV records on Windows
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {}

const DATA_DIR = path.join(process.cwd(), '.data');
const DB_FILE = path.join(DATA_DIR, 'bitnwit-db.json');

async function migrate() {
  console.log('\n========================================');
  console.log('   BITnWit MongoDB Migration Tool');
  console.log('========================================\n');

  const uri = process.argv[2] || process.env.MONGODB_URI;

  if (!uri) {
    console.error('❌ Error: MONGODB_URI is required.');
    console.log('\nUsage:');
    console.log('  node scripts/migrate-to-mongo.mjs "mongodb+srv://<user>:<password>@cluster.mongodb.net/bitnwit"\n');
    process.exit(1);
  }

  if (!fs.existsSync(DB_FILE)) {
    console.error(`❌ Error: Database file not found at ${DB_FILE}`);
    process.exit(1);
  }

  let dbData;
  try {
    dbData = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  } catch (err) {
    console.error('❌ Error parsing database file:', err);
    process.exit(1);
  }

  console.log('🔄 Connecting to MongoDB cluster...');
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('✅ Connected successfully to MongoDB!\n');

    let dbName = 'bitnwit';
    try {
      const match = uri.match(/\/([^/?]+)(\?|$)/);
      if (match && match[1]) dbName = match[1];
    } catch {}

    const db = client.db(dbName);
    console.log(`📁 Target Database: [${dbName}]\n`);

    const collections = [
      { key: 'adminUsers', name: 'admin_users' },
      { key: 'leads', name: 'leads' },
      { key: 'services', name: 'services' },
      { key: 'projects', name: 'projects' },
      { key: 'blogs', name: 'blogs' },
      { key: 'testimonials', name: 'testimonials' },
      { key: 'mediaFiles', name: 'media_files' },
      { key: 'teamMembers', name: 'team_members' },
      { key: 'websiteSettings', name: 'website_settings', isRecord: true },
      { key: 'seoMetadata', name: 'seo_metadata', isRecord: true },
      { key: 'activityLogs', name: 'activity_logs' },
    ];

    for (const col of collections) {
      const collection = db.collection(col.name);
      let items = [];

      if (col.isRecord) {
        items = Object.values(dbData[col.key] || {});
      } else {
        items = Array.isArray(dbData[col.key]) ? dbData[col.key] : [];
      }

      if (items.length > 0) {
        for (const item of items) {
          const filter = item.id ? { id: item.id } : item.key ? { key: item.key } : item.pageRoute ? { pageRoute: item.pageRoute } : null;
          if (filter) {
            await collection.updateOne(filter, { $set: item }, { upsert: true });
          } else {
            await collection.insertOne(item);
          }
        }
        console.log(`  ✓ Synced ${items.length} records into [${col.name}]`);
      } else {
        console.log(`  - 0 records in [${col.name}] (skipped)`);
      }
    }

    console.log('\n========================================');
    console.log('🎉 Migration completed successfully!');
    console.log('========================================');
    console.log('Next step: Set MONGODB_URI in your .env.local and Vercel Environment Variables:');
    console.log(`MONGODB_URI="${uri}"\n`);
  } catch (err) {
    console.error('❌ Migration failed:', err);
    process.exit(1);
  } finally {
    await client.close();
  }
}

migrate();
