class PatientServices

    #creating a function to log patient in
    def patient_login(params, session)
        patient = Patient.find_by(email: params[:email])
        if patient&.authenticate(params[:password])
                session[:patient_id] = patient.id
                patient
            end
        else
            {error: "Invalid email or password"}
        end
    end

    #function to log patient out
    def log_patient_out(session)
        session.delete :patient_id
    end

    #function to check if patient is logged in
    def check_patient_logged_in(session)    
        patient = Patient.find_by(id: session[:patient_id])
        patient
    end

end