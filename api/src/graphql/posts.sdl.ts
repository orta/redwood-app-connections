export const schema = gql`
  type PageInfo {
    startCursor: String!
    endCursor: String!
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
  }

  type PostEdge {
    node: Post!
    cursor: String!
  }

  type PostConnection {
    edges: [PostEdge]
    pageInfo: PageInfo!
  }

  type Post {
    id: String!
    authors: [UserPost]!
    content: String!
  }

  type Query {
    # posts: [Post!]! @skipAuth
    posts(first: Int, last: Int, before: String, after: String): PostConnection
      @skipAuth

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
