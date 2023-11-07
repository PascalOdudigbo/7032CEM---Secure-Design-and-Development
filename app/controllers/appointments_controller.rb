class AppointmentsController < ApplicationController
  before_action :set_appointment, only: %i[ show update destroy ]

  @@appointments_service = AppointmentsService.new

  # GET /appointments
  def index
    @appointments = Appointment.all

    render json: @appointments
  end

  # GET /appointments/1
  def show
    render json: @appointment
  end

  # POST /appointments
  def create
    @appointment = Appointment.new(appointment_params)

    if @appointment.save
      render json: @appointment, status: :created, location: @appointment
    else
      render json: @appointment.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /appointments/1
  def update
    if @appointment.update(appointment_params)
      render json: @appointment
    else
      render json: @appointment.errors, status: :unprocessable_entity
    end
  end

  # DELETE /appointments/1
  def destroy
    @appointment.destroy
  end

  # GET /patient-appointments/:patient_id
  def get_patient_appointments
    render json: @@appointments_service.patient_appointments(params)
  end

  # GET /doctor-appointments/:doctor_id
  def get_doctor_appointments
    render json: @@appointments_service.doctor_appointments(params)
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_appointment
      @appointment = Appointment.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def appointment_params
      params.permit(:patient_id, :availability_id, :status)
    end
end
