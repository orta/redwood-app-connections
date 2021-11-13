import UserPostCell from 'src/components/UserPost/UserPostCell'

type UserPostPageProps = {
  id: String
}

const UserPostPage = ({ id }: UserPostPageProps) => {
  return <UserPostCell id={id} />
}

export default UserPostPage
