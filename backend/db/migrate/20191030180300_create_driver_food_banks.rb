class CreateDriverFoodBanks < ActiveRecord::Migration[6.0]
  def change
    create_table :driver_food_banks do |t|
      t.references :driver, null: false, foreign_key: true
      t.references :food_bank, null: false, foreign_key: true

      t.timestamps
    end
  end
end
