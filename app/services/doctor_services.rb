class DoctorServices

    #creating a function to log doctor in
    def doctor_login(params, session)
        doctor = Doctor.find_by(email: params[:email])
        if doctor&.authenticate(params[:password])
            session[:doctor_id] = doctor.id
            session[:doctor_auth_status] = false
            doctor
        else
            {error: "Invalid email or password"}
        end
    end

    #function to log doctor out
    def log_doctor_out(session)
        session.delete :doctor_id
        session[:doctor_auth_status] = false
    end

    #function to check if admin is logged in
    def check_doctor_logged_in(session)    
        doctor = Doctor.find_by(id: session[:doctor_id])
        doctor
    end

    #function to check if doctor had been multifactor authenticated
    def check_multiauth_status(session)
        {authenticated: session[:doctor_auth_status]}     
    end

    #function to change doctor multifactor authentication status
    def change_multiauth_status(session, params)
        session[:doctor_auth_status] = params[:auth_status]
        {authenticated: session[:doctor_auth_status]}  
    end

    #function to get all distinct doctor categories
    def get_distinct_specialties
        specialties = Doctor.distinct.pluck(:specialty)
        specialties
    end

end