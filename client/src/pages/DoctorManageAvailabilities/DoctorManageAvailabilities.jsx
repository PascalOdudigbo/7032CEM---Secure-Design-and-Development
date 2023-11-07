import React, { useEffect, useState } from 'react'
import { DoctorAvailability, Dropdown } from '../../components'
import { workHours } from '../../utils/resources'
import axios from 'axios';

function DoctorManageAvailabilities({ doctorData, hideAlert, setAlertDisplay, setRequestStatus, setAlertMessage, getData, availabilities, setAvailabilities }) {
  // creating state variables to store changing data
  const [availableFrom, setAvailableFrom] = useState(workHours[0])
  const [availableTo, setAvailableTo] = useState(workHours[0]);
  const [availabilityDate, setAvailabilityDate] = useState("")
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');

  //creating a function to prevent the creating of two identical availabilities
  function preventIdenticalAvailabilities() {
    let count = 0
    availabilities?.forEach(availability => {
      //if the availability details already exist then increment count
      if (availability.date.trim() === availabilityDate.trim() && availability?.start_time === availableFrom && availability?.end_time === availableTo) {
        count += 1
      }
    })
    return count
  }

  // A function to save availability in the database
  function handleAddAvailability() {

    if (availableFrom === "Select" || availableTo === "Select" || availabilityDate === "") {
      setRequestStatus(false);
      setAlertMessage("Please set all required data!");
      setAlertDisplay("block");
      hideAlert();
    }
    else if (preventIdenticalAvailabilities() > 0) {
      setRequestStatus(false);
      setAlertMessage("Availability already exists!");
      setAlertDisplay("block");
      hideAlert();
    }
    else {
      axios.post("/availabilities", { start_time: availableFrom, end_time: availableTo, date: availabilityDate, doctor_id: doctorData?.id })
        .then(res => {
          setRequestStatus(true);
          setAlertMessage("Availability added successfully!");
          setAlertDisplay("block");
          hideAlert();
          setAvailabilities([res.data, ...availabilities])
          // getData(`/doctor-availabilities/${doctorData?.id}`, setAvailabilities)
        })
        .catch(error => {
          if (error.response) {
            setRequestStatus(false);
            setAlertMessage("Something went wrong, please try again!");
            setAlertDisplay("block");
            hideAlert();
          }
        })
    }

  }

  // A function to delete an availability
  function handelDeleteAvailability(availability) {
    axios.delete(`/availabilities/${availability?.id}`)
      .then(() => {
        setRequestStatus(true);
        setAlertMessage("Availability deleted successfully!");
        setAlertDisplay("block");
        hideAlert();
        getData(`/doctor-availabilities/${doctorData?.id}`, setAvailabilities)


      })
      .catch(error=>{
        if(error.response){
          setRequestStatus(false);
          setAlertMessage("Something went wrong, please try again!");
          setAlertDisplay("block");
          hideAlert();
        }
      })
  }


  useEffect(() => {
    // calculate today's date
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];

    // calculate 7 days from today
    const sevenDaysFromToday = new Date(today);
    sevenDaysFromToday.setDate(today.getDate() + 7);
    const formattedSevenDaysFromToday = sevenDaysFromToday.toISOString().split('T')[0];

    // setting the minimum and maxim acceptable availablity dates
    setMinDate(formattedToday);
    setMaxDate(formattedSevenDaysFromToday);

    // if the availabilities aren't loaded, load them
    availabilities.length === 0 && getData(`/doctor-availabilities/${doctorData?.id}`, setAvailabilities)



  }, [availableFrom])





  return (
    <div className='app__doctor_manage_availabilities-wrapper'>
      <h1 className='headtext__cormorant app__doctor_manage_availabilities_title'>MANAGE AVAILABILITIES</h1>

      <div className='flex__row_center_space app__doctor_manage_availabilitie_create_and_view-wrapper'>

        <div className='flex__column_center app__doctor_manage_availabilities_create_availability-wrapper'>
          <h1 className='headtext__cormorant app__doctor_manage_availabilities_create_availability_title'>CREATE AVAILABILITY</h1>

          <div className='flex__row_center_space app__doctor_manage_availabilities_dropdowns-wrapper'>
            <div className='app__doctor_manage_availabilities_label_and_dropdown-wrapper'>
              <p className='p__opensans app__doctor_manage_availabilities_label'>Start time</p>
              <Dropdown
                items={workHours}
                buttonText={availableFrom}
                clickFunction={(data) => { setAvailableFrom(data) }}
              />
            </div>

            <div className='app__doctor_manage_availabilities_label_and_dropdown-wrapper'>
              <p className='p__opensans app__doctor_manage_availabilities_label'>End time</p>
              <Dropdown
                items={["Select", ...workHours.slice(workHours.indexOf(availableFrom) + 1)]}
                buttonText={availableTo}
                clickFunction={(data) => { setAvailableTo(data) }}
              />
            </div>
          </div>

          <input className="app__doctor_manage_availabilities__create_availability_date" type="date" min={minDate} max={maxDate} onChange={(e) => { setAvailabilityDate(e.target.value) }} />


          <button className='custom__button app__doctor_manage_availabilities__create_availability_button' onClick={() => { handleAddAvailability() }}>Submit</button>

        </div>

        <div className='app__doctor_manage_availabilitie_view_availabilities-wrapper'>
          <table className="app__doctor_manage_availabilities_table">
            <thead>
              <tr className="app__doctor_manage_availabilities_table_headers-wrapper">
                <th className="p__opensans app__doctor_manage_availabilities_table_header">DATE</th>
                <th className="p__opensans app__doctor_manage_availabilities_table_header">STARTING FROM</th>
                <th className="p__opensans app__doctor_manage_availabilities_table_header">ENDING AT </th>
                <th className="p__opensans app__doctor_manage_availabilities_table_header">ACTION</th>
              </tr>
            </thead>

            <tbody>
              {availabilities?.map((availability) => (
                <DoctorAvailability
                  key={availability?.id}
                  availability={availability}
                  handleDeleteAvailability={handelDeleteAvailability}
                />
              ))}
            </tbody>

          </table>

          {availabilities?.length === 0 && <h3 className="p__opensans app__doctor_manage_availabilities_table_body_no_submissions">No availabilities</h3>}

        </div>


      </div>


    </div>
  )
}

export default DoctorManageAvailabilities
