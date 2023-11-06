class CreateAvailabilities < ActiveRecord::Migration[7.0]
  def change
    create_table :availabilities do |t|
      t.string :start_time
      t.string :end_time
      t.string :date
      t.references :doctor, null: false, foreign_key: true

      t.timestamps
    end
  end
end
