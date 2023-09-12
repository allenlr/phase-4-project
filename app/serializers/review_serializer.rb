class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :rating, :comment, :album_id, :user_id, :user_name

  belongs_to :album
  belongs_to :user

  def user_name
    object.user[:username]
  end
end
