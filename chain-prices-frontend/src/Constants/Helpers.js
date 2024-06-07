export const capitalizeFirstLetter = (str) => {
   if (typeof str !== 'string' || str.length === 0) {
      return str;
   }
   return str.charAt(0).toUpperCase() + str.slice(1);
}

export const convertToReadableFormat = (str) => {
   if (typeof str !== 'string' || str.length === 0) {
      return str;
   }
   let result = str.replace(/([A-Z])/g, ' $1');
   result = result.charAt(0).toUpperCase() + result.slice(1);
   return result;
}

export const convertTimestampToDate = (timestamp) => {
   const date = new Date(timestamp * 1000);
   const year = date.getFullYear();
   const month = (date.getMonth() + 1).toString().padStart(2, '0');
   const day = date.getDate().toString().padStart(2, '0');
   return `${day}.${month}.${year}`;
}

export const convertTimestampToTime = (timestamp) => {
   const date = new Date(timestamp * 1000);
   const hours = date.getHours().toString().padStart(2, '0');
   const minutes = date.getMinutes().toString().padStart(2, '0');   
   const seconds = date.getSeconds().toString().padStart(2, '0');   
   return `${hours}:${minutes}:${seconds}`;
}