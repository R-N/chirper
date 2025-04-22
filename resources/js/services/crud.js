import _axios from '@/plugins/axios'; 
import { filterObject, isObject, getFileName, jsonToFormData } from '@/libs/util';

class CrudService {
  constructor(
    name,
    endpoint,
    methods=['index', 'fetch', 'show', 'get', 'store', 'create', 'put', 'patch', 'update', 'destroy', 'delete'],
    fields=[],
    files=[],
    setters=true,
    getters=false,
    bulkActions=[],
    updateMethod='patch',
    axios=null,
  ){
    this.axios = axios || _axios;
    this.name = name;
    this._endpoint = endpoint;
    this.methods = methods;
    this.fields = fields;
    this.files = files;
    this.updateMethod = updateMethod;

    this.createSetters(setters);
    this.createGetters(getters);
    this.createBulkActions(bulkActions);
  }

  get allFields(){
    return [...this.fields, ...this.files];
  }

  createSetters(setters){
    // check if setter is allowed
    const allowSetters = this.methods.filter(m => ['update', 'patch'].includes(m));
    if (!allowSetters) return;
    // set setters for all field if setters is true
    if (setters === true && this.allFields.length > 0){
      setters = this.allFields;
    }
    // cancel if no setters needed
    if (!Array.isArray(setters) || setters.length == 0){
      return;
    }

    // save and build setters
    this.setters = setters;
    for (let field of this.setters) {
      // allow custom setters
      let endpoint = null;
      let method = 'patch';
      if (isObject(field)){
        ({ field, endpoint, method } = field);
      }
      //build setters
      let f = async (obj, new_value) => this.set_field(field, obj, new_value, method, endpoint);
      this[`set_${field}`] = f;
    }
  }
  
  createGetters(getters){
    // set getters for all field if getters is true
    if (getters === true && this.allFields.length > 0){
      getters = this.allFields;
    }
    // cancel if no getters needed
    if (!Array.isArray(getters) || getters.length == 0){
      return;
    }
    // save and build getters
    this.getters = getters;
    for (let field of this.getters) {
      // allow custom getters
      let endpoint = null;
      if (isObject(field)){
        ({ field, endpoint } = field);
      }
      //build getters
      let f = async (obj) => this.get_field(field, obj, endpoint);
      this[`get_${field}`] = f;
    }
  }
  
  createBulkActions(actions){
    // save and build actions
    this.bulk_actions = actions;
    for (let { action, endpoint } of this.bulk_actions) {
      //build getters
      let f = async (form) => this.bulk_action(endpoint, form);
      this[`bulk_${action}`] = f;
    }
  }

  async set_field(field, obj, value, method='patch', endpoint=null){
    return await this.call(obj, { [field]: value }, method, endpoint);
  }

  async get_field(field, obj=null, endpoint=null){
    return await this.call(obj, {}, 'get', endpoint);
  }

  endpoint(obj=null, endpoint=null){
    obj = obj?.id ?? obj;
    endpoint = endpoint ?? this._endpoint;
    // handle named routes
    if(obj == null){
      if (endpoint.includes('/')) {
        return endpoint;
      }else{
        try{
          return route(endpoint);
        }catch(e){
          return endpoint;
        }
      }
    }else{
      if (endpoint.includes('/')) {
        return `${endpoint}/${obj}`;
      }else{
        try{
          return route(endpoint, obj);
        }catch(e){
          return `${endpoint}/${obj}`;
        }
      }
    }
  }

  checkMethod(method){
    method = method.toLowerCase();
    if(this.methods.includes(method))
      return true;
    let err = new Error(`Method ${method} not allowed for endpoint ${this.endpoint()}`);
    err.show = true;
    err.title = "Not allowed";
    throw err;
  }

