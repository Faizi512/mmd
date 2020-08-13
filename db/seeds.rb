# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'csv'
CSV.foreach('ee_sheet.csv', headers: true ) do |row|
  img = row['Url']
  p_type = row['Type']
  title = row['Title']
  color = row['Colours']
  monthly = row['Monthly'].to_i
  upfront = row['Upfront'].to_i
  data = row['Data'].to_i
  call = row['Calls'].to_i
  text = row['Text'].to_i
  contr = row['Contract'].to_i
  
  
  Product.create(img: img, product_type: p_type, title: title, color: color, monthly_cost: monthly, upfront: upfront, data: data, calls: call, text: text, contract: contr, ) 
end
puts "done"