const { expect } = require('chai');
const request = require('supertest');
const db = require('../src/db/index');
const app = require('../src/app');

describe('create album', () => {
  let artist;
  beforeEach(async () => {
    const { rows } = await db.query(
      'INSERT INTO Artists (name, genre) VALUES ($1, $2) RETURNING *',
      ['Djrum', 'electronic']
    );

    artist = rows[0];
  });
  describe('POST /artists/{id}/albums', () => {
    it('creates a new album in the database', async () => {
      const { status, body } = await request(app)
        .post(`/artists/${artist.id}/albums`)
        .send({
          name: 'Portrait With Firewood',
          year: 2018,
        });

      expect(status).to.equal(201);
      expect(body.name).to.equal('Portrait With Firewood');
      expect(body.year).to.equal(2018);

      const {
        rows: [albumData],
      } = await db.query(`SELECT * FROM Albums WHERE id = ${body.id}`);
      expect(albumData.name).to.equal('Portrait With Firewood');
      expect(albumData.year).to.equal(2018);
    });
  });
});
