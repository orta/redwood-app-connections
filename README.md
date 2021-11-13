# Redwood

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

So, that we can have a few models to work with.

Next add `prisma-relay-cursor-connection`:

```sh
yarn workspace api add @devoxa/prisma-relay-cursor-connection
```

