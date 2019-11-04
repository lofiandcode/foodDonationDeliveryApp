class CreateDonorDrivers < ActiveRecord::Migration[6.0]
  def change
    create_table :donor_drivers do |t|
      t.references :donor, null: false, foreign_key: true
      t.references :driver, null: false, foreign_key: true

      t.timestamps
    end
  end
end
