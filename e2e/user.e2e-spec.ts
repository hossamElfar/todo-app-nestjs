import * as request from 'supertest';
import * as faker from 'faker';
import { Test } from '@nestjs/testing';
import { UserModule } from '../src/user/user.module';
import { UserService } from '../src/user/user.service';
import { INestApplication } from '@nestjs/common';
import { ApplicationModule } from '../src/app.module';

describe('User', () => {
  let app: INestApplication;
  let email: string;
  let password: string;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [ApplicationModule],
    })
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  it(`should create new user`, () => {
    password = faker.internet.password();
    email = faker.internet.email();
    return request(app.getHttpServer())
      .post('/user')
      .send({name: faker.name.findName() , email, password, passwordConfirmation: password})
      .expect(201);
  });

  it(`should fails create new user because of messing attributes`, () => {
    return request(app.getHttpServer())
      .post('/user')
      .send({name: faker.name.findName(), password, passwordConfirmation: password})
      .expect(400);
  });

  it(`should fails create new user because of password and password confirmation mismatches`, () => {
    const wrongPassword: string = 'TS is awesome';
    return request(app.getHttpServer())
      .post('/user')
      .send({name: faker.name.findName(), password, passwordConfirmation: wrongPassword})
      .expect(400);
  });

  it(`should login normally `, () => {
    return request(app.getHttpServer())
      .post('/user/login')
      .send({email, password})
      .expect(201);
  });

  it(`should fail login with wrong credentils `, () => {
    const wrongPassword: string = 'TS is awesome';
    return request(app.getHttpServer())
      .post('/user/login')
      .send({email, password: wrongPassword})
      .expect(401);
  });

  it(`should fail login with missing credentils `, () => {
    return request(app.getHttpServer())
      .post('/user/login')
      .send({email})
      .expect(400);
  });

  afterAll(async () => {
    await app.close();
  });
});