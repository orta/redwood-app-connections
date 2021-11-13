import EditUserPostCell from 'src/components/UserPost/EditUserPostCell'

type UserPostPageProps = {
  id: string
}

const EditUserPostPage = ({ id }: UserPostPageProps) => {
  return <EditUserPostCell id={id} />
}

export default EditUserPostPage
