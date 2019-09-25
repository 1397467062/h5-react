import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, WhiteSpace, WingBlank ,Carousel,Flex,Icon, Grid } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import "./css/style.css"
import "./css/index.css"
import http from "./js/server.js"
import tsIcon from './images/phone.png';
// import right from './images/color_right.png'
import jia from './images/jia.png'
import jian from './images/jian.png'
// import  './js/wx.js';
// import wx from 'react-jweixin';
// import wx from 'weixin-js-sdk'
// import "./js/jquery-3.1.1.min.js"
class App extends Component {
  state = {
    data: ['1', '2', '3'],
    imgHeight: 176,
    num : 1,
    money: '',
    isToggleOn: true,
    showhide:"none",
    goodsId:"",//传的值
    token:"",//传的值
    goodsInfo:'',//所有商品数据
    goodsCover:[],//图片
    goodsSpecifications:[],//规格
    standard:"",//点击规格获取规格主键id
    activeType: 0,
    goodsPointses:[],//商品价格
    goodsFlag:"",//1是药 2是套餐
    specification:"",//发送的产品规格
    goodsPointsId:"",//发送的积分和价钱id
  }
  componentDidMount() {
    // http://127.0.0.1:3000/?token=b2531522-908b-4d01-abd8-389640035c87&goodsId=010489313b5f497c8489313b5f097c49
    setTimeout(() => {
      this.setState({
        data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
      });
    }, 100);
    this.GetRequest()

    console.log(window.__wxjs_environment === 'miniprogram')
    console.log(document.createElement("script"))
  }
  async getlist(token,goodsId){
    // let token = this.state.token
    // let goodsId = this.state.goodsId
    console.log(token)
    console.log(goodsId)
    let data={
      goodsId,
      token
    }
    console.log(data)
    const  res =await http.get("goods/goodsDetail",data)
    console.log(res)
    if(res.status=="200"){
      console.log("返回成功")
      console.log(res.data.data)
      let goodsCover = JSON.parse(res.data.data.goodsInfo.goodsCover)
      console.log(goodsCover)
      let goodsInfo = res.data.data.goodsInfo
      let goodsSpecifications = res.data.data.goodsSpecifications
      let goodsPointses = res.data.data.goodsPointses
      let goodsFlag = res.data.data.goodsInfo.goodsFlag
      this.setState({
        goodsCover,
        goodsInfo,
        goodsSpecifications,
        goodsPointses,
        goodsFlag,
      })
      console.log(this.state.goodsFlag)
      this.handleChange()
      this.standards()
    }else {
      alert("接口错误")
    }
  }
  GetRequest=()=>{
    console.log(window.location.search)
    var url = window.location.search; //获取url中"?"符后的字串  这边获取到的就是 ?index=2
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);   //这边得到的str  就是index=2
        var strs = str.split("&");    //这边是可能并列参数的情况
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    console.log(theRequest)
    let token = theRequest.token
    let goodsId = theRequest.goodsId
    this.setState({
      token:theRequest.token,
      goodsId:theRequest.goodsId
    })
    this.getlist(token,goodsId)
  }
  standard(e,index,eva){
    console.log(e)
    console.log(eva)
    console.log(index)
    this.setState({
      standard:e.goodsSpecificationId,
      activeType:index,
      specification:e
    })
  }
  standards(){
    console.log(this.state.goodsSpecifications[0])
    this.setState({
      specification:this.state.goodsSpecifications[0]
    })
  }

  increase(){//加
    let number
      number = this.state.num+1
    this.setState({
      num:number
    });
  }
  decrease(){//减
    let number
    if(this.state.num <=1){
      number = 1
    }else{
      number = this.state.num-1
    }
    this.setState({
      num:number
    });
  }
  handleChange(event) {//点击改变不同种类的钱
    console.log(event)
    let money = ""
    let goodsPointsId = ""
    if(event===undefined){
      money =Number(this.state.goodsPointses[0].points)+"积分+"+Number(this.state.goodsPointses[0].pointsPrice)/100+"元"
      goodsPointsId = this.state.goodsPointses[0].goodsPointsId
      console.log(goodsPointsId)
    }else{
      console.log(event.target)
      console.log(event.target.value)
      let key = event.target.value
      console.log(this.state.goodsPointses)
      console.log(this.state.goodsPointses[key])
      money = Number(this.state.goodsPointses[key].points)+"积分+"+Number(this.state.goodsPointses[key].pointsPrice)/100+"元"
      goodsPointsId =this.state.goodsPointses[key].goodsPointsId
      console.log(goodsPointsId)
    }
    
    this.setState({money,goodsPointsId});
  }
  handleClick() {//点击显示隐藏
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn,
      showhide: prevState.isToggleOn ? 'block': 'none'
    }));
  }
  conversion(){//立即兑换
    console.log("立即兑换")
    console.log(this.state.goodsFlag)
    let money =""
    let jjifen =""
    let jifen=""
    let moneys=""
    let yuan=""
    let qian=""
    let amount=""
    let goodsSpecificationId =""
    let clinicName = ""
    let clinicAddress = ""
    let clinicPhone = ""
    if(this.state.goodsFlag== 1){//药品
      console.log(this.state.money)
       money=this.state.money;
       jjifen=money.split('积分+');
       jifen=jjifen[0];
      console.log(jifen)//发送的积分
       moneys=jjifen[1]
       yuan=moneys.split("元")
       qian=yuan[0]
      console.log(qian)//发送的金额
      console.log(this.state.goodsPointsId)//发送的积分和金额的id
      console.log(this.state.goodsCover[0])//发送的图片
      console.log(this.state.goodsInfo.goodsName)//发送的商品名称
      console.log(this.state.goodsInfo.commonName)//发送的药品通用名　

      console.log(this.state.specification)
      console.log(this.state.goodsId)//发送的商品主键
      
      console.log(this.state.num)
       clinicName = ""
       clinicAddress = ""
       clinicPhone = ""
       amount = this.state.num
       if(this.state.specification===undefined){
        goodsSpecificationId =""

      }else{
        console.log(this.state.specification.goodsSpecificationId)//发送的商品规格id
        goodsSpecificationId = this.state.specification.goodsSpecificationId
      }

    }else{//套餐
      console.log(this.state.money)
       money=this.state.money;
       jjifen=money.split('积分+');
       jifen=jjifen[0];
      console.log(jifen)//发送的积分
       moneys=jjifen[1]
       yuan=moneys.split("元")
       qian=yuan[0]
      console.log(qian)//发送的金额
      console.log(this.state.goodsPointsId)//发送的积分和金额的id

       amount =1
      console.log(amount)//发送的数量
      console.log(this.state.goodsCover[0])//发送的图片
      console.log(this.state.goodsInfo.goodsName)//发送的商品名称
      console.log(this.state.goodsInfo.commonName)//发送的药品通用名　

      console.log(this.state.specification)
      console.log(this.state.goodsId)//发送的商品主键
      console.log(this.state.goodsInfo.clinicName)//医院名字
      console.log(this.state.goodsInfo.clinicAddress)//医院地址
      clinicName = this.state.goodsInfo.clinicName
       clinicAddress = this.state.goodsInfo.clinicAddress
       clinicPhone = this.state.goodsInfo.clinicPhone
      if(this.state.specification===undefined){
        goodsSpecificationId =""

      }else{
        console.log(this.state.specification.goodsSpecificationId)//发送的商品规格id
        goodsSpecificationId = this.state.specification.goodsSpecificationId
      }

    }
    let list =[
      {
        clinicPhone,
        clinicAddress,
        clinicName,
        integral:jifen,
        money:qian,
        goodsPointsId:this.state.goodsPointsId,
        amount:amount,
        img:this.state.goodsCover[0],
        goodsName:this.state.goodsInfo.goodsName,
        commonName:this.state.goodsInfo.commonName,
        goodsId:this.state.goodsId,
        goodsSpecificationId:goodsSpecificationId,
        goodsFlag:this.state.goodsFlag
      }
    ]
    console.log(list)
    console.log(JSON.stringify(list))
    let lists = JSON.stringify(list)
    console.log(this.state.token)
    if(this.state.token==""){
      window.wx.miniProgram.navigateTo({
        url: '/login/registers/registers',          //跳回小程序需要显示的页面路劲
        //url: '/login/login/login',          //跳回小程序需要显示的页面路劲
        success() {
            console.log('question success');
        },
        fail(error) {
            console.log(error);
        }
      })
    }else{
      window.wx.miniProgram.navigateTo({
        url: '/partials/storePay/storePay?list=' + lists,          //跳回小程序需要显示的页面路劲
        //url: '/login/login/login',          //跳回小程序需要显示的页面路劲
        success() {
            console.log('question success');
        },
        fail(error) {
            console.log(error);
        }
      })
    }
    
  }

  render() {
    return (
      <div className="App">

        {/* <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
          <Button type="primary">primary</Button>
        <p className="App-intro">
         To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <a href="pageF/index.html">pageF</a>
        <div>
           <a href="pageS/index.html">pageS</a>
        </div>
         <a href="/cs.html">cs</a> */}
        <WingBlank className="blank">
          <Carousel
            autoplay
            infinite
            autoplayInterval={1500}
            className="annble"
          >
            {this.state.goodsCover.map((val,key) => (
                <img
                  key={key}
                  src={val}
                  alt=""
                  className="image"
                  style={{ width: '100%',height: '178px', verticalAlign: 'top' }}
                  onLoad={() => {
                    // fire window resize event to change height
                    window.dispatchEvent(new Event('resize'));
                    this.setState({ imgHeight: 'auto' });
                  }}
                />
            ))}
          </Carousel>
        </WingBlank>
        <Flex className="shop">
          <Flex.Item className="shops">{this.state.goodsInfo.goodsName} <div style={{display:this.state.goodsInfo.commonName== "" ?"none":"flex"}}>
          ({this.state.goodsInfo.commonName})
            </div>  </Flex.Item>
        </Flex>
        <Flex className="synopsis">
          <Flex.Item>{this.state.goodsInfo.goodsDesc}</Flex.Item>
        </Flex>
        <Flex justify="between" className="prices">
          <Flex direction="column" align="start">
            <div className="integral">{this.state.money}</div>
            <div className="integrals">原价：<span className="price">￥{Number(this.state.goodsInfo.goodsPrice)/100} </span> </div>
          </Flex>
          <Flex align="start" onClick={this.handleClick.bind(this)} className="unfold">
            {this.state.isToggleOn?<Flex align="start">更换 <Icon type="down" /></Flex>:<Flex align="start">收起<Icon type="up" /> </Flex>}
          </Flex>
        </Flex>
        <div className="price"></div>
        <div className="show" style={{display: this.state.showhide}}>
          {
            this.state.goodsPointses.map((val,key)=>(
              <label key={key} style={{display:'block',margin:" 0 0 20px 0"}} > <input type="radio" name='gender' value={key} onChange={this.handleChange.bind(this)} className="radio"  />{val.points}积分+{Number(val.pointsPrice)/100}元</label>
            ))
          }




          {/* <label style={{display:'block'}} > <input type="radio" name='gender' value="0积分+99.00元" onChange={this.handleChange.bind(this)} checked className="radio" />0积分+99.00元</label>
          <label style={{display:'block'}} > <input type="radio" name='gender' value="50积分+50.00元" onChange={this.handleChange.bind(this)} className="radio" />50积分+50.00元</label> */}
        </div>

        <Flex direction="column" align="start" className="locations" style={{display:this.state.goodsFlag== 1 ?"none":"flex"}}>
          <div className="location">医院地址</div>
          <Flex justify="between" className="julocation">
            <Flex direction="column" align="start">
              <div className="location1">{this.state.goodsInfo.clinicName}</div>
              <div className="location_first">{this.state.goodsInfo.clinicAddress}</div>
            </Flex>
            <a className="location_second" href={`tel:${this.state.goodsInfo.clinicPhone}`}><img className="phone" src={tsIcon} /></a>
            {/* <div className="location_second"><img className="phone" src={tsIcon} /></div> */}
          </Flex>
        </Flex>

        <Flex align="center" className="specification" style={{display:this.state.goodsSpecifications == "" ? "none":"flex"}}>
          产品规格：
          {
            this.state.goodsSpecifications.map((val,key)=>(
              <Flex key={key} justify="center" onClick={this.standard.bind(this,val,key)}      className={this.state.activeType == key ? 'combo-first' : 'specifications'} >{val.goodsSpecificationName}</Flex>
            ))
          }
          {/* <Flex justify="center" className="combo-first">套餐1</Flex>
          <Flex justify="center" className="specifications">套餐2</Flex> */}
        </Flex>
        



        {/* <Flex className="specification">
          产品规格：<Flex justify="center" className="specifications">1瓶装</Flex>
        </Flex> */}

        <Flex justify="between" className="amoun" style={{display:this.state.goodsFlag== 1 ?"flex":"none"}} >
          <div className="amount">购买数量：</div>
          <Flex className="amounts">
            {/* <input type="button" value='——' onClick={this.decrease.bind(this)} readOnly={true} className="normal" /> */}
            <div onClick={this.decrease.bind(this)} readOnly={true} className="normal"> <img src={jian} /> </div>
            <input value={this.state.num} className="addnor" readOnly={true} />
            {/* <input onClick={this.increase.bind(this)} type="button" value='+' readOnly={true}/> */}
            <div className="normal2" onClick={this.increase.bind(this)} readOnly={true}><img src={jia} /></div>
          </Flex>
        </Flex>
        <div className="price"></div>
        <Flex className="image-text">图文详情</Flex>
        {/* {this.state.goodsInfo.goodsDetail} */}
        <div className="locations" dangerouslySetInnerHTML={{
              __html: this.state.goodsInfo.goodsDetail
            }}/>

        <div className="Photo"></div>
        <div className="conversion" onClick={this.conversion.bind(this)}>立即兑换</div>


      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
