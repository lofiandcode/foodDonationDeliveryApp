class DriverFoodBankSerializer < ActiveModel::Serializer
  attributes :id
  has_one :driver
  has_one :food_bank
end
