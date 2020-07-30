# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Category.create!(name: "Lead")
Category.create!(name: "Background")
Category.create!(name: "Electronic")
Category.create!(name: "80's")
example = Category.create!(name: "Other")

Setting.create!(name: "Default", gain: 0.05, stop_time: 350, a_frequency: 440, category: example)
