import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/UserPost/UserPostsCell'

const DELETE_USER_POST_MUTATION = gql`
  mutation DeleteUserPostMutation($id: String!) {
    deleteUserPost(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
}

const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toUTCString()}
    </time>
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const UserPostsList = ({ userPosts }) => {
  const [deleteUserPost] = useMutation(DELETE_USER_POST_MUTATION, {
    onCompleted: () => {
      toast.success('UserPost deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete userPost ' + id + '?')) {
      deleteUserPost({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>User id</th>
            <th>Post id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {userPosts.map((userPost) => (
            <tr key={userPost.id}>
              <td>{truncate(userPost.id)}</td>
              <td>{truncate(userPost.userID)}</td>
              <td>{truncate(userPost.postID)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.userPost({ id: userPost.id })}
                    title={'Show userPost ' + userPost.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editUserPost({ id: userPost.id })}
                    title={'Edit userPost ' + userPost.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete userPost ' + userPost.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(userPost.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserPostsList
