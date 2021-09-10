class EditSourceTypeInExitDeliveries < ActiveRecord::Migration[6.0]
  def change
    remove_column :exit_deliveries, :source, :string
    add_column :exit_deliveries, :source, :text, array: true
  end
end
