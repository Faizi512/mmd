class LeadController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!, only: [:accepeted_lead_data]
  require 'active_support/core_ext/hash/conversions'

  def submitLead
    url = "https://dukeleads.leadbyte.co.uk/api/submit.php"
    uri = URI(url)
    params[:returnjson] = "yes"
    data = params.as_json
    uri.query = URI.encode_www_form(data)

    res = Net::HTTP.get_response(uri)
    puts res.body if res.is_a?(Net::HTTPSuccess)

    puts "****" * 30
    puts res.body
    puts "****" * 30
    render json: {status: 200, response: JSON.parse(res.body)}
  end

  def accepeted_lead_data
    if params[:daterange].present?
      start_date = params[:daterange].split('to').first.strip
      end_date = params[:daterange].split('to').last.strip
      leads = LeadCount.where(redirect_date: (start_date)..(end_date))
      @acceptedleads = leads.order(redirect_date: :desc).group_by(&:redirect_date)
      @accepted_leads_count = leads.count
    else
      @acceptedleads = LeadCount.all.order(redirect_date: :desc).group_by(&:redirect_date)
      @accepted_leads_count =
        LeadCount.where(redirect_date: (1.month.ago.beginning_of_month)..(1.month.ago.end_of_month)).count
    end
    @current_month_leads_count = LeadCount.where(redirect_date: (Date.today.at_beginning_of_month)..(Date.today)).count
  end

  def accepted_lead_details
    if params[:date]
      @accepted_leads =
        LeadCount.where(redirect_date: params[:date]).order(created_at: :desc).paginate(page: params[:page], per_page: 50)
    end
  end

  def accept_leads_count
    LeadCount.create(
        url: params[:url],
        redirect_date:  DateTime.now,
        accept_page: params[:accept_page],
        source: params[:source]&.downcase,
        complete_data: params.as_json
      )
    redirect_to params[:url]
  end

  def lookup_lead_365(key, camp_id)
    data =  {
      "key": key,
      "searches": [
        {
          "campaignId": camp_id,
          "phone": params[:phone]
        }
      ]
    }
    url = "https://lead365.leadbyte.co.uk/restapi/v1.2/leads/search"
    uri = URI(url)
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    request = Net::HTTP::Post.new(url, {'Content-Type' => 'application/json'})
    request.body = data.to_json
    response = http.request(request)
    puts "****" * 30
    puts @result = JSON.parse(response.body)
  end

  def lead_search
    lookup_lead_365(key = '6c67a8ee57305998506ad0bc2c08e296', camp_id = 767)
    if @result["totalMatches"] == 0
      lookup_lead_365(key = '3f2af16146e4c986136846e74f2640bf' , camp_id = 1073)
    end
    puts "****" * 30
    render json: {status: 200, match: @result["totalMatches"]}
  end

  def accept_leads
    leads = LeadCount.where(redirect_date: DateTime.now)
    if check_address
      if leads.count < 500
        if params[:source]&.downcase == 'rmktg'
          rmktg_leads_count  = leads.where(source: 'rmktg').count + 1
          if leads.count == 0 ? true : rmktg_leads_count/leads.count.to_f * 100 <= 20.to_f
            submit_accepted_lead(params)
          end
        else
          submit_accepted_lead(params)
        end
      end
    end
    puts Time.now
    render json: {status: 200, response: @response || nil}
  end

  def submit_accepted_lead(params)
    url = "https://acceptedmobile.co.uk/apps/"
    uri = URI(url)
    data = params.as_json
    uri.query = URI.encode_www_form(data)

    res = Net::HTTP.get_response(uri)
    puts res.body if res.is_a?(Net::HTTPSuccess)

    puts "****" * 30
    puts res.body
    puts "****" * 30
    puts @response =  Hash.from_xml(res.body)
  end

  def check_address
    params[:street].downcase != "unknown" && params[:town].downcase != "unknown" && params[:county].downcase != "unknown" && params[:house_number].downcase != "unknown" && params[:postcode].present?
  end
end
