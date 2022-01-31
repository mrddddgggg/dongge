
const $ = new Env('搞鸡玩家-春晚击鼓助力');
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';

const randomCount = $.isNode() ? 20 : 5;
const notify = $.isNode() ? require('./sendNotify') : '';
let merge = {}
let inviteCodes = []
const logs =0;
let useInfo = {};
let allMessage = '';
//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [],
    cookie = '';
    var timestamp = Math.round(new Date().getTime()).toString();
if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item])
    })
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else {
    cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}

const JD_API_HOST = `https://api.m.jd.com/`;
!(async () => {
    if (!cookiesArr[0]) {
        $.msg($.name, '【提示】请先获取cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/', {
            "open-url": "https://bean.m.jd.com/"
        });
        return;
    }

    for (let i = 0; i < cookiesArr.length; i++) {
        cookie = cookiesArr[i];
        if (cookie) {
            $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
            $.index = i + 1;
            $.isLogin = true;
            $.nickName = '';
            $.beans = 0
            message = ''

           //await TotalBean();
            console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
            if (!$.isLogin) {
                $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                });

                if ($.isNode()) {
                    await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
                }
                continue
            }
await party_inviteWindow()
//await Xcoupon1('1_1_a507M9fB2HzeJIbSraYV3dqhzr5xoJ.json')
//await Xcoupon1('1_2_SZd4w5CzBbcRch5PAE5kmMvpbjcpDN.json')
        }
    }

  console.log(`\n开始账号内互助\n`);
  for (let i = 0; i < cookiesArr.length; i++) {
    cookie = cookiesArr[i];
    $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
    
    $.canHelp = true;
    for (let j = 0; j < inviteCodes.length && $.canHelp; j++) {
      $.oneCodeInfo = inviteCodes[j];
      if($.UserName === inviteCodes[j].usr || $.oneCodeInfo.max){
        continue;
      }
      console.log(`${$.UserName}去助力${inviteCodes[j].usr}`)
      
      await party_assist(inviteCodes[j].code);
      await $.wait(3000)
    }
  }
if ($.isNode() && allMessage) {
        await notify.sendNotify(`${$.name}`, `${allMessage}` )
    }
})()
    .catch((e) => {
        $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
    })
    .finally(() => {
        $.done();
  })

