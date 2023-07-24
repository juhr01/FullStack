const dummy = blogs => {
    return 1
}

const totalLikes = blogs => {
    return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = blogs => {
    return blogs.reduce((a, b) => (a.likes > b.likes ? a : b))
}

const mostBlogs = blogs => {
    const authorCount = {}

    blogs.forEach(blog => {
        if (!authorCount[blog.author]) {
           authorCount[blog.author] = 0 
        }
        authorCount[blog.author] += 1
    })

    let mostBlogs = 0
    let mostProlificAuthor = ''

    for (const author in authorCount) {
        if (authorCount[author] > mostBlogs) {
            mostBlogs = authorCount[author]
            mostProlificAuthor = author
        }
    }

    return {author: mostProlificAuthor, blogs: mostBlogs}

}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}