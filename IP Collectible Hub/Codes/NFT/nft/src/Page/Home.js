import React, { useState } from "react";
import { Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { contract } from "./connector";

function Home() {
   const [Wallet, setWallet] = useState("");
   
   const [ownerAddr, setownerAddr] = useState("");
   const [TokenId, setTokenId] = useState("");
   const [IpInfo, setIpInfo] = useState("");

   // 
   const [IpId, setIpTokenId] = useState("");
   const [IpData, setIpData] = useState("");

   //
   const [BaseUri, setBaseUri] = useState("");


   

   const handleOwnerAddress = (e) => {
      setownerAddr(e.target.value)
   }

   const handleTokenId = (e) => {
      setTokenId(e.target.value)
   }

   const handleIpInfo = (e) => {
      setIpInfo(e.target.value)
   }


   const handleCreateCollectible = async () => {
      try {
         let tx = await contract.createCollectible(ownerAddr, TokenId, IpInfo)
         let wait = await tx.wait()
         console.log(wait);
         alert(wait.transactionHash)
      } catch (error) {
         alert(error)   
      }
   }

   const handleIpTokenId = (e) => {
      setIpTokenId(e.target.value)
   }
   
   const handleIpInfoData = async () => {
      try {
         let tx = await contract.getIPInfo(IpId.toString())
         
         console.log(tx);
        setIpData(tx)
      } catch (error) {
         alert(error)
      }
   }

   const handleBaseUriData = (e) => {
      setBaseUri(e.target.value)
   }

   

   const handleBaseUri = async () => {
      try {
         let tx = await contract.setBaseURI(BaseUri)
         let wait = await tx.wait()
         console.log(wait);
         alert(wait.transactionHash)
      } catch (error) {
         alert(error)
      }
   }
  
//=?>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
   const handleWallet = async () => {
      if (!window.ethereum) {
         return alert('please install metamask');
      }

      const addr = await window.ethereum.request({
         method: 'eth_requestAccounts',
      });

      setWallet(addr[0])

   }

 return (
  <div>
   <h1 style={{ marginTop: "30px", marginBottom: "80px" }}>NFT App on Blockchain</h1>
       {!Wallet ?

          <Button onClick={handleWallet} style={{ marginTop: "30px", marginBottom: "50px" }}>Connect Wallet </Button>
          :
          <p style={{ width: "250px", height: "50px", margin: "auto", marginBottom: "50px", border: '2px solid #2096f3' }}>{Wallet.slice(0, 6)}....{Wallet.slice(-6)}</p>
       }
   <Container>
    <Row>



     <Col style={{marginRight:"100px"}}>
      <div>
   
      <input style={{ marginTop: "10px", borderRadius: "5px" }} onChange={handleOwnerAddress} type="string" placeholder="Owner address" value={ownerAddr} /> <br />
      <input style={{ marginTop: "10px", borderRadius: "5px" }} onChange={handleTokenId} type="number" placeholder="Token ID" value={TokenId} /> <br />
      <input style={{ marginTop: "10px", borderRadius: "5px" }} onChange={handleIpInfo} type="string" placeholder="IP info" value={IpInfo} /> <br />

      <Button onClick={handleCreateCollectible} style={{ marginTop: "10px" }} variant="primary">Create collectible</Button>

      </div>
     </Col>

      <Col style={{ marginRight: "100px" }}>
         <div>
            <input style={{ marginTop: "10px", borderRadius: "5px" }} onChange={handleIpTokenId} type="number" placeholder="Token Id" value={IpId} /> <br />
            <Button onClick={handleIpInfoData} style={{ marginTop: "10px" }} variant="primary">Get Ip Info</Button>
                   {IpData? <p>{IpData}</p> : <p></p>}
         </div>
      </Col> 
           
               
   </Row>    
   <Row style={{marginTop:"100px"}}>
               <Col style={{ marginRight: "100px" }}>
                  <div>
                   <input style={{ marginTop: "10px", borderRadius: "5px" }} onChange={handleBaseUriData} type="string" placeholder="base uri" value={BaseUri} /> <br />
                   <Button onClick={handleBaseUri} style={{ marginTop: "10px" }} variant="primary"> setBaseURI</Button>
                   
                  </div>
               </Col> 


               {/* <Col style={{ marginRight: "100px" }}>
                  <div>
                   <Button onClick={handleRegdeadline} style={{ marginTop: "10px" }} variant="primary">Registration deadline</Button>
                   {RegDeadline ? <p>{RegDeadline.toString()}</p> : <p></p>}
                     
                     
                  </div>
               </Col> */}

             
       </Row>
          <Row style={{ marginTop: "50px" }}>
             {/* <Col style={{ marginRight: "100px" }}>
                <div>
                   <Button onClick={handleVoteDeadline} style={{ marginTop: "10px" }} variant="primary">Voting deadline</Button>
                   {VoteDeadlne ? <p>{VoteDeadlne.toString()}</p> : <p></p>}


                </div>
             </Col>

             <Col style={{ marginRight: "100px" }}>
                <div>
                   <Button onClick={handleElecName} style={{ marginTop: "10px" }} variant="primary">Election Name</Button>
                   {Election ? <p>{Election.toString()}</p> : <p></p>}


                </div>
             </Col> */}
   </Row>
   </Container>

  </div>
 )
}

export default Home;
