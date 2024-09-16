import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import IssuesForm from "./IssuesForm";
import { MdClose } from "react-icons/md";

const Admin = ({ user }) => {
  const [dataIssues, setDataIssues] = useState([]);

  const [addSection,setAddSection] = useState(false);
  const [editSection,setEditSection] = useState(false);
  const [viewSection,setViewSection] = useState(false);

  const [users,setUsers] = useState({}); //To store the users as an object with IDs as keys

  const [formData,setFormData] = useState({
    title : "",
    customerName:"",
    description:"",
    mobileNumber:"",
    email :"",
    issueType:"",  
    status:"open", 
    user :"", 
    assignedTo:"",
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
    user: "",
  });



  const fetchData = async () => {
    const userId = user?._id;
    const response = await axios.get(`/api/issues/developerIssues?userId=${userId}`);
    if (response) {
      setDataIssues(response.data.issues);
    }
  };

  const fetchUsers = async () => {
    const response = await axios.get("/api/user/getUsers");
    // console.log(response);
    if(response){
      const usersObj = response.data.users.reduce((acc,user) => {
          acc[user._id] = user;
          return acc;
      },{});
      setUsers(usersObj);
    }
  }

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
    const {name,value} = e.target;
    setFormData((previous)=> ({
      ...previous,
      [name]:value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(`/api/issues/createIssue?userId=${user._id}`, formData);
    if (response) {
      setAddSection(false);
      fetchData();
      setFormData({
        title: "",
        customerName: "",
        description: "",
        mobileNumber: "",
        email: "",
        issueType: "normal", 
        status: "open", 
        user: "", 
        assignedTo:"",
      });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.put("/api/issues/updateIssue", formDataEdit);
    //   console.log(data);
      if (data) {
        setEditSection(false);
        fetchData();
      }
    } catch (error) {
      console.error("Error while updating issue:", error);
      // Handle error state or notify user accordingly
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
    setFormDataView(data);
    setViewSection(true);
  };



 

  return (
    <>
    {/* <div className="p-5"> */}
      {/* <button onClick={() => setAddSection(true)}
      className="p-2 bg-blue-200">Add issue</button>
      {addSection && (
        <IssuesForm
          handleSubmit={handleSubmit}
          handleOnChange={handleOnChange}
          handleClose={() => setAddSection(false)}
          rest={formData}
          users = {Object.values(users)}
         />
      )} */}
      {
        editSection && (
          <IssuesForm 
              handleSubmit={handleUpdate}
              handleOnChange={handleEditOnChange}
              handleClose={() => setEditSection(false)}
              rest={formDataEdit}
              users={Object.values(users)}
          />
        )
      }

      {
        viewSection && (
          <IssueView handleClose={() => setViewSection(false)}
          rest ={formDataView} users = {Object.values(users)}
          />
        )
      }

    {/* </div> */}
      <div className="p-5 h-screen bg-gray-100 mt-3">
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
                    
                    <td className="p-3 text-sm whitespace-nowrap">
                      <button 
                        onClick={() => handleView(data)}
                        className="p-2 m-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ">
                        View
                      </button>
                      <button
                        onClick={() => handleEdit(data)}
                       className="p-2 m-2 bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors ">
                        Edit
                      </button>
                      {/* <button
                        onClick={() => handleDelete(data._id)}
                        className="p-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors "
                      >
                        Delete
                      </button> */}
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

const IssueView = ({rest,handleClose}) => {
  return (
    
    <div className="mt-10 p-3 max-w-lg mx-auto">
      <div style={{cursor:"pointer", fontSize:"22px"}} onClick={handleClose}>
        <MdClose className="close-button" />
      </div>
      <div className="issue-details">
        <h2 className="text-3xl text-center mb-3 font-bold my-7">Issue Details</h2>
        <p><strong>Title:</strong> {rest.title}</p>
        <p><strong>Customer Name:</strong> {rest.customerName}</p>
        <p><strong>Description:</strong> {rest.description}</p>
        <p><strong>Mobile Number:</strong> {rest.mobileNumber}</p>
        <p><strong>Email:</strong> {rest.email}</p>
        <p><strong>Status:</strong> {rest.status}</p>
        <p><strong>Issue Type: </strong> {rest.issueType} </p>
        {/* Display assigned user's name */}
        <p><strong>Assigned To: </strong>{rest.assignedTo || "not yet assigned"}</p>
        <p><strong>Remarks: </strong>{rest.remarks || ""}</p>
      </div>
    </div>
  );
}

export default Admin;
