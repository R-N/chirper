import _axios from '@/plugins/axios'; 
import CrudService from '@/services/crud';

class UserService extends CrudService{
  constructor() {
    super(
      "User", "/system/users", 
      ["index", "store", "update", "destroy"],
      ["email", "name", "verified", "enabled", "roles", "permissions"],
      [],
      [
        'email', 'name', 
        {
          field: 'enabled',
          method: 'put',
          endpoint: 'system.users.set-enabled',
        },
        {
          field: 'verified',
          method: 'put',
          endpoint: 'system.users.set-verified',
        },
        {
          field: 'roles',
          method: 'put',
          endpoint: 'system.users.set-roles',
        },
        {
          field: 'permissions',
          method: 'put',
          endpoint: 'system.users.set-permissions',
        },
      ],
      [
        {
          field: 'roles',
          endpoint: 'system.users.get-available-roles',
        },
        {
          field: 'permissions',
          endpoint: 'system.users.get-available-permissions',
        },
      ],
      [
        { 
          method: 'delete', 
          action: 'clear_password', 
          endpoint: 'system.users.clear-password', 
          obj: true
        },
      ]
    );
  }
}

const userService = new UserService();

export { UserService, userService };
export default userService;
