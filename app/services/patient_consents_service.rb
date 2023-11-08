class PatientConsentsService
    # A function to get all consent requests dent to a patient
    def patient_consent(params)
        consents = PatientConsent.where(patient_id: params[:patient_id])
        consents.order(id: :desc)
    end

end