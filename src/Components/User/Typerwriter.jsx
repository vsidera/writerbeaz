import React from "react";
import styled from "styled-components";
import Typewriter from "typewriter-effect";

const TypeWriterText = () => {
  return (
    <>
      <Title>
        <Typewriter
          options={{
            autoStart: true,
            loop: true,
            delay: 50,
            deleteSpeed: 50,
          }}
          onInit={(typewriter) => {
            typewriter
              .typeString(`<span class="text-1">  Welcome to WriterBeaz</span>`)
              .pauseFor(2000)
              .deleteAll()
              .typeString(`<span class="text-1">We provide excellence in every assignment`)
              .pauseFor(2000)
              .deleteAll()
              .typeString(`<span class="text-1">From essays to research papers, we've got you covered`)
              .pauseFor(2000)
              .deleteAll()
              .typeString(`<span class="text-1">Unlock your academic success with us`)
              .pauseFor(2000)
              .deleteAll()
              .typeString(`<span class="text-1">Login or sign up to start</span>`)
              .pauseFor(2000)
              // You can continue adding more texts here in the same manner
              .deleteAll()
              .start();
          }}
        />
      </Title>
    </>
  );
};

const Title = styled.h2`
  font-size: 40px;
  font-weight: 300;
  width: 100%;
  align-self: flex-start;

  span {
    font-family: monospace;
  }

  .text {
    &-1 {
      color: black;
    }
    &-2 {
      color: black;
    }
    &-3 {
      color: black;
    }
  }

  @media (max-width: 70em) {
    font-size: ${(props) => props.theme.fontxl};
  }

  @media (max-width: 48em) {
    align-self: center;
    text-align: center;
    font-size: 32px; /* Adjust font size for smaller screens */
  }

  @media (max-width: 40em) {
    width: 90%;
    font-size: 24px; /* Adjust font size for smaller screens */
  }
`;

export default TypeWriterText;
