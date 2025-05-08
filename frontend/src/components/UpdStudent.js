import { useEffect, useState } from "react";



function UpdStudent() {
  //1) form state for fields
  
  const [form, setForm] = useState({
    std_no: "",
    std_nm: "",
    bday: "",
    phone: "",
  });

  const[message, setMessage] = useState(null);

  //2) update form state on each input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("raw vale :", name, value);
    const newValue =
      name === "bday"
        ? value.replace(/-/g, "")   // correct spelling
        : value;    
    
    console.log("after filtering :",name, newValue);
    setForm(prev => ({
        ...prev,
        [name] : newValue,
    }));
  }

  //3) submit handler : PATCH to /students
  const handleUpd = () => {
    if (!form.std_no) {
        setMessage("Please Enter a student number to update");
        return;
    }
    
    fetch(`http://127.0.0.1:5000/students/${form.std_no}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(form)
    })
    .then(respond => respond.json())
    .then(data => {
        if (data.success) {
            alert(data.message)

            setForm({ std_no:"", std_nm:"", phone:"", bday:"" });
            setMessage("");
        }
        else {
            setMessage(`Data ${data.message}`);
        }
    })
    .catch(error=>{
        console.error(error);
        setMessage(`Failed to upd new student ${error.message || error}`);
    })


  }



  return (
    <div style={{ padding: "2rem" }}>
        <h2>Update Student Information</h2>

        <div className="form-row">
            <label htmlFor="std_no">Student No : </label>
            <input
                name = "std_no"
                value = {form.std_no}
                onChange = {handleChange}
                placeholder="Enter the StudentNumber"
            />
        </div>
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
                type="date"
                name = "bday"
                value={form.bday.length === 8
                ? `${form.bday.slice(0,4)}-${form.bday.slice(4,6)}-${form.bday.slice(6)}`
                : form.bday}
                onChange = {handleChange}
                placeholder="Enter the Birthday"
            />


            
        </div>


        <button onClick={handleUpd}>Upd</button>

        {message}
 
    </div>
  );
}

export default UpdStudent;
