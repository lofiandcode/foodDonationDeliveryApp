class DriverSerializer < ActiveModel::Serializer
  attributes :id, :name, :about, :phoneNum, :areas, :accommodations, :hours
end
