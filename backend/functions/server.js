const serverless = require('serverless-http');
const express = require('express');
const app = require('../server');

exports.handler = serverless(app);
