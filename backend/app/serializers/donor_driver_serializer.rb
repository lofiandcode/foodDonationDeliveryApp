class DonorDriverSerializer < ActiveModel::Serializer
  attributes :id
  has_one :donor
  has_one :driver
end
