class UserItem < ApplicationRecord
  belongs_to :user
  belongs_to :item
  has_many :matches
end
