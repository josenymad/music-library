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
  const albumid = req.params.id;

  try {
    const {
      rows: [album],
    } = await db.query(`SELECT * FROM Albums WHERE id = $1`, [albumid]);

    if (album) {
      res.status(200).json(album);
    } else {
      res.status(404).json({ message: `album ${albumid} does not exist` });
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};
