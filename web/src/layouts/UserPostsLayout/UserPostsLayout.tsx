import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type UserPostLayoutProps = {
  children: React.ReactNode
}

const UserPostsLayout = ({ children }: UserPostLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link
            to={routes.userPosts()}
            className="rw-link"
          >
            UserPosts
          </Link>
        </h1>
        <Link
          to={routes.newUserPost()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New UserPost
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default UserPostsLayout
