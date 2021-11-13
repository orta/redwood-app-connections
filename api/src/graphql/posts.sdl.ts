export const schema = gql`
  type Post {
    id: String!
    authors: [UserPost]!
    content: String!
  }

  type Query {
    posts: [Post!]! @skipAuth
    post(id: String!): Post @requireAuth
  }

  input CreatePostInput {
    content: String!
  }

  input UpdatePostInput {
    content: String
  }

  type Mutation {
    createPost(input: CreatePostInput!): Post! @requireAuth
    updatePost(id: String!, input: UpdatePostInput!): Post! @requireAuth
    deletePost(id: String!): Post! @requireAuth
  }
`
