class MatchSerializer < ActiveModel::Serializer
  attributes :id, :completed, :accepted, :driver_user_id, :donor_user_item_id, :food_bank_user_id
end
