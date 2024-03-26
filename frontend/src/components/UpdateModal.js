import React, { useState } from 'react';

const UpdateModal = ({ show, handleClose, handleUpdate, formData, handleInputChange }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleClose}>&times;</span>
        <h2>Update Classroom</h2>
        <form onSubmit={handleUpdate}>
          <input type="text" name="classNumber" value={formData.classNumber} onChange={handleInputChange} />
          <input type="text" name="capacity" value={formData.capacity} onChange={handleInputChange} />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;
