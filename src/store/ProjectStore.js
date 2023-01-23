import { makeAutoObservable } from 'mobx';
import {
  createProject,
  deleteProject,
  fetchOneProject,
  fetchProjects,
  link,
  unlink,
  updateProject
} from '../http/projectApi';

export default class ProjectStore {
  constructor() {
    this._projects = [];
    this._isLoading = false;
    makeAutoObservable(this);
  }

  setProjects(projects) {
    this._projects = projects;
  }

  setIsLoading(bool) {
    this._isLoading = bool;
  }

  get projects() {
    return this._projects;
  }

  get isLoading() {
    return this._isLoading;
  }

  async createProject(body) {
    this.setIsLoading(true);
    try {
      const data = await createProject(body);
      this.setProjects([...this.projects, data]);
    } catch (e) {
      console.log(e);
    } finally {
      this.setIsLoading(false);
    }
  }

  async updateProject(body) {
    this.setIsLoading(true);
    try {
      const data = await updateProject(body);
      const oldProject = this.projects.findIndex(
        (project) => project.id === data.id
      );
      this.projects.splice(oldProject, 1);
      this.setProjects([...this.projects, data]);
    } catch (e) {
      console.log(e);
    } finally {
      this.setIsLoading(false);
    }
  }

  async fetchProjects() {
    this.setIsLoading(true);
    try {
      const data = await fetchProjects();
      console.log(data);
      this.setProjects(data);
    } catch (e) {
      console.log(e);
    } finally {
      this.setIsLoading(false);
    }
  }

  async fetchOneProject(id) {
    try {
      const data = await fetchOneProject(id);
      return data;
    } catch (e) {
      console.log(e);
    } finally {
    }
  }

  async deleteProject(id) {
    this.setIsLoading(true);
    try {
      await deleteProject(id);
      this.setProjects(this.projects.filter((o) => o.id !== id));
    } catch (e) {
      console.log(e);
    } finally {
      this.setIsLoading(false);
    }
  }

  async link(id, count) {
    try {
      const data = await link(id, count);
      return data;
    } catch (e) {
      console.log(e);
    }
  }
  async unlink(id) {
    try {
      const data = await unlink(id);
      return data;
    } catch (e) {
      console.log(e);
    }
  }
}
