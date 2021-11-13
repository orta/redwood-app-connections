export const schema = gql`
  type UserPost {
    id: String!
    user: User!
    userID: String!
    post: Post!
    postID: String!
  }

  type Query {
    userPosts: [UserPost!]! @requireAuth
    userPost(id: String!): UserPost @requireAuth
  }

  input CreateUserPostInput {
    userID: String!
    postID: String!
  }

  input UpdateUserPostInput {
    userID: String
    postID: String
  }

  type Mutation {
    createUserPost(input: CreateUserPostInput!): UserPost! @requireAuth
    updateUserPost(id: String!, input: UpdateUserPostInput!): UserPost!
      @requireAuth
    deleteUserPost(id: String!): UserPost! @requireAuth
  }
`
