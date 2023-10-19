class PatientServices

    #creating a function to log patient in
    def patient_login(params, session)
        patient = Patient.find_by(email: params[:email])
        if patient&.authenticate(params[:password])
            session[:patient_id] = patient.id
            session[:patient_auth_status] = false
            patient
        
        else
            {error: "Invalid email or password"}
        end
    end

    #function to log patient out
    def log_patient_out(session)
        session.delete :patient_id
        session[:patient_auth_status] = false
    end

    #function to check if patient is logged in
    def check_patient_logged_in(session)    
        patient = Patient.find_by(id: session[:patient_id])
        patient
    end

    #function to check if patient has been multifactor authenticated
    def check_multiauth_status(session)
        {authenticated: session[:patient_auth_status]}
    end

    #function to change patient multifactor authentication status
    def change_multiauth_status(session, params)
        session[:patient_auth_status] = params[:auth_status]
        {authenticated: session[:patient_auth_status]}  
    end
end