
let historyData= {

    address :{}
      
  }

async function patientHistory(historyData) {

    let requestData={...historyData}
    for (const [key, value] of Object.entries(requestData)) {
        requestData.address[key] = value;
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
   