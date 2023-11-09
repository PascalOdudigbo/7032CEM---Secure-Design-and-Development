class PatientsController < ApplicationController
  before_action :set_patient, only: %i[ show update destroy ]

  @@patient_services = PatientServices.new

  # GET /patients
  def index
    @patients = Patient.all

    render json: @patients, include: ["appointments", "doctors", ["health_records", "health_records.doctor", ["health_records.appointment", "health_records.appointment.availability"]], "patient_consents"]
  end

  # GET /patients/1
  def show
    render json: @patient, include: ["appointments", "doctors", ["health_records", "health_records.doctor", ["health_records.appointment", "health_records.appointment.availability"]], "patient_consents"]
  end

  # POST /patients
  def create
    @patient = Patient.new(patient_params)

    if @patient.save
      render json: @patient, status: :created, location: @patient
    else
      render json: @patient.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /patients/1
  def update
    if @patient.update(patient_params)
      render json: @patient, include: ["appointments", "doctors", ["health_records", "health_records.doctor", ["health_records.appointment", "health_records.appointment.availability"]], "patient_consents"]
    else
      render json: @patient.errors, status: :unprocessable_entity
    end
  end

  # DELETE /patients/1
  def destroy
    @patient.destroy
  end

  # POST /patient-login
  def patient_login
    patient = @@patient_services.patient_login(params, session)
    if patient.class != Hash
      render json: patient, status: :created
    else
      render json: patient, status: :unauthorized
    end
  end

  # DELETE /patient-logout
  def patient_logout
    @@patient_services.log_patient_out(session)
    head :no_content
  end

  # GET /patient-loggedin
  def patient_loggedin
    render json:  @@patient_services.check_patient_logged_in(session), include: ["appointments", "doctors", ["health_records", "health_records.doctor", ["health_records.appointment", "health_records.appointment.availability"]], "patient_consents"]
  end

  # GET /patient-multi-authed
  def is_patient_multi_authed
    render json:  @@patient_services.check_multiauth_status(session)
  end

  # PATCH /change-patient-multi-auth
  def change_patient_multi_auth
    render json: @@patient_services.change_multiauth_status(session, params)
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_patient
      @patient = Patient.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def patient_params
      params.permit(:first_name, :last_name, :email, :password, :password_confirmation, :verification_status, :auth_status)
    end
end
