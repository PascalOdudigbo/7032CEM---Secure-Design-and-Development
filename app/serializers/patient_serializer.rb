class PatientSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :verification_status
  has_many :appointments
  has_many :doctors
  has_many :health_records
  has_many :patient_consents
end
