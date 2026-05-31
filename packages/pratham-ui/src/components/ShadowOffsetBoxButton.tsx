import React from 'react';
import styled from 'styled-components';

export interface ShadowOffsetBoxButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const ShadowOffsetBoxButton: React.FC<ShadowOffsetBoxButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <StyledWrapper>
      <div className={`box-button ${className}`} {...props}>
        <div className="button"><span>{children || 'Button'}</span></div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .box-button {
    cursor: pointer;
    border: 4px solid black;
    background-color: gray;
    padding-bottom: 10px;
    transition: 0.1s ease-in-out;
    user-select: none;
    display: inline-block;
  }

  .button {
    background-color: #dddddd;
    border: 4px solid #fff;
    padding: 6px 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .button span {
    font-size: 1.2em;
    letter-spacing: 1px;
    color: black;
    font-weight: bold;
  }

  .box-button:active {
    padding: 0;
    margin-bottom: 10px;
    transform: translateY(10px);
  }
`;

export default ShadowOffsetBoxButton;
