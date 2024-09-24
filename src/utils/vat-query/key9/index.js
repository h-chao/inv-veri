import { encrypt, encryptComposite, encryptSimple } from "../../helper";

// 生成增值税发票查验接口 key9

export const generate_vat_key9 = function (
  invoiceCode,
  invoiceNumber,
  timeDate
) {
  var vatComponents = [null, null, null];
  vatComponents[0] = invoiceCode + invoiceNumber;
  vatComponents[1] = invoiceNumber + invoiceNumber + invoiceCode + invoiceCode;
  vatComponents[2] =
    invoiceCode +
    invoiceCode +
    invoiceCode +
    invoiceNumber +
    invoiceNumber +
    invoiceNumber;

  var codePrefix = vatComponents[0].substring(0, 8);
  var codeSuffix = vatComponents[0].substring(8);
  var sortedCodePrefix = codePrefix.split("").sort().join("");
  var uniqueCodeSuffix = codeSuffix.split('').sort().join("");

  var combinedCode = sortedCodePrefix + uniqueCodeSuffix;
  var firstPart = vatComponents[1].substring(0, 9);
  var secondPart = vatComponents[1].substring(9, 17);
  var thirdPart = vatComponents[1].substring(17);

  var sortedFirstPart = firstPart.split("").sort().join("");
  var sortedSecondPart = secondPart.split("").sort().join("");
  var sortedThirdPart = thirdPart.split("").sort().join("");

  var combinedParts = sortedFirstPart + sortedSecondPart + sortedThirdPart;

  var componentPart1 = vatComponents[2].substring(0, 15);
  var componentPart2 = vatComponents[2].substring(15, 30);
  var componentPart3 = vatComponents[2].substring(30);
  var sortedComponentPart1 = componentPart1.split('').sort().join('');
  var sortedComponentPart2 = componentPart2.split('').sort().join('');
  var sortedComponentPart3 = componentPart3.split('').sort().join('');
  var combinedComponent = sortedComponentPart1 + sortedComponentPart2 + sortedComponentPart3;
  var numberParity = parseInt(invoiceNumber) % 2;
  var initialValue = "123456";
  var filteredVatComponent = vatComponents[0]
    .split("")
    .filter((v) => v % 2 === numberParity);
  initialValue += filteredVatComponent.join("");

  var secondaryValue = "654321";
  var secondaryFilteredVatComponent = vatComponents[1]
    .split("")
    .filter((v) => v % 2 === numberParity);
  secondaryValue += secondaryFilteredVatComponent.join("");

  var uniqueVatComponent = [...new Set(vatComponents[2].split(""))].sort().join("");

  var finalEncryptedKey =
    encrypt(invoiceCode) +
    encrypt(combinedCode) +
    encrypt(timeDate) +
    encrypt(invoiceNumber) +
    encrypt(combinedParts) +
    encrypt(combinedComponent) +
    encrypt(secondaryValue) +
    encrypt(encrypt(initialValue + "0")) +
    encrypt(encryptSimple(uniqueVatComponent)) +
    encryptComposite(
      initialValue,
      combinedParts,
      combinedComponent,
      combinedCode
    );

  var intermediateKey =
    finalEncryptedKey +
    encryptComposite(initialValue, secondaryValue, timeDate, invoiceCode) +
    encryptSimple(timeDate);
  var finalKey = encrypt(
    intermediateKey +
      encrypt(invoiceCode) +
      encrypt(invoiceNumber) +
      encrypt(timeDate)
  );

  return finalKey;
};
