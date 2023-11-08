require "test_helper"

class HealthRecordsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @health_record = health_records(:one)
  end

  test "should get index" do
    get health_records_url, as: :json
    assert_response :success
  end

  test "should create health_record" do
    assert_difference("HealthRecord.count") do
      post health_records_url, params: { health_record: { appointment_id: @health_record.appointment_id, doctor_id: @health_record.doctor_id, health_information: @health_record.health_information, patient_id: @health_record.patient_id } }, as: :json
    end

    assert_response :created
  end

  test "should show health_record" do
    get health_record_url(@health_record), as: :json
    assert_response :success
  end

  test "should update health_record" do
    patch health_record_url(@health_record), params: { health_record: { appointment_id: @health_record.appointment_id, doctor_id: @health_record.doctor_id, health_information: @health_record.health_information, patient_id: @health_record.patient_id } }, as: :json
    assert_response :success
  end

  test "should destroy health_record" do
    assert_difference("HealthRecord.count", -1) do
      delete health_record_url(@health_record), as: :json
    end

    assert_response :no_content
  end
end
