import _axios from '@/plugins/axios'; 
import CrudService from '@/services/crud';

class NotificationService extends CrudService{
  constructor() {
    super(
      "Notification", "/api/notifications", 
      ["index", "patch", "destroy"],
      ["id", "data", "message"],
      [],
      false,
      false,
      [
        { 
          method: 'patch', 
          action: 'mark_as_read', 
          endpoint: 'api.notifications.read', 
          obj: true
        },
        { 
          action: 'bulk_mark_as_read', 
          endpoint: 'api.notifications.bulk.read', 
        },
        { 
          action: 'bulk_destroy', 
          endpoint: 'api.notifications.bulk.destroy', 
        },
      ]
    );
  }
}

const notificationService = new NotificationService();

export { NotificationService, notificationService };
export default notificationService;
