class FormValidationController < ApplicationController
  include PagesHelper
  include FacebookCustomAudienceHelper
  skip_before_action :verify_authenticity_token

  def valid_data
   begin
      @errors = []
      @currentPage = params[:step]
      @status = :bad_request
      if params[:step].empty? || params[:step] == "0" || params[:step] == "null"
        name_verify
      end
      if params[:step] == "1"
        postcode_verify
      end
      if params[:step] == "2" && params[:phone1].length > 10
        @mobileValid = mobile_verify
      elsif params[:step] == "2" && params[:phone1].length <= 10
        @errors.push({name:'phone1', message:'error'})
      end


      if params[:step] == "2" && params[:email].present?
        @emailValid = email_verify
      end

      if params[:step] == "2" && @mobileValid && @emailValid
          unless params[:__amp_form_verify]
            post_lead getData ("MEGA-MOBILE-DEALS")
            fb_audience
            @status = :ok
          end
          @currentPage = 3
      end

      if params[:step] == "3"
        if params[:save_energy_bc_no] == "no"
          set_header "https://deals.megamobiledeals.com/success#{additionalParams}"
        else
          @currentPage = 4
        end
      end

      if params[:step] == "4"
        if params[:street1].length > 1
          unless params[:__amp_form_verify]
            post_lead getEnergyData
          end
          if isbadCustomer(params[:keyword]) || params[:bc] == "yes"
            @currentPage = 5
          else
            set_header "https://deals.megamobiledeals.com/success#{additionalParams}"
          end
        else
          @errors.push({name:'street1', message:'error'})
        end
      end

      if params[:step] == "5"
        if params[:finance] == "yes"
          unless params[:__amp_form_verify]
            post_lead getData ("MMD-finance")
          end
        end
        @currentPage = 6
      end

      if params[:step] == "6"
        if params[:free_credit] == "yes"
          unless params[:__amp_form_verify]
            post_lead getData ("MMD-free-credit")
          end
        end
        if params[:casino] == "yes"
          unless params[:__amp_form_verify]
            post_lead getData ("MMD-Casino")
          end
        end
        if params[:free_credit].present? && params[:casino].present?
          set_header "https://mtrk11.co.uk/?a=14118&c=33110#{additionalParamsFoBC}"
        end
      end
      render :valid_data, status: @status
    rescue Exception => e
     @currentPage = params[:step]
     render :valid_data, status: :bad_request
    end
  end
  def set_header url
    response.headers['AMP-Redirect-To'] = url
    response.headers['AMP-Access-Control-Allow-Source-Origin'] = params[:__amp_source_origin]
    response.headers['Access-Control-Expose-Headers'] = "AMP-Redirect-To, AMP-Access-Control-Allow-Source-Origin"
    response.headers['Access-Control-Expose-Headers'] = "AMP-Redirect-To, AMP-Access-Control-Allow-Source-Origin"
  end

  def postcode_verify
    if params[:postcode].match /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/
      @currentPage = 2
    else
      @errors.push({name:'postcode', message:'error'})
    end
  end

  def name_verify
    if params[:firstname].length > 0 && params[:lastname].length > 0
      @currentPage = 1
    elsif params[:firstname].length <= 0
      @errors.push({name:'firstname', message:'error'})
    elsif params[:lastname].length <= 0
      @errors.push({name:'lastname', message:'error'})
    end
  end

  def mobile_verify
    url = "https://dukeleads.leadbyte.co.uk/restapi/v1.2/validate/mobile?value=#{params[:phone1]}&key=50f64816a3eda24ab9ecf6c265cae858"
    uri = URI(url)
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    req = Net::HTTP::Get.new(url)
    res = http.request(req)
    puts "response #{res.body}"
    json = JSON.parse(res.body)
    if json["status"] == "Valid"
      return true
    end
    @errors.push({name:'phone1', message:'error'})
    return false
  end

  def email_verify
    url = "https://dukeleads.leadbyte.co.uk/restapi/v1.2/validate/email?value=#{params[:email]}&key=50f64816a3eda24ab9ecf6c265cae858"
    uri = URI(url)
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    req = Net::HTTP::Get.new(url)
    res = http.request(req)
    puts "response #{res.body}"
    json = JSON.parse(res.body)
    if json["status"] == "Valid"
      return true
    end
    @errors.push({name:'email', message:'error'})
    return false
  end

  def additionalParams
    "?s1=#{getSource}&s2=#{getC1}&s3=#{getEmail}&s4=#{getPhone1}&s5=#{getFirstName}"
  end

  def additionalParamsFoBC
    "&s1=exit-#{getSource}&s2=#{getC1}&s3=#{getEmail}&s4=#{getPhone1}"
  end

  def getC1
    params[:c1].present? || params[:bstransid].present? ||  params[:transid].present?
  end

  def getSource
    "Google-amp"
  end

  def getEmail
    params[:email]
  end

  def getPhone1
    params[:phone1]
  end

  def getFirstName
    params[:firstname]
  end

  def getData campid
    step_form
    @details = JSON.parse @details
    customer_type = isbadCustomer(params[:keyword]) || params[:bc] == "yes"
    return {
      campid: campid,
      postcode: params[:postcode] ,
      firstname: params[:firstname],
      lastname: params[:lastname],
      email: params[:email],
      phone1: params[:phone1],
      sid: params[:sid].present? || @details["sid"] ||1,
      ssid: params[:ssid].present? || @details["ssid"] ||1,
      ad_set:params[:ad_set].present? || 1,
      source: 'Google-amp',
      c1: params[:c1].present? || params[:bstransid].present? || params[:transid].present?,
      adgroupid: params[:adgroupid].present? || '',
      campaign: params[:campaign].present? || '',
      keyword: params[:keyword].present? || '',
      bad_credit_customer: (customer_type) ? "yes" : "no",
      campaignkey: 'E9F2N6A3R5',
      optindate: DateTime.now.strftime("%d/%m/%Y %H:%M:%S"),
      optinurl: 'deals.megamobiledeals.com'+ @details["optin_url"],
      ipaddress: "192.168.1.1",
      trafficid: params[:trafficid].present? || @details["form_name"],
      prize: params[:prize].present? || 35,
      timestamp: DateTime.now,
    }
  end

  def getEnergyData
    step_form
    @details = JSON.parse @details
    customer_type = isbadCustomer(params[:keyword]) || params[:bc] == "yes"
    return {
      campid: "ENERGY",
      postcode: params[:postcode] ,
      firstname: params[:firstname],
      lastname: params[:lastname],
      email: params[:email],
      phone1: params[:phone1],
      street1: params[:street1],
      ssid: params[:ssid].present? || @details["ssid"] || "unknown",
      ad_set:params[:ad_set].present? || 1,
      paymentmethod: params[:paymentmethod].present? || "prepayment",
      currentprovider: params[:currentprovider].present?  || "other",
      towncity: params[:towncity].present?  || "unknown",
      title: params[:title].present?  || "Mr",
      sid: 1,
      source: 'MMD',
      c1: params[:c1].present? || params[:bstransid].present? || params[:transid].present?,
      adgroupid: params[:adgroupid].present? || '',
      campaign: params[:campaign].present? || '',
      keyword: params[:keyword].present? || '',
      bad_credit_customer: (customer_type) ? "yes" : "no",
      campaignkey: 'E9F2N6A3R5',
      optindate: DateTime.now.strftime("%d/%m/%Y %H:%M:%S"),
      optinurl: 'deals.megamobiledeals.com'+ @details["optin_url"],
      ipaddress: "192.168.1.1",
      trafficid: params[:trafficid].present? || @details["form_name"] || "Save Energy Bill",
      prize: params[:prize].present? || "mobilephone",
      timestamp: DateTime.now,
    }
  end

  def post_lead json
    data = {
      lead: json,
      key: "eecf9b6b61edd9e66ca0f7735dfa033a"
    }
    url = "https://dukeleads.leadbyte.co.uk/restapi/v1.2/leads"
    uri = URI(url)
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    request = Net::HTTP::Post.new(url, {'Content-Type' => 'application/json'})
    request.body = data.to_json
    response = http.request(request)
    puts "****" * 30
    puts JSON.parse(response.body)
    puts "****" * 30
  end

  def fb_audience
    # Test app credientails "Custom Audience - Test1"
    access_token = 'EAAMQHbZBRdBsBALaAQI1OdZCNEOLIa4yGOTk9I4isSC0iZARcwn5FZClkIJieLDPUnEYMgFy1It0j5BP151xiTz7gXh1uKGiWq1YXYjLnru4ZBU5rOsRZBqH5uteBkZAK9T2xqg6h5vRs1kUMBIFlT7JocYdmR0QZANSsZCP2NHbXeawdjfreRtTg'
    app_secret = 'd1308ffbfcf0b3f21425fa5ed1c22e5c'
    app_id = '862144884208667'
    id = 'act_611454116359143'
    audience_id = '23844386746780658'

    phone_num = "+44" + params[:phone1].split('').last(10).join

    payload = {
      schema: [
        "EMAIL",
        "PHONE",
        "FN",
        "LN",
        "ZIP",

      ],
      data: [
        [
          hash_256(params[:email]),
          hash_256(phone_num),
          hash_256(params[:firstname]),
          hash_256(params[:lastname]),
          hash_256(params[:postcode]),
        ],
      ]
    }

    uri = URI("https://graph.facebook.com/v6.0/#{audience_id}/users")
    http = Net::HTTP.new(uri.host, uri.port)

    http.use_ssl = true
    req = Net::HTTP::Post.new(uri.path)
    req.form_data = {
      'access_token' => access_token,
      'payload' => payload.to_json
    }
    res = http.request(req)
    puts "----" *50
    puts JSON.parse(res.body)
    puts "----" *50
  end
end
