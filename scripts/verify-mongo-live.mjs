import dns from 'dns';
import { MongoClient } from 'mongodb';

try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {}

const uri = "mongodb+srv://BITnWit:BITnWit%401382@cluster0.xnsnrjq.mongodb.net/bitnwit?retryWrites=true&w=majority";

async function verify() {
  console.log('Connecting to MongoDB Atlas...');
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db('bitnwit');

  const collections = [
    'admin_users',
    'leads',
    'services',
    'projects',
    'blogs',
    'testimonials',
    'media_files',
    'team_members',
    'website_settings',
    'seo_metadata',
    'activity_logs',
  ];

  console.log('\n📊 Live MongoDB Collection Status:');
  console.log('-----------------------------------');
  for (const name of collections) {
    const count = await db.collection(name).countDocuments();
    console.log(`  • ${name.padEnd(20)}: ${count} documents`);
  }
  console.log('-----------------------------------');
  await client.close();
  console.log('\n✅ Verification complete!');
}

verify().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
