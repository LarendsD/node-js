import db from '../db.config';
import tag from './queries/tag';
import users from './queries/users';
import userTag from './queries/userTag';
import extensions from './queries/extensions';

const down = async () => {
  const client = await db.connect();
  try {
    await client.query('BEGIN');
    await client.query(users.down);
    await client.query(tag.down);
    await client.query(userTag.down);
    await client.query(extensions.down);
    await client.query('COMMIT');
    console.log('Drop migrations was completed!');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
    db.end();
  }
};

down();
