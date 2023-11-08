class PatientConsentsController < ApplicationController
  before_action :set_patient_consent, only: %i[ show update destroy ]
  @@patient_consent_service = PatientConsentsService.new
  
  # GET /patient_consents
  def index
    @patient_consents = PatientConsent.all

    render json: @patient_consents
  end

  # GET /patient_consents/1
  def show
    render json: @patient_consent
  end

  # POST /patient_consents
  def create
    @patient_consent = PatientConsent.new(patient_consent_params)

    if @patient_consent.save
      render json: @patient_consent, status: :created, location: @patient_consent
    else
      render json: @patient_consent.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /patient_consents/1
  def update
    if @patient_consent.update(patient_consent_params)
      render json: @patient_consent
    else
      render json: @patient_consent.errors, status: :unprocessable_entity
    end
  end

  # DELETE /patient_consents/1
  def destroy
    @patient_consent.destroy
  end

  # GET /a_patient_consents/:patient_id
  def get_a_patient_consents
    render json: @@patient_consent_service.patient_consent(params)
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_patient_consent
      @patient_consent = PatientConsent.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def patient_consent_params
      params.permit(:patient_id, :doctor_id, :status)
    end
end
