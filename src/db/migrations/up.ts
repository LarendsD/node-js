import db from '../db.config';
import tag from './queries/tag';
import users from './queries/users';
import userTag from './queries/userTag';
import extensions from './queries/extensions';

const up = async () => {
  const client = await db.connect();
  try {
    await client.query(`BEGIN`);
    await client.query(extensions.up);
    await client.query(users.up);
    await client.query(tag.up);
    await client.query(userTag.up);
    await client.query(`COMMIT`);
    console.log('Migration was completed!');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
    db.end();
  }
};

up();
