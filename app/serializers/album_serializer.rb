class AlbumSerializer < ActiveModel::Serializer
  attributes :id, :title, :artist, :release_date, :image_url

  has_many :reviews

end
