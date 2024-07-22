import React, { useEffect, useState } from "react";
import "../css/EmployeeList.css";
import axios from "axios";

const EmployeeList = () => {
  const [fdata, setFdata] = useState([]);
  const [filteruser, setFilteruser] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [dataList, setDataList] = useState({
    _id: "",
    image: "",
    name: "",
    email: "",
    phone: "",
    position: "",
    gender: "",
    qualification: "",
    dob: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000");
        setFdata(response.data);
        setFilteruser(response.data);
        console.log("Data fetched:", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (e) => {
    const searchText = e.target.value.toLowerCase();
    const filterUsrs = fdata.filter((user) =>
      user.name.toLowerCase().includes(searchText)
    );
    setFilteruser(filterUsrs);
  };

  const handleDelete = async (id) => {
    const response = await axios.delete(`http://localhost:3000/${id}`);
    setFdata(response.data);
    setFilteruser(response.data);
  };

  const handleCreate = () => {
    setDataList({
      _id: "",
      image: "",
      name: "",
      email: "",
      phone: "",
      position: "",
      gender: "",
      qualification: "",
      dob: "",
    });
    setIsEdit(false);
    setIsOpen(true);
  };

  const handleEdit = (employee) => {
    setDataList(employee);
    setIsEdit(true);
    setIsOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataList((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const { _id, image, dob, ...restData } = dataList;

      const dataToSend = {
        ...restData,
        id: _id || new Date().getTime(),
        image: image || "default-image-url.png", // Provide default image URL
        dob: dob || new Date().toISOString(), // Provide default dob if not filled
      };

      if (!isEdit) {
        await axios.post("http://localhost:3000", dataToSend);
      } else {
        await axios.put(`http://localhost:3000/${_id}`, dataToSend);
      }

      const response = await axios.get("http://localhost:3000");
      setFdata(response.data);
      setFilteruser(response.data);
      setIsOpen(false);
      console.log("Data saved:", response.data);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };


// const handleSave = async () => {
//   try {
//     const { _id, image, dob, ...restData } = dataList;

//     if (!isEdit) {
//       if (!_id || !image || !dob) {
//         alert("Please fill all required fields");
//         return;
//       }
//       await axios.post("http://localhost:3000", {
//         ...restData,
//         image: image || "default-image-url.png", // Provide default image URL
//         dob: dob || new Date().toISOString(), // Provide default dob if not filled
//       });
//     } else {
//       await axios.put(`http://localhost:3000/${_id}`, {
//         ...restData,
//         image,
//         dob,
//       });
//     }

//     const response = await axios.get("http://localhost:3000");
//     setFdata(response.data);
//     setFilteruser(response.data);
//     setIsOpen(false);
//     console.log("Data saved:", response.data);
//   } catch (error) {
//     console.error("Error saving data:", error);
//   }
// };


return (
  <>
    <h1 className="empL">Employee List</h1>
    <div className="lNave">
      <p>Total Count: {fdata.length}</p>
      <button className="createEm" onClick={handleCreate}>
        Create Employee
      </button>
    </div>
    <div className="search">
      <input
        type="search"
        name="search"
        placeholder="Search Your Data...."
        onChange={handleSearch}
      />
    </div>
    <div className="tableHolder">
      <table>
        <thead>
          <tr>
            <th>Unique ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile No</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Create Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteruser.map((datas) => (
            <tr key={datas._id}>
              <td>{datas._id}</td>
              <td>
                <img
                  src={datas.image || "default-image-url.png"}
                  alt={datas.name}
                />
              </td>
              <td>{datas.name}</td>
              <td>{datas.email}</td>
              <td>{datas.phone}</td>
              <td>{datas.position}</td>
              <td>{datas.gender}</td>
              <td>{datas.qualification}</td>
              <td>{new Date(datas.dob).toLocaleDateString()}</td>
              <td className="fbtns">
                <button onClick={() => handleEdit(datas)}>Edit</button>
                <button onClick={() => handleDelete(datas._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isOpen && (
        <div className="outer">
          <div className="main">
            <div className="out">
              <h1>{isEdit ? "Edit User" : "Add User"}</h1>
              <span onClick={() => setIsOpen(false)} className="close">
                &times;
              </span>
            </div>
            <div className="inputs">
              {/* <label htmlFor="idL">Id</label>
              <input
                type="text"
                id="idL"
                name="_id"
                value={dataList._id}
                onChange={handleChange}
                disabled={isEdit}
              /> */}
              <label htmlFor="image">Image</label>
              <input
                type="text"
                id="image"
                name="image"
                value={dataList.image}
                onChange={handleChange}
              />
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={dataList.name}
                onChange={handleChange}
              />
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                value={dataList.email}
                onChange={handleChange}
              />
              <label htmlFor="number">Number</label>
              <input
                type="number"
                min="10"
                id="number"
                name="phone"
                value={dataList.phone}
                onChange={handleChange}
              />
              <label htmlFor="Position">Position</label>
              <input
                type="text"
                id="Position"
                name="position"
                value={dataList.position}
                onChange={handleChange}
              />
              <label htmlFor="male">Male</label>
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                checked={dataList.gender === "male"}
                onChange={handleChange}
              />
              <label htmlFor="female">Female</label>
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                checked={dataList.gender === "female"}
                onChange={handleChange}
              />
              <label htmlFor="qualification">Qualification</label>
              <input
                type="text"
                id="qualification"
                name="qualification"
                value={dataList.qualification}
                onChange={handleChange}
              />
              <label htmlFor="dob">Date of Birth</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={dataList.dob}
                onChange={handleChange}
              />
              <button className="saveBtn" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  </>
);
};

export default EmployeeList;




