class CreateDrivers < ActiveRecord::Migration[6.0]
  def change
    create_table :drivers do |t|
      t.string :name
      t.text :about
      t.string :phoneNum
      t.text :areas
      t.text :accommodations
      t.text :hours

      t.timestamps
    end
  end
end
