class UpdateSourceInExitDeliveries < ActiveRecord::Migration[6.0]
  if Rails.env.production?
    def change
      remove_column :exit_deliveries, :source, :text, array: true
      add_column :exit_deliveries, :source, :text, default: [], array: true
    end
  end
end
