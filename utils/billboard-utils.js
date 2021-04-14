const _ = require('underscore');
const drive = (count,func) => {
    for(let i = 0; i < count; i++){

    }
}

const getBillboardGeneralInfo = (billboardData) => {
    return {
        ...getBillboardClass(billboardData),
        ...getBillboardTypes(billboardData),
        ...getBillboardRegions(billboardData),
        ...getBillboardStateStatus(billboardData)
    }
}

const getBillboardClass = (billboardData) => {
    let billboardClassObject = {
        billboardClass: {
            digital: {},
            static: {}
        }
    }
    for(let i = 0; i < billboardData.length; i++){
        if(billboardData[i].class === 'digital'){
            if(_.has(billboardClassObject.billboardClass.digital,billboardData[i].status)){
                ++billboardClassObject.billboardClass.digital[billboardData[i].status];
            }else {
                billboardClassObject.billboardClass.digital[billboardData[i].status] = 1;
            }
        }else {
            if(_.has(billboardClassObject.billboardClass.static,billboardData[i].status)){
                ++billboardClassObject.billboardClass.static[billboardData[i].status];
            }else {
                billboardClassObject.billboardClass.static[billboardData[i].status] = 1;
            }
        }
    }
return billboardClassObject;
}

const getBillboardTypes = (billboardData) => {
    let billboardTypesObject = {
        billboardTypes: _.countBy(billboardData, (billboard) => billboard.type)
    }
    // for(let i = 0; i < billboardData.length; i++){
    //     if(_.has(billboardTypesObject.billboardTypes,billboardData[i].type)){
    //         ++billboardTypesObject.billboardTypes[billboardData[i].type];
    //     }else {
    //         billboardTypesObject.billboardTypes[billboardData[i].type] = 1;
    //     }
    // }
    return billboardTypesObject;
}

const getBillboardRegions = (billboardData) => {
    let billboardRegionsObject = {
        billboardRegions: _.countBy(billboardData, (billboard) => billboard.region)
    }
    // for(let i = 0; i < billboardData.length; i++){
    //     if(_.has(billboardRegionsObject.billboardRegions,billboardData[i].region)){
    //         ++billboardRegionsObject.billboardRegions[billboardData[i].region];
    //     }else {
    //         billboardRegionsObject.billboardRegions[billboardData[i].region] = 1;
    //     }
    // }
    return billboardRegionsObject;
}

const getBillboardStateStatus = (billboardData) => {
    const groupStates = _.groupBy(billboardData,(billboard) => billboard.state);
    let billboardStateStatusObject = {
        billboardStatesStatus: []
    }
   
    for(let key in groupStates) {
        let billboardStateStatusShape = {
            state: key,
            ..._.countBy(groupStates[key], (billboard) => billboard.status === 'active' ? 'active' : billboard.status === 'inactive' ? 'inactive' : 'vacant'),
            types: []
        }
        let groupTypes = _.groupBy(groupStates[key],(billboard) => billboard.type);
        for(let key in groupTypes) {
            billboardStateStatusShape.types.push({
                type: key,
                ..._.countBy(groupTypes[key], (billboard) => billboard.status === 'active' ? 'active' : billboard.status === 'inactive' ? 'inactive' : 'vacant')
            })
        }
        billboardStateStatusObject.billboardStatesStatus.push(billboardStateStatusShape);
    }
    return billboardStateStatusObject;
}

module.exports = getBillboardGeneralInfo;