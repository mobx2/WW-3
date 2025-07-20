import { useNavigate } from "react-router-dom";
import Button from "./Button";

function ButtonBack({ children }) {
  const navigate = useNavigate();

  function goBack() {
    navigate("/app/cities");
  }

  return (
    <Button onClick={goBack} type="back">
      {children}
    </Button>
  );
}

export default ButtonBack;
