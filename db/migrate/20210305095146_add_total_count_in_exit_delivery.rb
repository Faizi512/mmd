class AddTotalCountInExitDelivery < ActiveRecord::Migration[6.0]
  def change
    add_column :exit_deliveries, :total_count, :integer
    add_column :exit_deliveries, :is_default, :boolean, :default => false
  end
end
