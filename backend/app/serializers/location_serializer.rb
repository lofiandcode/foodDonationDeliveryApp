class LocationSerializer < ActiveModel::Serializer
  attributes :id, :name, :address, :lat, :lng, :milesFrom, :users
end
