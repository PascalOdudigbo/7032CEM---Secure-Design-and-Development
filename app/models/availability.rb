class Availability < ApplicationRecord
  belongs_to :doctor
  has_one :appointment

end
