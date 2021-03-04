class AddFunctionalToExitDeliveries < ActiveRecord::Migration[6.0]
  def change
    add_column :exit_deliveries, :functional, :string
  end
end
