import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // Create the storage
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Set a key/value pair
  async set(key: string, value: any): Promise<void> {
    await this._storage?.set(key, value);
  }

  // Get the value based on key
  async get(key: string): Promise<any> {
    return await this._storage?.get(key);
  }

  // Remove a key/value pair
  async remove(key: string): Promise<void> {
    await this._storage?.remove(key);
  }

  // Clear all data from storage
  async clear(): Promise<void> {
    await this._storage?.clear();
  }
}
