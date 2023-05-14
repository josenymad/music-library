const { expect } = require('chai');
const request = require('supertest');
const db = require('../src/db');
const app = require('../src/app');

describe('Update Album', () => {
  let album;
  beforeEach(async () => {
    const { rows } = await db.query(
      'INSERT INTO Albums (name, year) VALUES ($1, $2) RETURNING *',
      ['Portrait With Firewood', 2018]
    );

    album = rows[0];
  });

  describe('PATCH /albums/{id}', () => {
    it('updates the album and returns the updated record', async () => {
      const { status, body } = await request(app)
        .patch(`/albums/${album.id}`)
        .send({ name: 'something else', year: 1992 });

      expect(status).to.equal(200);

      expect(body).to.deep.equal({
        id: album.id,
        name: 'something else',
        year: 1992,
        artistid: null,
      });
    });

    it('returns a 404 if the album does not exist', async () => {
      const { status, body } = await request(app)
        .put('/albums/999999999')
        .send({ name: 'something else', year: 1992 });

      expect(status).to.equal(404);

      expect(body.message).to.equal('album 999999999 does not exist');
    });
  });
});
