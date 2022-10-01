/* eslint-disable consistent-return */
import { CacheModule } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { AuthService } from '../auth/auth.service';
import { DbModule } from '../db/db.module';
import { User } from './interfaces/users.interface';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const moduleMocker = new ModuleMocker(global);

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  let userData: User;

  beforeEach(async () => {
    userData = {
      email: 'test@mail.ru',
      uid: 'ui-d-ex-ample',
      nickname: 'nickname',
    };
    const moduleRef = await Test.createTestingModule({
      imports: [DbModule, CacheModule.register()],
      providers: [AuthService, JwtService],
      controllers: [UsersController],
    })
      .useMocker((token) => {
        if (token === UsersService) {
          return {
            getUser: jest.fn(() => []),
            getMyTags: jest.fn(() => []),
            addTags: jest.fn(() => []),
            editUser: jest.fn(() => []),
            deleteTag: jest.fn(() => []),
            deleteUser: jest.fn(() => []),
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

    usersController = moduleRef.get(UsersController);
    usersService = moduleRef.get(UsersService);
  });

  describe('app', () => {
    it('should get user', async () => {
      jest.spyOn(usersController, 'getUser');
      await usersController.getUser(userData);

      expect(usersService.getUser).toHaveBeenCalledWith(userData);
    });

    it('should get tags of user', async () => {
      jest.spyOn(usersController, 'getMyTags');
      await usersController.getMyTags(userData);

      expect(usersService.getMyTags).toBeCalledWith(userData);
    });

    it('should add tags to user', async () => {
      jest.spyOn(usersController, 'addTags');
      const tags = {
        tags: [1, 4],
      };
      await usersController.addTags(tags, userData);

      expect(usersService.addTags).toBeCalledWith(tags, userData);
    });

    it('should edit user', async () => {
      const updateUserData = {
        email: 'test',
        password: 'myPass123',
      };
      jest.spyOn(usersController, 'editUser');
      await usersController.editUser(updateUserData, userData);

      expect(usersService.editUser).toBeCalledWith(updateUserData, userData);
    });

    it('should delete tag of user', async () => {
      jest.spyOn(usersController, 'deleteTag');
      await usersController.deleteTag(3, userData);

      expect(usersService.deleteTag).toBeCalledWith(userData, 3);
    });

    it('should delete user', async () => {
      jest.spyOn(usersController, 'deleteUser');
      await usersController.deleteUser(userData);

      expect(usersService.deleteUser).toBeCalledWith(userData);
    });
  });
});
