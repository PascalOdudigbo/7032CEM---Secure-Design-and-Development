class AddAvailabilityToAppointments < ActiveRecord::Migration[7.0]
  def change
    add_reference :appointments, :availability, null: false, foreign_key: true
  end
end
