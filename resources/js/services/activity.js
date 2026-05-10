import CrudService from "@/services/crud";

class ActivityService extends CrudService {
  constructor() {
    super({
      name: "Activity",
      endpoint: "/api/system/activity",
      methods: ["get"],
      fields: [
        "id",
        "log_name",
        "description",
        "subject_type",
        "subject_id",
        "causer_type",
        "causer_id",
        "causer_name",
        "subject_label",
        "properties",
        "created_at",
      ],
    });
  }
}

const activityService = new ActivityService();

export { ActivityService, activityService };
export default activityService;
