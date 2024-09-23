import CryptoJS from 'crypto-js';

export const encrypt = (str = '') => CryptoJS.MD5(str).toString();

export const yy = (str = '') => str.length + str.length * 6;

export const xx = (str = '') => {
  if (str.length >= 12) {
    return str.substring(0, 11);
  }

  if (str.length  === 1) {
    return str;
  }

  return str.substring(0, 2);
}

export const base64Encode = (str = '') => {
  // Base64字符集
  const base64Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

  // 检查输入是否为空，如果为空则直接返回
  if (str.length === 0) {
      return str;
  }

  // 将输入字符串转换为字符串类型（如果不是）
  str = String(str);

  // 定义结果数组，用于存储编码后的字符
  const encodedResult = [];

  // 计算可被3整除的最大长度
  const lengthToProcess = str.length - (str.length % 3);

  // 循环遍历每3个字符，将它们转换为Base64
  for (let i = 0; i < lengthToProcess; i += 3) {
      // 将3个字符拼接成一个24位的整数
      const tripleBytes = (str.charCodeAt(i) << 16)
          | (str.charCodeAt(i + 1) << 8)
          | (str.charCodeAt(i + 2));

      // 分别提取出6位并将它们映射到Base64字符集
      encodedResult.push(base64Chars.charAt(tripleBytes >> 18 & 63));
      encodedResult.push(base64Chars.charAt(tripleBytes >> 12 & 63));
      encodedResult.push(base64Chars.charAt(tripleBytes >> 6 & 63));
      encodedResult.push(base64Chars.charAt(tripleBytes & 63));
  }

  // 处理剩余不足3个字符的部分，按Base64编码规则进行补齐
  const remainingChars = str.length - lengthToProcess;

  if (remainingChars === 1) {
      // 处理剩余1个字符
      const singleByte = str.charCodeAt(lengthToProcess) << 16;
      encodedResult.push(base64Chars.charAt(singleByte >> 18 & 63));
      encodedResult.push(base64Chars.charAt(singleByte >> 12 & 63));
      encodedResult.push("==");
  } else if (remainingChars === 2) {
      // 处理剩余2个字符
      const doubleBytes = (str.charCodeAt(lengthToProcess) << 16)
          | (str.charCodeAt(lengthToProcess + 1) << 8);
      encodedResult.push(base64Chars.charAt(doubleBytes >> 18 & 63));
      encodedResult.push(base64Chars.charAt(doubleBytes >> 12 & 63));
      encodedResult.push(base64Chars.charAt(doubleBytes >> 6 & 63));
      encodedResult.push("=");
  }

  // 返回拼接后的Base64编码字符串
  return encodedResult.join('');
}


export const gen = (str1 = '', str2 = '') => {
  const code1 = encrypt(String(str1));
  const code2 = code1 + str2;
  const code3 = '402880bd5c76101f015c903ee811504e';
  const code4 = String(str1).trim().length;
  return encrypt(code1 + code2 + code3 + code4).toUpperCase();
}

export const encryptComposite = (val1, val2, val3, val4) => {
  return encrypt(
    encrypt(val1) + yy(val2) + gen(xx(val3), base64Encode(xx(val4)))
  ).toUpperCase();
}

export const encryptSimple = (val) => {
  return encrypt(
    encrypt(val) + yy(val) + gen(xx(val), base64Encode(xx(val)))
  ).toUpperCase();
}


