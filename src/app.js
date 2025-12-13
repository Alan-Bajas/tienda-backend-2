import express from 'express';
import path from 'path';
import { engine } from 'express-handlebars';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import passport from 'passport';

import productRouter from './routes/product.routes.js';
import cartRouter from './routes/cart.routes.js';
import viewRouter from './routes/view.routes.js';

import sessionsRouter from './routes/sessions.routes.js';
import usersRouter from './routes/users.routes.js';

import { initializePassport } from './config/passport.config.js';

const app = express();

app.engine('hbs', engine({
  extname: '.hbs',
  helpers: {
    multiply: (a, b) => Number(a) * Number(b),

    total: (products = []) =>
      products.reduce((sum, p) => sum + (Number(p.quantity) * Number(p.product?.price || 0)), 0),

    money: (n) => {
      const v = Number(n) || 0;
      return '$' + v.toLocaleString('es-CL');
    },

    eq: (a, b) => String(a ?? '') === String(b ?? ''),
  },
}));
app.set('view engine', 'hbs');
app.set('views', path.resolve('src', 'views'));

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
  crossOriginOpenerPolicy: false,
}));

app.use(compression());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

// ✅ Passport (JWT strategy "current")
initializePassport();
app.use(passport.initialize());

// ✅ Rutas nuevas exigidas por la Entrega 1
app.use('/api/sessions', sessionsRouter);
app.use('/api/users', usersRouter);

// ✅ Rutas existentes del ecommerce (Backend 1)
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/', viewRouter);

app.get('/ping', (req, res) => res.send('Backend listo 🚀'));

export default app;
