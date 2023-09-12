class AlbumSerializer < ActiveModel::Serializer
  attributes :id, :rating, :title, :artist, :release_date, :image_url

  has_many :reviews
  # remove rating
end
