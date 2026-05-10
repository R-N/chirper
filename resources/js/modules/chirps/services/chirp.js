import _axios from "@/plugins/axios";
import CrudService from "@/services/crud";

class ChirpService extends CrudService {
  constructor() {
    super({
      name: "Chirp",
      endpoint: "/api/chirps",
      methods: ["get", "post", "patch", "delete"],
      fields: ["message"],
      actions: [
        {
          action: "bulk_destroy",
          endpoint: route("api.chirps.bulk.destroy")
        }
      ]
    });
  }
}

const chirpService = new ChirpService();

export { ChirpService, chirpService };
export default chirpService;
