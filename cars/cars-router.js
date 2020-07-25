const express = require('express');

const db = require('../data/db-config.js');

const router = express.Router();

router.get('/', (req, res) => {
  db('cars')
  .then(cars => {
    res.json(cars); 
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to retrieve cars' });
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db('cars').where({ id }).first()
  .then(car => {
    res.json(car);
  }) 
  .catch (err => {
    res.status(500).json({ message: 'Failed to retrieve car' });
  });
});

router.post('/', (req, res) => {
  const carsData = req.body;
  db('cars').insert(carsData)
  .then(ids => {
    db('cars').where({ id: ids[0] })
    .then(newCarEntry => {
      res.status(201).json(newCarEntry);
    });
  })
  .catch (err => {
    console.log('POST error', err);
    res.status(500).json({ message: "Failed to store data" });
  });
});

router.put('/:id', (req, res) => {
  const {id} = req.params;
  const changes = req.body;
  db
    ('cars')
    .where({ id: id })
    .update(changes)
    .then(count => {
      if (count > 0) {
        res.status(201).json({ data: count });
      } else {
        res.status(404).json({ message: 'Could not update!'})
      }
    })
    .catch (err => {
    console.log('POST error', err);
    res.status(500).json({ message: "Failed to store data" });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db
    .where({id})
    .del()
    .then(count => {
      if (count > 0) {
        res.status(201).json({ data: count });
      } else {
        res.status(404).json({ message: 'Could not update!'})
      }
    })
    .catch (err => {
    console.log('POST error', err);
    res.status(500).json({ message: "Failed to store data" });
  });
});

module.exports = router;