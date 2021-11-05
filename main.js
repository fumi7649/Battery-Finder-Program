// ここから書いてください。
const battery =
    [{
        "batteryName": "WKL-78",
        "capacityAh": 2.3,
        "voltage": 14.4,
        "maxDraw": 3.2,
        "endVoltage": 10,
    },
    {
        "batteryName": "WKL-140",
        "capacityAh": 4.5,
        "voltage": 14.4,
        "maxDraw": 9.2,
        "endVoltage": 5,
    },
    {
        "batteryName": "Wmacro-78",
        "capacityAh": 2.5,
        "voltage": 14.5,
        "maxDraw": 10,
        "endVoltage": 5,
    },
    {
        "batteryName": "Wmacro-140",
        "capacityAh": 3.6,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 5,
    },
    {
        "batteryName": "IOP-E78",
        "capacityAh": 6.6,
        "voltage": 14.4,
        "maxDraw": 10.5,
        "endVoltage": 8,
    },
    {
        "batteryName": "IOP-E140",
        "capacityAh": 9.9,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 10,
    },
    {
        "batteryName": "IOP-E188",
        "capacityAh": 13.2,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 11,
    },
    {
        "batteryName": "RYN-C65",
        "capacityAh": 4.9,
        "voltage": 14.8,
        "maxDraw": 4.9,
        "endVoltage": 11,
    },
    {
        "batteryName": "RYN-C85",
        "capacityAh": 6.3,
        "voltage": 14.4,
        "maxDraw": 6.3,
        "endVoltage": 12,
    },
    {
        "batteryName": "RYN-C140",
        "capacityAh": 9.8,
        "voltage": 14.8,
        "maxDraw": 10,
        "endVoltage": 12,
    },
    {
        "batteryName": "RYN-C290",
        "capacityAh": 19.8,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 12,
    }]
;

const camera =
    [{
        "brand": "Cakon",
        "model": "ABC 3000M",
        "powerConsumptionWh": 35.5,
    },
    {
        "brand": "Cakon",
        "model": "ABC 5000M",
        "powerConsumptionWh": 37.2,
    },
    {
        "brand": "Cakon",
        "model": "ABC 7000M",
        "powerConsumptionWh": 39.7,
    },
    {
        "brand": "Cakon",
        "model": "ABC 9000M",
        "powerConsumptionWh": 10.9,
    },
    {
        "brand": "Cakon",
        "model": "ABC 9900M",
        "powerConsumptionWh": 15.7,
    },
    {
        "brand": "Go MN",
        "model": "UIK 110C",
        "powerConsumptionWh": 62.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 210C",
        "powerConsumptionWh": 64.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 230C",
        "powerConsumptionWh": 26.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 250C",
        "powerConsumptionWh": 15.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 270C",
        "powerConsumptionWh": 20.3,
    },
    {
        "brand": "VANY",
        "model": "CEV 1100P",
        "powerConsumptionWh": 22,
    },
    {
        "brand": "VANY",
        "model": "CEV 1300P",
        "powerConsumptionWh": 23,
    },
    {
        "brand": "VANY",
        "model": "CEV 1500P",
        "powerConsumptionWh": 24,
    },
    {
        "brand": "VANY",
        "model": "CEV 1700P",
        "powerConsumptionWh": 25,
    },
    {
        "brand": "VANY",
        "model": "CEV 1900P",
        "powerConsumptionWh": 26,
    }]
;

battery.sort(function(a, b){
    if(a.batteryName > b.batteryName)return 1;
    else return -1;
});

camera.sort(function(a, b){
    if(a.model > b.model)return 1;
    else return -1;
})




class Battery {
    constructor(batteryName, capacityAh, voltage, maxDraw, endVoltage){
        this.batteryName = batteryName;
        this.voltage = voltage;
        this.capacityAh = capacityAh;
        this.maxDraw = maxDraw;
        this.endVoltage = endVoltage;
    }

    maxWatt(){
        return this.capacityAh * this.voltage;
    }

    endWatt(){
        return this.endVoltage * this.maxDraw;
    }

