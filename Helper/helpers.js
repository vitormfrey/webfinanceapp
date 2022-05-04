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

module.exports.isValid = isValid;
