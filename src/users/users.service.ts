import { Inject, Injectable, NotAcceptableException } from '@nestjs/common';
import { PG_CONNECTION } from '../constants';
import { AddTagsDto } from './dto/add-tags.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interfaces/users.interface';
import { encrypt } from './secure/secure';

@Injectable()
export class UsersService {
  constructor(@Inject(PG_CONNECTION) private connection: any) {}

  async getUser(user: User) {
    const { rows } = await this.connection.query(
      `SELECT email, nickname FROM users WHERE users.email='${user.email}'`,
    );
    const res = await this.connection.query(
      `SELECT id, name, sortOrder FROM tag WHERE creator='${user.uid}'`,
    );
    return {
      ...rows[0],
      tags: res.rows,
    };
  }

  async searchUser(email: string, nickname?: string) {
    const res = await this.connection.query(
      `SELECT * FROM users WHERE email='${email}' OR nickname='${nickname}'`,
    );
    return res.rows;
  }

  async getUserByUid(uid: string) {
    const res = await this.connection.query(
      `SELECT * FROM users WHERE uid='${uid}'`,
    );
    return res.rows;
  }

  async getTags(tags: any[]) {
    const tag = await this.connection.query(
      `SELECT id, name, sortorder FROM tag WHERE id=ANY(ARRAY[${tags}])`,
    );
    return {
      tags: tag.rows,
    };
  }

  async getMyTags({ uid }: User) {
    const { rows } = await this.connection.query(
      `SELECT id, name, sortorder FROM tag WHERE creator='${uid}'`,
    );
    return { tags: rows };
  }

  async addTags({ tags }: AddTagsDto, { uid }: User) {
    const { rowCount } = await this.connection.query(
      `SELECT * FROM tag WHERE id=ANY(ARRAY[${tags}])`,
    );
    if (rowCount !== tags.length) {
      return new NotAcceptableException('Tag not found!');
    }
    await this.connection.query(
      `INSERT INTO user_tag (user_uid, tags_id) VALUES ('${uid}', unnest(ARRAY[${tags}]))`,
    );
    const { rows } = await this.connection.query(
      `SELECT user_tag.tags_id, tag.name AS name, tag.sortorder AS sortorder 
      FROM user_tag JOIN tag ON user_tag.tags_id=tag.id
      WHERE user_uid='${uid}'`,
    );
    return { tags: rows };
  }

  async editUser({ email, password, nickname }: UpdateUserDto, user: User) {
    const [double] = await this.searchUser(email, nickname);
    if (double && double.uid !== user.uid) {
      return new NotAcceptableException('Nickname or email is already exists!');
    }
    const [currentUser] = await this.getUserByUid(user.uid);
    const { rows } = await this.connection.query(
      `UPDATE users SET nickname='${nickname ?? user.nickname}', email='${
        email ?? user.email
      }', password='${
        password ? encrypt(password) : currentUser.password
      }' WHERE uid='${user.uid}' RETURNING email, nickname`,
    );
    return rows[0];
  }

  async deleteTag({ uid }: User, id: number) {
    const { rows } = await this.connection.query(
      `SELECT tags_id FROM user_tag WHERE user_uid='${uid}'`,
    );
    const updatedTags = rows.map((tag) => {
      if (tag.tags_id !== id) {
        return tag.tags_id;
      }
    });
    await this.connection.query(`DELETE FROM user_tag WHERE tags_id=${id}`);
    return this.getTags(updatedTags);
  }

  async deleteUser(user: User) {
    await this.connection.query(
      `DELETE FROM users WHERE email='${user.email}'`,
    );
  }
}
