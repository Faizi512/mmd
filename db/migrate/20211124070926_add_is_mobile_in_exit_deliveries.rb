class AddIsMobileInExitDeliveries < ActiveRecord::Migration[6.0]
  def change
  	if Rails.env.production?
	    remove_column :exit_deliveries, :is_mobile, :boolean, default: false
	    remove_column :exit_deliveries, :source_rule, :integer, :default => 0
  	end
    add_column :exit_deliveries, :is_mobile, :boolean, default: false
    add_column :exit_deliveries, :source_rule, :integer, :default => 0
  end
end
