import {Request, Response} from 'express';
import validateEmail from '../utils/validations/validateEmail';
import joi from 'joi';
import {TenantModel} from 'src/db/tenantSchema';
import {getDBModel, switchDB} from 'src/db/utils/switchDB';
import {TenantSchemas} from 'src/db/schemasMap';
import {ulid} from 'ulid';
import Joi from 'joi';

const tenantValidationSchema = joi.object<TenantModel>({
  name: Joi.string()
    .pattern(new RegExp(/^[a-zA-Z]+$/))
    .required(),
  email: validateEmail,
});

async function createTenantController(req: Request, res: Response) {
  const tenantData = req.body as TenantModel;
  const tenantDataValidationResult =
    tenantValidationSchema.validate(tenantData);

  if (tenantDataValidationResult.error) {
    res.status(400).send(tenantDataValidationResult);
    return;
  }

  try {
    const {email, name} = tenantDataValidationResult.value;
    const tenantDB = await switchDB('AppTenants', TenantSchemas);
    const tenant = await getDBModel(tenantDB, 'tenant');
    const createdTenant = await tenant.create({
      id: ulid(),
      email,
      name: name.toLowerCase(),
    });

    res.send(createdTenant);
  } catch (error) {
    if ((error as any).code === 11000) {
      res.status(500).send({error: 'Tenant already exists!'});
      return;
    }
    res.status(500).send(error);
  }
}

export default createTenantController;
