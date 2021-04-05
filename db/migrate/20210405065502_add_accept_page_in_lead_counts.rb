class AddAcceptPageInLeadCounts < ActiveRecord::Migration[6.0]
  def change
  	add_column :lead_counts, :accept_page, :boolean, default: false
  end
end
