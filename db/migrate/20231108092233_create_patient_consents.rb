class CreatePatientConsents < ActiveRecord::Migration[7.0]
  def change
    create_table :patient_consents do |t|
      t.references :patient, null: false, foreign_key: true
      t.references :doctor, null: false, foreign_key: true
      t.string :status

      t.timestamps
    end
  end
end
