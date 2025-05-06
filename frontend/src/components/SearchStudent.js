import { useEffect, useState } from "react";

function SearchStudent() {
  const [std_no, setStd_no ] = useState(""); //입력값
  const [student, setStudent] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    if (!std_no.trim()) {
      setError("Enter the Student Number");
      return;
    }
  

    fetch(`http://127.0.0.1:5000/students/${std_no}`)
    .then((respond) => respond.json())
    .then((data) => {
      if (data.success) {
        setStudent(data.data);
        setError(null);
      }
      else {
        setStudent(null);
        setError(data.message);
      }
    })
    .catch(() => {
      setStudent(null);
      setError("API REQUEST FAILURE");

    })
  };
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
      <h1>Search Student Information</h1>
      <input
        type="test"
        placeholder="Enter the StudentNumber"
        value={std_no}
        onChange={(e) => setStd_no(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {student && (
        <ul>
          <li>이름: {student.std_nm}</li>
          <li>전화번호: {student.phone}</li>
          <li>생년월일: {student.bday}</li>
          <li>등록일: {student.erol_dt}</li>
        </ul>
      )}
    </div>
  );
}

export default SearchStudent;
