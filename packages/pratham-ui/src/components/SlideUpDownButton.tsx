import React from 'react';
import styled from 'styled-components';

export interface SlideUpDownButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  hoverText?: string;
  hoverEmoji?: string;
  thanksText?: string;
  thanksEmoji?: string;
}

export const SlideUpDownButton: React.FC<SlideUpDownButtonProps> = ({
  hoverText = 'Hover Me',
  hoverEmoji = ':)',
  thanksText = 'Thanks',
  thanksEmoji = ':D',
  ...props
}) => {
  return (
    <StyledWrapper>
      <button {...props}>
        <div>
          <span>
            <p>{hoverText}</p><p>{hoverEmoji}</p>
          </span>
        </div>
        <div>
          <span>
            <p>{thanksText}</p><p>{thanksEmoji}</p>
          </span>
        </div>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  button {
   outline: 0;
   border: 0;
   display: flex;
   flex-direction: column;
   width: 100%;
   max-width: 140px;
   height: 50px;
   border-radius: 0.5em;
   box-shadow: 0 0.625em 1em 0 rgba(30, 143, 255, 0.35);
   overflow: hidden;
   cursor: pointer;
  }

  button div {
   transform: translateY(0px);
   width: 100%;
  }

  button,
  button div {
   transition: 0.6s cubic-bezier(.16,1,.3,1);
  }

  button div span {
   display: flex;
   align-items: center;
   justify-content: space-between;
   height: 50px;
   padding: 0.75em 1.125em;
  }

  button div:nth-child(1) {
   background-color: #1e90ff;
  }

  button div:nth-child(2) {
   background-color: #21dc62;
  }

  button:hover {
   box-shadow: 0 0.625em 1em 0 rgba(33, 220, 98, 0.35);
  }

  button:hover div {
   transform: translateY(-50px);
  }

  button p {
   font-size: 17px;
   font-weight: bold;
   color: #ffffff;
   margin: 0;
  }

  button:active {
   transform: scale(0.95);
  }`;

export default SlideUpDownButton;
