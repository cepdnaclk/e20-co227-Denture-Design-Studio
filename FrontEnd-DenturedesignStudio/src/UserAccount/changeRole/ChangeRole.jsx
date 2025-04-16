import "./ChangeRole.css";
import { HiX } from "react-icons/hi";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ChangeRole({ userData, cancel }) {
  const user_name = userData.user_name;
  const handleCancelrequest = async () => {
    console.log(user_name);
    await axios.put("https://e20-co227-denture-design-studio.onrender.com/student/edit", {
      user_name: user_name,
      isAssessorRequested: false,
    });
    cancel();
  };
  const handleAcceptrequest = () => {
    // Show a toast notification when the process starts
    const processingToast = toast.info("Processing request...", {
      autoClose: false, // Keep it open until process is done
      closeButton: false,
      isLoading: true, // Indicate that it's a loading process
    });

    // Set a timer in case the process takes too long
    const timeoutId = setTimeout(() => {
      toast.update(processingToast, {
        render: "The process is taking longer than expected.",
        type: toast.warning,
        isLoading: false,
        autoClose: 5000, // Auto-close after showing the warning
      });
    }, 10000); // 10-second timeout

    axios
      .post("https://e20-co227-denture-design-studio.onrender.com/student/get", {
        user_name: user_name,
      })
      .then((res) => {
        console.log(user_name);
        console.log(res.data);

        const student = res.data.student;
        if (student && student.isVerified) {
          console.log("right now");
          toast.update(processingToast, {
            render: "Request accepted successfully!",
            type: toast.success,
            isLoading: false,
            autoClose: 5000, // Auto-close success message after 5 seconds
          });

          axios
            .post("https://e20-co227-denture-design-studio.onrender.com/assessor/add", {
              user_name: user_name,
              isAssessorRequested: undefined,
              isVerified: true,
              first_name: student.first_name,
              last_name: student.last_name,
              email: student.email,
              password: student.password,
              createdAt: student.createdAt,
              lastAccessed: student.lastAccessed,
            })
            .then((res) => {
              console.log(res.data);
              return axios.delete(
                "https://e20-co227-denture-design-studio.onrender.com/student/delete",
                {
                  data: { user_name: user_name },
                }
              );
            })
            .then((res) => {
              console.log(res.data);
              return axios.delete(
                "https://e20-co227-denture-design-studio.onrender.com/progress/delete",
                {
                  data: { user_name: user_name }, // Corrected variable
                }
              );
            })
            .then((res) => {
              console.log(res.data);
              return axios.post(
                "https://e20-co227-denture-design-studio.onrender.com/assessor/accepted-assessor",
                {
                  user_name: user_name,
                }
              );
            })
            .then((res) => {
              console.log(res.data);
              cancel();
              clearTimeout(timeoutId); // Clear the timeout when process finishes
            })
            .catch((error) => {
              console.error("Error during request handling:", error);
              toast.update(processingToast, {
                render: "An error occurred during the process.",
                type: toast.error,
                isLoading: false,
                autoClose: 5000,
              });
            });
        } else {
          toast.update(processingToast, {
            render: "User not verified",
            type: toast.error,
            isLoading: false,
            autoClose: 5000,
          });
          console.log("User not verified", student);
          axios
            .post(
              "https://e20-co227-denture-design-studio.onrender.com/student/user-notverified",
              {
                user_name: user_name,
              }
            )
            .catch((error) => {
              console.error("Error posting user-notverified:", error);
              toast.update(processingToast, {
                render: "An error occurred while handling unverified user.",
                type: toast.error,
                isLoading: false,
                autoClose: 5000,
              });
            });
        }
      })
      .catch((error) => {
        console.error("Error handling accept request:", error);
        clearTimeout(timeoutId); // Clear the timeout if an error occurs
        toast.update(processingToast, {
          render: "An error occurred while accepting the request.",
          type: toast.error,
          isLoading: false,
          autoClose: 5000,
        });
      });
  };

  return (
    <>
      <div className="changeRole-overlay"></div>
      <div className="changeRole">
        <HiX onClick={() => cancel()} className="close-btn" size={"2.5vw"} />
        <h2>Change Role</h2>
        <h3>
          Are you sure you want to change student{" "}
          <span className="request-username">{userData.user_name}</span> to as
          an assessor?
        </h3>
        <button className="request-cancel-btn" onClick={handleCancelrequest}>
          Cancel request
        </button>
        <button className="request-accept-btn" onClick={handleAcceptrequest}>
          Accept request
        </button>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </>
  );
}

export default ChangeRole;
