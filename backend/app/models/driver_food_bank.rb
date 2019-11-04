class DriverFoodBank < ApplicationRecord
  belongs_to :driver
  belongs_to :food_bank
end
