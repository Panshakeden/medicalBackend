// XXX even though ethers is not used in the code below, it's very likely
// it will be used by any DApp, so we are already including it here
const { ethers } = require("ethers");
const{checkForDoctorUpdatePermission,checkApproveDoctorValidity}=require("./validityChecks")

const rollup_server = process.env.ROLLUP_HTTP_SERVER_URL;
console.log("HTTP rollup_server url is " + rollup_server);

let medicalReport= {}
let medicalHistory= {}
let approve={}
const doctorAddress="0x84c888Eed28F6587B6005CA00e3a2FA9bb40D11a"

const emitNotice = async (data) => {
  let hexresult = stringToHex(data);
  console.log(`stringToHex: ${hexresult}`)
  advance_req = await fetch(rollup_server + "/notice", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ payload: hexresult }),
  });
  return advance_req;
}

const emitReport = async(e) => {
  console.log("error is:", e);
 console.log(`Adding notice with binary value "${payload}"`);
 await fetch(rollup_server + "/report", {
   method: "POST",
   headers: {
     "Content-Type": "application/json",
   },
   body: JSON.stringify({
    payload: stringToHex(JSON.stringify({ error: e })),
  }),
 });
 return "reject";
}

async function handle_advance(data) {
  console.log("Received advance request data " + JSON.stringify(data));

  const payload = data.payload;
  console.log('payload...', payload);
  const payloadStr = ethers.toUtf8String(payload);
  console.log('payloadStr', payloadStr);
  JsonPayload = JSON.parse(payloadStr);
  console.log('JsonPayload.....................', JsonPayload);



  const owner = data.metadata.msg_sender;

  switch (JSONpayload.method) {
    case methods.APPROVE_DOCTOR:
      const checksapprove = checkApproveDoctorValidity(owner, doctorAddress)
    if(checksapprove.success){

      approve[owner][doctorAddress] = true;
      await emitNotice({ state: "approved", data: approve })

    }else{
     await emitReport(checksapprove)
    }
      
      break;

    case methods.ADD_PATIENT_MEDICAL_RECORD:

      const checkMedicalRecord = checkForDoctorUpdatePermission(approve,JSONpayload.patientId,owner);
      if(checkMedicalRecord.success){

       medicalReport[JSONpayload.patientId] = {
        ...medicalReport[JSONpayload.patientId],
        ...JSONpayload.reports
       }

      await emitNotice({ state: "medical report", data: medicalReport })

       }else{
        await emitReport(checkMedicalRecord)
       }
     
      break;

    case methods.ADD_PATIENT_MEDICAL_HISTORY:
      const checkMedicalHistory = checkForDoctorUpdatePermission(JSONpayload);
     if(checkMedicalHistory.success){
      
      medicalHistory[JsonPayload.patientId]={
        ...medicalHistory[JsonPayload.patientId],
        ...JsonPayload.reports
      }
      await emitNotice({ state: "medical history", data: medicalHistory })


     }else{
    
      await emitReport(checkMedicalHistory)

     }
      break;

    default:

      break;
  }


  console.log("Received advance request data " + JSON.stringify(data));
  return "accept";

}




async function handle_inspect(data) {
  console.log("Received inspect request data " + JSON.stringify(data));

  //conversion from strings to hex
  function stringToHex (str) {
    let hex = "";
    for (let i = 0; i < str.length; i++) {
        const charCode = str.charCodeAt(i).toString(16);
        hex += charCode.padStart(2, '0'); // Ensure each byte is represented by two characters
    }
    return `0x${hex}`;
}



  return "accept";
}



var handlers = {
  advance_state: handle_advance,
  inspect_state: handle_inspect,
};

var finish = { status: "accept" };





(async () => {
  while (true) {
    const finish_req = await fetch(rollup_server + "/finish", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "accept" }),
    });

    console.log("Received finish status " + finish_req.status);

    if (finish_req.status == 202) {
      console.log("No pending rollup request, trying again");
    } else {
      const rollup_req = await finish_req.json();
      var handler = handlers[rollup_req["request_type"]];
      finish["status"] = await handler(rollup_req["data"]);
    }
  }
})();
