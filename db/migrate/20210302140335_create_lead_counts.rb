class CreateLeadCounts < ActiveRecord::Migration[6.0]
  def change
    create_table :lead_counts do |t|
      t.string :url
      t.date :redirect_date
      t.timestamps
    end
  end
end
