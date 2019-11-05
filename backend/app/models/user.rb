class User < ApplicationRecord
    has_many :user_items
    has_many :items, through: :user_items, dependent: :destroy
    has_many :user_locations 
    has_many :locations, through: :user_locations, dependent: :destroy
end
