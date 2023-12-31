# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_11_08_092233) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "appointments", force: :cascade do |t|
    t.bigint "patient_id", null: false
    t.string "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "availability_id", null: false
    t.index ["availability_id"], name: "index_appointments_on_availability_id"
    t.index ["patient_id"], name: "index_appointments_on_patient_id"
  end

  create_table "availabilities", force: :cascade do |t|
    t.string "start_time"
    t.string "end_time"
    t.string "date"
    t.bigint "doctor_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "status"
    t.index ["doctor_id"], name: "index_availabilities_on_doctor_id"
  end

  create_table "doctors", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "password_digest"
    t.string "specialty"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "health_records", force: :cascade do |t|
    t.bigint "patient_id", null: false
    t.bigint "doctor_id", null: false
    t.bigint "appointment_id", null: false
    t.string "health_information"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["appointment_id"], name: "index_health_records_on_appointment_id"
    t.index ["doctor_id"], name: "index_health_records_on_doctor_id"
    t.index ["patient_id"], name: "index_health_records_on_patient_id"
  end

  create_table "patient_consents", force: :cascade do |t|
    t.bigint "patient_id", null: false
    t.bigint "doctor_id", null: false
    t.string "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["doctor_id"], name: "index_patient_consents_on_doctor_id"
    t.index ["patient_id"], name: "index_patient_consents_on_patient_id"
  end

  create_table "patients", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "password_digest"
    t.boolean "verification_status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "appointments", "availabilities"
  add_foreign_key "appointments", "patients"
  add_foreign_key "availabilities", "doctors"
  add_foreign_key "health_records", "appointments"
  add_foreign_key "health_records", "doctors"
  add_foreign_key "health_records", "patients"
  add_foreign_key "patient_consents", "doctors"
  add_foreign_key "patient_consents", "patients"
end
