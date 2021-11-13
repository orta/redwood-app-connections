import type { FindUserPosts } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { Link, routes } from '@redwoodjs/router'

import UserPosts from 'src/components/UserPost/UserPosts'

export const QUERY = gql`
  query FindUserPosts {
    userPosts {
      id
      userID
      postID
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No userPosts yet. '}
      <Link
        to={routes.newUserPost()}
        className="rw-link"
      >
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ userPosts }: CellSuccessProps<FindUserPosts>) => {
  return <UserPosts userPosts={userPosts} />
}
