import React, { useEffect } from "react";

const PaymentComponent = ({
  publishable,
  redirect_url,
  amount,
  email,
  first_name,
  last_name,
  currency,
  country,
  onCompleted,
  onFailed,
  buttonText,
}) => {
  useEffect(() => {
    const intaSendScript = document.createElement("script");
    intaSendScript.src =
      "https://unpkg.com/intasend-inlinejs-sdk@3.0.4/build/intasend-inline.js";
    intaSendScript.async = true;
    document.head.appendChild(intaSendScript);

    intaSendScript.onload = () => {
      const intaSendInstance = new window.IntaSend({
        // Replace with your Publishable Key
        publicAPIKey: publishable,
        redirectURL: redirect_url,
        live: true, // set to true when going live
      });

      intaSendInstance
        .on("COMPLETE", (results) =>
          // console.log("Do something on success", results)
          onCompleted()
        )
        .on("FAILED", (results) =>
          // console.log("Do something on failure", results)
          onFailed()
        )
        .on("IN-PROGRESS", (results) =>
          console.log("Payment in progress status", results)
        );
    };

    return () => {
      // Cleanup script when the component is unmounted
      document.head.removeChild(intaSendScript);
    };
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  const buttonStyles = {
    background: "#2cc1ee",
    borderRadius: "3px",
    border: "1px solid #2cc1ee",
    color: "#fff",
    height: "34px",
  };

  const buttonHoverStyles = {
    cursor: "pointer",
  };

  return (
    <div>
      <button
        className="intaSendPayButton"
        data-method="CARD-PAYMENT"
        data-amount={amount}
        data-currency={currency}
        data-email={email}
        data-first_name={first_name}
        data-last_name={last_name}
        data-country={country}
        style={buttonStyles}
        onMouseOver={(e) => e.currentTarget.style = { ...buttonStyles, ...buttonHoverStyles }}
        onMouseOut={(e) => e.currentTarget.style = buttonStyles}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default PaymentComponent;
