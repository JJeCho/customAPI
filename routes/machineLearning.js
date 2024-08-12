const express = require('express');
const axios = require('axios');
const multer = require('multer');
const FormData = require('form-data');
const fs = require('fs');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });


module.exports = router;
