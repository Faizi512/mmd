class LeadController < ApplicationController
  skip_before_action :verify_authenticity_token
  SOLD_LEAD_CAMPAIGN = 117.freeze
  UN_SOLD_LEAD_CAMPAIGN = 59.freeze
  require 'active_support/core_ext/hash/conversions'
  def redirect_webhook
    puts "---------------" * 30
    if params[:records]
      params[:records].each do |record|
        decide_url(record)
        @token = record[:lead][:c3]
        @lead = Lead.find_or_create_by(token: @token.downcase)
        @lead.update(
                    success_url: @lead.success_url || @success_url,
                    success_params: @lead.success_params || @success_params,
                    reject_url: @lead.reject_url || @reject_url,
                    reject_params: @lead.reject_params || @reject_params,
                    delivery_name: @delivery_name
                    )
      end

      if @lead.success_url && @lead.reject_url
        ActionCable.server.broadcast "RedirectUrlChannel_#{@token}", {lead: @lead}
        @lead.delete
      end
      render json: {status: @lead}
    else
      render json: {status: 400}
    end
  end

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
    render json: {response: LeadCount.all.group_by(&:redirect_date).map{|t, k| [t, k.count]}}
  end

  def accept_leads_count
    LeadCount.create(url: params[:url], redirect_date:  DateTime.now)
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
    if LeadCount.where(redirect_date: DateTime.now).count < 500
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

  private



    def decide_url record
      delivery = record[:deliveries][0][:reference]
      url_params = delivery.split("_---_") # ["Loan Exit", "/loan-deals?", "&email=email&source=source&sid=sid"]
      if record[:campaign][:id] == UN_SOLD_LEAD_CAMPAIGN
        @reject_url = url_params[1] #  "/loan-deals?"
        @reject_params = url_params[2] # "&email=email&source=source&sid=sid"
      else
        @success_url =  url_params[1] #  "/loan-deals?"
        @success_params = url_params[2] # "&email=email&source=source&sid=sid"
      end

      # case campaign # a_variable is the variable we want to compare
      # when "Exit 1 (Energy)"
      #   @redirect_url = "/e-deals?check=1"
      # when "Exit 2 (Credit)"
      #   @redirect_url = "/credit-report?check=1"
      # when "Exit 4 (sweetmobile)"
      #   @redirect_url = "http://lcuktrack.go2cloud.org/aff_c?offer_id=1&aff_id=1000&aff_sub=exit"
      # when "Exit 5 (UK Credit Ratings)"
      #   @redirect_url = "/uk-credit-ratings?check=1"
      # when "Exit 6 - Awin"
      #   @redirect_url = "/rmktg-awin?check=1"
      # when "Exit 5 - Sweet 2"
      #   @redirect_url = "/rmktg-sweet?check=1"
      # when "Exit 8 (Energy / Awin)"
      #   @redirect_url = "/e-deals-awin?check=1"
      # when "Exit Lotto"
      #   @redirect_url = "/lotto?check=1"
      # when "(Energy / Voxi)"
      #   @redirect_url = "/e-deals-voxi?check=1"
      # when "SKY Exit"
      #   @redirect_url = "/tv-deals?check=1"
      # when "Loan Exit"
      #   @redirect_url = "/loan-deals?check=1"
      # when "Voxi Exit"
      #   @redirect_url = "https://www.awin1.com/cread.php?awinmid=10951&awinaffid=652417&ued=https%3A%2F%2Fwww.voxi.co.uk%2Facquisition%2Fplans"
      # when "(Energy / E2Save)"
      #   @redirect_url = "/e-deals-e2save?check=1"
      # when "Exit 10 (E 2 Save)"
      #   @redirect_url = "https://www.awin1.com/cread.php?awinmid=422&awinaffid=652417&clickref=exit&ued=https%3A%2F%2Fwww.e2save.com%2F"
      # when "Exit Sweet-Mobile"
      #   @redirect_url = "https://dl.reliatrk.com/?a=2&c=4"
      # when "Exit e2save - cashback deals"
      #   @redirect_url = "https://www.awin1.com/cread.php?awinmid=422&awinaffid=652417&clickref=EXIT+chasback+deals&ued=https%3A%2F%2Fwww.e2save.com%2Fcontract%2Fcashback-deals"
      # when "Exit e2save - pay monthly contract deals"
      #   @redirect_url = "https://www.awin1.com/cread.php?awinmid=422&awinaffid=652417&clickref=EXIT+pay+monthly+contract+deals&ued=https%3A%2F%2Fwww.e2save.com%2Fcontract"
      # when "Exit VOXI Google"
      #   @redirect_url = "https://www.awin1.com/cread.php?awinmid=10951&awinaffid=652417&ued=https%3A%2F%2Fwww.voxi.co.uk%2Facquisition%2Fplans"
      # else
      #   @redirect_url = "https://mtrk11.co.uk/?a=14118&c=33110"
      # end
    end
end
