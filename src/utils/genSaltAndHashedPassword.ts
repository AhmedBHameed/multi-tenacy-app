import {genSaltSync, hashSync} from 'bcryptjs'

const genSaltAndHashedPassword = (
    plainPassword: string
  ): {
    passwordSalt: string;
    password: string;
  } => {
    const passwordSalt = genSaltSync(12);
    const password = hashSync(plainPassword, passwordSalt);
    return {passwordSalt, password};
  };

  export default genSaltAndHashedPassword;