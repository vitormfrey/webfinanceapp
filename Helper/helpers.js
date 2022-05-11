// /**
//  * @function isValid()
//  * @return boolean
//  * @description This function check's if data is null our undefined
//  * */
function isValid(values) {
  values.map((value) => {
    if (value === undefined || value === "" || value === null) {
      throw new Error("Invalid data");
    }
  });
}

function containsBalance(balance) {
  let result = { success: true, value: 0, message: "" };
  if (balance.length > 0) result.value = parseFloat(balance[0].value);

  if (result.value > 0) {
    result.message =
      "This account contains balance, please transfer this balance to another account or zero your balance";
  } else {
    result.success = false;
  }

  return result;
}
module.exports.isValid = isValid;
module.exports.containsBalance = containsBalance;
