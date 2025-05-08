import { useEffect, useState } from "react";

function RemoveStudent() {
  const [std_no, setStd_no ] = useState(""); //입력값
  const[message, setMessage] = useState(null);

  const handleSearch = () => {
    if (!std_no.trim()) {
      setMessage("Enter the Student Number");
      return;
    }
  

    fetch(`http://127.0.0.1:5000/students/${std_no}`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(std_no)
  })
    .then((respond) => respond.json())
    .then((data) => {
      if (data.success) {
        console.info("성공?")
        alert(data.message)
      }
      else {
        console.info("실패?")
        alert(data.message)
      }
    })
    .catch(() => {

      setMessage("API REQUEST FAILURE");

    })
  };


  return (
    <div style={{ padding: "2rem" }}>
      <h1>Remove Student Information</h1>
      <input
        type="test"
        placeholder="Enter the StudentNumber"
        value={std_no}
        onChange={(e) => setStd_no(e.target.value)}
      />
      <button onClick={handleSearch}>Remove</button>

    </div>
  );
}

export default RemoveStudent;
