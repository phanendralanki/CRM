import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Admin = ({ user }) => {
  const [dataIssues, setDataIssues] = useState([]);

  const fetchData = async () => {
    const response = await axios.get("/api/issues/getAllIssues");
    if (response) {
      setDataIssues(response.data.issues);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const data = await axios.delete("/api/issues/deleteIssue/" + id);
    if (data.data.success) {
      toast.success(data.data.message);
      fetchData();
    }
  };

  

 

  return (
    <>
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
                <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left"></th>
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
                      unassigned
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-yellow-800 bg-green-200 rounded-lg bg-opacity-50">
                        {data.status}
                      </span>
                    </td>
                    <td className="p-3 text-sm whitespace-nowrap">
                      <button className="p-2 m-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ">
                        View
                      </button>
                      <button className="p-2 m-2 bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors ">
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

export default Admin;
