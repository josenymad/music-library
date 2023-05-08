const db = require('../src/db/index');

afterEach(async () => {
  await db.query('TRUNCATE Artists CASCADE');
});

console.log('tests/helper');
