import {Request, Response} from 'express';
import {getDBModel, switchDB} from 'src/db/utils/switchDB';
import {TenantSchemas} from 'src/db/schemasMap';

async function getTenantsController(req: Request, res: Response) {
  try {
    const tenantDB = await switchDB('AppTenants', TenantSchemas);
    const tenantModel = await getDBModel(tenantDB, 'tenant');
    const tenants = await tenantModel.find({});
    res.send(tenants);
  } catch (error) {
    res.status(500).send({error});
  }
}

export default getTenantsController;
