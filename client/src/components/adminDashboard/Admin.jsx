import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import IssuesForm from "./IssuesForm";
import { MdClose } from "react-icons/md";

const Admin = ({ user }) => {
  const [errors, setErrors] = useState({});

  const [dataIssues, setDataIssues] = useState([]);

  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [viewSection, setViewSection] = useState(false);

  const [users, setUsers] = useState({}); //To store the users as an object with IDs as keys

  const [formData, setFormData] = useState({
    title: "",
    customerName: "",
    description: "",
    mobileNumber: "",
    email: "",
    issueType: "", 
    status: "open", 
    user: "", 
    assignedTo: "",
    remarks:"",
  });

  const [formDataEdit, setFormDataEdit] = useState({
    title: "",
    customerName: "",
    description: "",
    mobileNumber: "",
    email: "",
    issueType: "", // Set default value
    status: "", // Set default value
    _id: "",
    user: "", // Initially empty
    remarks:"",
  });

  const [formDataView, setFormDataView] = useState({
    title: "",
    customerName: "",
    description: "",
    mobileNumber: "",
    email: "",
    issueType: "",
    status: "",
    _id: "",
    assignedTo:"",
    user: "",
    remarks:"",
  });

  const fetchData = async () => {
    const response = await axios.get("/api/issues/getAllIssues");
    if (response) {
      setDataIssues(response.data.issues);
    }
  };

  const fetchUsers = async () => {
    const response = await axios.get("/api/user/getUsers");
    // console.log(response);
    if (response) {
      const usersObj = response.data.users.reduce((acc, user) => {
        acc[user._id] = user;
        return acc;
      }, {});
      setUsers(usersObj);
    }
  };

  useEffect(() => {
    fetchData();
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const data = await axios.delete("/api/issues/deleteIssue/" + id);
    if (data.data.success) {
      toast.success(data.data.message);
      fetchData();
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
    //validating inputs
    validateInput(name, value);
  };

  const validateInput = (name, value) => {
    let error = "";
    // Regular expression to allow only alphabetic characters (a-z, A-Z)
    //  const regex = /^[A-Za-z]+$/;
    const regex = /^[A-Za-z\s]+$/;
    switch (name) {
      case "title":
        if (value.length === 0) {
          error = "Title is required";
        }else if (!regex.test(value)) {
          error = "Title should not contain special characters or numbers";
        } else if (value.length < 8) {
          error = "Title must be atleast 8 characters.";
        } 
        break;
      case "email":
        if (value.length === 0) {
          error = "Email is required";
        }else if (!/^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
          error = "Invalid email address.";
        }
        break;
      case "customerName":
        if(value.length === 0){
          error = "customer name is required";
        }else if (!regex.test(value)) {
          error =
            "customer name should not contain special characters or numbers";
        }else if (value.length < 8) {
          error = "customer name should be atleast 8 characters";
        } 
        break;
      case "mobileNumber":
        if(value.length === 0){
          error = "mobile number is required";
        }else if (!/^\d{10}$/.test(value)) {
          error = "Invalid mobile number.";
        }
        break;
      case "description":
        if(value.length === 0){
          error = "Description is required";
        }else if(!regex.test(value)){
          error = "Description should not contain special characters";
        }
        break;
      case "assignedTo":
        if(value.length === 0){
          error = "select Developer to assign"
        }
        break;
      case "status":
        if(value.length === 0){
          error = "set the issue status";
        }
        break;
      case "issueType":
        if(value.length === 0){
          error = "select the issue type";
        }
        break;

      case "remarks":
        if(value.length === 0){
          error = "Add remarks";
        }
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
    return error;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate all form fields before submission
    const fields = ["title", "email", "customerName", "mobileNumber","description","issueType","status","assignedTo","remarks"];
    let hasErrors = false;

    fields.forEach((field) => {
      const error = validateInput(field, formData[field]);
      if (error) {
        hasErrors = true;
      }
    });

    // If there are errors, do not submit the form
    if (hasErrors) {
      return;
    }
    const response = await axios.post(
      `/api/issues/createIssue?userId=${user._id}`,
      formData
    );
    if (response) {
      setAddSection(false);
      fetchData();
      setFormData({
        title: "",
        customerName: "",
        description: "",
        mobileNumber: "",
        email: "",
        issueType: "", 
        status: "", 
        user: "", 
        assignedTo: "",
        remarks:"",
      });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.put("/api/issues/updateIssue", formDataEdit);
      console.log(data);
      if (data) {
        setEditSection(false);
        fetchData();
      }
    } catch (error) {
      console.error("Error while updating issue:", error);
    }
  };

  const handleEditOnChange = (e) => {
    const { value, name } = e.target;
    setFormDataEdit((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleEdit = (data) => {
    setFormDataEdit(data);
    setEditSection(true);
  };

  const handleView = (data) => {
    // console.log(users[data.assignedTo]?.username);
    setFormDataView(data);
    setViewSection(true);
  };

  return (
    <>
      <div className="p-5">
        <button onClick={() => setAddSection(true)} className="p-2 bg-blue-200">
          Add issue
        </button>
        {addSection && (
          <IssuesForm
            handleSubmit={handleSubmit}
            handleOnChange={handleOnChange}
            handleClose={() => setAddSection(false)}
            rest={formData}
            users={Object.values(users)}
            errors={errors}
          />
        )}
        {editSection && (
          <IssuesForm
            handleSubmit={handleUpdate}
            handleOnChange={handleEditOnChange}
            handleClose={() => setEditSection(false)}
            rest={formDataEdit}
            users={Object.values(users)}
            errors={errors}
          />
        )}

        {viewSection && (
          <IssueView
            handleClose={() => setViewSection(false)}
            rest={formDataView}
            users={Object.values(users)}
          />
        )}
      </div>
      <div className="p-5 h-screen bg-gray-100">
        <h1 className="text-xl mb-2">Issues: </h1>
        <div className="overflow-auto rounded-lg shadow">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                  Issue Title
                </th>
                <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                  Customer Name
                </th>
                <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                  Email
                </th>
                <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                  Mobile Number
                </th>
                <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                  Assigned To
                </th>
                <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                  Status
                </th>
                {/* <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                  Remarks
                </th> */}
                <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">

                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {dataIssues.length > 0 ? (
                dataIssues.map((data) => (
                  <tr className="bg-white" key={data._id}>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {data.title}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {data.customerName}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {data.email}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {data.mobileNumber}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {users[data.assignedTo]?.username || "Unassigned"}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-yellow-800 bg-green-200 rounded-lg bg-opacity-50">
                        {data.status}
                      </span>
                    </td>
                    {/* <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {data.remarks}
                    </td> */}
                    <td className="p-3 text-sm whitespace-nowrap">
                      <button
                        onClick={() => handleView(data)}
                        className="p-2 m-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors "
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleEdit(data)}
                        className="p-2 m-2 bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors "
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(data._id)}
                        className="p-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors "
                      >
                        Delete
                      </button>
                    </td>
                    
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No Data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

const IssueView = ({ rest, handleClose ,users}) => {
  return (
    <div className="mt-10 p-3 max-w-lg mx-auto">
      <div
        style={{ cursor: "pointer", fontSize: "22px" }}
        onClick={handleClose}
      >
        <MdClose className="close-button" />
      </div>
      <div className="issue-details">
        <h2 className="text-3xl text-center mb-3 font-bold my-7">
          Issue Details
        </h2>
        <p>
          <strong>Title:</strong> {rest.title}
        </p>
        <p>
          <strong>Customer Name:</strong> {rest.customerName}
        </p>
        <p>
          <strong>Description:</strong> {rest.description}
        </p>
        <p>
          <strong>Mobile Number:</strong> {rest.mobileNumber}
        </p>
        <p>
          <strong>Email:</strong> {rest.email}
        </p>
        <p>
          <strong>Status:</strong> {rest.status}
        </p>
        <p>
          <strong>Issue Type: </strong> {rest.issueType}{" "}
        </p>
        <p>
          <strong>Remarks: </strong> {rest.remarks}{" "}
        </p>

      </div>
    </div>
  );
};

export default Admin;
