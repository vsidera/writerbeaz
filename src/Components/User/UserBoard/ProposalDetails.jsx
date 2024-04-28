import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UserSidebar from "./UserSidebar";
import api from "../../../api/axiosConfig";
import PaymentComponent from "../../../features/PaymentComponent";
import Loader from "../../Loader";
import { setNewOrderMessage, setDisplayChat } from "../../../Redux/store";

const ProposalDetails = () => {
  const { id } = useParams();

  const [proposalDetails, setProposalDetails] = useState(null);
  const [price, setPrice] = useState(0);
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [coupons, setCoupons] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const dispatch = useDispatch();
  dispatch(setNewOrderMessage(null));

  useEffect(() => {
    const fetchProposalDetails = async () => {
      try {
        const response = await api.get(`/tutor/proposal/${id}/`);
        setProposalDetails(response.data);
        setPrice(response.data.proposal.price);
      } catch (error) {
        console.error("Error fetching proposal details:", error);
      }
    };
    if (id) {
      fetchProposalDetails().then(() => setLoading(false));
    }
    getCoupons();
  }, [id]);

  const handleAccept = async (user_id, order_number) => {
    try {
      await api.put(`/tutor/proposal/${id}/`, {
        user_id: user_id,
        order_number: order_number,
        tutor_id: proposalDetails.user_id,
        price: price,
        isAccepted: true,
        coupon: selectedCoupon,
      });
      setProposalDetails({
        ...proposalDetails,
        proposal: {
          ...proposalDetails.proposal,
          price: price,
          isAccepted: true,
        },
      });
      toast.success("Proposal accepted!");
    } catch (error) {
      console.error("Error accepting proposal:", error);
    }
  };

  const getCoupons = async () => {
    try {
      const response = await api.get("/coupons/coupon/");
      setCoupons(response.data);
    } catch (error) {
      console.error("Error fetching coupons:", error);
    }
  };

  const openNewChat = () => {
    if (proposalDetails) {
      const orderMessage = {
        order_number: proposalDetails.order_number,
        email: proposalDetails.email,
      };

      // Dispatch action to create the new chat
      dispatch(setNewOrderMessage(orderMessage));

      // Dispatch action to display the chat
      dispatch(setDisplayChat("block"));
    }
  };

  // const openNewChat = () => {
  //   const orderMessage = {
  //     order_number: proposalDetails.order_number,
  //     email: proposalDetails.email,

  //   }

  //   dispatch(setNewOrderMessage(orderMessage))
  //   dispatch(setDisplayChat('block'));

  // };

  return (
    <div>
      <UserSidebar />
      {loading ? (
        <Loader />
      ) : (
        <>
          {proposalDetails ? (
            <div className="ml-auto lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
              <h2 className="text-2xl font-bold mb-4">View proposal</h2>
              <div className="flex flex-col items-center justify-center min-h-screen ">
                <div
                  style={{ boxShadow: "0 0 2px" }}
                  className="max-w-md w-full p-6 bg-[#f6f6f6] rounded-sm "
                >
                  <>
                    <div className="text-center mb-2">
                      <p className="text-sm text-red-500">
                        During the checkout process, it's crucial to avoid
                        refreshing the page to ensure a smooth and uninterrupted
                        transaction.
                      </p>
                    </div>

                    <div className="mb-4 border-2 p-4 rounded">
                      <label
                        htmlFor="orderTitle"
                        className="block text-gray-700 text-md font-bold mb-2"
                      >
                        Proposal
                      </label>
                      <p>{proposalDetails.proposal.proposal}</p>
                      <div className="flex justify-end">
                        {new Date(
                          proposalDetails.proposal.proposalDate
                        ).toDateString()}
                      </div>
                    </div>

                    <div className="mb-4 border-2 p-4 rounded">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Tutor
                      </label>
                      <div className="flex items-center">
                        <p>{proposalDetails.proposal.username}</p>
                        <Link
                          className="text-blue-500 underline"
                          to={`/user/tutor-view/${proposalDetails.user_id}/`}
                        >
                          View Tutor
                        </Link>
                      </div>
                    </div>

                    <div className="mb-4 border-2 p-4 rounded flex items-center">
                      <div className="w-1/2">
                        <label
                          htmlFor="type"
                          className="block text-gray-700 text-sm font-bold mb-2"
                        >
                          Price
                        </label>
                        {proposalDetails.proposal.isAccepted == false ? (
                          <input
                            id="price"
                            name="price"
                            type="number"
                            value={price}
                            //onChange={(e) => setPrice(e.target.value)}
                            className="w-full px-3 py-2 border "
                            //required
                            disabled
                          />
                        ) : (
                          <p>{proposalDetails.proposal.price}</p>
                        )}
                      </div>
                      <div className="w-1/2 ml-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Order number
                        </label>
                        <div className="flex items-center">
                          <span className="text-xl font-bold">
                            {proposalDetails.order_number}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* show coupons */}
                    <div className="mb-4 border-2 p-4 rounded">
                      {/* show coupons as badges e.g <span className='bg-blue-500 text-white px-2 py-1 rounded'>5.0%</span> */}
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Coupons
                      </label>
                      <p>Click on a coupon to use it.</p>
                      <div className="flex items-center">
                        {coupons.map((coupon) => (
                          <span
                            key={coupon.id}
                            className={`text-white px-3 py-1 rounded mr-2 cursor-pointer ${
                              selectedCoupon === coupon.id
                                ? "bg-blue-500"
                                : "bg-gray-500"
                            }`}
                            onClick={() => {
                              if (selectedCoupon === coupon.id) {
                                setSelectedCoupon(null);
                                setPrice(proposalDetails.proposal.price);
                              } else {
                                setSelectedCoupon(coupon.id);
                                setPrice(
                                  proposalDetails.proposal.price -
                                    proposalDetails.proposal.price *
                                      (coupon.coupon_type.value / 100)
                                );
                              }
                            }}
                          >
                            {coupon.coupon_type.value}%{/* coupon count */}
                            <span className="rounded-full bg-white text-gray-500 px-1 ml-3">
                              {coupon.count}
                            </span>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4 border-2 p-4 rounded flex items-center">
                      <div className="w-1/2">
                        <label
                          htmlFor="orderTitle"
                          className="block text-gray-700 text-md font-bold mb-2"
                        >
                          Status
                        </label>
                        {proposalDetails.proposal.isAccepted == false ? (
                          <span className="bg-blue-500 text-white px-2 py-1 rounded">
                            Pending
                          </span>
                        ) : (
                          <span className="bg-green-500 text-white px-2 py-1 rounded">
                            Accepted
                          </span>
                        )}
                      </div>
                      <div className="w-1/2 ml-6">
                        <button
                          onClick={() => {
                            openNewChat();
                          }}
                          className="text-blue-500 underline"
                        >
                          Message Tutor
                        </button>
                      </div>
                    </div>
                  </>

                  <div className="mb-4 border-2 p-4 rounded flex justify-center">
                    {proposalDetails.proposal.isAccepted == false ? (
                      <div>
                        <PaymentComponent
                          amount={price}
                          country={"US"}
                          currency={"USD"}
                          email={user.email}
                          first_name={user.first_name}
                          last_name={user.last_name}
                          redirect_url={window.location.href}
                          publishable={process.env.REACT_APP_PUBLIC}
                          onCompleted={() =>
                            handleAccept(
                              user.user_id,
                              proposalDetails.order_number
                            )
                          }
                          onFailed={() => toast.error("Payment failed!")}
                          buttonText={"Hire Writer"}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </>
      )}
    </div>
  );
};

export default ProposalDetails;
