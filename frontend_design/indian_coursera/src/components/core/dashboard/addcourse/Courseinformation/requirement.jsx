import { useEffect } from "react";
import { useState } from "react";

function Requirementfield({name,label,register,errors,setValue,getValues}){
    const [requirement,setrequirement] = useState("");
    const [requirementlist,setrequirementlist] = useState([]);
    const handleaddition = ()=>{
        if(requirement){
            setrequirementlist([...requirementlist,requirement]);
            setrequirement("");
        }
    }
    const handleremove = (index)=>{
        const updatedrequirementlist = [...requirementlist];
        updatedrequirementlist.splice(index,1);
        setrequirementlist(updatedrequirementlist);
    }
    useEffect(()=>{
        register(name,{
            required:true,
        },[])
    })
    useEffect(() => {
    setValue(name, requirementlist)
}, [requirementlist])
    return(
       <div>
        <label htmlFor={name}>
            {label}<sup>*</sup>
        </label>
        <div>
            <input type="text" id={name} value={requirement} onChange={(e)=>setrequirement(e.target.value)} className="w-full"></input>
            <button type="button" onClick={handleaddition} className="font-semibold text-yellow-400">add</button>

        </div>
        {
            requirementlist.length>0 && (
                <ul>
                    {
                        requirementlist.map((requirement,index)=>(
                            <li key={index} className="flex items-center">
                                <span>{requirement}</span>
                                <button
                                type="button"
                                onClick={()=>handleremove(index)}
                                className="text-xs text-black"
                                >clear</button>
                            </li>
                        ))
                    }
                </ul>
            )
        }
         {errors[name]&&(
        <span>{label} is required</span>
       )}
       </div>
      
    )
}
export default Requirementfield;