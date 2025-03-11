# Fetch the first user from the database
user = User.first

# Ensure there is at least one user
if user.nil?
  puts "No users found! Please create a user first."
else
  # Create blog posts
  blogs = Blog.create!([
    {
      title: "My First Blog",
      description: "I've created this blog to make sure API is working",
      user_id: user.id
    }
  ])
  puts "Blogs created successfully!"
end
