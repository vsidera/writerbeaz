import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TutorSidebar from '../Layout/TutorSidebar';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../api/axiosConfig';
import Loader from '../Loader';
import UserSidebar from '../User/UserBoard/UserSidebar';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setDisplayChat, setNewOrderMessage } from '../../Redux/store';
import PaymentComponent from '../../features/PaymentComponent';

// Separate ProposalForm component
const ProposalForm = ({ onSubmit, isSubmitting, priceError, proposal, setProposal, price, setPrice }) => (
  <form
    onSubmit={onSubmit}
    className="absolute mt-6 ml-8 bg-[#f6f6f6] p-4 border border-gray-300 rounded-md"
    style={{ top: '-550%', left: '16%', transform: 'translateX(-50%)', boxShadow: '0 0 10px ' }}
  >
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700"> 
        Message to client
        <textarea
          name='proposal'
          value={proposal}
          onChange={(e) => setProposal(e.target.value)}
          rows={6} // Adjust the number of rows as needed
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          required
        />
      </label>
    </div>
    
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">
        Price
        <input
          type='number'
          name='price'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          required
        />
      </label>
    </div>

    <div className="text-red-500 mb-2">{priceError}</div>

    <button
      type="submit"
      className={`${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500'
        } text-white py-2 px-4 rounded-full hover:bg-red-600 focus:outline-none`}
      disabled={isSubmitting}
    >
      {isSubmitting ? 'Submitting...' : 'Submit Proposal'}
    </button>
  </form>
);


const SubmissionFile = ({ file, removeFile, downloadFile, submitted = false }) => {
  console.log("File: ", file);
  return (
    <div className="flex flex-row justify-between items-center py-2 mb-4 w-1/2 mx-auto border rounded-lg border-2">
      <div className="flex justify-between items-center p-2 rounded-lg cursor-pointer w-full"
        onClick={() => downloadFile(file)}
      >
        <span className="text-lg font-bold mb-2">{file.split('/').pop()}</span>
      </div>
      {submitted == false && <div
        className="bg-red-500 text-white px-2 flex justify-center items-center rounded-full hover:bg-red-600 focus:outline-none w-fit -translate-y-4"
        onClick={() => removeFile(file)}
      >x</div>}

    </div>
  )

}

const Upload_files = ({ downloadFile = (s) => { }, job_id, setSubmitStatus, addFiles, status, setStatus }) => {
  const [files, setFiles] = useState([]);
  const [pStatus, setPStatus] = useState("draft");
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFiles([...files, file]);
    event.target.value = null;
  }

  const removeFile = (file) => {
    setFiles(files.filter((f) => f.name != file));
  }

  const handleFileUpload = async () => {
    const formData = new FormData();
    for (const file of files) {
      formData.append('file', file);
    }

    formData.append('status', pStatus);
    try {
      const response = await api.post('/users/upload/' + job_id + '/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      addFiles(files.map((file) => file.name));
      setSubmitStatus(response.data.status);
      setFiles([]);
    }
    catch (error) {
      console.error('Error uploading file:', error);
    }
  }

  return (
    <div>
      {files.length > 0 && (
        <>
          <p> Files to upload: </p>
          {files.map((file) => (
            <SubmissionFile file={file.name} removeFile={removeFile} downloadFile={downloadFile} />
          ))}
        </>
      )}

      <div className="flex flex-col items-center py-2 mb-4 w-1/2 mx-auto border rounded-lg border-2">
        <label className="block text-sm font-medium text-gray-700">
          Select file to upload
        </label>
        <input
          type='file'
          name='file'
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          onChange={handleFileChange}
        />
      </div>
      <div className="flex flex-col items-center py-2 mb-4 w-1/2 mx-auto">
        <label className="block text-sm font-medium text-gray-700">
          Select submission status
        </label>
        <select
          name="status"
          id='submit-status'
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          onChange={(e) => setPStatus(e.target.value)}
          required
        >
          <option value="draft">Draft</option>
          <option value="submitted">Final</option>
        </select>
      </div>
      <div className="w-1/2 flex justify-center mx-auto">
        <button
          className="bg-[goldenrod] text-white px-4 py-1 flex justify-center items-center rounded focus:outline-none w-fit"
          onClick={handleFileUpload}
        >Upload</button>
      </div>
    </div>
  )
}

