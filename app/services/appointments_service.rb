class AppointmentsService

    # A function to get all appointments for a patient
    def patient_appointments(params)
        appointments = Appointment.where(patient_id: params[:patient_id])
        appointments
    end

    # A function to get all appointments for a doctor
    def doctor_appointments(params)
        appointments = Appointment.where(doctor_id: params[:doctor_id])
        appointments
    end

end