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
    image_url: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FKid_A&psig=AOvVaw1WTjcNx_bxNT8tJE4YUAAP&ust=1694500774289000&source=images&cd=vfe&opi=89978449&ved=0CA8QjRxqFwoTCLjHq9z5oYEDFQAAAAAdAAAAABAD"
)
album2 = Album.create!(
    title: "Album2",
    artist: "Artist2",
    release_date: "2022-01-01",
    image_url: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpitchfork.com%2Freviews%2Falbums%2F10785-in-rainbows%2F&psig=AOvVaw0jN5YCCVWOkm0rHXnvnuNB&ust=1694500866244000&source=images&cd=vfe&opi=89978449&ved=0CA8QjRxqFwoTCODq7-X5oYEDFQAAAAAdAAAAABAD"
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