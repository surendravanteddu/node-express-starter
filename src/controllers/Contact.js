import Chance from 'chance'

export default class Contact {
  constructor () {
    this.chanceInstance = null
    this.data = []
  }

  getChanceInstance = () => {
    if (!this.chanceInstance) {
      this.chanceInstance = new Chance()
    }
    return this.chanceInstance
  }

  createContact = (id) => {
    try {
      const chance = this.getChanceInstance()
      const contact = {
        id: id,
        name: chance.name(),
        dob: chance.birthday(),
        ssn: chance.ssn(),
        phone: chance.phone({formatted: false}),
        address: chance.address(),
        city: chance.city(),
        zip: chance.zip(),
        state: chance.state({full: true}),
        avatar: chance.avatar(),
        company: chance.company(),
        email: chance.email(),
        role: chance.profession({rank: true})
      }
      this.data.push(contact)
      return contact
    } catch (e) {
      return null
    }
  }

  createContacts = (size) => {
    const maxId = this.data.length
    for (let i = maxId + 1; i <= maxId + size; i++) {
      this.createContact(i)
    }
  }

  /**
   *
   * @param pageNo
   * @param pageSize
   * @returns {*[]}
   */
  getAll = (pageNo = 1, pageSize = 25) => {
    try {
      const contacts = []
      pageNo = +pageNo
      pageSize = +pageSize

      if (isNaN(pageNo)) {
        pageNo = 1
      }
      if (isNaN(pageSize)) {
        pageSize = 25
      }

      const firstIndex = ((pageNo - 1) * pageSize)
      let totalCount = firstIndex + pageSize

      if (totalCount > 1000) {
        totalCount = 1000
      }

      if (this.data.length < totalCount) {
        this.createContacts(totalCount - this.data.length)
      }

      for (let i = firstIndex; i < firstIndex + pageSize; i++) {
        const contact = this.data[i]
        if (contact) {
          contacts.push(contact)
        }
      }

      return contacts
    } catch (e) {
      return []
    }
  }

  getById = (id) => {
    try {
      id = +id
      if (isNaN(id) || id > 1000) {
        return null
      }

      if (id > this.data.length) {
        this.createContacts(id - this.data.length)
      }

      return this.data.find(contact => contact.id === id)
    } catch (e) {
      return null
    }
  }

  updateById = (id, record) => {
    try {
      id = +id
      if (isNaN(id) || id > 1000) {
        return null
      }

      if (id > this.data.length) {
        this.createContacts(id - this.data.length)
      }

      const contactIndex = this.data.findIndex(contact => contact.id === id)
      if (contactIndex === -1) {
        return null
      }

      let contact = this.data[contactIndex]
      contact = {...contact, ...record, id: id}
      this.data[contactIndex] = contact

      return contact
    } catch (e) {
      return null
    }
  }
}
