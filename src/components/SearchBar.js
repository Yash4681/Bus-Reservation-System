import React, { useState } from 'react'

const SearchBar = (props) => {
  const [src, setSrc] = useState("")
  const [dest, setDest] = useState("")

  const handlesrc = (e) => {
    setSrc(e.target.value);
  }
  const handledest = (e) => {
    setDest(e.target.value);
  }
  const handleClick = () => {
      return props.search(src.concat(" to ").concat(dest));
  }
  return (
    <div className='container d-flex '>
        <select className="form-select form-select-lg mb-4 mx-2" name="src" onChange={handlesrc} aria-label=".form-select-lg example">
            <option default value={"Source"}>Source</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
        </select>
        <select className="form-select form-select-lg mb-4 mx-2" name="dest" onChange={handledest} aria-label=".form-select-lg example">
            <option default value={"Destination"}>Destination</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
        </select>
        <div className="btn btn-outline-light justify-content-between align-items-start mx-2 my-2" onClick={handleClick}> 🔍</div>
    </div>
  )
}

export default SearchBar