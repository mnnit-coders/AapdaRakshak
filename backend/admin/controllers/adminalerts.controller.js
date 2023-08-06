const {adminalertmodel}=require('../../models/adminalert.model')
const {emailmodel}=require('../../models/email.model')
const {phonenomodel}=require('../../models/phoneno.model')
const {sendemail}=require('../../user/helper/mailsender')
const {sendsms}=require('../helper/sendsms')
const axios=require('axios')
async function createadminalert(req,res){
    try {
        var {location,type,description,expiresby}=req.body;
        if(!location||!type||!description||!expiresby) return res.status(403).json({
            message:"fill all fields",
            flag:false
        })
        let cordinate={
            latitude:0,
            longitude:0
        };

        const options = {
        method: 'GET',
        url: 'https://geocoding-by-api-ninjas.p.rapidapi.com/v1/geocoding',
        params: {city: location},
        headers: {
            'X-RapidAPI-Key': 'ce90579398msh557b7208b6385dcp1d9c10jsn369f8d27807e',
            'X-RapidAPI-Host': 'geocoding-by-api-ninjas.p.rapidapi.com'
        }
        };
        await axios.request(options).then(function (response) {
            // console.log(response.data)
            let cordinate1={
                latitude:response.data[0].latitude,
                longitude:response.data[0].longitude
            }
            cordinate=cordinate1;
        }).catch(function (error) {
            return res.status(404).json({
                message:'Cant getting the co-ordinate of given location',
                flag:false
            })
        });
        const {latitude,longitude}=cordinate
        const currmin=Math.floor(Date.now()/(1000*60))
        if(expiresby=='NA') expiresby=-1
        else expiresby=expiresby*60
        await adminalertmodel.create({type,description,location,latitude,longitude,createdby:currmin,expiresby:expiresby});

        return res.status(200).json({
            message:'Successfully created',
            flag:true
        })

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message:'internal server error',
            flag:false
        })
    }
}
async function getalerts(req,res){
    try {
        const result=await adminalertmodel.find();
        // console.log(result);
        return res.status(200).json({
            data:result,
            flag:true
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message,
            flag:false
        })
    }
}
async function postalertrescont(req,res){
    try {
        const {id,response}=req.body;
        console.log(req.body)
        const result=await adminalertmodel.findOneAndUpdate({_id:id},{status:response})
        if(response==='success'){
            const res=await emailmodel.find()
            const result2=await phonenomodel.find()
            for(let i=0;i<res.length;i++){
                sendemail({otp:false,email:res[i].email,subject:'Alert from AapdaRakshak',alertcontent:result.description})
            }
            var array=[]
            for(let i=0;i<result2.length;i++){
                array.push(result2[i].mobileno)
            }
            sendsms(array,result)
        }
        console.log(result);
        return res.status(200).json({
            message:'Updated Successfully',
            flag:true
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message,
            flag:false
        })
    }
}

async  function updateadminalert(req,res){
    try {
        const {id,type,description,location,expiresby}=req.body;
        if(!type||!id||!description||!location||!expiresby) 
        return res.status(403).json({
            message:"fill all fields",
            flag:false
        })
        let cordinate={
            latitude:0,
            longitude:0
        };

        const options = {
        method: 'GET',
        url: 'https://geocoding-by-api-ninjas.p.rapidapi.com/v1/geocoding',
        params: {city: location},
        headers: {
            'X-RapidAPI-Key': 'ce90579398msh557b7208b6385dcp1d9c10jsn369f8d27807e',
            'X-RapidAPI-Host': 'geocoding-by-api-ninjas.p.rapidapi.com'
        }
        };
        await axios.request(options).then(function (response) {
            // console.log(response.data)
            let cordinate1={
                latitude:response.data[0].latitude,
                longitude:response.data[0].longitude
            }
            cordinate=cordinate1;
        }).catch(function (error) {
            return res.status(404).json({
                message:'Cant getting the co-ordinate of given location',
                flag:false
            })
        });
        const {latitude,longitude}=cordinate
        await adminalertmodel.findByIdAndUpdate({_id:id},{
            description,location,type,latitude,longitude,expiresby
        })
        return res.status(200).json({
            message:"successfully updated",
            flag:true
        })

    } catch (error) {
        return res.status(500).json({
            message:error.message,
            flag:false
        })
    }
}


async function deletealert(req,res){
    try {
        const {id}=req.body
        await adminalertmodel.findByIdAndDelete({_id:id});
        return res.status(200).json({
            message:"successfully deleted",
            flag:true
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message,
            flag:false
        })
    }
}
async function printing(){
    const result=await adminalertmodel.find();
    for(let i=0;i<result.length;i++){
        let data=result[i]
        let currval=Math.floor(Date.now()/(1000*60))
        if(data.expiresby!=-1&&currval-data.createdby==data.expiresby){
            await adminalertmodel.findByIdAndDelete({_id:data._id})
        }
    }
    // console.log(Math.floor(Date.now()/(1000*60)))
}
setInterval(printing,1000*60)
module.exports={createadminalert,getalerts,postalertrescont,updateadminalert,deletealert} 