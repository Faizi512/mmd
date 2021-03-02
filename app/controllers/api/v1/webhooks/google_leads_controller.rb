class Api::V1::Webhooks::GoogleLeadsController < ApplicationController
  protect_from_forgery except: :create
  def index
    render json: {status:  :ok}
  end
  def create
    get_lead_data
    params[:user_column_data].each do |user|
      user[:column_id] == "FIRST_NAME"
      case  user[:column_id]
      when "FIRST_NAME"
        @data[:lead][:firstname] = user[:string_value]
      when "LAST_NAME"
        @data[:lead][:lastname] = user[:string_value]
      when "CITY"
        @data[:lead][:towncity] = user[:string_value]
      when "ZIP_CODE"
        @data[:lead][:postcode] = user[:string_value]
      when "PHONE_NUMBER"
        @data[:lead][:phone1] = user[:string_value]
      when "EMAIL"
        @data[:lead][:email] = user[:string_value]
      else
        @data[:lead][:apidown] = true
      end
    end
    pp @data
    post_lead

    render json:{}, status: :ok
  end

  def get_lead_data
    @data = {
      key: "eecf9b6b61edd9e66ca0f7735dfa033a",
      lead: {
        campid: 'MEGA-MOBILE-DEALS',
        sid: 1,
        ssid: 1,
        ad_set: 1,
        source: 'google-LF',
        gclid: params[:gcl_id] || '',
        adgroupid: params[:adgroup_id] || '',
        campaign: params[:campaign_id] || '',
        bad_credit_customer: "no",
        campaignkey: 'E9F2N6A3R5',
        optindate: DateTime.now.strftime("%d/%m/%Y %H:%M:%S"),
        optinurl: 'deals.megamobiledeals.com',
        ipaddress: "192.168.1.1",
        prize: 35,
        timestamp: DateTime.now,
      }
    }
  end

  def post_lead
    url = "https://dukeleads.leadbyte.co.uk/restapi/v1.2/leads"
    uri = URI(url)
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    request = Net::HTTP::Post.new(url, {'Content-Type' => 'application/json'})
    request.body = @data.to_json
    response = http.request(request)
    puts "****" * 30
    puts JSON.parse(response.body)
    puts "****" * 30
  end

end
