import _axios from '@/plugins/axios'; 
import CrudService from '@/services/crud';

class ChirpService extends CrudService{
  constructor() {
    super(
      "Chirp", "/chirps", 
      ["store", "update", "destroy"],
      ["message"],
    );
  }
}

const chirpService = new ChirpService();

export { ChirpService, chirpService };
export default chirpService;
