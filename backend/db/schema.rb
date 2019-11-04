# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_10_30_180300) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "donor_drivers", force: :cascade do |t|
    t.bigint "donor_id", null: false
    t.bigint "driver_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["donor_id"], name: "index_donor_drivers_on_donor_id"
    t.index ["driver_id"], name: "index_donor_drivers_on_driver_id"
  end

  create_table "donors", force: :cascade do |t|
    t.string "name"
    t.text "about"
    t.string "address"
    t.string "phoneNum"
    t.text "donations"
    t.text "accommodations"
    t.text "hours"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "driver_food_banks", force: :cascade do |t|
    t.bigint "driver_id", null: false
    t.bigint "food_bank_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["driver_id"], name: "index_driver_food_banks_on_driver_id"
    t.index ["food_bank_id"], name: "index_driver_food_banks_on_food_bank_id"
  end

  create_table "drivers", force: :cascade do |t|
    t.string "name"
    t.text "about"
    t.string "phoneNum"
    t.text "areas"
    t.text "accommodations"
    t.text "hours"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "food_banks", force: :cascade do |t|
    t.string "name"
    t.text "about"
    t.string "address"
    t.string "phoneNum"
    t.text "donationsNeeded"
    t.text "accommodations"
    t.text "hours"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "donor_drivers", "donors"
  add_foreign_key "donor_drivers", "drivers"
  add_foreign_key "driver_food_banks", "drivers"
  add_foreign_key "driver_food_banks", "food_banks"
end
