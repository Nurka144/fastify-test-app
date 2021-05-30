const app= require('./index')

const test = async () => {

  const response = await app.inject({
    method: 'GET',
    url: '/user'
  })

  console.log('status code: ', response.statusCode)
  console.log('body: ', response.body)
}
test()