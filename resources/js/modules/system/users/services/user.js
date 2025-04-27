import _axios from '@/plugins/axios'; 
import CrudService from '@/services/crud';

class UserService extends CrudService{
  constructor() {
    super(
      "User", "/api/system/users", 
      ["index", "store", "update", "destroy"],
      ["email", "name", "verified", "enabled", "roles", "permissions"],
      [],
      [
        'email', 'name', 
        {
          field: 'enabled',
          method: 'put',
          endpoint: 'api.system.users.set-enabled',
        },
        {
          field: 'verified',
          method: 'put',
          endpoint: 'api.system.users.set-verified',
        },
        {
          field: 'roles',
          method: 'put',
          endpoint: 'api.system.users.set-roles',
        },
        {
          field: 'permissions',
          method: 'put',
          endpoint: 'api.system.users.set-permissions',
        },
      ],
      [
        {
          field: 'roles',
          endpoint: 'api.system.users.get-available-roles',
        },
        {
          field: 'permissions',
          endpoint: 'api.system.users.get-available-permissions',
        },
      ],
      [
        { 
          method: 'delete', 
          action: 'clear_password', 
          endpoint: 'api.system.users.clear-password', 
          obj: true
        },
      ]
    );
  }
}

const userService = new UserService();

export { UserService, userService };
export default userService;
