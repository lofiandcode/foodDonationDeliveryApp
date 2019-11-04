class CreateFoodBanks < ActiveRecord::Migration[6.0]
  def change
    create_table :food_banks do |t|
      t.string :name
      t.text :about
      t.string :address
      t.string :phoneNum
      t.text :donationsNeeded
      t.text :accommodations
      t.text :hours

      t.timestamps
    end
  end
end
