import constants from '../constants.js';

const Base64 = require('crypto/base64.js');
require('crypto/hmac.js');
require('crypto/sha1.js');
const Crypto = require('crypto/crypto.js');


const getPolicyBase64 = function () {
  let date = new Date();
  date.setHours(date.getHours() + constants.ALIYUN_UPLOAD_TIMEOUT);
  let srcT = date.toISOString();
  const policyText = {
    "expiration": srcT,
    "conditions": [
      ["content-length-range", 0, 20 * 1024 * 1024]
    ]
  };

  const policyBase64 = Base64.encode(JSON.stringify(policyText));
  return policyBase64;
}

const getSignature = function (policyBase64) {
  const accesskey = constants.ALIYUN_OSS_ACCESSKEY_SECRET;

  const bytes = Crypto.HMAC(Crypto.SHA1, policyBase64, accesskey, {
    asBytes: true
  });
  const signature = Crypto.util.bytesToBase64(bytes);

  return signature;
}

/**
 * 阿里云文件上传
 * 
 * @param filePath
 * @param fileW
 * @param objectId
 * @param successCB 成功回调
 * @param errorCB 错误回调
 */
const aliyunUploadFile = function (filePath, fileW, objectId, successCB, errorCB) {
  if (!filePath || filePath.length < 9) {
    wx.showModal({
      title: '图片错误',
      content: '请重试',
      showCancel: false,
    })
    return;
  }

  console.log('上传图片…');
  const aliyunFileKey = fileW + Base64.encode(filePath.replace('wxfile://', ''));

  // const aliyunFileKey = fileW;
  const policyBase64 = getPolicyBase64();
  const signature = getSignature(policyBase64);

  console.log('aliyunFileKey=', aliyunFileKey);
  console.log('filePath=', filePath);

  wx.uploadFile({
    url: constants.ALIYUN_UPLOAD_URL,
    filePath: filePath,
    name: 'file',
    formData: {
      'key': aliyunFileKey,
      'OSSAccessKeyId': constants.ALIYUN_OSS_ACCESSKEY_ID,
      'policy': policyBase64,
      'Signature': signature,
      'success_action_status': '200',
    },
    success: function (res) {
      if (res.statusCode != 200) {
        console.log(res)
        //errorCB(new Error('上传错误:' + JSON.stringify(res)))
        return;
      }
      console.log('上传视频成功', res)
      successCB(aliyunFileKey);
    },
    fail: function (err) {
      // err.wxaddinfo = aliyunServerURL;
      errorCB(err);
    },
  })
}


module.exports = {
  aliyunUploadFile
}