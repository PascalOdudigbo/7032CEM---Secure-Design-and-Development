Rails.application.routes.draw do
  resources :patient_consents
  resources :health_records
  resources :appointments
  resources :availabilities
  resources :doctors
  resources :patients
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  post '/patient-login', to: 'patients#patient_login'
  get '/patient-loggedin', to: 'patients#patient_loggedin'
  delete '/patient-logout', to: 'patients#patient_logout'
  get '/patient-multi-authed', to: 'patients#is_patient_multi_authed'
  patch '/change-patient-multi-auth', to: 'patients#change_patient_multi_auth'
  get '/patient-appointments/:patient_id', to: 'appointments#get_patient_appointments'
  get '/a_patient_consents/:patient_id', to: 'patient_consents#get_a_patient_consents'


  post '/doctor-login', to: 'doctors#doctor_login'
  get '/doctor-loggedin', to: 'doctors#doctor_loggedin'
  delete '/doctor-logout', to: 'doctors#doctor_logout'
  get '/doctor-multi-authed', to: 'doctors#is_doctor_multi_authed'
  patch '/change-doctor-multi-auth', to: 'doctors#change_doctor_multi_auth'
  get '/doctor-availabilities/:doctor_id', to: 'availabilities#get_doctor_availabilities'
  get '/doctors-specialties', to: 'doctors#get_specialties'
  get '/doctor-appointments/:doctor_id', to: 'appointments#get_doctor_appointments'
  get '/doctor-patients/:doctor_id', to: 'doctors#get_doctor_patients'




end
