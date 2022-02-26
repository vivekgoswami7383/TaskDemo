const fs = require("fs")
const XLSX = require("xlsx")

const userData = JSON.parse(fs.readFileSync("./userData.json","utf-8"))

const newUserData = userData.map((user) => {
  const newObj = {
    name: user.title + " " + user.first_name + " " + user.last_name,
    username: user.username,
    email: user.email,
    phone_number: user.phone_number,
    birthdate: user.birthdate,
    address: user.location.street + + " " + user.location.city + " " + user.location.state +  " " + user.location.postcode
  }
  return newObj
})

const makeExcelFile = async () => {
  try {
    var ws = XLSX.utils.json_to_sheet(newUserData)
    ws['!cols'] = [{ width: 20 }, { width: 20 }, { width: 30 }, { width: 20 }, { width: 10 }, { width: 50 }];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws);
    XLSX.writeFile(wb, 'userdata.xlsx');
    console.log("File created 🎉!!");
  } catch (error) {
    console.log(error);
  }
}

makeExcelFile()
