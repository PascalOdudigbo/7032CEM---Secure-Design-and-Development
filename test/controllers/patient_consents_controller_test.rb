require "test_helper"

class PatientConsentsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @patient_consent = patient_consents(:one)
  end

  test "should get index" do
    get patient_consents_url, as: :json
    assert_response :success
  end

  test "should create patient_consent" do
    assert_difference("PatientConsent.count") do
      post patient_consents_url, params: { patient_consent: { doctor_id: @patient_consent.doctor_id, patient_id: @patient_consent.patient_id, status: @patient_consent.status } }, as: :json
    end

    assert_response :created
  end

  test "should show patient_consent" do
    get patient_consent_url(@patient_consent), as: :json
    assert_response :success
  end

  test "should update patient_consent" do
    patch patient_consent_url(@patient_consent), params: { patient_consent: { doctor_id: @patient_consent.doctor_id, patient_id: @patient_consent.patient_id, status: @patient_consent.status } }, as: :json
    assert_response :success
  end

  test "should destroy patient_consent" do
    assert_difference("PatientConsent.count", -1) do
      delete patient_consent_url(@patient_consent), as: :json
    end

    assert_response :no_content
  end
end
