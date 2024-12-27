// src/app.js
import { supaBase } from './database/connection';
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();

app.use(express.json());

const UserController = require('./controllers/UserController');
const ProductController = require('./controllers/ProductController');
const CategoryController = require('./controllers/CategoryController');
const UserCreateValidation = require('./middleware/UserCreateValidation');
const JwtVerifyToken = require('./middleware/JwtVerifyToken');
const ProductCreateValidation = require('./middleware/ProductCreateValidation');
const CategoryCreateValidation = require('./middleware/CategoryCreateValidation');
const UserUpdateValidation = require('./middleware/UserUpdateValidation');

const PrivateRoutes = express.Router();

PrivateRoutes.use(JwtVerifyToken);

// Rotas públicas
app.get('/products', ProductController.list);
app.get('/users', UserController.list);
app.post('/login', UserController.login);

// Rotas privadas
PrivateRoutes.post('/products', ProductCreateValidation, ProductController.create);
PrivateRoutes.put('/products/:id', ProductController.update);
PrivateRoutes.delete('/products/:id', ProductController.delete);

PrivateRoutes.post('/users', UserCreateValidation, UserController.create);
PrivateRoutes.put('/users/:id', UserUpdateValidation, UserController.update);
PrivateRoutes.delete('/users/:id', UserController.delete);

app.get('/category', CategoryController.list);
PrivateRoutes.post('/category', CategoryCreateValidation, CategoryController.create);
PrivateRoutes.put('/category/:id', CategoryController.update);
PrivateRoutes.delete('/category/:id', CategoryController.delete);

app.use(PrivateRoutes);

module.exports = app;