const Submission = ({ submission_status, submission_files, job_id, is_user }) => {
  const [status, setStatus] = useState(submission_status);
  const [files, setFiles] = useState([...submission_files]);
  const span_style = () => {
    if (status == "submitted") {
      return "text-white bg-green-500 rounded px-4 py-2";
    } else if (status == "draft") {
      return "text-white bg-yellow-500 rounded px-4 py-2";
    } else if (status == "not submitted") {
      return "text-white bg-red-500 rounded px-4 py-2";
    } else if (status == "approved") {
      return "text-white bg-blue-500 rounded px-4 py-2";
    }
    return "text-white bg-red-500 rounded px-4 py-2";
  }

  const downloadFile = async (url) => {
    const response = await fetch(url, { responseType: 'blob' });
    const blob = await response.blob();
    const downloadUrl = URL.createObjectURL(blob);
    window.open(downloadUrl);
  }

  const removeFile = (file) => {
    setFiles(files.filter((f) => f != file));
  }

  const addFiles = (added_files) => {
    console.log("Added files: ", added_files);
    setFiles([...files, ...added_files]);
  }

  const show_upload = () => {
    if (is_user == true) {
      return false;
    }
    if (submission_status == "submitted") {
      return true;
    }
    return true;
  }

  return (
    <div className="mt-4">
      <div className='w-full md:w-1/2 mx-auto flex justify-between items-center mb-4'>
        Submission status <span className={span_style()}>{status}</span>
      </div>
      {files.length > 0 && (
        files.map((file) => (
          <SubmissionFile file={file} removeFile={removeFile} downloadFile={downloadFile} submitted={true} />
        ))
      )}
      {show_upload() == true ? (
        <Upload_files job_id={job_id} setSubmitStatus={setStatus} addFiles={addFiles} status={status} setStatus={setStatus} />
      ) : (
        <div></div>
      )}

    </div>
  )
}

const UserActions = ({ userActions, jobDetails, submissionStatus, setUserActions, setJobDetails }) => {
  const [submitting, setSubmitting] = useState(false);
  console.log("User actions: ", userActions)
  const cancel = () => {
    api.post(`/users/job-order/cancel/${jobDetails.id}/`)
      .then((response) => {
        setUserActions([]);
        setJobDetails({ ...response.data });
        toast.success("Job cancelled successfully!");
      })
      .catch((error) => {
        toast.error("Error cancelling request.\nPlease try again!");
      })
  }

  const accept = () => {
    setSubmitting(true);
    api.post(`/users/job-order/complete/`, {
      order_id: jobDetails.id,
    }).then((response) => {
      setUserActions([]);
      delete response.data.submission_files;
      setJobDetails({ ...response.data });
      setSubmitting(false);
      toast.success("Job completed successfully!");
    })
      .catch((error) => {
        toast.error("Error completing request.\nPlease try again!");
        setSubmitting(false);
      })
  }

  if (userActions == null || userActions.length == 0) {
    return (
      <div></div>
    )
  }

  const showAccept = () => {
    if (submissionStatus.toLowerCase() != "submitted") {
      return false;
    }
    return userActions.includes("accept");
  }

  return (
    <div className="flex flex-row justify-around items-center py-2 mb-4 w-full md:w-1/2 mx-auto border rounded-lg border-2 flex-wrap">
      {userActions.includes("edit") == true &&
        <Link
          to={`/user/post-job`}
          state={{ jobDetails: jobDetails }}
        >
          <div
            className="bg-blue-500 text-white px-4 py-1 flex justify-center items-center rounded focus:outline-none w-fit cursor-pointer"
          >Edit</div>
        </Link>}
      {userActions.includes("cancel") == true && <div
        className="bg-red-500 text-white px-4 py-1 flex justify-center items-center rounded focus:outline-none w-fit cursor-pointer mt-4"
        onClick={cancel}
      >Cancel</div>}
      {showAccept() == true && <div
        className="bg-green-500 text-white px-4 py-1 flex justify-center items-center rounded focus:outline-none w-fit cursor-pointer mt-4"
        onClick={submitting == true ? null : accept}
      >
        {submitting ? "Processing..." : "Accept & release payment"}
      </div>}
      {
        userActions.includes("upload files") == true && <Link
          to={`/user/post-job`}
          state={{
            jobDetails: jobDetails,
            upload: true,
          }}
        >
          <div
            className="bg-blue-500 text-white px-4 py-1 flex justify-center items-center rounded focus:outline-none w-fit cursor-pointer mt-4"
          >Upload files</div>
        </Link>

      }
    </div>
  )
}

