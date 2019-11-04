class DonorSerializer < ActiveModel::Serializer
  attributes :id, :name, :about, :address, :phoneNum, :donations, :accommodations, :hours
end
