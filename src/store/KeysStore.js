import { makeAutoObservable } from 'mobx';
import { createKeys, fetchKeys } from '../http/keysApi';

export default class KeysStore {
  constructor() {
    this._keys = [];
    this._isLoading = false;
    makeAutoObservable(this);
  }

  setKeys(keys) {
    this._keys = keys;
  }

  setIsLoading(bool) {
    this._isLoading = bool;
  }

  get keys() {
    return this._keys;
  }

  get isLoading() {
    return this._isLoading;
  }

  async createKeys(body) {
    this.setIsLoading(true);
    try {
      const data = await createKeys(body);
      this.setKeys([...this.keys, data]);
    } catch (e) {
      console.log(e);
    } finally {
      this.setIsLoading(false);
    }
  }

  async fetchKeys() {
    this.setIsLoading(true);
    try {
      const data = await fetchKeys();
      this.setKeys(data);
      return data;
    } catch (e) {
      console.log(e);
    } finally {
      this.setIsLoading(false);
    }
  }
}