async function party_inviteWindow(){
 return new Promise((resolve) => {
     

   $.post(apipost(`party_inviteWindow`,'{"showAssistorsSwitch":true}'),async(error, response, data) =>{
       //$.log(data)
    try{
        const result = JSON.parse(data)
        
        if(logs)$.log(data)

          if(result.data.bizCode == 0){
        $.log(result.data.result.inviteCode)
        if(result.data.result.haveAssistedNum == false){
         inviteCodes.push({'usr':$.UserName, 'code':result.data.result.inviteCode, 'max':false})  
        }else
     inviteCodes.push({'usr':$.UserName, 'code':result.data.result.inviteCode, 'max':true})
     
    } else if(result.data.bizCode !== 0){
       console.log(result.data.bizMsg)
  }
          
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
  }  
  async function party_assist(inviteCode){
 return new Promise((resolve) => {
     

   $.post(apihelp(`party_assist`,inviteCode),async(error, response, data) =>{
       //$.log(data)
      try {
        if (error) {
          console.log(`${JSON.stringify(error)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            result = JSON.parse(data);
if(result.data.bizCode == 0){
            if(reust.data.bizMsg === `好友人气太高 不需要助力啦~`){
            $.oneCodeInfo.max = true;
          }else{
            $.canHelp = false;
          }
          $.log(`${reust.data.bizMsg}`)
    } else if(result.data.bizCode !== 0){
       console.log(result.data.bizMsg)
  }
          }
        }
      } catch (e) {
        $.logErr(e, response)
      } finally {
        resolve(data);
      }
    })
  })
}

function Xcoupon1(a) {
 return new Promise((resolve) => {
 
  const nm= {
    url: `https://storage22.360buyimg.com/couponresourcestatic/Xcoupon/${a}`,

    headers: {

        "Cookie": cookie,
        "Origin": "https://sfgala.jd.com",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",

    }
  }  
$.get(nm, async (err, resp, data) => {
       
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
             if(data.session==1){
             couponList = data.couponList
             for(let i=0;i<couponList.length;i++){
                 await apisend(couponList[i].backupCoupon.activityKey)
             }
             }else if(data.session!==1){
             console.log(data.msg)}
          }
        }
      } catch (e) {
        $.logErr(e, response)
      } finally {
        resolve(data);
      }
    })
  })
}



async function sendCoupon(activityKey){
 return new Promise((resolve) => {
     

   $.post(apisend(activityKey),async(error, response, data) =>{
     // console.log(`${JSON.stringify(apisend(activityKey))}`) 
      $.log(data)
      try {
        if (error) {
          console.log(`${JSON.stringify(error)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            result = JSON.parse(data);
if(result.data.bizCode == 200){

          $.log(`${reust.data.bizMsg}`)
    } else if(result.data.bizCode !== 200){
       console.log(result.data.bizMsg)
  }
          }
        }
      } catch (e) {
        $.logErr(e, response)
      } finally {
        resolve(data);
      }
    })
  })
}

function apisend(activityKey) {
 return new Promise((resolve) => {
    let nm= {
        url: `https://api-x.m.jd.com/api/sendCoupon`,
        body:`h5st=20220131130251951%3B2678330412875363%3B47ab8%3Btk01w9b361bc141lM3gyVGFOLVM3ZM4mgviz42ddDXe3NdTRHtWDPWXIkeuJpQWriVC%2Fi7hUbHifnkxIFAlj2%2F20kHg%2F%3Bbbd9876b445094bf897aac7b70b5164aee67276e8268475eb42f1bda781ec7c5%3B3.1%3B1643605371951&functionId=coupon_sendCouponNew&body={"activityKey":"${activityKey}","appId":"RichCoupon","appToken":"3F2922F1_0E943E19","platformId":"RichCoupon","platformToken":"3F2922F1_555193B0","uuid":"8888888","sv":"f4ca959cdb175b1e311da360588e18407e0e52b5181aef43c51991e92f2a5a5a","sk":"3g4Hfc1sw25_L8hQBERm8KbpvCmrFvWsO6Jr9MPOSXkRjY2Kz04pAOn9oXFc4zHyk-2TjWLu64xnVrvJBAuANGOILofqxsaCJq8CRwt8USELD2hI"}&client=wh5&appid=spring_h5&t=1643605371913`,
        headers: {
'Host': 'api-x.m.jd.com',
'Connection':' keep-alive',

'Accept': 'application/json',
'Content-Type': 'application/x-www-form-urlencoded',
'sec-ch-ua-mobile': '?1',
'User-Agent': 'jdapp;android;10.3.4;;;appBuild/92451;ef/1;ep/%7B%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22ts%22%3A1643260939949%2C%22ridx%22%3A-1%2C%22cipher%22%3A%7B%22sv%22%3A%22CJK%3D%22%2C%22ad%22%3A%22DzK0EJG0CwG3ZJGnDJSzCq%3D%3D%22%2C%22od%22%3A%22G0Y1DJrMCuVNCtDQDOSyCUS2EUZPGJqzDJO3CuHOHtO2CzVsEQC2ZwY5ZJdwZJGzCtTuDJO0CWDsZwCmCJTtCK%3D%3D%22%2C%22ov%22%3A%22Ctu%3D%22%2C%22ud%22%3A%22DzK0EJG0CwG3ZJGnDJSzCq%3D%3D%22%7D%2C%22ciphertype%22%3A5%2C%22version%22%3A%221.2.0%22%2C%22appname%22%3A%22com.jingdong.app.mall%22%7D;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 10; PCAM00 Build/QKQ1.190918.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/045935 Mobile Safari/537.36',

'Origin': 'https://sfgala.jd.com',

'Referer': 'https://sfgala.jd.com/',
'Cookie': cookie,

        }
    }
       $.post(nm,async(error, response, data) =>{
     // console.log(`${JSON.stringify(apisend(activityKey))}`) 
      $.log(data)
      try {
        if (error) {
          console.log(`${JSON.stringify(error)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            result = JSON.parse(data);
if(result.data.bizCode == 200){

          $.log(`${reust.data.bizMsg}`)
    } else if(result.data.bizCode !== 200){
       console.log(result.data.bizMsg)
  }
          }
        }
      } catch (e) {
        $.logErr(e, response)
      } finally {
        resolve(data);
      }
    })
  })
}

function apihelp(functionId,inviteCode) {

    return {
        url: `https://api.m.jd.com/`,
        body:`h5st=20220131120036855%3B6639766395801575%3B47ab8%3Btk01w6b461ac941lMngzSVVHM0FEw8MQJIcA4El0IIeWOh%2F7KUYZEI2iw72oTwRGq%2FYi13JTfMmYPASVG%2FimgGreeW6H%3Be2bbeab279e9748e4699211a9e97060c029212a40ac118c80263a7fce8c4e66c%3B3.1%3B1643601636855&functionId=${functionId}&body={"inviteCode":"${inviteCode}","uuid":"8888","sv":"f4ca959cdb175b1e311da360588e18407e0e52b5181aef43c51991e92f2a5a5a"}&client=wh5&clientVersion=1.0.0&appid=spring_h5&t=1643601636819`,
        headers: {
'Host': 'api-x.m.jd.com',
'Connection':' keep-alive',

'Accept': 'application/json',
'Content-Type': 'application/x-www-form-urlencoded',
'sec-ch-ua-mobile': '?1',
'User-Agent': 'jdapp;android;10.3.4;;;appBuild/92451;ef/1;ep/%7B%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22ts%22%3A1643260939949%2C%22ridx%22%3A-1%2C%22cipher%22%3A%7B%22sv%22%3A%22CJK%3D%22%2C%22ad%22%3A%22DzK0EJG0CwG3ZJGnDJSzCq%3D%3D%22%2C%22od%22%3A%22G0Y1DJrMCuVNCtDQDOSyCUS2EUZPGJqzDJO3CuHOHtO2CzVsEQC2ZwY5ZJdwZJGzCtTuDJO0CWDsZwCmCJTtCK%3D%3D%22%2C%22ov%22%3A%22Ctu%3D%22%2C%22ud%22%3A%22DzK0EJG0CwG3ZJGnDJSzCq%3D%3D%22%7D%2C%22ciphertype%22%3A5%2C%22version%22%3A%221.2.0%22%2C%22appname%22%3A%22com.jingdong.app.mall%22%7D;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 10; PCAM00 Build/QKQ1.190918.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/045935 Mobile Safari/537.36',

'Origin': 'https://sfgala.jd.com',

'Referer': 'https://sfgala.jd.com/',
'Cookie': cookie,

        }
    }
}

function apipost(functionId,body) {

    return {
        url: `https://api-x.m.jd.com/`,
        body:`functionId=${functionId}&body=${body}&client=wh5&clientVersion=1.0.0&appid=spring_h5`,

        headers: {
'Host': 'api-x.m.jd.com',
'Connection':' keep-alive',

'Accept': 'application/json, text/plain, */*',
'Content-Type': 'application/x-www-form-urlencoded',
'sec-ch-ua-mobile': '?1',
'User-Agent': 'jdapp;android;10.3.4;;;appBuild/92451;ef/1;ep/%7B%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22ts%22%3A1643260939949%2C%22ridx%22%3A-1%2C%22cipher%22%3A%7B%22sv%22%3A%22CJK%3D%22%2C%22ad%22%3A%22DzK0EJG0CwG3ZJGnDJSzCq%3D%3D%22%2C%22od%22%3A%22G0Y1DJrMCuVNCtDQDOSyCUS2EUZPGJqzDJO3CuHOHtO2CzVsEQC2ZwY5ZJdwZJGzCtTuDJO0CWDsZwCmCJTtCK%3D%3D%22%2C%22ov%22%3A%22Ctu%3D%22%2C%22ud%22%3A%22DzK0EJG0CwG3ZJGnDJSzCq%3D%3D%22%7D%2C%22ciphertype%22%3A5%2C%22version%22%3A%221.2.0%22%2C%22appname%22%3A%22com.jingdong.app.mall%22%7D;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 10; PCAM00 Build/QKQ1.190918.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/045935 Mobile Safari/537.36',

'Origin': 'https://sfgala.jd.com',
'Sec-Fetch-Site': 'same-site',
'Sec-Fetch-Mode': 'cors',
'Sec-Fetch-Dest': 'empty',
'Referer': 'https://sfgala.jd.com/',
'Cookie': cookie,

        }
    }
}

function jsonParse(str) {
    if (typeof str == "string") {
        try {
            return JSON.parse(str);
        } catch (e) {
            console.log(e);
            $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie')
            return [];
        }
    }
}
function safeGet(data) {
  try {
    if (typeof JSON.parse(data) == "object") {
      return true;
    }
  } catch (e) {
    console.log(e);
    console.log(`京东服务器访问数据为空，请检查自身设备网络情况`);
    return false;
  }
}

function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
