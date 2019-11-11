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


users = User.all;
items = Item.all;
locations = Location.all;


i = 0;
while i < users.length && i < locations.length  do
    UserLocation.create(user_id: users[i].id, location_id: locations[i].id);
    i += 1;
end

UserItem.create(user_id: users[0].id, item_id: items[0].id);

# user_items = UserItem.all;

# match = Match.create(completed: false, user_id: users[1].id, user_item_id_1: user_items[0].id, user_item_id_2: user_items[1].id)
puts 'Data seeded!';