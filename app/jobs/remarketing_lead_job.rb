class RemarketingLeadJob < ApplicationJob
  queue_as :default

  def perform(params)
    begin
      debugger
      url = 'https://dukeleads.leadbyte.co.uk/api/submit.php'
      params[:campid] = "MEGA-MOBILE-DEALS"
      params[:returnjson] = "yes"
      params[:'opt-in_date'] = DateTime.now
      params[:'opt-in_url'] = "https://deals.megamobiledeals.com/"+ params[:action]
      resp = Faraday::Connection.new.get(url, params.as_json) { |request| request.options.timeout = 25 }
      @response = JSON.parse(resp.body)
      Rails.logger.debug "============================================response of LB data send"
      Rails.logger.debug  @response
    rescue Exception => e
      Rails.logger.debug "============================================Exception"
      Rails.logger.debug  e
    end
  end
end
