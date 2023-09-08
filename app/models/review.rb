class Review < ApplicationRecord
  belongs_to :user
  belongs_to :album

  validates :rating, presence: true, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 5 }
  validates :comment, presence: true, length: { in: 5...500 }, allow_blank: true
end
