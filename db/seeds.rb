# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

puts "Started Seeding 🌱🌱🌱"

# if Doctor.all.length < 1
    Doctor.create(first_name: "Mutharia", last_name: "Ian", email: "odudigbopascal@gmail.com", password: "1234" , password_confirmation: "1234", specialty: "Paediatrics")
    # Doctor.create(first_name: "Samuel", last_name: "Baraka", email: "odudigbopascal@gmail.com", password: "1234" , password_confirmation: "1234", specialty: "Psychiatry")
    # Doctor.create(first_name: "Evans", last_name: "Mwangi", email: "odudigbopascal@gmail.com", password: "1234" , password_confirmation: "1234", specialty: "Surgery")
    # Doctor.create(first_name: "Ashley", last_name: "Simiyu", email: "odudigbopascal@gmail.com", password: "1234" , password_confirmation: "1234", specialty: "Sexual & Reproductive Health")
    # Doctor.create(first_name: "Ruweydha", last_name: "Abdinoor", email: "odudigbopascal@gmail.com", password: "1234" , password_confirmation: "1234", specialty: "General Practice")
    # Doctor.create(first_name: "Elias", last_name: "Baya", email: "odudigbopascal@gmail.com", password: "1234" , password_confirmation: "1234", specialty: "Gynaecology")
# end

puts "Done Seeding 🌳🌳🌳"
