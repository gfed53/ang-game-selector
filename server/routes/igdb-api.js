// jshint esversion: 6

const express = require('express');
const axios = require('axios');
const igdb = require('igdb-api-node').default;
const router = express.Router();

const config = require('../config');

const client = igdb(config.KEYS.igdbKey);

// Make IGDB search with given query
router.post('/find-games', function(req, res) {

    client.games(req.body).then(response => {
        // response.body contains the parsed JSON response to this query
        res.json(response);
    }).catch(error => {
        throw error;
    });
    
});

module.exports = router;