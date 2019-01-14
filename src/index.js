const request = require('request');
const fs = require('fs');
const Socks5ClientHttpsAgent = require('socks5-https-client/lib/Agent');
let source = require('./test.json').data;
var iconv = require('iconv-lite')
var cheerio = require("cheerio");

source = JSON.parse(JSON.stringify(source));
async function makeReq(currentItem) {
  var options = {
    url: currentItem['7'],
    // url: 'https://www.google.com',
    headers: {
      'accept': ' text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'accept-encoding': ' gzip, deflate, br',
      'accept-language': ' zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7',
      'cache-control': ' no-cache',
      'cookie': ' NID=154=ofpmSrVJKIPeR078RiOrFKyEScGShg9pxQc1BdT2H_Uguh-Ivr4omE2mKuaxylNAw2516zyXgypIaTe76Uw_L8ejlfZSRqDiiH8RRFaSRDM1HnXBStT-75lKeYup1ZcWbeqH-cm-yb1yazYEC9GvlkNaOjuYOoj78yfI6cUeaho; OSID=8wapG1sEU5pbbuE93QDmh16Ga9tkFj2il5ofKSFX1riGOC63SkkU3R-gRKx5sHdSZYPXXw.; _ga=GA1.3.845800548.1547451367; _gid=GA1.3.1092744012.1547451367; OTZ=4752456_24_24__24_; SID=8wapG9R7DwAb3UIv5ZLmpFK-127zBut2CyEUVOjRbeLB9P-f-PJM2Rj2kt0cISaUGcUEww.; HSID=Al3CCZM_jczWL8GeL; SSID=A29rDMtXmJqGRZ49c; APISID=BGNZsQl4Tek657Gm/Azl5-yRZtKkSwomIf; SAPISID=FpG-DxitZH3CaKR0/AGBCtvnTLpzmxANEd; CPH_SID=8wapG1hP95Sfq3ieQci3i0uoVc8NssXLX-9UC9D-IqFgvH67fRESpfiZCb5vt2FpxA35lw.; enabledapps.uploader=0; __utma=205229632.845800548.1547451367.1547455602.1547455602.1; __utmc=205229632; __utmz=205229632.1547455602.1.1.utmcsr=accounts.google.com|utmccn=(referral)|utmcmd=referral|utmcct=/signin/v2/sl/pwd; __utmt=1; 1P_JAR=2019-1-14-8; __utmb=205229632.2.10.1547455602; _gat_UA806539331=1',
      'pragma': ' no-cache',
      'upgrade-insecure-requests': ' 1',
      'user-agent': ' Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
    },
    gzip: true,
  };
  options.agent = new Socks5ClientHttpsAgent({socksHost: '127.0.0.1', socksPort: 1086});
  await promiseReq(options, currentItem)
}

function promiseReq(options, currentItem) {
  return new Promise((resolve, reject) => {
    request(options, function(err, res, body) {
      console.log('err', err);
      if (err) return;
      // console.log('page', body)
      const $ = cheerio.load(body);
      let a = $("div.OduPLd").text();
      a = a.replace(/com/g, 'com---').split('---')
      if (a[a.length -1] === '') {
        a.pop();
        console.log('ppppppppppppppp')
      }
      console.log('=========', a)
      currentItem['8'] = a;
      // if (!err) {
      //   fs.writeFileSync('./output.html', body)
      // }
      console.log(currentItem);
      resolve()
    });
  })

}
async function start () {
  console.warn(source.length)
  for (let i = 0; i < source.length; i++ ) {
    await makeReq(source[i]);
    await wait();
  }
  fs.writeFileSync('./final.json', JSON.stringify(source));
}

async function wait() {
  return new Promise((resolve) => {
    setTimeout(() => { resolve() }, 1000);
  })
}

start();
