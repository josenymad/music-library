const { expect } = require('chai');
const request = require('supertest');
const db = require('../src/db');
const app = require('../src/app');

describe('Read Albums', () => {
  let albums;
  beforeEach(async () => {
    await db.query(
      'INSERT INTO Artists (name, genre) VALUES ($1, $2) RETURNING *',
      ['Bonobo', 'electronic']
    );

    const responses = await Promise.all([
      db.query('INSERT INTO Albums (name, year) VALUES ($1, $2) RETURNING *', [
        'Days To Come',
        '2006',
      ]),
      db.query('INSERT INTO Albums (name, year) VALUES ($1, $2) RETURNING *', [
        'Black Sands',
        '2010',
      ]),
      db.query('INSERT INTO Albums (name, year) VALUES ($1, $2) RETURNING *', [
        'Fragments',
        '2022',
      ]),
    ]);

    albums = responses.map(({ rows }) => rows[0]);
  });

  describe('GET /albums', () => {
    it('returns all album records in the database', async () => {
      const { status, body } = await request(app).get('/albums').send();

      expect(status).to.equal(200);
      expect(body.length).to.equal(3);

      body.forEach((albumRecord) => {
        const expected = albums.find((a) => a.id === albumRecord.id);

        expect(albumRecord).to.deep.equal(expected);
      });
    });
  });
});
