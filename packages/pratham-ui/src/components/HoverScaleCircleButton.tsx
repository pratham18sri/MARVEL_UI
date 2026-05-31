import React from 'react';
import styled from 'styled-components';

export interface HoverScaleCircleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export const HoverScaleCircleButton: React.FC<HoverScaleCircleButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <StyledWrapper>
      <button className={`button type1 ${className}`} {...props}>
        <span className="btn-txt">{children || 'Hello'}</span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .button {
    height: 50px;
    width: 200px;
    position: relative;
    background-color: transparent;
    cursor: pointer;
    border: 2px solid #252525;
    overflow: hidden;
    border-radius: 30px;
    color: #333;
    transition: all 0.5s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .btn-txt {
    z-index: 1;
    font-weight: 800;
    letter-spacing: 4px;
    color: #333;
    transition: color 0.5s ease-in-out;
  }

  .button:hover .btn-txt {
    color: #fff;
  }

  .type1::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    transition: all 0.5s ease-in-out;
    background-color: #333;
    border-radius: 30px;
    visibility: hidden;
    height: 10px;
    width: 10px;
    z-index: -1;
  }

  .button:hover {
    box-shadow: 1px 1px 200px #252525;
    border: none;
  }

  .type1:hover::after {
    visibility: visible;
    transform: scale(100) translateX(2px);
  }
`;

export default HoverScaleCircleButton;
