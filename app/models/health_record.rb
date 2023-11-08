class HealthRecord < ApplicationRecord
  belongs_to :patient
  belongs_to :doctor
  belongs_to :appointment
end
