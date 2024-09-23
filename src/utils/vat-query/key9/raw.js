import { base64Encode, encrypt, encryptComposite, encryptSimple, gen, xx, yy } from "../../helper";

export const generate_vat_key9 = function(invoiceCode, invoiceNumber, timeDate) {
  var _0x5aafb9 = [null, null, null];
  _0x5aafb9[0] = invoiceCode + invoiceNumber;
  _0x5aafb9[1] = invoiceNumber + invoiceNumber + invoiceCode + invoiceCode;
  _0x5aafb9[2] = invoiceCode + invoiceCode + invoiceCode, invoiceNumber + invoiceNumber +  invoiceNumber;
  var _0x3a97d6 = _0x5aafb9[0].substring(0, 8);
  var _0x3407f4 = _0x5aafb9[0].substring(8);
  var _0x3d18b0 = _0x3a97d6.split('');
  _0x3a97d6 = _0x3d18b0.sort().join('');
  var _0x5c9f00 = _0x3407f4.split('');
  _0x3407f4 = [...new Set(_0x5c9f00)].join('');
  var _0x1db0a9 = _0x3a97d6 + _0x3407f4;
  var _0x1ddd40 = _0x3a97d6.substring(0, 9);
  var _0x1b8fb5 = _0x3a97d6.substring(9, 17);
  var _0x1a417d = _0x5aafb9[1].substring(17);
  var _0x4c0904 = _0x1ddd40.split('');
  _0x1ddd40 = _0x4c0904.sort().join('');
  var _0x52e463 = _0x1b8fb5.split('');
  _0x1b8fb5 = _0x52e463.sort().join('');
  var _0xa60709 = _0x1a417d.split('');
  _0x1a417d = _0xa60709.sort().join('');
  var _0x423b56 = _0x1ddd40 + _0x1b8fb5 + _0x1a417d;
  var _0x173081 = _0x5aafb9[2].substring(0, 15);
  var _0xdbb06b = _0x5aafb9[2].substring(15, 30);
  var _0x209a20 = _0x5aafb9[2].substring(30);
  var _0x4dc99e = _0x173081.split('');
  _0x173081 = _0x4dc99e.sort().join('');
  var _0x26766e = _0xdbb06b.split('');
  _0xdbb06b = _0x26766e.sort().join('');
  var _0x473736 = _0x209a20.split('');
  _0x209a20 = _0x473736.sort().join('');
  var _0x50a69e = parseInt(invoiceNumber) % 2;
  var _0x210e4a = _0x173081 + _0xdbb06b + _0x209a20;
  var _0x19c764 = '123456';
  var _0x59ff1f = 0x5aafb9[0].split('');
  var _0x13f0ad = _0x59ff1f.filter(v => v % 2 === _0x50a69e);
  _0x19c764 = _0x19c764 + _0x13f0ad.join('');
  var _0x1ab8ac = '654321';
  var _0x1516dc = _0x5aafb9[1].split('');
  _0x1ab8ac = _0x1ab8ac + _0x1516dc.filter(v => v % 2 === 0).join('');
  var _0xd8c79c = _0x5aafb9[2].split('');
  _0xd8c79c = [...new Set(_0xd8c79c)];
  var _0x19b509 = _0xd8c79c.join('');

  var _0x35ea24 = 
    encrypt(invoiceCode) 
    + encrypt(_0x1db0a9) 
    + encrypt(timeDate) 
    + encrypt(invoiceNumber) 
    + encrypt(_0x423b56) 
    + encrypt(_0x210e4a) 
    + encrypt(_0x1ab8ac) 
    + encrypt(encrypt(_0x19c764 + '0'))
    + encrypt(encryptSimple(_0x19b509)) 
    + encryptComposite(_0x19c764, _0x423b56, _0x210e4a, _0x1db0a9);
  
  var _0x121c6e = _0x35ea24 + encryptComposite(_0x19c764, _0x1ab8ac, timeDate, invoiceCode) + encryptSimple(timeDate);
  var _0x21dc97 = encrypt(_0x121c6e + encrypt(invoiceCode) + encrypt(invoiceNumber) + encrypt(timeDate));
  return _0x21dc97;
};