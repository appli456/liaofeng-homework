class Cache {
  get(key: string) {
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    }

    return null;
  }

  set(key: string, value: any) {
    if (typeof value !== "string") {
      value = JSON.stringify(value);
    }

    localStorage.setItem(key, value);
  }
}

const cache = new Cache();

export default cache;
