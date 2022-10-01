/* eslint-disable consistent-return */
import { Test } from '@nestjs/testing';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { User } from 'src/users/interfaces/users.interface';
import { DbModule } from '../db/db.module';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';

const moduleMocker = new ModuleMocker(global);

describe('TagController', () => {
  let tagController: TagController;
  let tagService: TagService;
  let tagData: CreateTagDto;
  let userData: User;

  beforeEach(async () => {
    tagData = {
      name: 'TestName',
      sortOrder: '4',
    };
    userData = {
      email: 'test@mail.ru',
      uid: 'ui-d-ex-ample',
      nickname: 'nickname',
    };
    const moduleRef = await Test.createTestingModule({
      imports: [DbModule],
      controllers: [TagController],
    })
      .useMocker((token) => {
        if (token === TagService) {
          return {
            createTag: jest.fn(() => []),
            getTag: jest.fn(() => []),
            getTags: jest.fn(() => []),
            editTag: jest.fn(() => []),
            deleteTag: jest.fn(() => []),
          };
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    tagController = moduleRef.get(TagController);
    tagService = moduleRef.get(TagService);
  });

  describe('app', () => {
    it('should create tag', async () => {
      jest.spyOn(tagController, 'createTag');
      await tagController.createTag(userData, tagData);

      expect(tagService.createTag).toHaveBeenCalledWith(tagData, userData);
    });

    it('should get tag', async () => {
      jest.spyOn(tagController, 'getTag');
      await tagController.getTag(1, userData);

      expect(tagService.getTag).toBeCalledWith(1, userData);
    });

    it('should get all tags', async () => {
      jest.spyOn(tagController, 'getTags');
      const options = {
        sortByOrder: '',
        length: 10,
      };
      await tagController.getTags(options);

      expect(tagService.getTags).toBeCalledWith(options);
    });

    it('should edit tag', async () => {
      const updateTagData = {
        name: 'updatedTag',
      };
      jest.spyOn(tagController, 'editTag');
      await tagController.editTag(userData, 1, updateTagData);

      expect(tagService.editTag).toBeCalledWith(1, updateTagData, userData);
    });

    it('should delete tag', async () => {
      jest.spyOn(tagController, 'deleteTag');
      await tagController.deleteTag(3);

      expect(tagService.deleteTag).toBeCalledWith(3);
    });
  });
});
