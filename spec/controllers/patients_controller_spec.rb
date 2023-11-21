require 'rails_helper'

RSpec.describe PatientsController, type: :controller do

    describe 'Authentication Tests' do
        @@patient = Patient.create(id: 1, first_name: "Sialo", last_name: "Tobiko", email: "pascalodudigbo@gmail.com", password: "1234567890" , password_confirmation: "1234567890")

        it 'allows valid patient login' do
            post :patient_login, params: { email:  @@patient.email, password:  @@patient.password }
            expect(response).to have_http_status(:created)
        end

        it 'rejects invalid patient login' do
            post :patient_login, params: { email: 'invalid@example.com', password: 'wrong_password' }
            expect(response).to have_http_status(:unauthorized)
        end
    end

    describe 'Authorization Tests' do
        @@patient = Patient.create(id: 1, first_name: "Sialo", last_name: "Tobiko", email: "pascalodudigbo@gmail.com", password: "1234567890" , password_confirmation: "1234567890")
        
        it 'allows authorized patient to retrieve information' do
            get :show, params: { id:  @@patient.id }
            expect(response).to have_http_status(:ok)
        end

        it 'allows authorized patient to update information' do
            patch :update, params: { id:  @@patient.id, first_name: 'NewName' }
            expect(response).to have_http_status(:ok)
        end

        it 'allows authorized patient to delete account' do
            delete :destroy, params: { id:  @@patient.id }
            expect(response).to have_http_status(:no_content)
        end
    end

    describe 'Session Management Tests' do
        @@patient = Patient.create(id: 1, first_name: "Sialo", last_name: "Tobiko", email: "pascalodudigbo@gmail.com", password: "1234567890" , password_confirmation: "1234567890")

        it 'allows patient to logout' do
            post :patient_login, params: { email:  @@patient.email, password:  @@patient.password }
            delete :patient_logout
            expect(response).to have_http_status(:no_content)
        end

    end

end
