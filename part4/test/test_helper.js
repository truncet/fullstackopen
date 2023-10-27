const Blog = require('./../models/blog')
const User = require('./../models/user')

const initialBlogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        upvotes: 7,
      },
      {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        upvotes: 5,
      },
]

const newUsers = {
    username: 'testuser',
    password: 'testpassword'
}




const nonExistingId = async () => {
    const blog = new Blog({
        'title': 'test_title',
        'author': 'test_author',
        'url': 'test_author',
        'upvotes': 0
    })
    await blog.save()
    await blog.deleteOne()

    return blog._id.toString()
}



const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs,
    nonExistingId, 
    blogsInDb, 
    usersInDb,
}