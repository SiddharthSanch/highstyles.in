// export function generateOrderID() {
//   const currentDate = new Date();
//   const year = currentDate.getFullYear().toString().slice(-2);
//   const month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
//   const day = ("0" + currentDate.getDate()).slice(-2);
//   const randomDigits = Math.floor(100000 + Math.random() * 900000);
//   const ID = `HS${year}Y${month}M${day}D_${randomDigits}`;
//   return ID;
// }
// export function generateInvoiceId() {
//     var alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
//     var invoiceId = '';
//     for (var i = 0; i < 8; i++) {
//         invoiceId += alphanumeric.charAt(Math.floor(Math.random() * alphanumeric.length));
//     }
//     return `HS_Invoice_${invoiceId}`;
// }
export function generateOrderID() {
  const min = 1000000;
  const max = 9999999;
  const uniqueOrderID = Math.floor(Math.random() * (max - min + 1)) + min;
  console.log(uniqueOrderID);
  return uniqueOrderID;
}
