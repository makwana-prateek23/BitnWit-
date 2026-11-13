import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import readline from 'readline';

const DATA_DIR = path.join(process.cwd(), '.data');
const DB_FILE = path.join(DATA_DIR, 'bitnwit-db.json');

function hashPassword(password) {
  const salt = crypto.randomBytes(32).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, salt, 100000, 64, 'sha512')
    .toString('hex');
  return { hash, salt };
}

function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans.trim());
    })
  );
}

async function main() {
  console.log('\n========================================');
  console.log('  BITnWit Admin Account Provisioning CLI');
  console.log('========================================\n');

  // Parse CLI args if passed: node scripts/create-admin.mjs <email> <password> <name> <role>
  const args = process.argv.slice(2);
  let email = args[0];
  let password = args[1];
  let name = args[2];
  let role = (args[3] || 'SUPER_ADMIN').toUpperCase();

  if (!email) {
    email = await askQuestion('Enter Admin Email: ');
  }
  if (!name) {
    name = (await askQuestion('Enter Admin Full Name: ')) || 'Administrator';
  }
  if (!password) {
    password = await askQuestion('Enter Admin Password (min 8 characters): ');
  }

  if (!email || !email.includes('@')) {
    console.error('❌ Error: Valid email address is required.');
    process.exit(1);
  }

  if (!password || password.length < 8) {
    console.error('❌ Error: Password must be at least 8 characters long.');
    process.exit(1);
  }

  if (!['SUPER_ADMIN', 'ADMIN', 'EDITOR'].includes(role)) {
    role = 'SUPER_ADMIN';
  }

  // Ensure .data folder exists
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  let db = {
    adminUsers: [],
    leads: [],
    leadNotes: [],
    services: [],
    projects: [],
    blogs: [],
    testimonials: [],
    mediaFiles: [],
    teamMembers: [],
    websiteSettings: {},
    seoMetadata: {},
    activityLogs: [],
  };

  if (fs.existsSync(DB_FILE)) {
    try {
      db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    } catch {
      console.warn('⚠️ Warning: Existing DB file was corrupted or unreadable. Initializing fresh DB.');
    }
  }

  if (!Array.isArray(db.adminUsers)) {
    db.adminUsers = [];
  }

  const { hash, salt } = hashPassword(password);
  const normalizedEmail = email.toLowerCase().trim();
  const existingIndex = db.adminUsers.findIndex((u) => u.email.toLowerCase() === normalizedEmail);

  if (existingIndex >= 0) {
    // Update existing user credentials
    db.adminUsers[existingIndex].passwordHash = hash;
    db.adminUsers[existingIndex].salt = salt;
    db.adminUsers[existingIndex].fullName = name;
    db.adminUsers[existingIndex].name = name;
    db.adminUsers[existingIndex].role = role;
    db.adminUsers[existingIndex].isActive = true;
    console.log(`\n🔄 Updated existing admin account for: ${normalizedEmail}`);
  } else {
    // Create new admin user
    const newUser = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      email: normalizedEmail,
      passwordHash: hash,
      salt,
      fullName: name,
      name,
      role,
      avatarUrl: '/bitty-mascot.png',
      isActive: true,
      createdAt: new Date().toISOString(),
    };
    db.adminUsers.push(newUser);
    console.log(`\n✨ Created new ${role} account for: ${normalizedEmail}`);
  }

  // Log activity
  if (!Array.isArray(db.activityLogs)) db.activityLogs = [];
  db.activityLogs.unshift({
    id: `act_${Date.now()}`,
    adminId: 'CLI',
    adminName: 'System CLI',
    action: 'ADMIN_PROVISION_CLI',
    entityType: 'ADMIN_USER',
    details: `Admin account provisioned for ${normalizedEmail} with role ${role}`,
    createdAt: new Date().toISOString(),
  });

  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');

  console.log('\n✅ Admin credentials saved successfully!');
  console.log('----------------------------------------');
  console.log(`📧 Email:    ${normalizedEmail}`);
  console.log(`👤 Name:     ${name}`);
  console.log(`🛡️  Role:     ${role}`);
  console.log(`🌐 Sign in:  http://localhost:3000/admin/login`);
  console.log('----------------------------------------\n');
}

main().catch((err) => {
  console.error('Fatal CLI Error:', err);
  process.exit(1);
});
