import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: { data: { id: 'String', email: 'String3888475' } },
    two: { data: { id: 'String', email: 'String194883' } },
  },
})

export type StandardScenario = typeof standard
