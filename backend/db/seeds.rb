# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# require_relative 'seeds/food_bank_data.rb'
# require_relative 'seeds/donor_data.rb'
# require_relative 'seeds/driver_data.rb'


Dir[File.expand_path("db/seeds/**/*.rb")].each { |file| require file }


donors = Donor.all;
food_banks = FoodBank.all;
drivers = Driver.all;

DonorDriver.create(donor_id: donors[0].id, driver_id: drivers[0].id);
DonorDriver.create(donor_id: donors[0].id, driver_id: drivers[1].id);
DriverFoodBank.create(driver_id: drivers[0].id, food_bank_id: food_banks[0].id);
DriverFoodBank.create(driver_id: drivers[0].id, food_bank_id: food_banks[1].id);
DriverFoodBank.create(driver_id: drivers[1].id, food_bank_id: food_banks[0].id);
DriverFoodBank.create(driver_id: drivers[1].id, food_bank_id: food_banks[1].id);
puts 'Data seeded!';