  checkFiles(form, files={}){
    if (this.files.length == 0 || !this.files)
      return form;
    
    const formData = jsonToFormData(form);
    this.files.forEach((f) => {
      if (f in form && form[f]){
        formData.set(f, form[f]);
        formData._has_files = true;
      }else if (files && f in files && files[f]){
        formData.set(f, files[f]);
        formData._has_files = true;
      }
    });
    return formData._has_files ? formData : form;
  }

  async index(options={}, endpoint=null){
    return await this.get(null, options, endpoint);
  }
  async fetch(options={}, endpoint=null){
    return await this.index(options, endpoint);
  }

  async get(obj, options={}, endpoint=null){
    let res = await axios.get(this.endpoint(obj, endpoint), options);
    return res.data;
  }

  async show(obj, options={}, endpoint=null){
    return await this.get(obj, options, endpoint);
  }

  async download(obj, options={}, endpoint=null){
    let res = await axios.get(this.endpoint(obj, endpoint), {
      ...options,
      responseType: 'blob',
    });
    res.filename = getFileName(res);
    return res;
  }

  static ACCEPT_MAP = {
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    csv: 'text/csv',
    pdf: 'application/pdf',
    zip: 'application/zip'
  }

  async export(obj, type='xlsx', options={}, endpoint=null){
    options = { 
      ...options,
      params: {
        ...(options?.params ?? {}),
        export_type: type
      },
      headers: {
        ...(options?.headers ?? {}),
        Accept: this.constructor.ACCEPT_MAP[type.toLowerCase()]
      }
    };
    return await this.download(obj, options, endpoint);
  }

  getData(data){
    if (!data)
      return null;
    return data?.data ?? data?.item ?? data?.items ?? data?.[this.name.toLowerCase()] ?? data?.[`${this.name.toLowerCase()}s`];
  }
  async create(form, endpoint=null){
    return await this.post(null, form, endpoint);
  }
  async store(form, endpoint=null){
    return await this.post(null, form, endpoint);
  }

  async call(obj=null, form={}, method='put', endpoint=null, filter=true){
    // this.checkMethod(method);

    // get obj id but store the actual obj
    let obj0 = obj;
    obj = obj?.id ?? obj;

    // prepare files
    let hasFiles = false;
    if (form){
      if(filter)
        form = filterObject(form, this.allFields);
      form = this.checkFiles(form);
      hasFiles = form._has_files;
    }
    let res = null;

    // set api target, allowing custom endpoint
    let target = this.endpoint(obj, endpoint);

    // resolve update method to proper HTTP method
    if ([this.updateMethod, 'update'].includes(method.toLowerCase())){
      method = this.updateMethod.toUpperCase();
    }

    // if delete, data needs to be handled differently
    if (['delete', 'destroy'].includes(method.toLowerCase())){
      form = {
        data: form
      };
      method = 'delete';
    }

    // choose function based on method
    // needs to be done before files because
    // files need post
    let f = this.axios[method.toLowerCase()];

    // prepare files if any
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

    // make api call
    res = await f(target, form, options);

    // auto update object
    if (isObject(obj0) || Array.isArray(obj0)){
      if (res?.data){
        Object.assign(obj0, this.getData(res.data));
      }
    }

    return res.data;
  }


  async post(obj=null, form={}, endpoint=null, filter=true){
    return await this.call(null, form, 'post', endpoint, filter);
  }
  async put(obj, form={}, endpoint=null){
    return await this.call(obj, form, 'put', endpoint);
  }
  async patch(obj, form={}, endpoint=null){
    return await this.call(obj, form, 'patch', endpoint);
  }
  async update(obj, form={}, endpoint=null){
    return await this.call(obj, form, this.updateMethod, endpoint);
  }
  async delete(obj, form={}, endpoint=null){
    return await this.call(obj, form, 'destroy', endpoint);
  }
  async destroy(obj, form={}, endpoint=null){
    return await this.delete(obj, form, endpoint);
  }
  async bulk_action(endpoint, form) {
    return await this.post(null, form, endpoint, false);
  }
}

export { CrudService };
export default CrudService;
