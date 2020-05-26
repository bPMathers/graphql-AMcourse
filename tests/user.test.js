import 'cross-fetch/polyfill'
import ApolloBoost, { gql } from 'apollo-boost'
import prisma from '../src/prisma'

const client = new ApolloBoost({
    uri: 'http://localhost:4000'
})

test('Should create a new user', async () => {
    const createUser = gql`
     mutation {
         createUser(
             data: {
                 name: "Benjamin",
                 email: "benjamin@example.com",
                 password: "red12345"
             }
         ){
            token,
            user {
                id
            }
         }
     }
    `

    const response = await client.mutate({
        mutation: createUser
    })

    console.log(JSON.stringify(response, null, 2))
    const userExists = await prisma.exists.User({ id: response.data.createUser.user.id })

    expect(userExists).toBe(true)
})