import EmployeeSchema from 'src/db/employeeSchema';
import TenantSchema from 'src/db/tenantSchema';

// Indicates which Schemas are used by whom
const TenantSchemas = new Map([['tenant', TenantSchema]]);
const EmployeeSchemas = new Map([['employee', EmployeeSchema]]);

export {EmployeeSchemas, TenantSchemas};
