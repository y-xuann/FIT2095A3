import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL = '/33520496/Yang/api/v1';

// HTTP options to specify content type as JSON.
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) { }

  createDriver(driver: any) {
    return this.http.post(API_URL + '/drivers/add', driver, httpOptions);
  }

  getDriver() {
    return this.http.get(API_URL + '/drivers');
  }

  deleteDriver(id: string) {
    return this.http.delete(API_URL + '/drivers/delete', {
      params: { id }
    });
  }

  updateDriver(driver: any) {
    return this.http.put(API_URL + '/drivers/update', driver, httpOptions);
  }

  createPackage(packages: any) {
    return this.http.post(API_URL + '/packages/add', packages, httpOptions);
  }

  getPackage() {
    return this.http.get(API_URL + '/packages');
  }

  // deletion via route parameter 
  deletePackage(id: string) {
    return this.http.delete(API_URL + `/packages/delete/${id}`);
  }

  updatePackage(packages: any) {
    return this.http.put(API_URL + '/packages/update', packages, httpOptions);
  }

  getStats() {
    return this.http.get(API_URL + '/stats');
  }

}
