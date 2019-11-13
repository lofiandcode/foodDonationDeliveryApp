class CreateMatches < ActiveRecord::Migration[6.0]
  def change
    create_table :matches do |t|
      t.boolean :completed
      t.boolean :accepted
      t.integer :driver_user_id
      t.integer :donor_user_item_id
      t.integer :food_bank_user_id

      t.timestamps
    end
  end
end
