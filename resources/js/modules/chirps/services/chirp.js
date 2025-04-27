import _axios from '@/plugins/axios'; 
import CrudService from '@/services/crud';

class ChirpService extends CrudService{
  constructor() {
    super(
      "Chirp", "/api/chirps", 
      ["index", "store", "update", "destroy"],
      ["message"],
      [],
      true,
      false,
      [
        {
          action: 'bulk_destroy', 
          endpoint: route('api.chirps.bulk.destroy')
        }
      ]
    );
  }
}

const chirpService = new ChirpService();

export { ChirpService, chirpService };
export default chirpService;
