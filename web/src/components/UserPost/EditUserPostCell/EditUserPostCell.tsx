import type { EditUserPostById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'

import UserPostForm from 'src/components/UserPost/UserPostForm'

export const QUERY = gql`
  query EditUserPostById($id: String!) {
    userPost: userPost(id: $id) {
      id
      userID
      postID
    }
  }
`
const UPDATE_USER_POST_MUTATION = gql`
  mutation UpdateUserPostMutation($id: String!, $input: UpdateUserPostInput!) {
    updateUserPost(id: $id, input: $input) {
      id
      userID
      postID
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ userPost }: CellSuccessProps<EditUserPostById>) => {
  const [updateUserPost, { loading, error }] = useMutation(UPDATE_USER_POST_MUTATION, {
    onCompleted: () => {
      toast.success('UserPost updated')
      navigate(routes.userPosts())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    updateUserPost({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit UserPost {userPost.id}</h2>
      </header>
      <div className="rw-segment-main">
        <UserPostForm userPost={userPost} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
