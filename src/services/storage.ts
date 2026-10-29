/**
 * Local storage abstraction
 * Easy to replace with @react-native-async-storage/async-storage or react-native-mmkv
 */
class MemoryStorage {
  private cache = new Map<string, string>();

  async getItem(key: string): Promise<string | null> {
    return this.cache.get(key) ?? null;
  }

  async setItem(key: string, value: string): Promise<void> {
    this.cache.set(key, value);
  }

  async removeItem(key: string): Promise<void> {
    this.cache.delete(key);
  }

  async clear(): Promise<void> {
    this.cache.clear();
  }
}

export const storageService = new MemoryStorage();
