let checkIsValidInput = (data, inputType) => {
   let isValid = true;
   let element = '';

   for (let i = 0; i < inputType.length; i++) {
      if (!data[inputType[i]]) {
         isValid = false;
         element = inputType[i];
         break;
      }
   }

   return {
      isValid: isValid,
      element: element
   }
}

module.exports = {
   checkIsValidInput
}