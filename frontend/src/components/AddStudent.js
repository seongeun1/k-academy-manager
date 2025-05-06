import { useEffect, useState } from "react";



function AddStudent() {
  //1) form state for fields
  const [form, setForm] = useState({
    std_nm: "",
    bday: "",
    phone: "",
  });
  const[message, setMessage] = useState(null);

  //2) update form state on each input change
  const handleChange = (e) => {
    setForm(prev => ({
        ...prev,
        [e.target.name]: e.target.value
    }));
  }

  //3) submit handler : POST to /students
  const handleAdd = () => {
    //basic validation
    if (!form.std_nm || !form.bday || !form.phone) {
        setMessage("Please fill in all fields.");
        return;
    }

    fetch("http://127.0.0.1:5000/students", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(form)
    })
    .then(respond => respond.json())
    .then(data=>{
        //console.log("API returned:", data);
        if (data.success) {
            alert(data.message)

            setForm({ std_nm:"", phone:"", bday:"" });
        }
        else {
            setMessage(`Data ${message}`);
        }
    })
    .catch(error=>{
        console.error(error);
        setMessage("Failed to add new student");
    })


  }



  // useEffect(()=> {
  //   fetch("http://127.0.0.1:5000/students/00001")
  //   .then((response) => response.json())
  //   .then((data) => {
  //     if (data.success) {
  //       setStudent(data.data);
  //     } else {
  //       console.error(data.message)
  //     }
  //   })
  // })

  return (
    <div style={{ padding: "2rem" }}>
        <h2>Add New Student Information</h2>

        <div className="form-row">
            <label htmlFor="name">Name : </label>
            <input
                name = "std_nm"
                value = {form.std_nm}
                onChange = {handleChange}
                placeholder="Enter the StudentName"
            />
        </div>
        <div className="form-row">
            <label htmlFor="phone">Phone Number : </label>
            <input
                name = "phone"
                value = {form.phone}
                onChange = {handleChange}
                placeholder="Enter the phone number"
            />
        </div>
        <div className="form-row">
            <label htmlFor="bday">Birthday : </label>
            <input
                name = "bday"
                value = {form.bday}
                onChange = {handleChange}
                placeholder="Enter the Birthday"
            />


            
        </div>


        <button onClick={handleAdd}>Add</button>

        {message}
 
    </div>
  );
}

export default AddStudent;
