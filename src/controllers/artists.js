const db = require('../db/index');

exports.addArtist = async (req, res) => {
  const { name, genre } = req.body;

  try {
    const {
      rows: [artist],
    } = await db.query(
      'INSERT INTO Artists (name, genre) VALUES ($1, $2) RETURNING *',
      [name, genre]
    );
    res.status(201).json(artist);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.readArtists = async (_, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM Artists');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.readSingleArtist = async (req, res) => {
  const artistid = req.params.id;
  try {
    const {
      rows: [artist],
    } = await db.query(`SELECT * FROM Artists WHERE id = ${artistid}`);
    if (artist) {
      res.status(200).json(artist);
    } else {
      res.status(404).json({ message: `artist ${artistid} does not exist` });
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.updateArtist = async (req, res) => {
  const { name, genre } = req.body;
  const artistid = req.params.id;
  try {
    const {
      rows: [artist],
    } = await db.query(
      `UPDATE Artists SET name = $1, genre = $2 WHERE id = $3 RETURNING *`,
      [name, genre, artistid]
    );
    if (artist) {
      res.status(200).json(artist);
    } else {
      res.status(404).json({ message: `artist ${artistid} does not exist` });
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};
