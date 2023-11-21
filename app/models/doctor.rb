class Doctor < ApplicationRecord
    # ensuring passwords are hashed using bcrypt
    has_secure_password
    #ensuring doctor has all the required fields
    validates :first_name, presence: true, on: :create
    validates :last_name, presence: true, on: :create
    validates :specialty, presence: true, on: :create
    # ensuring password is between 8 to 16 characters long
    validates :password, presence: true, length: { in: 8..16 }, on: :create
    # ensuring all doctor emails are unique
    validates :email, presence: true, uniqueness: true, on: :create, format: { with: URI::MailTo::EMAIL_REGEXP }

    has_many :availabilities
    has_many :appointments, :through => :availabilities
    has_many :patients, -> { group(:id) }, through: :appointments
    has_many :health_records
    has_many :patient_consents

end
