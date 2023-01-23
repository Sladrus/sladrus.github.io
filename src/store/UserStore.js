import { makeAutoObservable } from 'mobx';
import { login, logout, refresh, registration } from '../http/userApi';

export default class UserStore {
  constructor() {
    this._isAuth = false;
    this._user = {};
    this._isLoading = true;
    makeAutoObservable(this);
  }

  setIsAuth(bool) {
    this._isAuth = bool;
  }

  setUser(user) {
    this._user = user;
  }

  setIsLoading(bool) {
    this._isLoading = bool;
  }

  get isAuth() {
    return this._isAuth;
  }

  get user() {
    return this._user;
  }

  get isLoading() {
    return this._isLoading;
  }

  async login(email, password) {
    try {
      const data = await login(email, password);
      this.setIsAuth(true);
      this.setUser(data);
    } catch (e) {
      console.log(e);
    }
  }

  async registration(email, password) {
    try {
      const data = await registration(email, password);
      this.setIsAuth(true);
      this.setUser(data);
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  async logout() {
    try {
      await logout();
      localStorage.removeItem('token');
      this.setIsAuth(false);
      this.setUser({});
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  async checkAuth() {
    this.setIsLoading(true);
    try {
      const data = await refresh();
      this.setIsAuth(true);
      this.setUser(data);
    } catch (e) {
      console.log(e.response?.data?.message);
    } finally {
      this.setIsLoading(false);
    }
  }
}
