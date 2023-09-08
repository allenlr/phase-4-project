class AlbumSerializer < ActiveModel::Serializer
  attributes :id, :rating, :title, :artist, :release_date

  has_many :reviews
end
