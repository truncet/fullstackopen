const BlogForm = ({ title, author, url, titleChange, authorChange, urlChange, addBlog }) => (
  <div>
  <form onSubmit={addBlog}>
    <div>
      title:
      <input
        value={title}
        onChange={titleChange}
      />
    </div>
    <div>
      author:
      <input
        value={author}
        onChange={authorChange}
      />
    </div>        
    <div>
      url:
      <input
        value={url}
        onChange={urlChange}
      />
    </div>
    
    <button type="submit">create</button>
  </form>  
</div>
)

export default BlogForm