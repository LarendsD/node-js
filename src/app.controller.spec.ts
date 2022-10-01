/* eslint-disable consistent-return */
import { CacheModule } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const moduleMocker = new ModuleMocker(global);

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CacheModule.register()],
      controllers: [AppController],
    })
      .useMocker((token) => {
        if (token === AppService) {
          return {
            signIn: jest.fn(() => []),
            login: jest.fn(() => []),
            reset: jest.fn(() => []),
            logout: jest.fn(() => []),
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

    appController = moduleRef.get(AppController);
    appService = moduleRef.get(AppService);
  });

  describe('app', () => {
    it('should signIn', async () => {
      const signData = {
        email: 'Test@mail.ru',
        password: '1234Test',
        nickname: 'TestNick',
      };
      jest.spyOn(appController, 'signIn');
      await appController.signIn(signData);

      expect(appService.signIn).toHaveBeenCalledWith(signData);
    });
  });
});
