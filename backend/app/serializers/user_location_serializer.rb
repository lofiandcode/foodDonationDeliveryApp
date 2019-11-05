class UserLocationSerializer < ActiveModel::Serializer
  attributes :id
  has_one :user
  has_one :location
end
