import React from 'react';
import styled from 'styled-components';

export interface SkewFillButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export const SkewFillButton: React.FC<SkewFillButtonProps> = ({ children, ...props }) => {
  return (
    <StyledWrapper>
      <button className="button" {...props}>{children || 'Hover me'}</button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .button {
    padding: 1em 2em;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    letter-spacing: 5px;
    text-transform: uppercase;
    cursor: pointer;
    color: #2c9caf;
    transition: all 1000ms;
    font-size: 15px;
    position: relative;
    overflow: hidden;
    outline: 2px solid #2c9caf;
    background: transparent;
  }

  button:hover {
    color: #ffffff;
    transform: scale(1.1);
    outline: 2px solid #70bdca;
    box-shadow: 4px 5px 17px -4px #268391;
  }

  button::before {
    content: "";
    position: absolute;
    left: -50px;
    top: 0;
    width: 0;
    height: 100%;
    background-color: #2c9caf;
    transform: skewX(45deg);
    z-index: -1;
    transition: width 1000ms;
  }

  button:hover::before {
    width: 250%;
  }`;

export default SkewFillButton;
