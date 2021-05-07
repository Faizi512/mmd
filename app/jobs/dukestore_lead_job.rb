class DukestoreLeadJob < ApplicationJob
  queue_as :default

  def perform(data)
    begin
      url = 'https://dukestore.herokuapp.com/api/v1/lead'
      data[:campid] = "MEGA-MOBILE-DEALS"
      data[:campaign_name] = "MEGA-MOBILE-DEALS"
      data[:'opt-in_date'] = DateTime.now
      data[:'opt-in_url'] = "https://deals.megamobiledeals.com/"+ data[:action]
      resp = Faraday::Connection.new.post(url, {lead: data.as_json}) { |request| request.options.timeout = 25 }
      @response = JSON.parse(resp.body)
      Rails.logger.debug "============================================response of dukestore"
      Rails.logger.debug  @response
    rescue Exception => e
      Rails.logger.debug "============================================Exception"
      Rails.logger.debug  e
    end
  end
end
