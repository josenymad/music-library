const db = require('../db/index');

exports.readAlbums = async (_, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM Albums');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.readSingleAlbum = async (req, res) => {
  const albumId = req.params.id;

  try {
    const {
      rows: [album],
    } = await db.query(`SELECT * FROM Albums WHERE id = $1`, [albumId]);

    if (album) {
      res.status(200).json(album);
    } else {
      res.status(404).json({ message: `album ${albumId} does not exist` });
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.replaceAlbum = async (req, res) => {
  const { name, year } = req.body;
  const albumId = req.params.id;

  try {
    const {
      rows: [album],
    } = await db.query(
      'UPDATE Albums SET name = $1, year = $2 WHERE id = $3 RETURNING *',
      [name, year, albumId]
    );

    if (album) {
      res.status(200).json(album);
    } else {
      res.status(404).json({ message: `album ${albumId} does not exist` });
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.updateAlbum = async (req, res) => {
  const { name, year } = req.body;
  const albumId = req.params.id;
  let query, params;

  if (name && year) {
    query = `UPDATE Albums SET name = $1, year = $2 WHERE id = $3 RETURNING *`;
    params = [name, year, albumId];
  } else if (!year) {
    query = `UPDATE Albums SET name = $1 WHERE id = $2 RETURNING *`;
    params = [name, albumId];
  } else if (!name) {
    query = `UPDATE Albums SET year = $1 WHERE id = $2 RETURNING *`;
    params = [year, albumId];
  }

  try {
    const {
      rows: [album],
    } = await db.query(query, params);
    if (album) {
      res.status(200).json(album);
    } else {
      res.status(404).json({ message: `album ${albumId} does not exist` });
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.deleteAlbum = async (req, res) => {
  const albumId = req.params.id;

  try {
    const {
      rows: [album],
    } = await db.query('DELETE FROM Albums WHERE id = $1 RETURNING *', [
      albumId,
    ]);

    if (album) {
      res.status(200).json(album);
    } else {
      res.status(404).json({ message: `album ${albumId} does not exist` });
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};
