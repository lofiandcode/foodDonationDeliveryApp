class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :password, :role, :phoneNum, :about, :items, :locations
end
