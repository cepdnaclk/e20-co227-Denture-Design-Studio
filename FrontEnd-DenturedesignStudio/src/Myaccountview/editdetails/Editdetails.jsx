import "./Editdetails.css";

function Editdetails({ userdata }) {
  console.log("hi");
  return (
    <div>
      <div className="edit-details">
        <h1>Edit your Details here !</h1>
        <h2>Edit your First name:</h2>
        <input type="text" value={userdata.first_name} />
        <h2>Edit your Last name:</h2>
        <input type="text" value={userdata.last_name} />
        <h2>Edit your User name:</h2>
        <input type="text" value={userdata.user_name} />
      </div>
    </div>
  );
}
export default Editdetails;
