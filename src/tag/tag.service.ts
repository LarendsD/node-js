import { Inject, Injectable, NotAcceptableException } from '@nestjs/common';
import { PG_CONNECTION } from '../constants';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { User } from '../users/interfaces/users.interface';
import { SearchTagDto } from './dto/search-tag-dto';

@Injectable()
export class TagService {
  constructor(@Inject(PG_CONNECTION) private connection: any) {}

  async createTag({ name, sortOrder }: CreateTagDto, user: User) {
    const [existTag] = await this.getTagByName(name);
    if (existTag) {
      return new NotAcceptableException('This tag name is already exists!');
    }
    const { rows } = await this.connection.query(
      `INSERT INTO tag (creator, name, sortOrder) VALUES ('${
        user.uid
      }', '${name}', '${sortOrder ?? 0}') RETURNING id, name, sortOrder`,
    );
    return rows[0];
  }

  async getTagByName(name: string) {
    const res = await this.connection.query(
      `SELECT * FROM tag WHERE name='${name}'`,
    );
    return res.rows;
  }

  async getTag(id: number, { nickname, uid }: User) {
    const { rows } = await this.connection.query(
      `SELECT name, sortOrder FROM tag WHERE id=${id}`,
    );
    return {
      creator: {
        nickname,
        uid,
      },
      ...rows[0],
    };
  }

  async getTags({ sortByOrder, sortByName, offset, length }: SearchTagDto) {
    const options = {
      setOrder:
        sortByName === '' && sortByOrder === ''
          ? 'ORDER BY name, sortorder'
          : sortByName === ''
          ? 'ORDER BY name'
          : sortByOrder === ''
          ? 'ORDER BY sortorder'
          : '',
      offset: offset ? `OFFSET ${offset}` : '',
      length: length ? `LIMIT ${length}` : '',
    };
    const query = `${options.setOrder} ${options.length} ${options.offset}`;
    const { rows, rowCount } = await this.connection.query(
      `SELECT tag.name, tag.sortorder, users.nickname, users.uid FROM tag JOIN users ON tag.creator=users.uid ${query}`,
    );
    const data = rows.map(({ nickname, uid, ...tag }) => {
      return {
        creator: {
          nickname,
          uid,
        },
        ...tag,
      };
    });
    const quantity = !(offset * length) ? rowCount : offset * length;
    return {
      data,
      meta: {
        offset,
        length,
        quantity,
      },
    };
  }

  async editTag(id: number, { name, sortOrder }: UpdateTagDto, user: User) {
    const [existTag] = await this.getTagByName(name);
    if (existTag && Number(existTag.id) !== id) {
      return new NotAcceptableException('This tag name is already exists!');
    } else if (existTag.creator !== user.uid) {
      return new NotAcceptableException('Only creator can edit tags!');
    }
    const currentTag = await this.getTag(id, user);
    await this.connection.query(
      `UPDATE tag SET name='${name ?? currentTag.name}', sortOrder='${
        sortOrder ?? currentTag.sortorder
      }' WHERE id=${id}`,
    );
    return this.getTag(id, user);
  }

  async deleteTag(id: number) {
    await this.connection.query(`DELETE FROM tag WHERE id=${id}`);
  }
}
