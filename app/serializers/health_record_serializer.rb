class HealthRecordSerializer < ActiveModel::Serializer
  attributes :id, :health_information, :patient_id, :doctor_id, :appointment_id, :created_at, :updated_at
  has_one :patient
  has_one :doctor
  has_one :appointment
end
