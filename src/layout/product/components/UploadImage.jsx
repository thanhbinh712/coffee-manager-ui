import React, { useState } from 'react';
import axios from "axios";
const UploadImage = () => {
    const [file,setFile]=useState(null);
    const onUploadImage=()=>{
        const formData = new FormData();
        formData.append("image", file);
        formData.append("product_code", "P007");
        formData.append("name", "Ép táo");
        formData.append("description", "A");
        formData.append("price", "10000");
        formData.append("types_type_code","T1");
        axios.post('http://localhost:8080/api/product', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        }).then((res)=>{
            console.log(res);
        })
    }
    return (
        <div>
            <input type="file"
             onChange={(evt) => {
                evt.preventDefault();
                console.log(evt.target.files[0]);
               setFile(evt.target.files[0])
            }}
            />
            <button onClick={onUploadImage}>Upload</button>
        </div>
    );
};

export default UploadImage;