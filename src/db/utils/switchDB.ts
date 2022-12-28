import {Connection, Schema} from 'mongoose';
import connectDB from './connectDB';
import {TenantDocument} from 'src/db/tenantSchema';
import {TenantSchemas} from '../schemasMap';

/** Switch db on same connection pool
 * @return new connection
 */

const switchDB = async (dbName: string, dbSchema: Map<string, Schema>) => {
  const mongoose = await connectDB();

  if (mongoose instanceof Error)
    throw new Error(`DbSwitchingError: ${mongoose.message}`);

  if (mongoose.connection.readyState === 1) {
    const db = mongoose.connection.useDb(dbName, {useCache: true});
    // Prevent from schema re-registration
    if (!Object.keys(db.models).length) {
      dbSchema.forEach((schema, modelName) => {
        db.model(modelName, schema);
      });
    }
    return db;
  }
  throw new Error('error');
};

/**
 * @return model from mongoose
 */
const getDBModel = async (db: Connection, modelName: string) => {
  return db.model(modelName);
};

const allTenants = async () => {
  const tenantDB = await switchDB('AppTenants', TenantSchemas);
  const tenantModel = await getDBModel(tenantDB, 'tenant');
  const tenants = await tenantModel.find({});
  return tenants as TenantDocument[];
};

const findTenant = async (tid: string) => {
  const tenantDB = await switchDB('AppTenants', TenantSchemas);
  const tenantModel = await getDBModel(tenantDB, 'tenant');
  const tenant = await tenantModel.findOne({id: tid});
  return tenant as TenantDocument | null;
};

// const initEmployees = async () => {
//   const customers = await getAllTenants();
//   const createEmployees = customers.map(async (tenant) => {
//     const companyDB = await switchDB(
//       `${tenant.tenantName}${tenant.id}`,
//       CompanySchemas
//     );
//     const employeeModel = await getDBModel(companyDB, 'employee');
//     await employeeModel.deleteMany({});
//     return employeeModel.create({
//       id: ulid(),
//       name: 'John',
//       companyName: tenant.companyName,
//     });
//   });
//   const results = await Promise.all(createEmployees);
// };

export {switchDB, getDBModel, allTenants, findTenant};
