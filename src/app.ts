import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import CONFIG from './config/environments';
import getTenantsController from './controllers/getTenants';
import createTenantController from './controllers/createTenant';
import createEmployeeController from './controllers/createEmployee';
const {PORT} = CONFIG;

async function bootStrap() {
  const app = express();

  app.use(morgan('tiny'));

  app.use(
    cors({
      origin: (origin, callback) => {
        callback(null, true);
        return;
      },
      credentials: true,
    })
  );

  app.use(express.urlencoded({extended: true}));
  app.use(express.json());
  app.use(cookieParser());

  app.get('/api/tenants', getTenantsController);
  app.post('/api/tenants', createTenantController);
  app.post('/api/employees', createEmployeeController);

  app.listen(PORT, () => {
    console.log(`Server is listening to port http://localhost:${PORT}`);
  });
}

bootStrap();
