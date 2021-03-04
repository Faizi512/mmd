class Api::V1::Webhooks::ExitDeliveriesController < ApplicationController
  # before_action :authenticate_user!
  before_action :set_exit_delivery, only: [:show, :edit, :update, :destroy]

  # GET /exit_deliveries
  # GET /exit_deliveries.json
  def index
    @exit_deliveries = ExitDelivery.all
  end

  # GET /exit_deliveries/1
  # GET /exit_deliveries/1.json
  def show
  end

  # GET /exit_deliveries/new
  def new
    @exit_delivery = ExitDelivery.new
  end

  # GET /exit_deliveries/1/edit
  def edit
  end

  # POST /exit_deliveries
  # POST /exit_deliveries.json
  def create
    # exit_delivery_params[:copy_percentage] = params[:percentage]
    @exit_delivery = ExitDelivery.new(exit_delivery_params)
    respond_to do |format|
      if @exit_delivery.save
        format.html { redirect_to @exit_delivery, notice: 'Exit delivery was successfully created.' }
        format.json { render :show, status: :created, location: @exit_delivery }
      else
        format.html { render :new }
        format.json { render json: @exit_delivery.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /exit_deliveries/1
  # PATCH/PUT /exit_deliveries/1.json
  def update
    respond_to do |format|
      if @exit_delivery.update(exit_delivery_params)
        format.html { redirect_to @exit_delivery, notice: 'Exit delivery was successfully updated.' }
        format.json { render :show, status: :ok, location: @exit_delivery }
      else
        format.html { render :edit }
        format.json { render json: @exit_delivery.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /exit_deliveries/1
  # DELETE /exit_deliveries/1.json
  def destroy
    @exit_delivery.destroy
    respond_to do |format|
      format.html { redirect_to exit_deliveries_url, notice: 'Exit delivery was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

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

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_exit_delivery
      @exit_delivery = ExitDelivery.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def exit_delivery_params
      params.require(:exit_delivery).permit(:url, :percentage,
        :status, :priority, :cap, :source, :count, :operational,
        :functional).merge(copy_percentage: params[:exit_delivery][:percentage])
    end
end
