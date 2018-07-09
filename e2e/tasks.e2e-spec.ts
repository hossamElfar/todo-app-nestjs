import * as request from 'supertest';
import * as faker from 'faker';
import { Test } from '@nestjs/testing';
import { UserModule } from '../src/user/user.module';
import { UserService } from '../src/user/user.service';
import { INestApplication } from '@nestjs/common';
import { ApplicationModule } from '../src/app.module';

describe('Task', () => {
  let app: INestApplication;
  let email: string;
  let password: string;
  let token: string;
  let id: string;

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

  it(`should login normally `, () => {
    return request(app.getHttpServer())
      .post('/user/login')
      .send({email, password})
      .expect(201)
      .then(res => token = res.body.accessToken);
  });

  it(`should get all tasks`, () => {
    return request(app.getHttpServer())
      .get('/task/')
      .set({Authorization: `bearer ${token}`, Accept: 'application/json' })
      .expect(200);
  });

  it(`should fail geting all tasks beacuase of missing token`, () => {
    return request(app.getHttpServer())
      .get('/task/')
      .set({Accept: 'application/json' })
      .expect(401);
  });

  it(`should create new task `, () => {
    const subject: string = faker.lorem.word();
    const comment: string = faker.lorem.sentence();
    return request(app.getHttpServer())
      .post('/task/')
      .send({subject, comment})
      .set({Authorization: `bearer ${token}`, Accept: 'application/json' })
      .expect(201)
      .then(res => id = res.body.id);
  });

  it(`should fail creating new task because of missing attrbutes `, () => {
    const subject: string = faker.lorem.word();
    return request(app.getHttpServer())
      .post('/task/')
      .set({Authorization: `bearer ${token}`, Accept: 'application/json' })
      .send({subject})
      .expect(400);
  });

  it(`should update the task `, () => {
    const subject: string = faker.lorem.word();
    return request(app.getHttpServer())
      .put('/task/')
      .set({Authorization: `bearer ${token}`, Accept: 'application/json' })
      .send({id, subject})
      .expect(200);
  });

  it(`should fail updateing the task because of missing id `, () => {
    const subject: string = faker.lorem.word();
    return request(app.getHttpServer())
      .put('/task/')
      .set({Authorization: `bearer ${token}`, Accept: 'application/json' })
      .send({subject})
      .expect(400);
  });

  it(`should delete the task `, () => {
    return request(app.getHttpServer())
      .delete('/task/')
      .set({Authorization: `bearer ${token}`, Accept: 'application/json' })
      .send({id})
      .expect(200);
  });

  it(`should fail deleting the task because of missing id `, () => {
    const subject: string = faker.lorem.word();
    return request(app.getHttpServer())
      .delete('/task/')
      .set({Authorization: `bearer ${token}`, Accept: 'application/json' })
      .expect(400);
  });

  afterAll(async () => {
    await app.close();
  });
});