class FoodBank < ApplicationRecord
    has_many :driver_food_banks
    has_many :food_banks, through: :driver_food_banks, dependent: :destroy
    serialize :donationsNeeded
    serialize :hours
end
