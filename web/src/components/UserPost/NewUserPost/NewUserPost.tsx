import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import UserPostForm from 'src/components/UserPost/UserPostForm'

const CREATE_USER_POST_MUTATION = gql`
  mutation CreateUserPostMutation($input: CreateUserPostInput!) {
    createUserPost(input: $input) {
      id
    }
  }
`

const NewUserPost = () => {
  const [createUserPost, { loading, error }] = useMutation(CREATE_USER_POST_MUTATION, {
    onCompleted: () => {
      toast.success('UserPost created')
      navigate(routes.userPosts())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    createUserPost({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New UserPost</h2>
      </header>
      <div className="rw-segment-main">
        <UserPostForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewUserPost
