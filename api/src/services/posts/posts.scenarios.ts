import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.PostCreateArgs>({
  post: {
    one: { data: { id: 'String', content: 'String' } },
    two: { data: { id: 'String', content: 'String' } },
  },
})

export type StandardScenario = typeof standard
