class Album < ApplicationRecord
    validates :title, :artist, :release_date, presence: true
    validates :image_url, format: { with: URI::regexp(%w[http https]), message: 'must be a valid URL' }
    validates :image_url, uniqueness: true, presence: true


    has_many :reviews
    has_many :users, through: :reviews
end
