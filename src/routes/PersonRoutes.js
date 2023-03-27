const router = require('express').Router();

router.get('/id/:id', require('../controllers/Person/getPersonByID'));

router.get('/name/:name', require('../controllers/Person/getPersonByName'));

router.get('/all', require('../controllers/Person/getAllPerson'));

module.exports = router;