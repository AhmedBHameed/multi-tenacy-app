import {compareSync} from 'bcryptjs'

const compareUserAccountPassword = (password: string, hasPassword: string) => {
    return compareSync(password, hasPassword);
  };

  export default compareUserAccountPassword;