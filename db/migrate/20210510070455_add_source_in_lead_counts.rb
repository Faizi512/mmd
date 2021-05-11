class AddSourceInLeadCounts < ActiveRecord::Migration[6.0]
  def change
    add_column :lead_counts, :source, :string
    add_column :lead_counts, :complete_data, :json
  end
end
