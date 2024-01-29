import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import formData from './formData';
import { useSelector } from 'react-redux'; // Import the useSelector hook
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import api from '../../../api/axiosConfig';

const JobForm = ({ jobDetails = null, edit, upload }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [measure, setMeasure] = useState("pages");
  const [uploadedFiles, setUploadedFiles] = useState([]); // New state for uploaded files
  console.log(upload)

  const [submitting, setSubmitting] = useState(false);

  const user = useSelector(state => state.user);

  const [orderDetails, setOrderDetails] = useState({
    orderTitle: '',
    subject: '',
    type: '',
    service: '',
    pages: '',
    citation: '',
    spacing: '',
    educationLevel: '',
    sources: '',
    language: '',
    instructions: '',
    dueDate: '',
    // Add user information to the orderDetails object
    userId: user ? user.user_id : null,
  });

  useEffect(() => {
    if (jobDetails) {
      setOrderDetails({
        ...orderDetails,
        orderTitle: jobDetails.orderTitle,
        subject: jobDetails.subject,
        type: jobDetails.type,
        service: jobDetails.service,
        pages: jobDetails.pages,
        citation: jobDetails.citation,
        spacing: jobDetails.spacing,
        educationLevel: jobDetails.educationLevel,
        sources: jobDetails.sources,
        language: jobDetails.language,
        instructions: jobDetails.instructions,
        dueDate: new Date(jobDetails.dueDate).toISOString().slice(0, 16),
        files: jobDetails.files,
      })
      if(upload){
        setCurrentStep(4);
      }
      setUploadedFiles(jobDetails.files.map((file) => {
        return {
          name: file.split('/').pop(),
        }
      }))
    }
    console.log(uploadedFiles);
  }, [jobDetails])


  const handleInputChange = (e) => {
    setOrderDetails({
      ...orderDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    if (edit) {
      handleEdit();
      return;
    }
    setSubmitting(true);

    // console.log('Submitting form...', orderDetails);

    try {
      // orderDetails.files = uploadedFiles;
      // console.log('Submitting form...', orderDetails);
      const form = new FormData();
      for (const key in orderDetails) {
        form.append(key, orderDetails[key]);
      }

      for (const file of uploadedFiles) {
        form.append('file', file);
      }

      await api.post('/users/job-order/', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        },
      });

      toast.success('Order placed successfully., Writers will start bidding soon! Go to "My bids" section to view the bids.', { duration: 10000 });
      navigate('/user/orders');
    } catch (error) {
      console.error('Submission Error:', error);

      toast.error('Error submitting order. Please try again.');
      setSubmitting(false);
    }
  };

  const checkLoggedIn = () => {

    handleNextStep();

  };

  const handleNextStep = () => {
    const form = document.querySelector('form');
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    e.target.value = null; // Clear the input
    setUploadedFiles([...uploadedFiles, file]); // Add files to the uploadedFiles array state
  };

  const removeUploadedFile = (file) => {
    if (file.lastModified) {
      return;
    }
    console.log("Removing file", file);
    api.delete(`/users/job-order/remove/?file=${file.name}`);
  }

  const handleEdit = () => {
    setSubmitting(true);
    const form = new FormData();
    for (const key in orderDetails) {
      form.append(key, orderDetails[key]);
    }


    for (const file of uploadedFiles) {
      if (!file.lastModified) {
        continue;
      }
      form.append('file', file);
    }
    //log form data
    for (var pair of form.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }


    api.put(`/users/job-order/${jobDetails.id}/`, form, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
      },
    })
      .then((resp) => {
        toast.success('Order successfully updated!');
        navigate('/user/orders');
      })
      .catch((err) => {
        console.error('Error updating order:', err);
        toast.error('Error updating order. Please try again.');
        setSubmitting(false);
      });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <form style={{ boxShadow: '0 0 2px' }} onSubmit={handleSubmit} className="max-w-md w-full p-6 bg-[#f6f6f6] rounded-sm ">
        {currentStep === 1 && (
          <>
            <div className="mb-4">
              <label htmlFor="orderTitle" className="block text-gray-700 text-sm font-bold mb-2">1. Order Title</label>
              <input
                type="text"
                id="orderTitle"
                name="orderTitle"
                value={orderDetails.orderTitle}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border "
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="subject" className="block text-gray-700 text-sm font-bold mb-2">2. Subject</label>
              <select
                id="subject"
                name="subject"
                value={orderDetails.subject}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border "
                required
              >
                <option value="">Select Subject</option>
                {formData.subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="type" className="block text-gray-700 text-sm font-bold mb-2">3. Type</label>
              <select
                id="type"
                name="type"
                value={orderDetails.type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border "
                required
              >
                <option value="">Select Type</option>
                {formData.assignmentTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="service" className="block text-gray-700 text-sm font-bold mb-2">4. Service</label>
              <select
                id="service"
                name="service"
                value={orderDetails.service}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border "
                required
              >
                <option value="">Select Service</option>
                {formData.services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        {currentStep === 2 && (
          <>
            <div className="mb-4">
              <label htmlFor="pages" className="block text-gray-700 text-sm font-bold mb-2">1. Pages or words</label>
              <select
                id="measure"
                name="measure"
                value={measure}
                onChange={(e) => setMeasure(e.target.value)}
                className="w-1/2 px-3 py-2 border "
                required
              >
                <option value="">Select Pages or word count</option>
                <option value="pages">Pages</option>
                <option value="words">Words</option>
              </select>
              <input
                type="number"
                id="pages"
                name="pages"
                value={orderDetails.pages}
                onChange={handleInputChange}
                min="0"
                max="1000"
                className="w-1/2 px-3 py-2 border "
                required
              />
            </div>




            <div className="mb-4">
              <label htmlFor="citation" className="block text-gray-700 text-sm font-bold mb-2">2. Citation</label>
              <select
                id="citation"
                name="citation"
                value={orderDetails.citation}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              >
                <option value="">Select Citation</option>
                <option value="APA">APA</option>
                <option value="MLA">MLA</option>
                <option value="Chicago">Chicago</option>
                <option value="Harvard">Harvard</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="spacing" className="block text-gray-700 text-sm font-bold mb-2">3. Spacing</label>
              <select
                id="spacing"
                name="spacing"
                value={orderDetails.spacing}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border "
                required
              >
                <option value="">Select Spacing</option>
                {formData.spacingOptions.map((spacing) => (
                  <option key={spacing} value={spacing}>
                    {spacing}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="educationLevel" className="block text-gray-700 text-sm font-bold mb-2">4. Educational Level</label>
              <select
                id="educationLevel"
                name="educationLevel"
                value={orderDetails.educationLevel}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border "
                required
              >
                <option value="">Select Educational Level</option>
                {formData.educationLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        {currentStep === 3 && (
          <>
            <div className="mb-4">
              <label htmlFor="sources" className="block text-gray-700 text-sm font-bold mb-2">1. No of Sources</label>
              <input
                type="number"
                id="sources"
                name="sources"
                value={orderDetails.sources}
                onChange={handleInputChange}
                min="0"
                max="1000"
                className="w-full px-3 py-2 border "
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="language" className="block text-gray-700 text-sm font-bold mb-2">2. Language</label>
              <select
                id="language"
                name="language"
                value={orderDetails.language}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border "
                required
              >
                <option value="">Select Language</option>
                {formData.languages.map((language) => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="instructions" className="block text-gray-700 text-sm font-bold mb-2">3. Instructions</label>
              <textarea
                id="instructions"
                name="instructions"
                value={orderDetails.instructions}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border "
                rows="4"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="dueDate" className="block text-gray-700 text-sm font-bold mb-2">4. Due Date</label>
              <input
                type="datetime-local"
                id="dueDate"
                name="dueDate"
                value={orderDetails.dueDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border "
                required
              />
            </div>
          </>
        )}

        {currentStep === 4 && (
          <>
            <div className="mb-4">
              <div>
                {uploadedFiles.map((file, ind) => (
                  <div key={ind} className="flex items-center justify-between mb-4 border-2 p-4 rounded">
                    <span>{file.name}</span>
                    <span
                      type="button"
                      onClick={() => {
                        if (edit) {
                          removeUploadedFile(file);
                        }
                        setUploadedFiles(uploadedFiles.filter((f) => f.name !== file.name))
                      }}
                      className="bg-red-500 text-white px-2 rounded-full cursor-pointer"
                    >
                      x
                    </span>
                  </div>
                ))
                }
              </div>
              <label htmlFor="uploadOrder" className="block text-gray-700 text-sm font-bold mb-2">Upload Order</label>
              <input
                type="file"
                id="uploadOrder"
                name="uploadOrder"
                onChange={handleFileUpload}
                className="w-full px-3 py-2 border "
              />
            </div>
          </>
        )}

        <div className="flex justify-between">
          {currentStep > 1 && (
            <button
              type="button"
              className="bg-[black] text-white px-4 py-2 rounded-md focus:outline-none focus:shadow-outline-blue"
              onClick={() => setCurrentStep(currentStep - 1)}
              disabled={submitting}
            >
              Previous
            </button>
          )}

          {currentStep < 4 ? (
            <input type="button" className="bg-[goldenrod] text-white px-4 py-2 rounded-md focus:outline-none focus:shadow-outline-green" onClick={checkLoggedIn} value={"Next step"} />
          ) : (
            <button disabled={submitting} style={submitting == true ? { opacity: 0.2 } : { boxShadow: "0 0 5px" }} type="submit" className="bg-[yellow] text-black px-4 py-2 rounded-md focus:outline-none focus:shadow-outline-indigo">
              {submitting ? 'Submitting...' : 'Submit'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default JobForm;
