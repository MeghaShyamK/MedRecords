import { useState, useEffect } from "react";
// import axios from "axios";
import "./UserLogin.css";
// const UserLogin = ({ contract, account, provider }) => {
//   const [file, setFile] = useState(null);
//   const [fileName, setFileName] = useState("No image selected");
// //   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (file) {
//       try {
//         const formData = new FormData();
//         formData.append("file", file);

//         const resFile = await axios({
//           method: "post",
//           url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
//           data: formData,
//           headers: {
//             pinata_api_key: `c0206602ad77a6343af6`,
//             pinata_secret_api_key: `5c0b577402bfffcee07d471bb0a6000e3f43340184a355cc63885cf49272b929`,
//             "Content-Type": "multipart/form-data",
//           },
//         });
//         const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
//         //const signer = contract.connect(provider.getSigner());
//         const signer = contract.connect(provider.getSigner());
//         signer.add(account, ImgHash);
//       } catch (e) {
//         alert("Unable to upload image to Pinata");
//       }
//     }
//     alert("Successfully Image Uploaded");
//     setFileName("No image selected");
//     setFile(null);
//   };
//   const retrieveFile = (e) => {
//     const data = e.target.files[0]; //files array of files object
//     // console.log(data);
//     const reader = new window.FileReader();
//     reader.readAsArrayBuffer(data);
//     reader.onloadend = () => {
//       setFile(e.target.files[0]);
//     };
//     setFileName(e.target.files[0].name);
//     e.preventDefault();
//   };
//   return (
//     <div className="top">
//       <form className="form" onSubmit={handleSubmit}>
//         <label htmlFor="file-upload" className="choose">
//           Choose Image
//         </label>
//         <input
//           disabled={!account}
//           type="file"
//           id="file-upload"
//           name="data"
//           onChange={retrieveFile}
//         />
//         <span className="textArea">Image: {fileName}</span>
//         <button type="submit" className="upload" disabled={!file}>
//           Upload File
//         </button>
//       </form>
//     </div>
//   );
// };
// export default UserLogin;



const UserLogin = ({ state }) => {

    const [transaction, setTransaction] = useState([]);

    const grantAccessToDoctor = async (event) => {
        console.log("abcdef");
        event.preventDefault();
        const { contract } = state;
        const address = document.querySelector("#address").value;
        console.log(address,contract);
        console.log(address,contract);
        try{
          const transaction = await contract.grantAccessToDoctor(address,1);
            await transaction.wait();
            alert("Done");
            console.log("Transaction is done"+" "+transaction);

        }
        catch(error){
            console.log(error["message"]);
        }
        
      };

      
    
    var hidval=false;
    const getPatient= async (event) =>{
        event.preventDefault();
        const { contract } = state;
        const address1 = document.querySelector("#address1").value;
        console.log("Clicked get doc");
        try{
          const transaction =await contract.getPatientDetails(address1);
          setTransaction(transaction);
          hidval=true;
          alert("Done");
        }
        catch(error){
          alert(error);
        }
        console.log("After  ");
      }


    return(
        <>

<div className="w-full h-screen" style={ { textAlign:"center", backgroundColor: "whitesmoke"} }> 
      <p className="text-4xl">User Page</p>
        <div className="flex  justify-evenly " style={ { textAlign:"center" ,marginTop:"90px"} }>
        <form className="shadow-2xl bg-slate-100 rounded-xl p-8 dark:bg-slate-800" onSubmit={grantAccessToDoctor} style={{backgroundColor: "lightblue", width:"30%"}} >
            <h1>Grant Access to Doctor</h1><br></br>
            <div className="mb-3">
              <label className="form-label">Enter Doctor Address </label>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="Enter Address"
              />
            </div><br></br>
            <button
              type="submit"
              className="h-10 px-6 rounded-full bg-violet-600 text-white " 
              disabled={!state.contract}
            >
              
              Grant
            </button>
          </form>
          <br></br>
          <br></br>
          <form className="shadow-2xl bg-slate-100 rounded-xl p-8 dark:bg-slate-800" onSubmit={getPatient} style={{backgroundColor: "lightblue", width:"30%"}} >
            <div>Get Patient Details</div><br></br>
            <div className="mb-3">
              <label className="form-label">Patient address </label>
              <input
                type="text"
                className="form-control"
                id="address1"
                placeholder="Enter Address"
              />
            </div><br></br>
            <button
              type="submit"
              className="h-10 px-6 rounded-full bg-violet-600 text-white" 
              disabled={!state.contract}
            >
              Get Details
            </button>
            <br></br>
            <div style={{ marginTop:"30px"}}>
              <div>
                <p style={{textAlign: "center"}}>Patient Detials</p><br></br>
                <div style={{textAlign:"start", marginTop:"10px"}}>Patient Address :  {transaction.at(1)} </div>
                <div style={{textAlign:"start"}}>Patient Name    :  {transaction.at(2)}</div>
                <div style={{textAlign:"start"}}>Prescription    :  {transaction.at(3)} </div>
              </div>
            </div>
          </form>

      </div>
      <div>
      <br></br>
        <br></br>
        <br></br>
        
        
        </div>
      </div>


        </>
    )
}

export default UserLogin