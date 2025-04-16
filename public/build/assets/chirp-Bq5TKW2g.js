import "./app-BV4qnAJ0.js";
import { C as CrudService } from "./crud-C7kvoR_2.js";
class ChirpService extends CrudService {
  constructor() {
    super(
      "Chirp",
      "/chirps",
      ["index", "store", "update", "destroy"],
      ["message"]
    );
  }
}
const chirpService = new ChirpService();
export {
  chirpService as c
};
//# sourceMappingURL=chirp-Bq5TKW2g.js.map
