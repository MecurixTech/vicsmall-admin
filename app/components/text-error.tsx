interface TextErrorProps {
  message: string; 
}

const TextError = ({ message }: TextErrorProps) => {
  return <p className="text-red-500">{message}</p>;
};

export default TextError;
