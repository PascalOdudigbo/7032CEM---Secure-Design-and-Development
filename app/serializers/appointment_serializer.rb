class AppointmentSerializer < ActiveModel::Serializer
  attributes :id, :patient_id, :availability_id, :status, :created_at, :updated_at
  has_one :patient
  has_one :doctor
  has_one :availability
end
