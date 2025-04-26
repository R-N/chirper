import _axios from '@/plugins/axios'; 
import { filterObject, isObject, getFileName, jsonToFormData, getData, bindMethod } from '@/libs/util';
import { t } from '@/plugins/i18n';

class BaseService {
  constructor(
    axios=null,
    endpoint=null,
    methods=null,
    name=null,
    files=null,
    updateMethod=null,
  ){
    this.axios = axios || _axios;
    this.name = name;
    if (!files)
      files = ['file'];
    this.files = files;
    this._endpoint = endpoint || '/';
    this.methods = methods || [];
    this.updateMethod = updateMethod || 'patch';

    this.bindMethods([
      "get", "download", "export", "call", 
      "post", "put", "patch", "delete"
    ]);
  }

  bindMethods(methods){
    this.baseMethods = [];
    for(const method of methods){
      this.baseMethods[method] = bindMethod(BaseService, this, method);
    }
  }

  async _call(methodName, ...args) {
    return await this.baseMethods[methodName](...args);
  }

  __call(methodName) {
    return this.baseMethods[methodName];
  }

  get allFields(){
    return [];
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
    if(this.methods.includes(method) || !(this.methods?.length))
      return true;
    let err = new Error(t('crud.method_not_allowed', {
      method: method,
      endpoint: this.endpoint()
    }));
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

  async get(endpoint, options={}, obj=null){
    let res = await this.axios.get(this.endpoint(obj, endpoint), options);
    return res.data;
  }

  async download(endpoint, options={}, obj=null){
    let res = await this.axios.get(this.endpoint(obj, endpoint), {
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

  async export(endpoint, type='xlsx', options={}, obj=null){
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
    return await this.__call("download")(endpoint, options, obj);
  }

  getData(data){
    return getData(data, this.name);
  }

  async call(endpoint, form={}, method='put', filter=true, obj=null){
    // this.checkMethod(method);

    // get obj id but store the actual obj
    const obj0 = obj;
    obj = obj?.id ?? obj;

    // save original form for later use
    const form0 = form;

    // prepare files
    let hasFiles = false;
    if (form){
      if(filter && this.allFields?.length)
        form = filterObject(form, this.allFields);
      form = this.checkFiles(form);
      hasFiles = form._has_files;
    }
    let res = null;

    // set api target, allowing custom endpoint
    let target = this.endpoint(obj, endpoint);

    // resolve get to proper HTTP method
    if (['index', 'fetch'].includes(method.toLowerCase())){
      method = 'get';
    }

    // resolve post to proper HTTP method
    if (['create', 'store'].includes(method.toLowerCase())){
      method = 'post';
    }

    // resolve update method to proper HTTP method
    if (['update'].includes(method.toLowerCase())){
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

    // clear form errors
    if ('clearErrors' in form0)
      form0.clearErrors?.();
    if ('clearError' in form0)
      form0.clearError?.();

    // make api call
    try{
      res = await f(target, form, options);
      if ('reset' in form0)
        form0.reset?.();
    }catch(error){
      // set form errors
      if (error?.response?.data?.errors){
        if ('setError' in form0)
          form0.setError?.(error.response.data.errors);
        if ('setErrors' in form0)
          form0.setErrors?.(error.response.data.errors);
      } 
      throw error;
    }

    // auto update object
    if (isObject(obj0) || Array.isArray(obj0)){
      if (res?.data){
        Object.assign(obj0, this.getData(res.data));
      }
    }

    return res.data;
  }


  async post(endpoint, form={}, filter=true, obj=null){
    return await this.__call("call")(endpoint, form, 'post', filter, obj);
  }
  async put(endpoint, form={}, obj=null){
    return await this.__call("call")(endpoint, form, 'put', true, obj);
  }
  async patch(endpoint, form={}, obj=null){
    return await this.__call("call")(endpoint, form, 'patch', true, obj);
  }
  async delete(endpoint, form={}, obj=null){
    return await this.__call("call")(endpoint, form, 'destroy', true, obj);
  }
  async action(method, endpoint, form={}, obj=null) {
    method = method ?? 'post';
    return await this.__call("call")(endpoint, form, method, false, obj);
  }
}

export { BaseService };
export default BaseService;
