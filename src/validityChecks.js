exports.checkApproveDoctorValidity = (owners, doctorAddress) => {
   if(owners.includes(doctorAddress)){
       return {success:true,msg:"DOCTOR APPROVED BY OWNER"}
   }else{
       return {success:false,msg:"DOCTOR NOT APPROVED BY OWNER"}
   }
}

exports.checkMedicalRecordAndHistoryValidity = (doctors, doctorAddress,permissions) => {
   if(doctors.includes(doctorAddress)){
       return {success:true,msg:"VALID DOCTOR"}

   }else if(!doctors.includes(doctorAddress)){
      return { success: false, msg: "INAVLID DOCTOR"};
     }
   else if(permissions.includes(doctorAddress)){
      return { success: true, msg: "UPDATED BY DOCTOR"};
     }
     else if(!permissions.includes(doctorAddress)){
      return { success: false, msg: "NO PERMISSION TO UPDATED BY DOCTOR" };
     }
   else {
      return { success: false, msg: "INVALID DOCTOR"};
  }
}




exports.checkOwnerApproval = (owners, doctorAddress) => {
   if (owners.includes(doctorAddress)) {
       return { success: true, msg: "Doctor approved by owner", doctorAddress };
   } else {
       return { success: false, msg: "Doctor not approved by owner", doctorAddress };
   }
}

exports.checkValidDoctor = (doctors, doctorAddress) => {
   if (doctors.includes(doctorAddress)) {
       return { success: true, msg: "Valid doctor", doctorAddress };
   } else {
       return { success: false, msg: "Invalid doctor", doctorAddress };
   }
}

exports.checkPermissionUpdate = (permissions, doctorAddress) => {
   if (permissions.includes(doctorAddress)) {
       return { success: true, msg: "Permission updated by doctor", doctorAddress };
   } else {
       return { success: false, msg: "Permission not updated by doctor", doctorAddress };
   }
}




















