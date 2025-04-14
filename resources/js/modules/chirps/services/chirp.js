import { useAuthStore } from '@/stores/auth';
import _axios from '@/plugins/axios'; 

class ChirpService{
  constructor(axios) {
    this.axios = axios || _axios;
  }

  async store(form){
    // await this.form.post(route('chirps.store'));
    let res = await axios.post(route('chirps.store'), form);
    return res.data;
  }

  async update(chirp, form){
    chirp = chirp?.id ?? chirp;
    // await form.put(route('chirps.update', chirp));
    let res = await axios.put(route('chirps.update', chirp), {
        message: form.message,
    });
    return res.data;
  }

  async destroy(chirp){
    chirp = chirp?.id ?? chirp;
    // route('chirps.destroy', chirp);
    let res = await axios.delete(route('chirps.destroy', chirp));
  }
}

const chirpService = new ChirpService();

export { ChirpService, chirpService };
export default chirpService;
