const express = require('express');
const Sequelize = require('sequelize');
const app = express();

// parse incoming requests
app.use(express.json());

// create a connection to the database
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  storage: './Database/SQTeamFootball.sqlite',
});

const Player = sequelize.define('player', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nameplayer: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const Team = sequelize.define('team', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  teamname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const Score = sequelize.define('score', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  playerId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  teamId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  score: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

// Player.belongsToMany(Team, { through: Score, foreignKey: 'playerId' });
// Team.belongsToMany(Player, { through: Score, foreignKey: 'teamId' });
Player.belongsToMany(Score, {through: Score, 
  foreignKey: 'playerId',   // recipient
  otherKey : 'teamId'     // recipient.
  });
sequelize.sync();

app.get('/getPlayers', (req, res) => {
  // Retrieve playerIds from the SQLite database using db.js
  const playerIds = db.getPlayerIds();
  res.json(playerIds);
});

// route to get all books
app.get('/players', (req, res) => {
  Player.findAll()
    .then((players) => {
      res.json(players);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// route to get a book by id a
app.get('/players/:id', (req, res) => {
  Player.findByPk(req.params.id)
    .then((player) => {
      if (!player) {
        res.status(404).send('Palyer not found');
      } else {
        res.json(player);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
// Create a new player
app.post('/players', (req, res) => {
  const { nameplayer } = req.body;

  Player.create({ nameplayer })
    .then((player) => {
      res.send(player);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Update a player
app.put('/players/:id', (req, res) => {
  const { nameplayer } = req.body;
  const playerId = req.params.id;

  Player.findByPk(playerId)
    .then((player) => {
      if (!player) {
        res.status(404).send('Player not found');
      } else {
        player
          .update({ nameplayer })
          .then(() => {
            res.send(player);
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Delete a player
app.delete('/players/:id', (req, res) => {
  const playerId = req.params.id;

  Player.findByPk(playerId)
    .then((player) => {
      if (!player) {
        res.status(404).send('Player not found');
      } else {
        player
          .destroy()
          .then(() => {
            res.send({});
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
app.get('/teams', (req, res) => {
  Team.findAll()
    .then((teams) => {
      res.json(teams);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// route to get a book by id a
app.get('/teams/:id', (req, res) => {
  Team.findByPk(req.params.id)
    .then((team) => {
      if (!team) {
        res.status(404).send('Palyer not found');
      } else {
        res.json(team);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
// Create a new team
app.post('/teams', (req, res) => {
  const { teamname } = req.body;

  Team.create({ teamname })
    .then((team) => {
      res.send(team);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Update a team
app.put('/teams/:id', (req, res) => {
  const { teamname } = req.body;
  const teamId = req.params.id;

  Team.findByPk(teamId)
    .then((team) => {
      if (!team) {
        res.status(404).send('Team not found');
      } else {
        team
          .update({ teamname })
          .then(() => {
            res.send(team);
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Delete a team
app.delete('/teams/:id', (req, res) => {
  const teamId = req.params.id;

  Team.findByPk(teamId)
    .then((team) => {
      if (!team) {
        res.status(404).send('Team not found');
      } else {
        team
          .destroy()
          .then(() => {
            res.send({});
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
// route to get all books
app.get('/scores', (req, res) => {
  Score.findAll()
    .then((scores) => {
      res.json(scores);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// route to get a book by id a
app.get('/scores/:id', (req, res) => {
  Score.findByPk(req.params.id)
    .then((score) => {
      if (!score) {
        res.status(404).send('Score not found');
      } else {
        res.json(score);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
// Create a new score
app.post('/scores', (req, res) => {
  const { playerId, teamId, score } = req.body;

  Score.create({ playerId, teamId, score })
    .then((score) => {
      res.send(score);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Update a score
app.put('/scores/:id', (req, res) => {
  const { playerId, teamId, score } = req.body;
  const scoreId = req.params.id;

  Score.findByPk(scoreId)
    .then((score) => {
      if (!score) {
        res.status(404).send('Score not found');
      } else {
        score
          .update({ playerId, teamId, score })
          .then(() => {
            res.send(score);
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Delete a score
app.delete('/scores/:id', (req, res) => {
  const scoreId = req.params.id;

  Score.findByPk(scoreId)
    .then((score) => {
      if (!score) {
        res.status(404).send('Score not found');
      } else {
        score
          .destroy()
          .then(() => {
            res.send({});
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
// router.get('/getPlayers', (req, res) => {
//   // Fetch player IDs from the database
//   db.all('SELECT id FROM players', (err, rows) => {
//     if (err) {
//       console.error('Error fetching player IDs:', err);
//       res.status(500).json({ error: 'Internal Server Error' });
//     } else {
//       const playerIds = rows.map(row => ({ id: row.id }));
//       res.json(playerIds);
//     }
//   });
// });

// module.exports = router;
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
