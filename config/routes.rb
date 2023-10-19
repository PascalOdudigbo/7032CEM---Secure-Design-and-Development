Rails.application.routes.draw do
  resources :doctors
  resources :patients
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  post '/patient-login', to: 'patients#patient_login'
  get '/patient-loggedin', to: 'patients#patient_loggedin'
  delete '/patient-logout', to: 'patients#patient_logout'


  post '/doctor-login', to: 'doctors#doctor_login'
  get '/doctor-loggedin', to: 'doctors#doctor_loggedin'
  delete '/doctor-logout', to: 'doctors#doctor_logout'


end
