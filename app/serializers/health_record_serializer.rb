class HealthRecordSerializer < ActiveModel::Serializer
  attributes :id, :health_information
  has_one :patient
  has_one :doctor
  has_one :appointment
end
