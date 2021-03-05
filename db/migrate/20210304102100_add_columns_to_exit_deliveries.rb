class AddColumnsToExitDeliveries < ActiveRecord::Migration[6.0]
  def change
    add_column :exit_deliveries, :copy_percentage, :float
    change_column :exit_deliveries, :percentage, :float
  end
end
