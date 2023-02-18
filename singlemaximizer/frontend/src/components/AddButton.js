import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as AddIcon } from '../assets/add-button.svg'

const AddButton = () => {
  return (
    <Link to="/single/new" className="floating-button">
        
        <AddIcon />
    </Link>
  )
}

export default AddButton