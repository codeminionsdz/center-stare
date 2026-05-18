const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

const client = new Client({
  host: 'db.zyttgkiunbqbrbhzddlq.supabase.co',
  user: 'postgres.zyttgkiunbqbrbhzddlq',
  password: 'S8Jwe5tKXXxbDKYq',
  database: 'postgres',
  port: 5432,
  ssl: { rejectUnauthorized: false }
});

const scriptsDir = path.join(__dirname, 'scripts');

async function runScripts() {
  try {
    await client.connect();
    console.log('✓ Connected to Supabase database\n');

    const files = fs.readdirSync(scriptsDir)
      .filter(f => f.endsWith('.sql') && !f.startsWith('DIAGNOSTIC') && !f.startsWith('999'))
      .sort();

    console.log(`Found ${files.length} SQL files to execute\n`);

    let successCount = 0;
    let errorCount = 0;

    for (const file of files) {
      const filePath = path.join(scriptsDir, file);
      const sql = fs.readFileSync(filePath, 'utf8');
      
      try {
        await client.query(sql);
        console.log(`✓ ${file}`);
        successCount++;
      } catch (error) {
        console.log(`✗ ${file}: ${error.message.split('\n')[0]}`);
        errorCount++;
      }
    }

    console.log(`\n========================================`);
    console.log(`✓ Completed: ${successCount} scripts executed successfully`);
    if (errorCount > 0) {
      console.log(`✗ Errors: ${errorCount} scripts had errors`);
    }
    console.log(`========================================\n`);

  } catch (error) {
    console.error('Connection error:', error.message);
  } finally {
    await client.end();
  }
}

runScripts();
