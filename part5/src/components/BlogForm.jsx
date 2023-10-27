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
          id='title'
        />
      </div>
      <div>
        author:
        <input
          value={author}
          onChange={authorChange}
          placeholder='author'
          id='author'
        />
      </div>
      <div>
        url:
        <input
          value={url}
          onChange={urlChange}
          placeholder='url'
          id='url'
        />
      </div>

      <button type="submit" id='create'>create</button>
    </form>
  </div>
)

export default BlogForm
