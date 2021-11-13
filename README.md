# Redwood GraphQL Connections

TLDR: https://github.com/orta/redwood-app-connections/commit/a9a9b3b3ff4ba2cc4db6cbed92c1a017fc50db5a

This is the default 0.38 Redwood with:

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

generator client {
  provider      = "prisma-client-js"
  binaryTargets = "native"
}

model User {
  id    String     @id
  email String     @unique
  name  String?
  posts UserPost[]
}

model Post {
  id      String     @id
  authors UserPost[]
  content String
}

model UserPost {
  id String @id

  user   User   @relation(fields: [userID], references: [id])
  userID String

  post   Post   @relation(fields: [postID], references: [id])
  postID String

  @@unique([userID, postID])
}
```

Generate some scaffolds:


```sh
yarn rw generate scaffold User
yarn rw generate scaffold Post
yarn rw generate scaffold UserPost
```

So, that we can have a few models to work with.

Next add `prisma-relay-cursor-connection`:

```sh
yarn workspace api add @devoxa/prisma-relay-cursor-connection
```

Now time to convert `posts` to a connection. First the SDL,

`/api/src/graphql/posts.sdl.ts`:

```ts
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

  # New ^

  type Post {
    id: String!
    authors: [UserPost]!
    content: String!
  }

  type Query {
    # Old: posts: [Post!]! @skipAuth

    posts(first: Int, last: Int, before: String, after: String): PostConnection
    # New ^

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

Next: update the resolver for `posts`:

```ts
export const posts = (args) => {
  // return db.post.findMany()

  return findManyCursorConnection(
    (args) => db.post.findMany(args),
    () => db.post.count(),
    args
  )
}
```

You'll need to change the query in `PostsCell.ts`:

```ts
export const QUERY = gql`
  query FindPosts {
    posts(first: 5) {
      edges {
        node {
          id
          content
        }
      }
    }
  }
`
```

Then change the posts to handle the new edge:

```diff
- { posts.map(({ node: post }) => (
+ { posts.edges.map(({ node: post }) => (
```


That's roughly it. You can see the fill work in https://github.com/orta/redwood-app-connections/commit/a9a9b3b3ff4ba2cc4db6cbed92c1a017fc50db5a
