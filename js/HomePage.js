// employee payroll is an array which will contain objects read from local storage
// using this we will populate the table data

let empPayrollList;
//as soon the page loades we want this inner html function to be called
window.addEventListener('DOMContentLoaded', (event) => {
    //caling to read from local storage
  empPayrollList = getEmployeePayrollDataFromStorage();
  //updating the count of elements by setting textcontent to lenth of
  document.querySelector(".emp-count").textContent = empPayrollList.length;
  createInnerHtml();
  localStorage.removeItem('editEmp');
});

//calling from eventlistener as soon as the web page is loaded
const getEmployeePayrollDataFromStorage = () => {
     //it will go the local storage fetch the info if it is there convert to json otherwise return empty list
  return localStorage.getItem('EmployeePayrollList') ?
    JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
}

//creating inner html to dynamically input data during run time from js file
//we are using template literals which allows embedded expression
//template literals are enclosed by a backticl ``
//we can also inject expressions in template literal using $ sign
const createInnerHtml = () => {
  if (empPayrollList.length == 0) return;
  const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th>" +
    "<th>Salary</th><th>Start Date</th><th>Actions</th>";
     //using template literal
  let innerHtml = `${headerHtml}`;
  for (const empPayrollData of empPayrollList) {
    innerHtml = `${innerHtml}
    <tr>
      <td><img class="profile" alt="" 
                src="${empPayrollData._profilePic}">
      </td>
      <td>${empPayrollData._name}</td>
      <td>${empPayrollData._gender}</td>
      <td>${getDeptHtml(empPayrollData._department)}</td>
      <td>${empPayrollData._salary}</td>
      <td>${stringifyDate(empPayrollData._startDate)}</td>
      <td>
      <img id="${empPayrollData._id}" onclick="remove(this)" 
            src="../assets/icons/delete-black-18dp.svg" alt="delete">
      <img id="${empPayrollData._id}" onclick="update(this)" 
            src="../assets/icons/create-black-18dp.svg" alt="edit">
      </td>
    </tr>
    `;
  }
  document.querySelector('#table-display').innerHTML = innerHtml;
}
//for multiple department using loop.
const getDeptHtml = (deptList) => {
  let deptHtml = '';
  for (const dept of deptList) {
    deptHtml = `${deptHtml} <div class='dept-label'>${dept}</div>`
  }
  return deptHtml;
}
//This is delete method
//here this is node that is passed 
// Remove a particular employee from homePage and hence update the localstorage to fetch the data
const remove = (node) => {
  //using empPayrollList we are retrieving the employee data  whose employee id is same as node id as given.
  let empPayrollData = empPayrollList.find(empData => empData._id == node.id);
  if (!empPayrollData) return;

  const index = empPayrollList.map(empData => empData._id).indexOf(empPayrollData._id);
  empPayrollList.splice(index, 1);
  //setting into local storage by converting into json format because we have string formate
  localStorage.setItem("EmployeePayrollList", JSON.stringify(empPayrollList));
  //updating count of data
  document.querySelector(".emp-count").textContent = empPayrollList.length;
   //To display updated data of local storage.
  createInnerHtml();
}

//This is update method.
const update = (node) => {
    //using empPayrollList we are retrieving the employee data  whose employee id is same as node id
    let empPayrollData = empPayrollList.find(empData => empData._id == node.id);
    if (!empPayrollData) return;
    
    //Adding data into server from string to json formate.
  //we are creating the local storage with a key 
    localStorage.setItem('editEmp', JSON.stringify(empPayrollData))
    //this will change the window location to the directed site but here we wont get the details filled in the form
  //so we need to write a func to get details
    window.location.replace(site_properties.add_emp_payroll_page);
  } 
