require "test_helper"

class DoctorsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @doctor = doctors(:one)
  end

  test "should get index" do
    get doctors_url, as: :json
    assert_response :success
  end

  test "should create doctor" do
    assert_difference("Doctor.count") do
      post doctors_url, params: { doctor: { email: @doctor.email, first_name: @doctor.first_name, last_name: @doctor.last_name, password_digest: @doctor.password_digest, specialty: @doctor.specialty } }, as: :json
    end

    assert_response :created
  end

  test "should show doctor" do
    get doctor_url(@doctor), as: :json
    assert_response :success
  end

  test "should update doctor" do
    patch doctor_url(@doctor), params: { doctor: { email: @doctor.email, first_name: @doctor.first_name, last_name: @doctor.last_name, password_digest: @doctor.password_digest, specialty: @doctor.specialty } }, as: :json
    assert_response :success
  end

  test "should destroy doctor" do
    assert_difference("Doctor.count", -1) do
      delete doctor_url(@doctor), as: :json
    end

    assert_response :no_content
  end
end
