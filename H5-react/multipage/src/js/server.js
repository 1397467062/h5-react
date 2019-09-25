import axios from "axios"
import qs from "qs"
// import storage from "./assets/js/storage"

var url = "https://test.medkazo.com/customer/";//以前的测试
// var url="https://medkazo.com/mcustomer/";//新改的正式
// const url = 'http://192.168.0.114:8088/customer/';

//  const  url="http://192.168.0.118/medkazo/"   
//http://192.168.0.118:8080/manager/user/login?loginName=admin&password=test.123456
export const baseUrl = {
    url:url 
}
let http={
    post:"",
    get:""
}
http.post=function (api,data) {
    //   data.token = storage.get("token") //localStorage.getItem("token")
    let params=qs.stringify(data)
    return new Promise((resolve ,reject)=>{
        axios.post(url+api,params).then((res)=>{
            resolve(res)
        })
    })
}

http.get=function (api,data) {
    // console.log(data)
    // let datas
    // if(data!=undefined){
    //     data.token = storage.get("token")
    //     datas= data
    //     console.log(datas)
    //     console.log(data)
    // }else{
    //     datas ={token:storage.get("token")}
    //     console.log(datas)
    // }
    // let params=datas
    // console.log(params)
    console.log(data)
    let params=data
console.log(params)
    return new Promise((resolve ,reject)=>{
        axios.get(url+api,{params}).then((res)=>{
            resolve(res)
        })
    })
}
export  default http
