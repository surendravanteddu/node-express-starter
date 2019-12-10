import traverse from 'traverse'

export const hidePasswords = (obj) => {
  // map here should NOT take an arrow function so it can get the traverse 'this' context
  return traverse(obj).map(function () {
    if (this.key && (this.key.match(/(password|passwd)/i))) {
      this.update('**** hidden ****')
    }
  })
}
