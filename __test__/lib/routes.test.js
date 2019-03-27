'use strict';

const { server } = require('../../lib/server.js');
const routes = require('../../lib/routes.js');
const supertest = require('supertest');
const request = supertest(server);
const db = require('../../lib/db.js');

jest.mock(db);

describe('getAllCategories', () => {
  it('should return 200 on a good request', () => {
    return request.get('/categories').expect(200);
  });
  it('should return a results object', () => {
    const results = { count: 0, results: [] };
    return request
      .get('/categories')
      .expect(200)
      .expect(results);
  });
});

describe('getCategory', () => {
  it('should return 200 on a good request', () => {
    const id = { id: 1 };
    return request.get(`/categories/${id}`).expect(200);
  });
  it('should return an empty object on a bad request', () => {
    const id = { id: 1 };
    const result = {};
    return request.get(`/categories/${id}`).expect(result);
  });
});

describe('postCategory', () => {
  it('should post a new category to `/categories`', () => {
    const category = { name: 'electronics' };
    const posted = { name: 'electronics', id: 1 };
    const e = 'electronics';
    return request
      .post('/categories')
      .send(category)
      .then(results => {
        expect(results.body.name).toBe(e);
        expect(results.body.id).toBe(1);
        expect(results.status).toBe(200);
      });
  });
});

describe('putCategory', () => {
  it('should modify a category in the database at `/categories/:id`', () => {
    const id = '1';
    const category = { name: 'electronics' };
    const modifier = { name: 'fruit' };
    return request
      .post(`/categories/`)
      .send(category)
      .then(results => {
        return request
          .put(`/categories/${id}`)
          .send(modifier)
          .then(results => {
            expect(results.status).toBe(200);
            expect(results.body.name).toBe(modifier.name);
            expect(results.body.id).toBe(id);
          });
      });
  });
});

describe('deleteCategory', () => {
  const id = '1';
  const category = { name: 'electronics' };
  const modifier = { name: 'fruit' };
  return request
    .post(`/categories/`)
    .send(category)
    .then(results => {
      return request
        .delete(`/categories/${id}`)
        .send(modifier)
        .then(results => {
          expect(results.status).toBe(200);
          expect(results.body).toEqual({});
        });
    });
});
