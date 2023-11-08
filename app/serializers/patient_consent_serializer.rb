class PatientConsentSerializer < ActiveModel::Serializer
  attributes :id, :status, :created_at, :updated_at
  has_one :patient
  has_one :doctor
end
