class AvailabilitySerializer < ActiveModel::Serializer
  attributes :id, :start_time, :end_time, :date
  has_one :doctor
end
