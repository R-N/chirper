import _axios from "@/plugins/axios";
import CrudService from "@/services/crud";

class BackupService extends CrudService {
  constructor() {
    super({
      name: "Backup",
      endpoint: "/api/system/backups",
      methods: ["get", "post", "put", "patch", "delete"],
      fields: ["id"],
      files: ["file"],
    });
  }
}

const backupService = new BackupService();

export { BackupService, backupService };
export default backupService;
