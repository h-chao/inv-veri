import { encrypt, encryptComposite, encryptSimple } from "../../helper";

export const generate_yzm_key9 = function (
  invoiceCode,
  invoiceNumber,
  timeStamp
) {
  var combinations = [];

  combinations[0] = invoiceNumber + invoiceCode;
  combinations[1] = invoiceCode + invoiceNumber + invoiceNumber + invoiceCode;
  combinations[2] =
    invoiceNumber +
    invoiceCode +
    invoiceNumber +
    invoiceCode +
    invoiceCode +
    invoiceCode;

  var part1 = combinations[0].substring(0, 8);
  var part2 = combinations[0].substring(8);
  var part1Array = part1.split("");
  part1 = part1Array.sort().join("");
  var part2Array = part2.split("").sort();
  part2 = part2Array.join("");
  var encryptedPart1 = encrypt(part1) + part2;

  var part3 = combinations[1].substring(0, 9);
  var part4 = combinations[1].substring(9, 17);
  var part5 = combinations[1].substring(17);
  var part3Array = part3.split("");
  part3 = part3Array.sort().join("");
  var part4Array = part4.split("");
  part4 = part4Array.sort().join("");
  var part5Array = part5.split("");
  part5 = part5Array.sort().join("");
  var encryptedPart2 = part3 + encrypt(part4) + part5;

  var part6 = combinations[2].substring(0, 15);
  var part7 = combinations[2].substring(15, 30);
  var part8 = combinations[2].substring(30);
  var part6Array = part6.split("");
  part6 = part6Array.sort().join("");
  var part7Array = part7.split("");
  part7 = part7Array.sort().join("");
  var part8Array = part8.split("");
  part8 = part8Array.sort().join("");
  var encryptedPart3 = part6 + part7 + encrypt(part8);

  var staticValue1 = "123456";
  var filteredEvenNumbers1 = combinations[0]
    .split("")
    .filter((v) => parseInt(v) % 2 === 0);
  staticValue1 = staticValue1 + filteredEvenNumbers1.join("");
  var staticValue2 = "654321";
  var filteredEvenNumbers2 = combinations[1]
    .split("")
    .filter((v) => parseInt(v) % 2 === 0);
  staticValue2 = staticValue2 + filteredEvenNumbers2.join("");
  var uniqueSortedArray = [...new Set(combinations[2].split(""))];
  var uniqueSortedString = uniqueSortedArray.sort().join("");

  // const encryptedFinalValue1 = encrypt(
  //   encrypt(uniqueSortedString)
  //   + yy(uniqueSortedString)
  //   + gen(xx(uniqueSortedString), base64Encode(xx(uniqueSortedString)))
  // ).toUpperCase();

  var encryptedTimestamp =
    encrypt(timeStamp) +
    encrypt(encrypt(invoiceNumber + "0")) +
    encrypt(invoiceCode) +
    encrypt(encryptedPart1) +
    encrypt(encryptedPart2) +
    encrypt(encryptedPart3) +
    encrypt(staticValue1) +
    encrypt(staticValue2) +
    encrypt(encryptSimple(uniqueSortedString)) +
    encryptComposite(
      encryptedPart1,
      encryptedPart2,
      encryptedPart3,
      staticValue1
    );

  var finalEncryptedString =
    encryptedTimestamp +
    encryptComposite(staticValue1, staticValue2, invoiceCode, timeStamp) +
    encryptSimple(timeStamp);

  var finalHash = encrypt(
    finalEncryptedString +
      encrypt(timeStamp) +
      encrypt(invoiceNumber) +
      encrypt(invoiceCode)
  );

  return finalHash;
};
