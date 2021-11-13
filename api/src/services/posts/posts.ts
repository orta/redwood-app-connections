import type { Prisma } from '@prisma/client'
import type { ResolverArgs } from '@redwoodjs/graphql-server'
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection'

import { db } from 'src/lib/db'

export const posts = (args) => {
  // return db.post.findMany()

  return findManyCursorConnection(
    (args) => db.post.findMany(args),
    () => db.post.count(),
    args
  )
}

export const post = ({ id }: Prisma.PostWhereUniqueInput) => {
  return db.post.findUnique({
    where: { id },
  })
}

interface CreatePostArgs {
  input: Prisma.PostCreateInput
}

export const createPost = ({ input }: CreatePostArgs) => {
  // I dunno whats up here but sure, its a distractions
  input.id = uuid()
  return db.post.create({
    data: input,
  })
}

interface UpdatePostArgs extends Prisma.PostWhereUniqueInput {
  input: Prisma.PostUpdateInput
}

export const updatePost = ({ id, input }: UpdatePostArgs) => {
  return db.post.update({
    data: input,
    where: { id },
  })
}

export const deletePost = ({ id }: Prisma.PostWhereUniqueInput) => {
  return db.post.delete({
    where: { id },
  })
}

export const Post = {
  authors: (_obj, { root }: ResolverArgs<ReturnType<typeof post>>) =>
    db.post.findUnique({ where: { id: root.id } }).authors(),
}

function uuid() {
  let dt = new Date().getTime()
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    function (c) {
      const r = (dt + Math.random() * 16) % 16 | 0
      dt = Math.floor(dt / 16)
      return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16)
    }
  )
  return uuid
}
