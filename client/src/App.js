import MedRecords from "./artifacts/contracts/MedRecords.sol/MedRecords.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Route, Routes } from "react-router-dom";
import DoctorLogin from "./components/DoctorLogin";
import HospitalLogin from "./components/HospitalLogin";
import Home from "./components/Home";
import UserLogin from "./components/UserLogin";

// import FileUpload from "./components/FileUpload";
// import Display from "./components/Display";
// import Modal from "./components/Modal";
import "./App.css";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        let contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

        const contract = new ethers.Contract(
          contractAddress,
          MedRecords.abi,
          signer
        );
        //console.log(contract);
        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/user" element={<UserLogin/>}/>
        <Route path="/doctor" element={<DoctorLogin/>}/>
        <Route path="/hospital" element={<HospitalLogin/>}/>
      </Routes>
    </div>
  );
}


//       {
//       /* {!modalOpen && (
//         <button className="share" onClick={() => setModalOpen(true)}>
//           Share
//         </button>
//       )}
//       {modalOpen && (
//         <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
//       )}

//       <div className="App">
//         <h1 style={{ color: "white" }}>Gdrive 3.0</h1>
//         <div class="bg"></div>
//         <div class="bg bg2"></div>
//         <div class="bg bg3"></div>

//         <p style={{ color: "white" }}>
//           Account : {account ? account : "Not connected"}
//         </p>
//         <FileUpload
//           account={account}
//           provider={provider}
//           contract={contract}
//         ></FileUpload>
//         <Display contract={contract} account={account}></Display>
//       </div> */}
//     </div>
//   );
// }

export default App;
