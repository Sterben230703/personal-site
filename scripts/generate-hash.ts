/**
 * Generate bcrypt hashes for dev credentials.
 *
 * Usage: npx tsx scripts/generate-hash.ts <username> <password>
 *
 * Copy the output hashes to .env.local as DEV_USERNAME_HASH and DEV_PASSWORD_HASH.
 */

import bcrypt from 'bcryptjs';

const [username, password] = process.argv.slice(2);

if (!username || !password) {
  console.error('Usage: npx tsx scripts/generate-hash.ts <username> <password>');
  process.exit(1);
}

async function main() {
  const usernameHash = await bcrypt.hash(username, 10);
  const passwordHash = await bcrypt.hash(password, 10);

  console.log('\nAdd these to your .env.local:\n');
  console.log(`DEV_USERNAME_HASH=${usernameHash}`);
  console.log(`DEV_PASSWORD_HASH=${passwordHash}`);
}

main();
