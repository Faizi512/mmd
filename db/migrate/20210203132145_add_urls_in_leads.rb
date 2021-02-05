class AddUrlsInLeads < ActiveRecord::Migration[6.0]
  def change
    add_column :leads, :success_url, :string
    add_column :leads, :token, :string
    add_column :leads, :reject_params, :string
    add_column :leads, :success_params, :string
    rename_column :leads, :redirect_url, :reject_url
  end
end
