class RemovingDateAndTimeFrom < ActiveRecord::Migration[7.0]
  def change
    remove_column :appointments, :date
    remove_column :appointments, :time
  end
end
