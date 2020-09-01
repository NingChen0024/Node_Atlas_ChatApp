var request = require('request')

describe('calculate', () => {
  it('should multiply 2 and 1', () => {
    expect(2*1).toBe(2)
    console.log('result returned')
  })
})

describe('get messages', () => {
  it('should return 200 ok', (done) => {
    request.get('http://localhost:3000/messages', (err, res) => {
      console.log(res.statusCode)
      expect(res.statusCode).toEqual(200)
      done()
    })
  })
  it('should return a list which is not empty', (done) => {
    request.get('http://localhost:3000/messages', (err, res) => {
      console.log(res.body)
      expect(JSON.parse(res.body).length).toBeGreaterThan(0)
      done()
    })
  })
})

describe('get message from user', () => {
  it('should return messages from one user', (done) => {
    request.get('http://localhost:3000/messages/ning', (err, res) => {
      expect(JSON.parse(res.body)[0].name).toBe('ning')
      console.log(JSON.parse(res.body)[0].name)
      done()
    })
  })
})