class Appointment < ApplicationRecord
  belongs_to :patient
  belongs_to :availability
  has_one :doctor, through: :availability
end
