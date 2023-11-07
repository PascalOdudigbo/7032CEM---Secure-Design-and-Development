class AvailabilitiesController < ApplicationController
  before_action :set_availability, only: %i[ show update destroy ]

  @@availabilities_service = AvailabilitiesService.new

  # GET /availabilities
  def index
    @availabilities = Availability.all.order(id: :desc)

    render json: @availabilities
  end

  # GET /availabilities/1
  def show
    render json: @availability
  end

  # POST /availabilities
  def create
    @availability = Availability.new(availability_params)

    if @availability.save
      render json: @availability, status: :created, location: @availability
    else
      render json: @availability.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /availabilities/1
  def update
    if @availability.update(availability_params)
      render json: @availability
    else
      render json: @availability.errors, status: :unprocessable_entity
    end
  end

  # DELETE /availabilities/1
  def destroy
    @availability.destroy
  end

  # GET /doctor-availabilities/1
  def get_doctor_availabilities
    render json: @@availabilities_service.doctor_availabilities(params).order(id: :desc)
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_availability
      @availability = Availability.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def availability_params
      params.permit(:start_time, :end_time, :date, :doctor_id, :status)
    end
end
