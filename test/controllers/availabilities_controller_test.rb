require "test_helper"

class AvailabilitiesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @availability = availabilities(:one)
  end

  test "should get index" do
    get availabilities_url, as: :json
    assert_response :success
  end

  test "should create availability" do
    assert_difference("Availability.count") do
      post availabilities_url, params: { availability: { date: @availability.date, doctor_id: @availability.doctor_id, end_time: @availability.end_time, start_time: @availability.start_time } }, as: :json
    end

    assert_response :created
  end

  test "should show availability" do
    get availability_url(@availability), as: :json
    assert_response :success
  end

  test "should update availability" do
    patch availability_url(@availability), params: { availability: { date: @availability.date, doctor_id: @availability.doctor_id, end_time: @availability.end_time, start_time: @availability.start_time } }, as: :json
    assert_response :success
  end

  test "should destroy availability" do
    assert_difference("Availability.count", -1) do
      delete availability_url(@availability), as: :json
    end

    assert_response :no_content
  end
end
