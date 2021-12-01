class AddIsMobileInExitDeliveries < ActiveRecord::Migration[6.0]
  def change
    add_column :exit_deliveries, :is_mobile, :boolean, default: false
    add_column :exit_deliveries, :source_rule, :integer, :default => 0
  end
end
