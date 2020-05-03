const sendSms =  (receptor, message) => {
  return {result: message + "\n\n" + " sms send to " + receptor +" successfully"}
};


module.exports = {
  sendSms
};