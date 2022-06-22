import { useState } from "react";

export default function Word({word:w}){
    const [word, setWord] = useState(w);
    const [isShow, setIsShow] = useState(false);
    const [isDone, setIsDone] = useState(word.isDone);

    function toggleShow(){
        setIsShow(!isShow);
    }

    function toggleDone(){
        // setIsDone(!isDone);
        fetch(`http://localhost:3001/words/${word.id}`,{
            method:'PUT',
            headers:{
                'content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...word,
                isDone: !isDone,
            }),
        }).then(res=>{
            if(res.ok){
                setIsDone(!isDone);
            }
        });
    }

    function del(){
        if(window.confirm("Do you want to remove?")){
            fetch(`http://localhost:3001/words/${word.id}`,{
                method:'DELETE'
            }).then(res=>{
                if(res.ok){
                    setWord({id:0});
                }
            });
        }
    }
    if(word.id === 0){
        return null;
    }

    return(
        <tr className={isDone ? "off": ""}>
            <td>
                <input type="checkbox" checked={isDone} onChange={toggleDone}/>
            </td>
            <td>{word.eng}</td>
            <td>{isShow && word.meaning}</td>
            <td>
                <button onClick={toggleShow}>{isShow ? 'Hide':'Show'} Meaning</button>
                <button onClick={del}className="btn_del">Remove</button>
            </td>
        </tr>
    );
}