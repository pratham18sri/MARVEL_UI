import React from 'react';
import styled from 'styled-components';

export interface LetsGoArrowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export const LetsGoArrowButton: React.FC<LetsGoArrowButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <StyledWrapper>
      <button className={`Btn-Container ${className}`} {...props}>
        <span className="text">{children || "let's go!"}</span>
        <span className="icon-Container">
          <svg width={16} height={19} viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="1.61321" cy="1.61321" r="1.5" fill="black" />
            <circle cx="5.73583" cy="1.61321" r="1.5" fill="black" />
            <circle cx="5.73583" cy="5.5566" r="1.5" fill="black" />
            <circle cx="9.85851" cy="5.5566" r="1.5" fill="black" />
            <circle cx="9.85851" cy="9.5" r="1.5" fill="black" />
            <circle cx="13.9811" cy="9.5" r="1.5" fill="black" />
            <circle cx="5.73583" cy="13.4434" r="1.5" fill="black" />
            <circle cx="9.85851" cy="13.4434" r="1.5" fill="black" />
            <circle cx="1.61321" cy="17.3868" r="1.5" fill="black" />
            <circle cx="5.73583" cy="17.3868" r="1.5" fill="black" />
          </svg>
        </span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .Btn-Container {
    display: flex;
    width: 170px;
    height: 48px;
    background-color: #1d2129;
    border-radius: 40px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
    justify-content: space-between;
    align-items: center;
    border: none;
    cursor: pointer;
    padding: 0 0 0 15px;
  }
  .icon-Container {
    width: 40px;
    height: 40px;
    background-color: #f59aff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 3px solid #1d2129;
    flex-shrink: 0;
  }
  .text {
    width: calc(170px - 55px);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.1em;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    font-weight: bold;
  }
  .icon-Container svg {
    transition-duration: 1.5s;
  }
  .Btn-Container:hover .icon-Container svg {
    transition-duration: 1.5s;
    animation: arrow 1s linear infinite;
  }
  @keyframes arrow {
    0% {
      opacity: 0;
      margin-left: 0px;
    }
    100% {
      opacity: 1;
      margin-left: 10px;
    }
  }
`;

export default LetsGoArrowButton;
