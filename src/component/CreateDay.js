import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

export default function CreateDay(){
    const days = useFetch("http://localhost:3001/days");
    const navigate = useNavigate();
    function addDay(){
        fetch(`http://localhost:3001/days/`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                day:days.length+1
            }),
        }).then(res =>{
            if(res.ok){
                alert("Successfully Added");
                navigate(`/`);
            }
        });
    }
    return(
        <div>
            <h3>How Many Days: {days.length} days</h3>
            <button onClick={addDay}>Add</button>
        </div>
    );
}