require 'csv'
namespace :upload do
  task o2_sheet: :environment do
    CSV.foreach('o2_sheet.csv', headers: true ) do |row|
      retailers = row['Retailers']
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
      roaming = row['Roaming']
      f_gift = row['Gifts']

      Product.find_or_create_by(retailer: retailers, img: img, product_type: p_type, title: title, color: color, monthly_cost: monthly, upfront: upfront, data: data, calls: call, text: text, contract: contr, free_gift: f_gift, data_roaming: roaming,)
    end
    puts "done"
  end

  task ee_sheet: :environment do
    CSV.foreach('ee_sheet.csv', headers: true ) do |row|
      retailers = row['Retailers']
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
      roaming = row['Roaming']
      f_gift = row['Gifts']

      Product.find_or_create_by(retailer: retailers, img: img, product_type: p_type, title: title, color: color, monthly_cost: monthly, upfront: upfront, data: data, calls: call, text: text, contract: contr, free_gift: f_gift, data_roaming: roaming,)
    end
    puts "done"
  end
  task tribe_sheet: :environment do
    CSV.foreach('tribe_sheet.csv', headers: true ) do |row|
      retailers = row['Retailers']
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
      roaming = row['Roaming']
      f_gift = row['Gifts']

      Product.find_or_create_by(retailer: retailers, img: img, product_type: p_type, title: title, color: color, monthly_cost: monthly, upfront: upfront, data: data, calls: call, text: text, contract: contr, free_gift: f_gift, data_roaming: roaming,)
    end
    puts "done"
  end
end
