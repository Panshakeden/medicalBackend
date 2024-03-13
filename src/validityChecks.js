exports.checkApproveDoctorValidity = (data) => {
   if(!data.approved){
       return {success:false,msg:"NOT_APPROVED BY OWNER"}
   }else{
       return {success:true,msg:"APPROVED"}
   }
}

























// async function medicalHistoryRecords(_medicalHistory) {
//     medicalHistory[msg_sender] = {
//         ...medicalHistory[msg_sender],
//         ...medicalHistory
//     }

//     const response = await fetch(rollup_server + "/notice", {
//        method: "POST",
//        headers: {
//          "Content-Type": "application/json",
//        },
//        body: JSON.stringify(medicalHistory),
//     });
   
//     if (!response.ok) {
//        throw new Error(`Failed to add patient: ${response.statusText}`);
//     }
   
//     const data = await response.json();
//     console.log("patient added successfully:", data);
//     return data;
//    }
   