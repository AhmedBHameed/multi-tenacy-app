import {Request, Response} from 'express';
import {EmployeeSchemas} from 'src/db/schemasMap';
import {ulid} from 'ulid';
import {EmployeeModel} from 'src/db/employeeSchema';
import validateRequiredString from 'src/utils/validations/validateRequiredString';
import Joi from 'joi';
import {findTenant, getDBModel, switchDB} from 'src/db/utils/switchDB';

const employeeValidationSchema = Joi.object<EmployeeModel & {tenantId: string}>(
  {
    tenantId: validateRequiredString,
    name: validateRequiredString,
    companyName: validateRequiredString,
  }
);

async function createEmployeeController(req: Request, res: Response) {
  const employeeData = req.body as EmployeeModel;
  const employeeDataValidationResult =
    employeeValidationSchema.validate(employeeData);

  if (employeeDataValidationResult.error) {
    res.status(400).send(employeeDataValidationResult);
    return;
  }

  try {
    const {tenantId, companyName, name} = employeeDataValidationResult.value;
    const tenant = await findTenant(tenantId);
    if (!tenant) {
      res.status(500).send({error: 'Tenant not found!'});
      return;
    }

    const employeeDB = await switchDB(`tenant-${tenant.id}`, EmployeeSchemas);

    const employeeModel = await getDBModel(employeeDB, 'employee');

    const employee = await employeeModel.create({
      id: ulid(),
      name,
      companyName,
    });

    res.send(employee);
  } catch (error) {
    if ((error as any).code === 11000) {
      res.status(500).send({error: 'Tenant already exists!'});
      return;
    }

    res.status(500).send(error);
  }
}

export default createEmployeeController;
