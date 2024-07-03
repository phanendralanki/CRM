import { MdClose } from "react-icons/md";

const Form = ({ handleSubmit, handleOnChange, handleClose, rest, users }) => {
  return (
    <>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-bold my-7">Add issue</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div style={{cursor:"pointer"}} onClick={handleClose}>
          <MdClose />
        </div>
          <input
            onChange={handleOnChange}
            type="text"
            placeholder="Issue Title"
            id="title"
            className="bg-slate-100 p-3 rounded-lg"
            name="title"
            value={rest.title}
            required
          />
          <input
            onChange={handleOnChange}
            type="text"
            placeholder="Customer Name"
            id="customerName"
            className="bg-slate-100 p-3 rounded-lg"
            name="customerName"
            value={rest.customerName}
            required
          />
          <input
            onChange={handleOnChange}
            type="email"
            placeholder="Email"
            id="email"
            name="email"
            className="bg-slate-100 p-3 rounded-lg"
            required
            value={rest.email}
          />
          <input
            onChange={handleOnChange}
            type="text"
            placeholder="mobile Number"
            id="mobileNumber"
            name="mobileNumber"
            className="bg-slate-100 p-3 rounded-lg"
            value={rest.mobileNumber}
            required
          />
          <input
            onChange={handleOnChange}
            type="text"
            placeholder="Description"
            id="description"
            className="bg-slate-100 p-3 rounded-lg"
            value={rest.description}
            name="description"
            required
          />

          <select
            className="bg-slate-100 p-3 rounded-lg"
            aria-label="Default select example"
            id="issueType"
            name="issueType"
            value={rest.issueType}
            onChange={handleOnChange}
            required
          >
           <option value="" >Issue Type</option>
            <option value="urgent_request">Urgent Request</option>
            <option value="minor_issue">Minor Issue</option>
            <option value="major_issue">Major Issue</option>
            <option value="normal">Normal</option>
          </select>


          <select
            className="bg-slate-100 p-3 rounded-lg"
            aria-label="Default select example"
            value={rest.status}
            onChange={handleOnChange}
            name="status"
            id="status"
            required
          >
            <option value="">Select status</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>

          {/* <select
            id="user"
            aria-label="Default select example"
            className="bg-slate-100 p-3 rounded-lg"
            name="assignedTo"
            onChange={handleOnChange}
            value={rest.user}
            required
          >
           
            {users
            .filter(user => user.role === "developer")
            .map((user) => (
              <option key={user._id} value={user._id}>
                {user.username}
              </option>
            ))}
          </select> */}

          
          <button
          className="bg-slate-700
          text-white p-3 rounded-lg 
          uppercase hover:opacity-90 
          disabled:opacity-80"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Form;
