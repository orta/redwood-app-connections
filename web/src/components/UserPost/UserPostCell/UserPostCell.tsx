import type { FindUserPostById } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import UserPost from 'src/components/UserPost/UserPost'

export const QUERY = gql`
  query FindUserPostById($id: String!) {
    userPost: userPost(id: $id) {
      id
      userID
      postID
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>UserPost not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ userPost }: CellSuccessProps<FindUserPostById>) => {
  return <UserPost userPost={userPost} />
}
