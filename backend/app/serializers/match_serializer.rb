class MatchSerializer < ActiveModel::Serializer
  attributes :id, :completed, :user_id, :user_item_id_1, :user_item_id_2
end
