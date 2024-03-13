exports.checkApproveDoctorValidity = (owners, doctorAddress) => {
   if(owners.includes(doctorAddress)){
       return {success:true,msg:"DOCTOR APPROVED BY OWNER"}
   }else{
       return {success:false,msg:"DOCTOR NOT APPROVED BY OWNER"}
   }
}

exports.checkMedicalRecordAndHistoryValidity = (approve, patientId,owner) => {

   if(((approve[patientId]??{[owner]:false})[owner]??false)){

       return {success:true,msg:""}

   }else{
      return { success: false, msg: "NO PERMISSION TO UPDATED BY DOCTOR" };

   }
//    if(doctors.includes(doctorAddress)){
//        return {success:true,msg:"VALID DOCTOR"}

//    }else if(!doctors.includes(doctorAddress)){
//       return { success: false, msg: "INAVLID DOCTOR"};
//      }
//    else if(permissions.includes(doctorAddress)){
//       return { success: true, msg: "UPDATED BY DOCTOR"};
//      }
//      else if(!permissions.includes(doctorAddress)){
//       return { success: false, msg: "NO PERMISSION TO UPDATED BY DOCTOR" };
//      }
//    else {
//       return { success: false, msg: "INVALID DOCTOR"};
//   }
}























