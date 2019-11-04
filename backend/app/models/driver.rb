class Driver < ApplicationRecord
    has_many :donor_drivers
    has_many :donors, through: :donor_drivers, dependent: :destroy
    has_many :driver_food_banks
    has_many :food_banks, through: :driver_food_banks, dependent: :destroy
    serialize :areas
    serialize :hours
end
