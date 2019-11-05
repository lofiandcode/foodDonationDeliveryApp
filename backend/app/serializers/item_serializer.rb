class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :category, :quantity, :units, :users
end
