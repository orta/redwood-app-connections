import {
  userPosts,
  userPost,
  createUserPost,
  updateUserPost,
  deleteUserPost,
} from './userPosts'
import type { StandardScenario } from './userPosts.scenarios'

describe('userPosts', () => {
  scenario('returns all userPosts', async (scenario: StandardScenario) => {
    const result = await userPosts()

    expect(result.length).toEqual(Object.keys(scenario.userPost).length)
  })

  scenario('returns a single userPost', async (scenario: StandardScenario) => {
    const result = await userPost({ id: scenario.userPost.one.id })

    expect(result).toEqual(scenario.userPost.one)
  })

  scenario('creates a userPost', async (scenario: StandardScenario) => {
    const result = await createUserPost({
      input: {
        id: 'String',
        userID: scenario.userPost.two.userID,
        postID: scenario.userPost.two.postID,
      },
    })

    expect(result.id).toEqual('String')
    expect(result.userID).toEqual(scenario.userPost.two.userID)
    expect(result.postID).toEqual(scenario.userPost.two.postID)
  })

  scenario('updates a userPost', async (scenario: StandardScenario) => {
    const original = await userPost({ id: scenario.userPost.one.id })
    const result = await updateUserPost({
      id: original.id,
      input: { id: 'String2' },
    })

    expect(result.id).toEqual('String2')
  })

  scenario('deletes a userPost', async (scenario: StandardScenario) => {
    const original = await deleteUserPost({ id: scenario.userPost.one.id })
    const result = await userPost({ id: original.id })

    expect(result).toEqual(null)
  })
})
