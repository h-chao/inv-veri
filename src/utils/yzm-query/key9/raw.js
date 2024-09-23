const encrypt = () => {};
const yy = (val = '') => {
  return val.length + val.length * 6
}
const xx = (val = '') => {
  if (val.length > 12) {
    throw new Error('val 长度不能大于 12')
  }

  if (val.length  === 1) {
    return val;
  }

  return val.substring(0, 2);
}

const encode = (val = '') => {
  const result = [];
  const STR = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`;
  const val1 = val.charCodeAt(0) << 16 | val.charCodeAt(1) << 8;
  result.push(
    STR.charAt(val1 >> 18)
    + STR.charAt(val1 >> 12 & 63)
    + STR.charAt(val1 >> 6 & 63)
    + '='
  )
  return result.join('')
}

const gen = (v1 = '', v2 = '') => {
  const code1 = encrypt(String(v1));
  const code2 = code1 + v2;
  const code3 = '402880bd5c76101f015c903ee811504e';
  const code4 = String(v1).trim().length;
  return encrypt(code1 + code2 + code3 + code4).toUpperCase();
}

const generate_yzm_key9 = function (
  invoiceCode,
  invoiceNumber,
  timeStamp
) {
  var list = [];
  list[0] = invoiceNumber + invoiceCode;
  list[1] = invoiceCode + invoiceNumber + invoiceNumber + invoiceCode;
  list[2] =
    invoiceNumber +
    invoiceCode +
    invoiceNumber +
    invoiceCode +
    invoiceCode +
    invoiceCode;

  var _0x29e7e4 = list[0].substring(0, 8);
  var _0x44be20 = list[0].substring(8);
  var _0x2d45be = _0x29e7e4.split("");
  _0x29e7e4 = _0x2d45be.sort().join('');
  var _0x837e1d = _0x44be20.split('').sort();
  _0x44be20 = _0x837e1d.join('');
  var _0x572a2c = encrypt(_0x29e7e4) + _0x44be20;
  var _0x3a2c3e = list[1].substring(0, 9);
  var _0x271766 = list[1].substring(9, 17);
  var _0x2a5b86 = list[1].substring(17);
  var _0x4580af = _0x3a2c3e.split('');
  _0x3a2c3e = _0x4580af.sort().join('');
  var _0x302bb1 = _0x271766.split('');
  _0x271766 = _0x302bb1.sort().join('');
  var _0x5766c8 = _0x2a5b86.split('');
  _0x2a5b86 = _0x5766c8.sort().join('');
  var _0x51ebe2 = _0x3a2c3e + encrypt(_0x271766) + _0x2a5b86;
  var _0x2298c2 = list[2].substring(0, 15);
  var _0x25e24d = list[2].substring(15, 30);
  var _0x46a330 = list[2].substring(30);
  var _0x38db90 = _0x2298c2.split('');
  _0x2298c2 = _0x38db90.sort().join('');
  var _0x239b8e = _0x25e24d.split('');
  _0x25e24d = _0x239b8e.sort().join('');
  var _0x37d699 = _0x46a330.split('');
  _0x46a330 = _0x37d699.sort().join('');
  var _0xd31618 = _0x2298c2 + _0x25e24d + encrypt(_0x46a330);
  var _0xb4203d = parseInt(invoiceNumber) % 2;
  var _0x482407 = '123456';
  var _0x5bf3c4 = list[0].split('');
  var _0x41d1e6 = _0x5bf3c4.filter(v => parseInt(v) % 2 === 0);
  _0x482407 = _0x482407 + _0x41d1e6.join('');
  var _0x223dcd = "654321";
  var _0x97e7a4 = list[1].split('');
  _0x223dcd = _0x223dcd + _0x97e7a4.filter(v => parseInt(v) % 2 === 0);
  var _0x3f2843 = list[2].split('');
  _0x3f2843 = [...new Set(_0x3f2843)];
  var _0xabfbee = _0x3f2843.sort().join('');
  const _0x51e135 = encrypt(
    encrypt(_0xabfbee) 
    + yy(_0xabfbee)
    + gen(xx(_0xabfbee), encode(xx(_0xabfbee)))
  ).toUpperCase()

  const _0x17591d = (v1, v2, v3, v4) => {
    return encrypt(
      encrypt(v1) + yy(v2) + gen(xx(v3), encode(xx(v4))) + encrypt(v4)
    ).toUpperCase()
  }

  const _0x53ff92 = (val) => {
    return encrypt(
      encrypt(val) + yy(val) + gen(xx(val) + encode(xx(val)))
    )
  }

  var _0x198a50 = encrypt(timeStamp) 
    +  encrypt(invoiceNumber + '0') 
    + encrypt(invoiceCode) 
    + encrypt(_0x572a2c)
    + encrypt(_0x51ebe2) 
    + encrypt(_0xd31618) 
    + encrypt(_0x482407) 
    + encrypt(_0x223dcd) 
    + encrypt(_0x51e135) 
    + _0x17591d(_0x572a2c, _0x51ebe2, _0xd31618, _0x482407);
  
  var _0x59886c = _0x198a50
    + _0x17591d(_0x482407, _0x223dcd, invoiceCode, timeStamp) 
    + _0x53ff92(timeStamp);

  var _0x1e602a = encrypt(
    _0x59886c 
    + encrypt(timeStamp) 
    + encrypt(invoiceNumber)
    + encrypt(invoiceCode)
  );
  
  return _0x1e602a;
};
