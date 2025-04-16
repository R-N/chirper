import _axios from '@/plugins/axios'; 
import { filterObject, isObject } from '@/libs/util';

class CrudService {
  constructor(
    name,
    endpoint,
    methods=['index', 'fetch', 'show', 'get', 'store', 'create', 'put', 'patch', 'update', 'destroy', 'delete'],
    fields=[],
    files=[],
    setters=true,
    updateMethod='patch',
    axios=null,
  ){
    this.axios = axios || _axios;
    this.name = name;
    this.endpoint = endpoint;
    this.methods = methods;
    this.fields = fields;
    this.files = files;
    this.updateMethod = updateMethod;
    const allowSetters = this.methods.filter(m => ['update', 'patch'].includes(m));
    if (allowSetters && this.allFields.length > 0){
      if (
        (setters === true) 
        // || (Array.isArray(setters) && setters.length == 0)
      ){
        setters = this.allFields;
      }
    }else{
      setters = null;
    }
    if (Array.isArray(setters) && setters.length > 0){
      this.createSetters(setters);
    }
  }

  get allFields(){
    return [...this.fields, ...this.files];
  }
  
  createSetters(setters){
    this.setters = setters;
    for (const field of this.setters) {
        let f = (obj, new_value) => this.set_field(field, obj, new_value);
        this[`set_${field}`] = f;
    }
  }

  async set_field(field, obj, value){
    return await this.patch(obj, { [field]: value });
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
      if (f in form){
        formData.append(f, form[f]);
      }
    });
    this.files.forEach((f) => {
      if (f in form && form[f]){
        formData.append(f, form[f]);
        formData._has_files = true;
      }else if (files && f in files && files[f]){
        formData.append(f, files[f]);
        formData._has_files = true;
      }
    });
    return formData;
  }

  async index(query={}){
    let res = await axios.get(this.endpoint);
    return res.data;
  }
  async fetch(query={}){
    return await this.index(query);
  }

  async show(obj){
    let res = await axios.get(this.singleEndpoint(obj));
    return res.data;
  }
  async get(obj){
    return await this.show(obj);
  }

  getData(data){
    if (!data)
      return null;
    return data?.data ?? data?.[this.name.toLowerCase()] ?? data?.[`${this.name.toLowerCase()}s`];
  }

  async store(form){
    form = filterObject(form, this.fields);
    let res = await axios.post(this.endpoint, form);
    return res.data;
  }
  async create(form){
    return await this.store(form);
  }

  async call(obj, form={}, files={}, method='put'){
    // this.checkMethod(method);
    let obj0 = obj;
    obj = obj?.id ?? obj;
    let hasFiles = false;
    if (form){
      form = filterObject(form, this.allFields);
      form = this.checkFiles(form, files);
      hasFiles = form._has_files;
    }
    let res = null;
    let target = this.singleEndpoint(obj);
    let data = form;
    if ([this.updateMethod, 'update'].includes(method.toLowerCase())){
      method = this.updateMethod.toUpperCase();
    }
    if (['delete', 'destroy'].includes(method.toLowerCase())){
      data = {
        data: data
      };
      method = 'DELETE';
    }
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
    if (isObject(obj0)){
      let data = this.getData(res);
      if (data){
        Object.assign(obj0, this.getData(res.data));
      }
    }
    return res.data;
  }

  async put(obj, form={}, files={}){
    return await this.call(obj, form, files, 'put');
  }
  async patch(obj, form={}, files={}){
    return await this.call(obj, form, files, 'patch');
  }
  async update(obj, form={}, files={}){
    return await this.call(obj, form, files, this.updateMethod);
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
