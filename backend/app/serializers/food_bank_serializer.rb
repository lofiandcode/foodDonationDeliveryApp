class FoodBankSerializer < ActiveModel::Serializer
  attributes :id, :name, :about, :address, :phoneNum, :donationsNeeded, :accommodations, :hours
end
