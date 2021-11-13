import type { Prisma } from '@prisma/client'
import type { ResolverArgs } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'

export const userPosts = () => {
  return db.userPost.findMany()
}

export const userPost = ({ id }: Prisma.UserPostWhereUniqueInput) => {
  return db.userPost.findUnique({
    where: { id },
  })
}

interface CreateUserPostArgs {
  input: Prisma.UserPostCreateInput
}

export const createUserPost = ({ input }: CreateUserPostArgs) => {
  return db.userPost.create({
    data: input,
  })
}

interface UpdateUserPostArgs extends Prisma.UserPostWhereUniqueInput {
  input: Prisma.UserPostUpdateInput
}

export const updateUserPost = ({ id, input }: UpdateUserPostArgs) => {
  return db.userPost.update({
    data: input,
    where: { id },
  })
}

export const deleteUserPost = ({ id }: Prisma.UserPostWhereUniqueInput) => {
  return db.userPost.delete({
    where: { id },
  })
}

export const UserPost = {
  user: (_obj, { root }: ResolverArgs<ReturnType<typeof userPost>>) =>
    db.userPost.findUnique({ where: { id: root.id } }).user(),
  post: (_obj, { root }: ResolverArgs<ReturnType<typeof userPost>>) =>
    db.userPost.findUnique({ where: { id: root.id } }).post(),
}
