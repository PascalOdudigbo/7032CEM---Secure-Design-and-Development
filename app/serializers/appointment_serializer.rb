class AppointmentSerializer < ActiveModel::Serializer
  attributes :id, :patient_id, :availability_id, :status
  has_one :patient
  has_one :doctor
  has_one :availability
end
