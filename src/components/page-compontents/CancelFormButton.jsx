import { useNavigate } from "react-router-dom";


function CancelFormButton() {
    const navigate = useNavigate();
  return (
    <button type="button" className="text-mygreen-500 roboto-medium border-2 border-mygreen-100 rounded-md w-24 h-10 " onClick={(e) => {e.preventDefault(); navigate(-1);}}>Cancel</button>
  )
}

export default CancelFormButton