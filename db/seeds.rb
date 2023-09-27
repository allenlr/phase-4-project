# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'

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

10.times do |i|
    title = Faker::Music.album
    artist = Faker::Music.band
    release_date = Faker::Date.backward(days: 365 * 5) # This will give a date up to 5 years ago
    image_url = Faker::Avatar.image(slug: "album-#{i}", size: "300x300") # Generates a random avatar image. You might want a different source for album covers.
  
    album = Album.create!(
      title: title,
      artist: artist,
      release_date: release_date,
      image_url: image_url
    )
    puts "Created Album ##{i + 1}: #{title} by #{artist} (Released: #{release_date})"
end

Review.create!(
    user_id: user1.id,
    album_id: Album.first.id,
    rating: 5,
    comment: "Great album"
)
Review.create!(
    user_id: user2.id,
    album_id: Album.second.id,
    rating: 3,
    comment: "It's alright"
)

puts "Seeded!"