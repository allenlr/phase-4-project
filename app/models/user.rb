class User < ApplicationRecord
    has_secure_password validations: false

    validates :username, :email, uniqueness: true, presence: true
    validates :password, length: { minimum: 6 }, if: -> { new_record? || !password.nil?}
    
    has_many :reviews, dependent: :destroy
    has_many :albums, through: :reviews
end
