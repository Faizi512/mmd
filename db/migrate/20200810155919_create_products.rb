class CreateProducts < ActiveRecord::Migration[6.0]
  def change
    create_table :products do |t|
      t.integer :product_type
      t.string :title
      t.string :img
      t.integer :monthly_cost
      t.integer :upfront
      t.integer :data
      t.integer :calls
      t.integer :text
      t.integer :contract
      t.string :network_img
      t.string :color
      t.timestamps
    end
  end
end