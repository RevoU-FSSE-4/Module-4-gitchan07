import React from "react";

interface InputProps {
  type: string; // text, submit, checkbox
  onChange?: (f: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

const Input: React.FC<InputProps> = ({ type, onChange, value }) => {
  return <input type={type} onChange={onChange} value={value} />;
};


export default Input;