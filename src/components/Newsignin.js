import React, { useState } from 'react';

const SignupForm = () => {
  const [image, setImage] = useState(null); // Correct useState initialization

  const submitImage = () => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'Travell');
    data.append('cloud_name', 'dfsl9zcrt');

    fetch('https://api.cloudinary.com/v1_1/dfsl9zcrt/image/upload', {
      method: 'POST',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data); // You can store or display the response URL here if needed
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])} // Set the selected file
      />
      <button onClick={submitImage}>Upload Image</button>
    </div>
  );
};

export default SignupForm;
