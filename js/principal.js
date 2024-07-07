const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const conexion = require('./bd');

const app = express();
const port = 3000;