

export class InMemoryCache {

  #cache: any = {}
  #count: number = 0

  public get(key: string) {
    // console.log('Running get cache for key is available: ', this.#cache[key] ? true : false)
    return this.#cache[key] ? this.#cache[key].value : null
  }

  public put(key: string, value: any, ttl: number = 1000 * 5, timeoutFn: any = null) {

    // console.log('Running put cache for key is available: ', this.#cache[key] ? true : false)

    if(this.#cache[key]) {
      clearTimeout(this.#cache[key].timeout)
    }
    
    this.#cache[key] = {
      value,
      ttl,
      timeout: null,
      timeoutFn
    }

    this.#cache[key].timeout = setTimeout(() => {
      // console.log('Running timeout for key')
      if(typeof(this.#cache[key].timeoutFn) === 'function') {
        typeof(this.#cache[key].timeoutFn)()
      }
      delete this.#cache[key]
      this.#count--
    }, ttl)
    this.#count++

  }
  
}

export default new InMemoryCache()