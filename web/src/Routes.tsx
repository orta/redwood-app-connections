// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'
import UserPostsLayout from 'src/layouts/UserPostsLayout'
import PostsLayout from 'src/layouts/PostsLayout'
import UsersLayout from 'src/layouts/UsersLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={UserPostsLayout}>
        <Route path="/user-posts/new" page={UserPostNewUserPostPage} name="newUserPost" />
        <Route path="/user-posts/{id}/edit" page={UserPostEditUserPostPage} name="editUserPost" />
        <Route path="/user-posts/{id}" page={UserPostUserPostPage} name="userPost" />
        <Route path="/user-posts" page={UserPostUserPostsPage} name="userPosts" />
      </Set>
      <Set wrap={PostsLayout}>
        <Route path="/posts/new" page={PostNewPostPage} name="newPost" />
        <Route path="/posts/{id}/edit" page={PostEditPostPage} name="editPost" />
        <Route path="/posts/{id}" page={PostPostPage} name="post" />
        <Route path="/posts" page={PostPostsPage} name="posts" />
      </Set>
      <Set wrap={UsersLayout}>
        <Route path="/users/new" page={UserNewUserPage} name="newUser" />
        <Route path="/users/{id}/edit" page={UserEditUserPage} name="editUser" />
        <Route path="/users/{id}" page={UserUserPage} name="user" />
        <Route path="/users" page={UserUsersPage} name="users" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
