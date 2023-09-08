class Album < ApplicationRecord
    validates :rating, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 5}, allow_nil: true
    validates :title, :artist, :release_date, presence: true


    has_many :reviews
    has_many :users, through: :reviews
end
