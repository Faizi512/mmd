class LeadController < ApplicationController
  skip_before_action :verify_authenticity_token
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
    @acceptedleads = LeadCount.all.order(redirect_date: :desc).group_by(&:redirect_date)
  end

  def accept_leads_count
    LeadCount.create(
        url: params[:url],
        redirect_date:  DateTime.now,
        accept_page: params[:accept_page],
        source: params[:source],
        complete_data: params[:complete_data].as_json
      )
    redirect_to params[:url]
  end

  def lead_search
    data =  {
      "key": "6c67a8ee57305998506ad0bc2c08e296",
      "searches": [
        {
          "campaignId": 767,
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
    puts result = JSON.parse(response.body)
    puts "****" * 30
    render json: {status: 200, match: result["totalMatches"]}
  end

  def accept_leads
    leads = LeadCount.where(redirect_date: DateTime.now)
    rmktg_leads_count  = leads.where(source: 'RMKTG').count
    if leads.count < 500 && rmktg_leads_count/leads.count.to_f * 100 <= 20.to_f
      url = "https://acceptedmobile.co.uk/apps/"
      uri = URI(url)
      data = params.as_json
      uri.query = URI.encode_www_form(data)

      res = Net::HTTP.get_response(uri)
      puts res.body if res.is_a?(Net::HTTPSuccess)

      puts "****" * 30
      puts res.body
      puts "****" * 30
      puts response =  Hash.from_xml(res.body)
    end
    puts Time.now
    render json: {status: 200, response: response || nil}
  end

end
