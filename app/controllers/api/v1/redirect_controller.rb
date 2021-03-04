class Api::V1::RedirectController < ApplicationController
  def redirect_url
    if params[:term].present?
      record = ExitDelivery.find_by(url: params[:term]).increment!(:count)
      if record.count == record.cap
        ExitDelivery.find(record.id).update(operational: "disable")
        total_percent = ExitDelivery.where.not(id: record.id).where(status: record.status).pluck(:percentage).sum
        individual_percent = record.percentage.to_f / total_percent
        ExitDelivery.where.not(id: record.id).where(status: record.status).each do |value|
          if value.id != record.id
            updated_percentage =
              value.percentage + (value.percentage * individual_percent)
            ExitDelivery.find(value.id).update!(percentage: updated_percentage )
          end
        end
      end
    else
      sold_deliveries = ExitDelivery.where(status: "sold").order(priority: :asc)
      unsold_deliveries = ExitDelivery.where(status: "unsold").order(priority: :asc)
      @soldUrl = get_url sold_deliveries
      @unsoldUrl = get_url unsold_deliveries
      render json:{soldUrl: @soldUrl, unsoldUrl: @unsoldUrl}, status: :ok
    end
  end

  def get_url deliveries
    request_count = 0
    deliveries.each do |value|
      request_count += value.count
    end
    deliveries.each do |value|
      percent = (value.count.to_f / (request_count+1) ) * 100
      if percent <= value.percentage && value.functional == "active" && value.operational == "active"
        return value.url
      end
    end
  end
end
