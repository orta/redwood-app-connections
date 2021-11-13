import PostCell from 'src/components/Post/PostCell'

type PostPageProps = {
  id: String
}

const PostPage = ({ id }: PostPageProps) => {
  return <PostCell id={id} />
}

export default PostPage
