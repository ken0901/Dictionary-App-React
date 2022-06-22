import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

export default function CreateWord(){
    const days = useFetch("http://localhost:3001/days");
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    function onSubmit(e){
        e.preventDefault();

        if(!isLoading){
            setIsLoading(true);
            fetch(`http://localhost:3001/words/`,{
                method:'POST',
                headers:{
                    'content-Type': 'application/json',
                },
                body: JSON.stringify({
                    day:dayRef.current.value,
                    eng:engRef.current.value,
                    meaning:meaningRef.current.value,
                    isDone: false,
                }),
            }).then(res=>{
                if(res.ok){
                    alert('Successfully Saved');
                    navigate(`/day/${dayRef.current.value}`);
                    setIsLoading(false);
                }
            });
        }
    }

    const engRef = useRef(null);
    const meaningRef = useRef(null);
    const dayRef = useRef(null);

    return(
        <form onSubmit={onSubmit}>
            <div className="input_area">
                <label>English</label>
                <input type="text" placeholder="computer" ref={engRef}/>
            </div>
            <div className="input_area">
                <label>Meaning</label>
                <input type="text" placeholder="It means ..." ref={meaningRef}/>
            </div>
            <div className="input_area">
                <label>Day</label>
                <select ref={dayRef}>
                    {days.map(day=>(
                        <option key={day.id} value={day.day}>{day.day}</option>
                    ))}
                </select>
            </div>
            <button
                style={{
                    opacity: isLoading ? 0.3 : 1,
                }}
            >
                {isLoading ? "Saving..." : "Save"}</button>
        </form>
    );
}