class DoctorSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :specialty

  has_many :availabilities
  has_many :appointments
  has_many :patients
  has_many :health_records
end
