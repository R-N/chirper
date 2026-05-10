import _axios from "@/plugins/axios";
import CrudService from "@/services/crud";

class UserService extends CrudService {
  constructor() {
    super({
      name: "User",
      endpoint: "/api/system/users",
      methods: ["get", "post", "patch", "delete", "put"],
      fields: ["email", "name", "verified", "enabled", "roles", "permissions"],
      setters: [
        "email",
        "name",
        {
          field: "enabled",
          method: "put",
          endpoint: "api.system.users.set-enabled"
        },
        {
          field: "verified",
          method: "put",
          endpoint: "api.system.users.set-verified"
        },
        {
          field: "roles",
          method: "put",
          endpoint: "api.system.users.set-roles"
        },
        {
          field: "permissions",
          method: "put",
          endpoint: "api.system.users.set-permissions"
        }
      ],
      getters: [
        {
          field: "roles",
          endpoint: "api.system.users.get-available-roles"
        },
        {
          field: "permissions",
          endpoint: "api.system.users.get-available-permissions"
        }
      ],
      actions: [
        {
          method: "delete",
          action: "clear_password",
          endpoint: "api.system.users.clear-password",
          obj: true
        }
      ]
    });
  }
}

const userService = new UserService();

export { UserService, userService };
export default userService;
