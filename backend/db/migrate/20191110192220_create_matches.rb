class CreateMatches < ActiveRecord::Migration[6.0]
  def change
    create_table :matches do |t|
      t.boolean :completed
      t.integer :user_id
      t.integer :user_item_id_1
      t.string :user_item_id_2

      t.timestamps
    end
  end
end
