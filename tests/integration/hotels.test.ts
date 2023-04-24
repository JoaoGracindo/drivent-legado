import httpStatus from 'http-status';
import * as jwt from 'jsonwebtoken';
import supertest from 'supertest';

import faker from '@faker-js/faker';
import { cleanDb } from '../helpers';
import { createUser } from '../factories';
import app, { init } from '@/app';

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe('GET /hotels', () => {
  it('Should respond with status 401 if no token', async () => {
    const result = await server.get('/hotels');
    expect(result.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('Should respond with status 401 if token is not valid', async () => {
    const token = faker.lorem.word();
    const result = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
    expect(result.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
});

describe('When token is valid GET /hotels', () => {
  it('Should respond with');
});
