import "./auth-DrKxFB6F.js";
import { a as api } from "./axios-D4gWzKUO.js";
class ProfileService {
  constructor(axios) {
    this.axios = axios || api;
  }
  async deleteUser(form) {
    let target = route("current-user.destroy");
    let res = await this.axios.delete(target, { data: form });
    return res.data;
  }
  async logoutOtherBrowserSessions(form) {
    let target = route("other-browser-sessions.destroy");
    let res = await this.axios.delete(target, { data: form });
    return res.data;
  }
  async updatePassword(form) {
    let target = route("user-password.update");
    let res = await this.axios.put(target, form);
    return res.data;
  }
  async _updateProfileInformation(form) {
    let res = await this.axios.patch(route("profile.update"), form);
    return res.data;
  }
  async updateProfileInformation(form, photo = null) {
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    if (photo || form.photo) {
      formData.append("photo", photo || form.photo);
    }
    let res = await this.axios.post(route("user-profile-information.update"), formData, {
      headers: { "Content-Type": "multipart/form-data" },
      params: {
        // Laravel won't process multipart/form-data in a PUT request
        // So we send a POST request but spoof it as PUT
        _method: "PUT"
      }
    });
    return res.data;
  }
  async deletePhoto() {
    let res = await this.axios.delete(route("current-user-photo.destroy"));
    return res.data;
  }
  async verifyEmail(form) {
    let res = await this.axios.post(route("verification.send"), form);
    return res.data;
  }
}
const profileService = new ProfileService();
export {
  profileService as p
};
