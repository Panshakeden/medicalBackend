
const reportData= {}

async function Addpatient(_reportData) {
    reportData[msg_sender] = {
        ...reportData[msg_sender],
        ...reportData
    }

    const response = await fetch(rollup_server + "/notice", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(requestData),
    });
   
    if (!response.ok) {
       throw new Error(`Failed to add patient: ${response.statusText}`);
    }
   
    const data = await response.json();
    console.log("patient added successfully:", data);
    return data;
   }
   