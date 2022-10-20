const express = require('express');
const { getPuppyData } = require('./utils');
const path = require('path');
const fs = require('node:fs/promises');

const router = express.Router();

module.exports = router;

// Get puppy data
router.get('/:id', async (req, res) => {
  try {
    await getPuppyData().then((data) => {
      const id = data.puppies.find((puppy) => puppy.id === +req.params.id);
      res.render('details', id);
    });
  } catch (error) {
    console.log('Whoops, could not find that puppy');
  }
});

//edit puppy data
router.get('/:id/edit', async (req, res) => {
  try {
    await getPuppyData().then((data) => {
      let id = data.puppies.find((puppy) => puppy.id === +req.params.id);
      res.render('edit', id);
    });
  } catch (error) {
    console.log('Whoops, there was an error');
  }
});

// Submit changes
router.post('/:id/edit', async (req, res) => {
  try {
    const postedData = req.body;

    await getPuppyData().then(async (data) => {
      const index = data.puppies.findIndex(
        (puppy) => puppy.id === +req.params.id,
      );

      data.puppies[index] = {
        id: +req.params.id,
        ...postedData,
      };

      const filepath = path.join(__dirname, 'data.json');
      await fs.writeFile(filepath, JSON.stringify(data));
      res.redirect(`/puppies/${req.params.id}`);
    });
  } catch (error) {
    console.log('Whoops, there was an error');
  }
});
