class FacebookCustomAudienceController < ApplicationController
  include FacebookCustomAudienceHelper
  skip_before_action :verify_authenticity_token
  require 'rubygems' if RUBY_VERSION < '1.9'
  require 'rest_client'


  def create
    # Test app credientails "Custom Audience - Test1"
    access_token = 'EAAMQHbZBRdBsBAO7G9W5fsqdLvNdpCH2PdG31XmqVilV5VZAP1ShWBQOxvqrKrunetDnUwqmVQ6XVx5bpSn4RqP4AKKvL9qo4W4hUWsqPrU1N3rQIkz1Qkh5ZAU1I3HGRJz6hywtDxOGc936jE0vc4PaXUKKZAvdzt4hff4E4wZDZD'
    app_secret = 'd1308ffbfcf0b3f21425fa5ed1c22e5c'
    app_id = '862144884208667'
    id = 'act_401293794421043'
    audience_id = '23846622749570717'

    # curl -X POST \
    # -F 'name="60 Days Audience"' \
    # -F 'subtype="CUSTOM"' \
    # -F 'description="People who submit lead"' \
    # -F 'customer_file_source="USER_PROVIDED_ONLY"' \
    # -F 'access_token=EAAMQHbZBRdBsBAO7G9W5fsqdLvNdpCH2PdG31XmqVilV5VZAP1ShWBQOxvqrKrunetDnUwqmVQ6XVx5bpSn4RqP4AKKvL9qo4W4hUWsqPrU1N3rQIkz1Qkh5ZAU1I3HGRJz6hywtDxOGc936jE0vc4PaXUKKZAvdzt4hff4E4wZDZD' \
    # https://graph.facebook.com/v9.0/act_401293794421043/customaudiences
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

    uri = URI("https://graph.facebook.com/v9.0/#{audience_id}/users")
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
    render json: {status: 200, response: JSON.parse(res.body)}
  end

end
