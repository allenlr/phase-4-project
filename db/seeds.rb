# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Review.destroy_all
Album.destroy_all
User.destroy_all


user1 = User.create!(
    username: "user1",
    email: "user1@example.come",
    password: "password123"
)
user2 = User.create!(
    username: "user2",
    email: "user2@example.com",
    password: "password123"
)

album1 = Album.create!(
    title: "Album1",
    artist: "Artist1",
    release_date: "2022-01-01",
    image_url: "https://i.ytimg.com/vi/MXNbfU0Ww_E/maxresdefault.jpg"
)
album2 = Album.create!(
    title: "Album2",
    artist: "Artist2",
    release_date: "2022-01-01",
    image_url: "https://i.discogs.com/x9osLuYzOWJGg576esVw_vFX8hocIU6mEKGTLx-hQfU/rs:fit/g:sm/q:90/h:451/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE0NzU3/NjYtMTIyMjUwODAw/Ny5qcGVn.jpeg")
    
album3 = Album.create!(
    title: "Album3",
    artist: "Artist2",
    release_date: "2019-01-01",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUSr8btZ3Gk8OCBl5DubEt2tMU3GVr8YCiJw&usqp=CAU"
)

Review.create!(
    user: user1,
    album: album1,
    rating: 5,
    comment: "Great album"
)
Review.create!(
    user: user2,
    album: album2,
    rating: 3,
    comment: "It's alright"
)

puts "Seeded!"