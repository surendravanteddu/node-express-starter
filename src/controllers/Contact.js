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
    for (let i = maxId; i <= maxId + size; i++) {
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
      const firstId = ((pageNo - 1) * pageSize) + 1
      let totalCount = firstId + pageSize

      if (totalCount > 1000) {
        totalCount = 1000
      }

      if (this.data.length < totalCount) {
        this.createContacts(totalCount - this.data.length)
      }

      for (let i = firstId; i < firstId + pageSize; i++) {
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
}
