import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.UserPostCreateArgs>({
  userPost: {
    one: {
      data: {
        id: 'String',
        user: { create: { id: 'String', email: 'String6876852' } },
        post: { create: { id: 'String', content: 'String' } },
      },
    },
    two: {
      data: {
        id: 'String',
        user: { create: { id: 'String', email: 'String1225637' } },
        post: { create: { id: 'String', content: 'String' } },
      },
    },
  },
})

export type StandardScenario = typeof standard
