class AvailabilitySerializer < ActiveModel::Serializer
  attributes :id, :start_time, :end_time, :date, :status
  has_one :doctor
end
