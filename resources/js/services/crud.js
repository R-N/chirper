import _axios from '@/plugins/axios'; 
import { filterObject } from '@/libs/util';

class CrudService {
  constructor(
    name,
    endpoint,
    methods=['index', 'fetch', 'show', 'get', 'store', 'create', 'put', 'patch', 'update', 'destroy', 'delete'],
    fields=[],
    files=[],
    axios=null,
  ){
    this.axios = axios || _axios;
    this.name = name;
    this.endpoint = endpoint;
    this.methods = methods;
    this.fields = fields;
    this.files = files;
  }

  singleEndpoint(obj){
    obj = obj?.id ?? obj;
    return `${this.endpoint}/${obj}`;
  }

  checkMethod(method){
    method = method.toLowerCase();
    if(this.methods.includes(method))
      return true;
    let err = new Error(`Method ${method} not allowed for endpoint ${this.endpoint}`);
    err.show = true;
    err.title = "Not allowed";
    throw err;
  }

  checkFiles(form, files={}){
    if (this.files.length == 0 || this.files)
      return form;
    
    const formData = new FormData();
    this.fields.forEach((f) => {
      formData.append(f, form[f]);
    });
    this.files.forEach((f) => {
      if (form[f]){
        formData.append(f, form[f]);
        formData._has_files = true;
      }else if (files && f in files && files[f]){
        formData.append(f, files[f]);
        formData._has_files = true;
      }
    });
    return formData;
  }

  async index(){
    let res = await axios.get(this.endpoint);
    return res.data;
  }
  async fetch(){
    return await this.index();
  }

  async show(obj){
    let res = await axios.get(this.singleEndpoint(obj));
    return res.data;
  }
  async get(obj){
    return await this.show(obj);
  }

  async store(form){
    form = filterObject(form, this.fields);
    let res = await axios.post(`${this.endpoint}`, form);
    return res.data;
  }
  async create(form){
    return await this.store(form);
  }

  async call(obj, form={}, files={}, method='put'){
    // this.checkMethod(method);
    obj = obj?.id ?? obj;
    let hasFiles = false;
    if (form){
      console.log(form);
      form = this.checkFiles(form, files);
      console.log(form);
      hasFiles = form._has_files;
      form = filterObject(form, this.fields);
      console.log(form);
    }
    let res = null;
    let target = this.singleEndpoint(obj);
    let data = form;
    if (['delete', 'destroy'].includes(method.toLowerCase())){
      data = {
        data: data
      };
      method = 'DELETE';
    }
    console.log(method);
    let f = this.axios[method.toLowerCase()];
    let options = {};
    if (hasFiles){
      options = {
        ...options,
        headers: { "Content-Type": "multipart/form-data" },
        params: {
          // Laravel won't process multipart/form-data in a PUT request
          // So we send a POST request but spoof it
          _method: method.toUpperCase(), 
        },
      };
      f = this.axios.post;
    }
    res = await f(target, data, options);
    return res.data;
  }

  async put(obj, form={}, files={}){
    return await this.call(obj, form, files, 'put');
  }
  async patch(obj, form={}, files={}){
    return await this.call(obj, form, files, 'patch');
  }
  async update(obj, form={}, files={}){
    return await this.put(obj, form, files);
  }
  async destroy(obj, form={}, files={}){
    await this.call(obj, form, files, 'destroy');
  }
  async delete(obj, form={}, files={}){
    return await this.destroy(obj, form, files);
  }
}

export { CrudService };
export default CrudService;
