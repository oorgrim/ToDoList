import React, {useState} from "react";

function TodoInput({task, onSave, isEditing, onCancel}){

    const[inputValue, setInputValue] = useState(task || '');

    function handleSave(){
        if(inputValue.trim()){
            onSave(inputValue)
            setInputValue('')
        }
    }


return(

    <>
        <input 
        placeholder="write your solution"
        value={inputValue}
        onChange={((e) => setInputValue(e.target.value))}
        type="text" />
        <button onClick={handleSave}>{isEditing ? 'Save' : 'Add'}</button>
        {isEditing && <button onClick={onCancel}>Cancel</button>}
    </>
)


}
export default TodoInput;