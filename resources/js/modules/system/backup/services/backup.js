import _axios from '@/plugins/axios'; 
import CrudService from '@/services/crud';

class BackupService extends CrudService{
  constructor() {
    super(
      "Backup", "/system/backup", 
      ["index", "create", "get", "put", "patch", "delete"],
      ["id"],
      ["file"],
    );
  }
}

const backupService = new BackupService();

export { BackupService, backupService };
export default backupService;
