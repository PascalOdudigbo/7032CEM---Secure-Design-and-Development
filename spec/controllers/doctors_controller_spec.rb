require 'rails_helper'

RSpec.describe DoctorsController, type: :controller do

    describe 'Authentication Tests' do
        @@doctor = Doctor.create(id: 1, first_name: "Sialo", last_name: "Tobiko", email: "pascalodudigbo@gmail.com", password: "1234567890" , password_confirmation: "1234567890", specialty: "Paediatrics")

        it 'allows valid doctor login' do
            post :doctor_login, params: { email:  @@doctor.email, password:  @@doctor.password }
            expect(response).to have_http_status(:created)
        end

        it 'rejects invalid doctor login' do
            post :doctor_login, params: { email: 'invalid@example.com', password: 'wrong_password' }
            expect(response).to have_http_status(:unauthorized)
        end
    end

    describe 'Authorization Tests' do
        @@doctor = Doctor.create(id: 1, first_name: "Sialo", last_name: "Tobiko", email: "pascalodudigbo@gmail.com", password: "1234567890" , password_confirmation: "1234567890", specialty: "Paediatrics")
        
        it 'allows authorized doctor to retrieve information' do
            get :show, params: { id:  @@doctor.id }
            expect(response).to have_http_status(:ok)
        end

        it 'allows authorized doctor to update information' do
            patch :update, params: { id:  @@doctor.id, first_name: 'NewName' }
            expect(response).to have_http_status(:ok)
        end

        it 'allows authorized doctor to delete account' do
            delete :destroy, params: { id:  @@doctor.id }
            expect(response).to have_http_status(:no_content)
        end
    end

    describe 'Session Management Tests' do
        @@doctor = Doctor.create(id: 1, first_name: "Sialo", last_name: "Tobiko", email: "pascalodudigbo@gmail.com", password: "1234567890" , password_confirmation: "1234567890", specialty: "Paediatrics")

        it 'allows doctor to logout' do
            post :doctor_login, params: { email:  @@doctor.email, password:  @@doctor.password }
            delete :doctor_logout
            expect(response).to have_http_status(:no_content)
        end

    end

end
