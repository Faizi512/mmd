class AddFieldNameForUrls < ActiveRecord::Migration[6.0]
  def change
     add_column :exit_deliveries, :name, :string
  end
end
