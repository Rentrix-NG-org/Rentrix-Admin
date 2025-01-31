import React from 'react'

const NairaIcon = ({ width = "18px", height = "18px", fill = "#2E333C" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 6.75H4.5V2.25H6L8.565 6.75H12V2.25H13.5V6.75H15V8.25H13.5V9.75H15V11.25H13.5V15.75H12L9.4275 11.25H6V15.75H4.5V11.25H3V9.75H4.5V8.25H3V6.75ZM6 6.75H6.8475L6 5.2725V6.75ZM6 8.25V9.75H8.565L7.71 8.25H6ZM12 12.75V11.25H11.1375L12 12.75ZM9.42 8.25L10.2825 9.75H12V8.25H9.42Z"
        fill={fill}
      />
    </svg>
  );
};

export default NairaIcon
