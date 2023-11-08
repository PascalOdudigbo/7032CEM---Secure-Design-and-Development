class AvailabilitiesService 

    # A function to get all availabilities belinging to a doctor
    def doctor_availabilities(params)
        doctor_availibilities = Availability.where(doctor_id: params[:doctor_id])
        doctor_availibilities.order(id: :desc)
    end

end