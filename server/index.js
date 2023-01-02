const express = require('express');
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema.js');
const colors = require('colors')
const connectDB = require('./config/db');
const port = process.env.PORT || 5000; 
const app = express();

app.use('/graphql', graphqlHTTP({schema, graphiql: process.env.NODE_ENV === 'development'})) 

connectDB()
app.listen(port, console.log('server is running on port ' + port))