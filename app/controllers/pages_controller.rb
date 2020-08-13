class PagesController < ApplicationController
  include PagesHelper
  before_action :set_cookies
	def index
    @amp = true
    get_deals_data('home')
    @bc = isbadCustomer(params[:keyword]) || params[:bc] == "yes"
	end

	def show
    get_deals_data( params[:page_name] )
    respond_to do |format|
      format.html {@partial = render_to_string partial: params[:page_name].to_s}
      format.js {}
    end
	end

  def exclusive_ee_deals
    exclusive_ee_deal
    @products = Product.where(product_type: params[:type] || 0)
  end

  private
  def set_cookies
    @cookie_uuid =  cookies[:_msuuid_1fexuyzkduuouz] || "SS#{SecureRandom.uuid}"
    cookies[:_msuuid_1fexuyzkduuouz] = {
      value: @cookie_uuid,
      expires: 1.year.from_now,
      secure: false,
      httponly: false,
    }
  end
end
