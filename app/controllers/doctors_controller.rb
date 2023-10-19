class DoctorsController < ApplicationController
  before_action :set_doctor, only: %i[ show update destroy ]

  @@doctor_services = DoctorServices new
  
  # GET /doctors
  def index
    @doctors = Doctor.all

    render json: @doctors
  end

  # GET /doctors/1
  def show
    render json: @doctor
  end

  # POST /doctors
  def create
    @doctor = Doctor.new(doctor_params)

    if @doctor.save
      render json: @doctor, status: :created, location: @doctor
    else
      render json: @doctor.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /doctors/1
  def update
    if @doctor.update(doctor_params)
      render json: @doctor
    else
      render json: @doctor.errors, status: :unprocessable_entity
    end
  end

  # DELETE /doctors/1
  def destroy
    @doctor.destroy
  end

  # POST /doctor-login
  def doctor_login
    doctor = @@doctor_services.doctor_login(params, session)
    if doctor.class != Hash
      render json: doctor, status: :created
    else
      render json: doctor, status: :unauthorized
    end
  end

  # DELETE /doctor-logout
  def doctor_logout
    @@doctor_services.log_doctor_out(session)
    head :no_content
  end

  # GET /doctor-loggedin
  def doctor_loggedin
    render json:  @@doctor_services.check_doctor_logged_in(session)
  end

  # GET /doctor-multi-authed
  def is_patient_multi_authed
    render json:  @@doctor_services.check_multiauth_status(session)
  end

  # PATCH /change-doctor-multi-auth
  def change_doctor_multi_auth
    render json: @@doctor_services.change_multiauth_status(session, params)
  end



  private
    # Use callbacks to share common setup or constraints between actions.
    def set_doctor
      @doctor = Doctor.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def doctor_params
      params.permit(:first_name, :last_name, :email, :password, :password_confirmation, :specialty, :auth_status)
    end
end
