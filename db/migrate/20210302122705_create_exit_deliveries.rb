class CreateExitDeliveries < ActiveRecord::Migration[6.0]
  def change
    create_table :exit_deliveries do |t|
      t.string :url
      t.integer :percentage
      t.string :status
      t.integer :priority
      t.integer :cap
      t.string :source
      t.integer :count
      t.string :operational

      t.timestamps
    end
  end
end
