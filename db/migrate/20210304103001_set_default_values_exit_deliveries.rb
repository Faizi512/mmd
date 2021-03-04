class SetDefaultValuesExitDeliveries < ActiveRecord::Migration[6.0]
  def change
    change_column :exit_deliveries, :operational, :string, :default => 'active'
    change_column :exit_deliveries, :count, :integer, :default => 0
  end
end
