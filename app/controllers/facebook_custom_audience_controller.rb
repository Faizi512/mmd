class FacebookCustomAudienceController < ApplicationController
  include FacebookCustomAudienceHelper
  skip_before_action :verify_authenticity_token
  require 'rubygems' if RUBY_VERSION < '1.9'
  require 'rest_client'


  def create
    # Test app credientails "Custom Audience - Test1"
    access_token = 'EAAMQHbZBRdBsBAOwgakFlII8huGPu686ZAXd9mZAOnr6Yqm8FrewQxKXyHlfmF0fwwr7PIfCBDv2Nd6URaetiPk1rzrEZCZBVB3dIesP4x3iRZA4ahUqjFaElvfYWqUMhpWpZC8U1pY8vC910fxO4pZCmKGJiMMqyBmr2xq4JiCs4wZDZD'
    app_secret = 'd1308ffbfcf0b3f21425fa5ed1c22e5c'
    app_id = '862144884208667'
    id = 'act_3476914642359714'
    audience_id = '23845590727340575'

    # curl -X POST \
    # -F 'name="60 Days Audience"' \
    # -F 'subtype="CUSTOM"' \
    # -F 'description="People who submit lead"' \
    # -F 'customer_file_source="USER_PROVIDED_ONLY"' \
    # -F 'access_token=EAAMQHbZBRdBsBAOwgakFlII8huGPu686ZAXd9mZAOnr6Yqm8FrewQxKXyHlfmF0fwwr7PIfCBDv2Nd6URaetiPk1rzrEZCZBVB3dIesP4x3iRZA4ahUqjFaElvfYWqUMhpWpZC8U1pY8vC910fxO4pZCmKGJiMMqyBmr2xq4JiCs4wZDZD' \
    # https://graph.facebook.com/v8.0/act_3476914642359714/customaudiences
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

    uri = URI("https://graph.facebook.com/v8.0/#{audience_id}/users")
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
