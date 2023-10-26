import React from 'react'

const BlogForm = ({ title, author, url, titleChange, authorChange, urlChange, addBlog }) => (
  <div>
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          value={title}
          onChange={titleChange}
          placeholder='title'
        />
      </div>
      <div>
        author:
        <input
          value={author}
          onChange={authorChange}
          placeholder='author'
        />
      </div>
      <div>
        url:
        <input
          value={url}
          onChange={urlChange}
          placeholder='url'
        />
      </div>

      <button type="submit">create</button>
    </form>
  </div>
)

export default BlogForm
