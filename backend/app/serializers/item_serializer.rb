class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :type, :quantity, :units
end
