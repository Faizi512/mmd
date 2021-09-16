class Api::V1::RedirectController < ApplicationController

  def redirect_url
    record = ExitDelivery.find(params[:id]).increment!(:count).increment!(:total_count)
    if record.cap && record.count >= record.cap
      record.update(operational: "disable")

      exit_deliveies = ExitDelivery.active.where.not(id: record.id).where(status: record.status).filter{
        |url| url if(url.source & record.source).present? }
      total_percent = exit_deliveies.sum(&:percentage)
      individual_percent = record.percentage.to_f / total_percent

      exit_deliveies.each do |delivery|
        updated_percentage = delivery.percentage + (delivery.percentage * individual_percent)
        delivery.update!(percentage: updated_percentage )
      end
    end
    puts params[:url]
    redirect_to params[:url]
  end

  def exit_deliveries
    exit_urls = ExitDelivery.all

    sold_exit_urls_list =
      exit_urls.active_sold.map{|url| url if url.source.present? && url.source.include?(params[:source])}
    unsold_exit_urls_list =
      exit_urls.active_unsold.map{|s| s if s.source.present? && s.source.include?(params[:source])}

    sold_redirect_urls = sold_exit_urls_list.compact.any? ? sold_exit_urls_list.compact : exit_urls.active_sold_with_no_source
    unsold_redirect_urls = unsold_exit_urls_list.compact.any? ? unsold_exit_urls_list.compact  : exit_urls.active_unsold_with_no_source

    @soldUrl = get_url(sold_redirect_urls, 'sold')
    @unsoldUrl = get_url(unsold_redirect_urls, 'unsold')
    render json:{sold_url: @soldUrl, unsold_url: @unsoldUrl}, status: :ok
  end

  def get_url deliveries, status
    redirect_count = deliveries.any? ? deliveries.sum(&:count) :  0
    deliveries.each do |delivery|
      percent = (delivery.count.to_f / (redirect_count+1) ) * 100
      if percent <= delivery.percentage
        return {url: delivery.url, id: delivery.id}
      end
    end

    {url: ExitDelivery.find_by(status: status, is_default: true).url, id: ExitDelivery.find_by(status: status, is_default: true).id }
  end
end