    maxUseHour(sumWatt){
        return (this.maxWatt() / sumWatt).toFixed(1);
    }


    createBatteryList(sumWatt){
        let batteryDiv = document.createElement("div");
        let batteryP = document.createElement("p");

        batteryDiv.classList.add("d-flex","w-100","bg-light", "border", "border-secondary","align-items-center","font-weight-bold","flex-row","justify-content-between","px-2");
        batteryDiv.innerHTML = this.batteryName;

        batteryP.innerHTML = "Estimate " + this.maxUseHour(sumWatt) + " hours";

        batteryP.classList.add("p-2","font-weight-normal");
        batteryDiv.append(batteryP);

        return batteryDiv;
    }
}


class Camera {
    constructor(brand, model, powerConsumptionWh){
        this.brand = brand;
        this.model = model;
        this.powerConsumptionWh = powerConsumptionWh;
    }
}

let cameraObjects = [];
for(let i = 0;i < camera.length;i++){
    cameraObjects.push(new Camera(camera[i]['brand'],camera[i]['model'], camera[i]['powerConsumptionWh']));
}


let batteryObjects = [];
for(let i = 0;i < battery.length; i++){
    batteryObjects.push(new Battery(battery[i]['batteryName'], battery[i]['capacityAh'], battery[i]['voltage'], battery[i]['maxDraw'], battery[i]['endVoltage']));
}

class Controller {
    static createModelOption(brand){
        let modelSelectEle = document.getElementById("model-select");
        modelSelectEle.innerHTML = "";
        cameraObjects.forEach((cameraObj, index) => {
            let option = document.createElement("option");
            if(cameraObj.brand == brand){
                option.innerHTML = cameraObj.model;
                option.value = index;
                modelSelectEle.append(option);
            }
            
        })
        modelSelectEle.addEventListener("change", function(){
            Controller.batteryListUpdate();
        })
    }
    static batteryListUpdate(){
        let inputWatt = document.getElementById("wattage");
        let modelSelectEle = document.getElementById("model-select");
        let sumWatt = (parseInt(inputWatt.value) + cameraObjects[modelSelectEle.value].powerConsumptionWh);
        let batteryList = document.getElementById("battery-list");
        batteryList.innerHTML = "";

        batteryObjects.forEach(batteryObj => {
            if(batteryObj.endWatt() > sumWatt){
                batteryList.append(batteryObj.createBatteryList(sumWatt));
            }
        })
        
    }
}

class View {
    static createBrandOption(){
        let brandSelect = document.getElementById("brand-select");
        let brands = [
            "Cakon",
            "Go MN",
            "VANY"
        ];

        brands.forEach(brand => {
            let option = document.createElement("option");
            option.value = brand;
            option.innerHTML = brand;
            brandSelect.append(option);
        })

        brandSelect.addEventListener("change",function(){
           Controller.createModelOption(brandSelect.value);
           Controller.batteryListUpdate();
        })
    }

    static createFirstModelOption(){
        let modelSelectEle = document.getElementById("model-select");
        cameraObjects.forEach((cameraObj, index) => {
            let option = document.createElement("option");
            option.innerHTML = cameraObj.model;
            option.value = index;
            if(cameraObj.brand == "Cakon"){
                modelSelectEle.append(option);
            }
        })
        modelSelectEle.addEventListener("change",function(){
            Controller.batteryListUpdate();
        })
    }

    static createFirstBatteryList(){
        let batteryList = document.getElementById('battery-list');
        let inputWatt = document.getElementById("wattage");
        let modelSelectEle = document.getElementById("model-select");

        batteryObjects.forEach(batteryObj => {
            batteryList.append(batteryObj.createBatteryList(parseInt(inputWatt.value) + cameraObjects[modelSelectEle.value].powerConsumptionWh));
        })
    }
}


View.createBrandOption();
View.createFirstModelOption();
View.createFirstBatteryList();

let inputWatt = document.getElementById("wattage");
inputWatt.addEventListener("change",function(){
    Controller.batteryListUpdate();
})