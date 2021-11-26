class AddIsMobileInExitDeliveries < ActiveRecord::Migration[6.0]
  def change
    add_column :exit_deliveries, :is_mobile, :boolean, default: false
  end
end
