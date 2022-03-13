function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj
  if (Array.isArray(obj)) return obj.map(deepClone)
  const newObj = {}
  Object.keys(obj).forEach((key) => {
    newObj[key] = deepClone(obj[key])
  })
  return newObj
}

export class DataStore {
  /**
   * 创建一个数据存储对象
   * @param {string} key data key
   */
  constructor(key) {
    this.key = key
    this.data = this._loadData()
    let maxId = 0
    this.data.forEach((d) => {
      if (d.id > maxId) {
        maxId = d.id
      }
    })
    this.nextId = maxId + 1
  }
  /**
   * 从localStorage中获取数据
   */
  _loadData() {
    try {
      return JSON.parse(localStorage.getItem(this.key)) || []
    } catch (e) {
      return []
    }
  }
  _storeData() {
    localStorage.setItem(this.key, JSON.stringify(this.data))
  }
  /**
   * 分页查询
   * @param {Function} predict 过滤方法，返回是否满足条件
   * @param {number} page
   * @param {number} pageSize
   * @returns {Array}
   */
  list(predict, page, pageSize) {
    let data = this.data
    if (typeof predict === 'function') {
      data = data.filter(predict)
    }
    const total = data.length
    const result = deepClone(data.slice((page - 1) * pageSize, page * pageSize))
    result.total = total
    return result
  }

  /**
   * 根据id获取对象
   * @param {string} id
   */
  get(id) {
    return deepClone(this.data.find((item) => item.id === id))
  }
  /**
   * 保存数据，如果 id 为空，则新增，否则更新
   * @param {any} data
   */
  save(data) {
    if (data.id === undefined) {
      // 插入，生成新 id
      const id = this.nextId++
      data.id = id
      this.data.push(deepClone(data))
    } else {
      const found = this.data.find((e) => e.id === data.id)
      if (!found) {
        throw new Error(`数据不存在`)
      }
      Object.assign(found, data)
    }
    this._storeData()
    return data
  }

  /**
   * 根据 id 删除数据
   * @param {string} id
   */
  delete(id) {
    const index = this.data.findIndex((e) => e.id === id)
    if (index === -1) {
      throw new Error('数据不存在')
    }
    const data = this.data.splice(index, 1)[0]
    this._storeData()
    return data
  }
}

export const poetryStore = new DataStore('poetry')
export const dynastyStore = new DataStore('dynasty')
