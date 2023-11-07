class AddingStatusToAppointments < ActiveRecord::Migration[7.0]
  def change
    add_column :availabilities, :status, :string, null: true
  end
end
