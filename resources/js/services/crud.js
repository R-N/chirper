import _axios from '@/plugins/axios'; 
import { filterObject, isObject, getFileName, jsonToFormData, getData, isInertiaForm } from '@/libs/util';
import { t } from '@/plugins/i18n';
import BaseService from './base';

class CrudService extends BaseService {
  constructor(
    name,
    endpoint,
    methods=[],
    fields=[],
    files=['file'],
    setters=true,
    getters=false,
    actions=[],
    updateMethod='patch',
    axios=null,
  ){
    super(axios, endpoint, methods, name, files, updateMethod);
    this.fields = fields;

    this.createSetters(setters);
    this.createGetters(getters);
    this.createActions(actions);
  }
  async get(obj, options={}, endpoint=null){
    return await super.get(endpoint, options, obj);
  }

  async download(obj, options={}, endpoint=null){
    return await super.download(endpoint, options, obj);
  }

  async export(obj, type='xlsx', options={}, endpoint=null){
    return await super.export(endpoint, type, options, obj);
  }

  getData(data){
    return getData(data, this.name);
  }

  async call(obj=null, form={}, method='put', endpoint=null, filter=true){
    return await super.call(endpoint, form, method, filter, obj);
  }

  async post(obj=null, form={}, endpoint=null, filter=true){
    return await super.post(endpoint, form, filter, obj);
  }
  async put(obj, form={}, endpoint=null){
    return await super.put(endpoint, form, obj);
  }
  async patch(obj, form={}, endpoint=null){
    return await super.patch(endpoint, form, obj);
  }
  async delete(obj, form={}, endpoint=null){
    return await super.delete(endpoint, form, obj);
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
      let f = async (obj, new_value) => await this.set_field(field, obj, new_value, method, endpoint);
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
      let f = async (obj) => await this.get_field(field, obj, endpoint);
      this[`get_${field}`] = f;
    }
  }
  
  createActions(actions){
    // save and build actions
    this.actions = actions;
    for (let { method, action, endpoint, obj } of this.actions) {
      //build getters
      let f = null;
      if (obj){
        f = async (o, form) => await this.action(method, endpoint, o, form);
      }else{
        f = async (form) => await this.action(method, endpoint, null, form);
      }
      this[action] = f;
    }
  }

  async index(options={}, endpoint=null){
    return await this.get(null, options, endpoint);
  }

  async set_field(field, obj, value, method='patch', endpoint=null){
    if (!isInertiaForm(value)){
      value = { [field]: value };
    }
    return await this.call(obj, value, method, endpoint);
  }
  async get_field(field, obj=null, endpoint=null){
    return await this.call(obj, {}, 'get', endpoint);
  }
  async fetch(options={}, endpoint=null){
    return await this.index(options, endpoint);
  }
  async show(obj, options={}, endpoint=null){
    return await this.get(obj, options, endpoint);
  }
  async create(form, endpoint=null){
    return await this.post(null, form, endpoint);
  }
  async store(form, endpoint=null){
    return await this.post(null, form, endpoint);
  }
  async update(obj, form={}, endpoint=null){
    return await this.call(obj, form, this.updateMethod, endpoint);
  }
  async destroy(obj, form={}, endpoint=null){
    return await this.delete(obj, form, endpoint);
  }
}

export { CrudService };
export default CrudService;