const JobDetails = () => {
  const { jobId } = useParams();
  const { state } = useLocation();
  const [jobDetails, setJobDetails] = useState({});
  const [from, setFrom] = useState(state?.from);
  const [fetched, setFetched] = useState(false);
  const [submission_files, setSubmissionFiles] = useState([]);
  const [isProposalSubmitted, setProposalSubmitted] = useState(false);
  const [showProposalForm, setShowProposalForm] = useState(false);
  const [priceError, setPriceError] = useState('');
  const user = useSelector(state => state.user);
  console.log("User: ", user.user_type);
  const [propSubmitted, setPropSubmitted] = useState(false);
  const dispatch = useDispatch();

  const [userActions, setUserActions] = useState(state?.userActions);

  const navigate = useNavigate();

  console.log("User actions: ", userActions);

  useEffect(() => {
    // If the job details are not passed in the location state, fetch them
    const fetchJobDetails = async () => {
      try {
        const response = await api.get(`/users/job-order/${jobId}/`)
        setSubmissionFiles(response.data.submission_files);
        //remove key submission_files from response.data
        delete response.data.submission_files;
        setJobDetails(response.data);
        setPropSubmitted(user.user_id == response.data.tutor);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };
    if (!fetched) {
      fetchJobDetails().then(() => {
        setFetched(true);
      });
    }
  }, []);

  const [proposal, setProposal] = useState({
    price: '',
    proposal: '',
  });

  const proposalSubmitted = () => {
    if (jobDetails.tutor == user.user_id) {
      return true;
    }
    return false;
  }

  const showSub = () => {
    return proposalSubmitted() || user.user_id == jobDetails.user;
  }

  const Sidebar = () => {
    if (user.user_type == "Tutor") {
      return <TutorSidebar />;
    }
    return <UserSidebar />;
  }

  const show_files = () => {
    if (!fetched) {
      return false;
    }
    if (jobDetails.tutor == user.user_id) {
      return true;
    }
    if (jobDetails.user == user.user_id) {
      return true;
    }
    return false;
  }

  const isValidPrice = (value) => /^[1-9]\d*$/.test(value);

  const showTip = () => {
    //show tip if the user is the client and the tutor is not null and order status is not cancelled
    if (user.user_id == jobDetails.user && jobDetails.tutor != null && jobDetails.status != "cancelled") {
      return true;
    }

    return false;
  }

  const handleProposalSubmission = async (event) => {
    event.preventDefault();

    // Validate the price input to allow only positive integers starting from 1
    if (!isValidPrice(event.target.price.value)) {
      setPriceError('Price must be a positive number.');
      return;
    }

    // Clear any previous price error
    setPriceError('');
    console.log(jobDetails);

    try {
      // Assuming you have an API endpoint to handle proposal submission
      const response = await api.post('/tutor/proposal/', {
        job_id: jobDetails.id,
        username: user.username,
        price: event.target.price.value,
        proposal: event.target.proposal.value,
        isAccepted: false,
      });

      console.log('Proposal submitted:', response.data);

      // Set the flag to indicate that the proposal is submitted
      setProposalSubmitted(true);

      // Redirect to /tutor/bids on successful submission
      navigate('/tutor/bids');
    } catch (error) {
      console.error('Error submitting proposal:', error);
    }
  };

  const downloadFile = async (url) => {
    const response = await fetch(url, { responseType: 'blob' });
    const blob = await response.blob();
    const downloadUrl = URL.createObjectURL(blob);
    window.open(downloadUrl);
  }

  if (!fetched) {
    return (
      <div>
        <Sidebar />
        <Loader />
      </div>
    )
  }

  return (
    <div>
      <Sidebar />
      <div className={`ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] px-8 ${isProposalSubmitted ? '' : ''}`}>
        <h1 className="text-3xl font-bold mb-4">Job Details</h1>
        <div className='flex justify-between flex-wrap'>
          <div className='w-full lg:w-1/2'>
            {jobDetails ? (
              <div className={`job-details ${isProposalSubmitted ? '' : ''}`}>
                {Object.entries(jobDetails).map(([key, value]) => (
                  <>
                    {key == "user_email" || key == "tutor_email" ? (
                      <></>
                    ) : (
                      <p key={key} className="mb-2">
                        <span className="font-bold">{key.replace(/([a-z])([A-Z])/g, '$1 $2')}:</span>
                        {key === 'files' ? (
                          // display a list of filenames color blue text, underlined, and clickable
                          <span>

                            {value == null ? "No files" : (
                              value.map((file) => (
                                <span key={file}>
                                  <span
                                    className="text-blue-500 hover:underline cursor-pointer"
                                    onClick={() => downloadFile(file)}
                                  >
                                    {file.split('/').pop()}
                                  </span>
                                  <br />
                                </span>
                              ))
                            )}
                          </span>
                        ) : (
                          <span>{" "}

                            {value == null ? "null" : value.toString()}
                          </span>
                        )}
                      </p>
                    )}
                  </>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No job details available.</p>
            )}

            {user.user_type == "Tutor" && <div className="relative">
              <button
                className={`${proposalSubmitted() || showProposalForm ? 'bg-[black] ' : 'bg-red-500'
                  } text-white py-2 px-4 rounded-full mt-4 hover:bg-red-600 focus:outline-none relative`}
                onClick={() => setShowProposalForm(!showProposalForm)}
              >
                {proposalSubmitted() ? 'Bid Submitted' : showProposalForm ? 'X' : 'Submit Bid'}
              </button>

              {showProposalForm && (
                <ProposalForm
                  onSubmit={handleProposalSubmission}
                  isSubmitting={isProposalSubmitted}
                  priceError={priceError}
                  proposal={proposal}
                  setProposal={setProposal}
                />
              )}
            </div>
            }

            {proposalSubmitted() && (
              <p className="mt-4 text-green-600">
                Proposal submitted!
              </p>
            )}
          </div>
          {showSub() && (
            <div className='w-full lg:w-1/2'>
              <div className='w-full mx-auto text-center'>
                <h2 className="text-2xl font-bold mb-4">Files</h2>
              </div>

              {show_files() == true &&
                <Submission
                  submission_status={jobDetails.submission_status}
                  job_id={jobDetails.id} submission_files={submission_files}
                  is_user={jobDetails.user == user.user_id}
                />
              }
              <UserActions userActions={userActions} setUserActions={setUserActions} jobDetails={jobDetails} setJobDetails={setJobDetails} submissionStatus={jobDetails.submission_status} />
              {showTip() &&
                <div className='flex justify-center mb-4'>
                  <PaymentComponent
                    country={"US"}
                    currency={"USD"}
                    email={user.email}
                    first_name={user.first_name}
                    last_name={user.last_name}
                    redirect_url={window.location.href}
                    publishable={process.env.REACT_APP_PUBLIC}
                    onCompleted={() => toast.success('Transaction was successful!')}
                    onFailed={() => toast.error('Payment failed!')}
                    buttonText={"Tip Writer"}
                  />
                </div>
              }
              {user.user_id == jobDetails.tutor &&
                <div className='flex w-fit mx-auto justify-center border-2 rounded-md px-6 py-2'>
                  <button
                    onClick={() => {
                      dispatch(setNewOrderMessage({
                        order_number: jobDetails.order_number,
                        email: jobDetails.user_email,
                      }));
                      dispatch(setDisplayChat('block'));
                    }}
                    className="text-blue-500 underline"
                  >
                    Message client
                  </button>

                </div>
              }
              {user.user_id == jobDetails.user && jobDetails.tutor != null &&
                <div className='flex w-fit mx-auto justify-center border-2 rounded-md px-6 py-2'>
                  <button
                    onClick={() => {
                      dispatch(setNewOrderMessage({
                        order_number: jobDetails.order_number,
                        email: jobDetails.tutor_email,
                      }));
                      dispatch(setDisplayChat('block'));
                    }}
                    className="text-blue-500 underline"
                  >
                    Message Tutor
                  </button>
                </div>
              }

            </div>
          )}
        </div>
      </div>
    </div>
  )
};

export default JobDetails;
