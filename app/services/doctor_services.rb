class DoctorServices

    #creating a function to log doctor in
    def doctor_login(params, session)
        doctor = Doctor.find_by(email: params[:email])
        if doctor&.authenticate(params[:password])
                session[:doctor_id] = doctor.id
                doctor
            end
        else
            {error: "Invalid email or password"}
        end
    end

    #function to log doctor out
    def log_doctor_out(session)
        session.delete :doctor_id
    end

    #function to check if admin is logged in
    def check_doctor_logged_in(session)    
        doctor = Doctor.find_by(id: session[:doctor_id])
        doctor
    end

end