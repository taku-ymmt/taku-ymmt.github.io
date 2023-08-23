let scanner;

const SCAN_OPTIONS = {
    //filters: [{ services: ['ff000000-0000-0000-0000-000000000014'] }],
    //filters: [{ services: ['00001801-0000-1000-8000-00805f9b34fb'] }],
    acceptAllAdvertisements: true,
    //keepRepeatedDevices: true
};

function startScanning() {
    alert("button push");

    /*
    navigator.bluetooth.addEventListener('advertisementreceived', event => {
        console.log("test");
        /* Display device data 
        let deviceData = event.device;
        console.log(deviceData)
    });
    */

    
    navigator.bluetooth.requestLEScan(SCAN_OPTIONS)
        .then(scanner => {
            alert("success");
            console.log(scanner.active);

            navigator.bluetooth.addEventListener('advertisementreceived', event => {
                const data = event.advertisement.manufacturerData;
                if (data && data.byteLength >= 25) {
                    const uuid = byteArrayToHexString(data.slice(4, 20));
                    const major = data.getUint16(20, false);
                    const minor = data.getUint16(22, false);
                    const txPower = data.getInt8(24);

                    displayiBeaconData(uuid, major, minor, txPower);
                }
            });

        })
        .catch(error => { 
            alert("error");
            console.log(error); 
        });
    

}

/*
async function startScanning() {
    try {
        const options = {
            filters: [{ services: ['ff000000-0000-0000-0000-000000000014'] }],
            acceptAllAdvertisements: true,
            keepRepeatedDevices: true
        };
        scanner = await navigator.bluetooth.requestLEScan(options);

        scanner.addEventListener('advertisementreceived', (event) => {
            const data = event.advertisement.manufacturerData;
            if (data && data.byteLength >= 25) {
                const uuid = byteArrayToHexString(data.slice(4, 20));
                const major = data.getUint16(20, false);
                const minor = data.getUint16(22, false);
                const txPower = data.getInt8(24);

                displayiBeaconData(uuid, major, minor, txPower);
            }
        });
    } catch (error) {
        console.error('Error:', error);
    }
}
*/

function stopScanning() {
    if (scanner) {
        scanner.stop();
    }
}

function displayiBeaconData(uuid, major, minor, txPower) {
    document.getElementById('uuid').textContent = uuid;
    document.getElementById('major').textContent = major;
    document.getElementById('minor').textContent = minor;
    document.getElementById('txPower').textContent = txPower;
}

function byteArrayToHexString(byteArray) {
    return Array.from(byteArray, (byte) => {
        return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('');
}

document.getElementById('startScanButton').addEventListener('click', startScanning);