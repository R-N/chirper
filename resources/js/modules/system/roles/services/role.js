import CrudService from "@/services/crud";

class RoleService extends CrudService {
  constructor() {
    super({
      name: "Role",
      endpoint: "/api/system/roles",
      methods: ["get", "post", "patch", "delete", "put"],
      fields: ["name", "level", "can_manage_peers", "permissions"],
      setters: [
        "name",
        "level",
        "can_manage_peers",
        {
          field: "permissions",
          method: "put",
          endpoint: "api.system.roles.set-permissions",
        },
      ],
      getters: [
        {
          field: "permissions",
          endpoint: "api.system.roles.get-available-permissions",
        },
      ],
    });
  }
}

const roleService = new RoleService();

export { RoleService, roleService };
export default roleService;
