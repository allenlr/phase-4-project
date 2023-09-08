class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :rating, :comment, :album_id, :user_id

  belongs_to :album
end
