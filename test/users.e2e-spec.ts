import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { testingModuleImports } from './global-setup';
import { DataSource } from 'typeorm';
import { User } from '../src/users/entities/user.entity';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: testingModuleImports(),
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();

    dataSource = app.get<DataSource>(DataSource);
  });

  afterAll(async () => {
    await app.close();
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
  });

  beforeEach(async () => {
    await dataSource.query(`DELETE FROM "user";`);
  });

  describe('Users PATCH', () => {
    beforeEach(async () => {
      await dataSource.query(`DELETE FROM "user";`);
    });

    it('should update users username with same value', async () => {
      const userEntity = new User();
      userEntity.username = 'username123';

      const user = await dataSource.getRepository(User).save(userEntity);

      await request(app.getHttpServer())
        .patch(`/users/${user.id}`)
        .send({ username: userEntity.username })
        .expect(200);

      const updatedUser = await dataSource
        .getRepository(User)
        .findOneBy({ id: user.id });
      expect(updatedUser.updatedTimestamp).not.toEqual(user.updatedTimestamp);
    });

    it('should throw if username already exists', async () => {
      const userEntity1 = new User();
      userEntity1.username = 'username1';
      const userEntity2 = new User();
      userEntity2.username = 'username2';

      const user1 = await dataSource.getRepository(User).save(userEntity1);
      const user2 = await dataSource.getRepository(User).save(userEntity2);

      await request(app.getHttpServer())
        .patch(`/users/${user1.id}`)
        .send({ username: user2.username })
        .expect(400);
    });

    it('should allow updating only username', async () => {
      const userEntity1 = new User();
      userEntity1.username = 'username1';

      const user1 = await dataSource.getRepository(User).save(userEntity1);

      await request(app.getHttpServer())
        .patch(`/users/${user1.id}`)
        .send({
          username: userEntity1.username,
          id: 99,
          updatedTimestamp: new Date(),
          createdTimestamp: new Date(),
        })
        .expect(400);
    });
  });
});
