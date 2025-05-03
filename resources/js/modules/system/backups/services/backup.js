import _axios from "@/plugins/axios";
import CrudService from "@/services/crud";

class BackupService extends CrudService {
  constructor() {
    super(
      "Backup",
      "/api/system/backups",
      ["index", "create", "get", "put", "patch", "delete"],
      ["id"],
      ["file"]
    );
  }
}

const backupService = new BackupService();

export { BackupService, backupService };
export default backupService;
