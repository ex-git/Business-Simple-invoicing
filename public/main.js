'use strict'

const userENDPOINT = '/api/users'
const newUserENDPOINT = '/api/users/newUser'
const editUserENDPOINT = 'api/users/editUser'
const loginENDPOINT = '/api/auth/login'
const checkENDPOINT = '/api/users/checkAvailability'
const customerENDPOINT = '/api/customers'
const invoiceENDPOINT = '/api/invoices'
const refreshENDPOINT = 'api/auth/refresh'

const featureSelections =
`<div class="featureSelections">
    <div class="mainFeature">
        <button class="button newInvoice"><i class="fas fa-file-invoice-dollar"></i><span class="feature">Create Invoice</span></button>
        <button class="button newCustomer"><i class="fas fa-plus"></i><span class="feature">Add Customer</span></button>
    </div> 
    <button class="button searchByCriteria"><i class="fas fa-search"></i><span class="feature">Search</span></button>
</div>`;

const newInvoiceForm = 
`<form class="newInvoiceForm">
    <fieldset class="customerInfo">
        <legend>Customer Info</legend>
        <label for="customer">Customer</label>
        <input placeholder="Customer Name" id="customer" list="customersList" required="yes">
    </fieldset>
    <fieldset class="items">
        <legend>Items/Services</legend>
        <div id="item1">
            <label for="item1">Item</label>
            <input placeholder="What to charge?" required id="item1" class="item" list="itemsList" type="text">
            <datalist id="itemsList">
            <option value="Office supplies">Office supplies</option>
            <option value="Kitchen supplies">Kitchen supplies</option>
            <option value="VOIP">Voice over IP serve</option>
            </datalist>
            <label for="amount1">$</label>
            <input placeholder="0" required class="amount" id="amount1" type="number" step="0.01">
            <button class="remove fas fa-minus"></button>
        </div>
        <div class="invoiceTotal">
        </div>
        <button class="addMoreItem fas fa-plus"></button>
        <datalist id="itemsList">
                <option value="Office supplies">Office supplies</option>
                <option value="Kitchen supplies">Kitchen supplies</option>
                <option value="VOIP">Voice over IP serve</option>
        </datalist>
    </fieldset>
    <fieldset class="buttons">
        <button class="button" type="submit"><span class="submit">Finish</span><i class="fas fas fa-vote-yea"></i></button>
        <button class="cancel">Cancel</button>
    </fieldset>
</form>`

const searchForm = `
<form class="search">
<fieldset>
    <legend>Search</legend>
    <label for="searchInvoiceNumber">Invoice Number</label>
    <input type="radio" id="searchInvoiceNumber" name="criteria" value="searchInvoiceNumber">
    <br>
    <label for="searchCustomerName">Customer Full Name</label>
    <input type="radio" id="searchCustomerName" name="criteria" value="searchCustomerName">
    <br>
    <label for="searchCustomerCompanyName">Company Name</label>
    <input type="radio" id="searchCustomerCompanyName" name="criteria" value="searchCustomerCompanyName">
    <br>
    <label for="criteria">Search Criteria</label>
    <br>
    <input type="text" id="criteria" placeholder="xxx">
    <br>
    <button type="submit" class="button searchByCriteria fa">Find &#xf002;
    </button>
    <button class="cancel">Cancel</button>
</fieldset>
</form>`

const addCustomerForm = `
<form class="addCustomer">
<fieldset>
    <legend>Add New Customer</legend>
    <label for="customerCompanyName">Company Name</label>
    <input type="text" id="customerCompanyName" placeholder="example: The Best Inc">
    <br>
    <label for="customerFirstName">First Name</label>
    <input type="text" id="customerFirstName" required placeholder="example: John" pattern="[a-zA-Z ]{2,}$">
    <br>
    <label for="customerLastName">Last Name</label>
    <input type="text" id="customerLastName" required placeholder="example: William" pattern="[a-zA-Z ]{2,}$">
    <br>
    <label for="customerStreetAddress">Street</label>
    <input type="text" id="customerStreetAddress" required placeholder="example: 123 Amazing Dr" pattern="[a-zA-Z0-9 ._%+-]{2,}$">
    <br>
    <label for="customerCity">City</label>
    <input type="text" id="customerCity" pattern="[a-zA-Z ]{2,}$" required placeholder="example: San Francisco">
    <br>
    <label for="customerState">State</label>
    <input type="text" id="customerState" required placeholder="example: CA" pattern="[a-zA-Z ]{2}$">
    <br>
    <label for="customerZipCode">Zip Code</label>
    <input required pattern="[0-9]{5}" id="customerZipCode" placeholder="example: 94112" title="input 5 digit zip code">
    <br>
    <label for="customerPhoneNumber">Phone Number</label>
    <input type="tel" id="customerPhoneNumber" placeholder="example: 6501231234" pattern="[0-9]{10}" title="10 digital phone number without '-'">
    <br>
    <label for="customerEmail">Email Address</label>
    <input type="email" id="customerEmail" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" placeholder="example: jph.william@thebest.com">
    <br>
    <button type="submit" class="button submitNewCustomer fa">Submit &#xf2bb;
    </button>
    <button class="cancel">Cancel</button>
</fieldset>
</form>`

const editProfileForm = `
<form class="editProfileForm">
    <fieldset>
        <legend>Edit Your Profile</legend>
        <div class="seperateForm">
            <div class="passwordForm">
                <div class="leftForm">
                    <label for="userPassword1">New password</label>
                    <input type="password" id="userPassword1" class="newPassword" placeholder="">
                    <br>
                </div>
                <div class="rightForm">
                    <label for="userPassword2">Re-enter password</label>
                    <input type="password" id="userPassword2" class="newPassword" placeholder="">
                    <br>
                </div>
            </div>
            <div class="passwordCheck iconFont" hidden></div>
            <div class="leftForm">
                <label for="userFirstName">First Name</label>
                <input type="text" id="userFirstName" required placeholder="John" pattern="[a-zA-Z ]{2,}$">
                <br>
                <label for="userLastName">Last Name</label>
                <input type="text" id="userLastName" required placeholder="William" pattern="[a-zA-Z ]{2,}$">
                <br>
                <label for="userPhoneNumber">Phone Number</label>
                <input type="tel" id="userPhoneNumber" placeholder="6501231234" pattern="[0-9]{10}" title="10 digital phone number without '-'">
                <br>
                <label for="userEmail">Email Address</label>
                <input type="email" id="userEmail" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" placeholder="jph.william@amazon.com">
                <br>
            </div>
            <div class="rightForm">
                <label for="userStreetAddress">Street</label>
                <input type="text" id="userStreetAddress" required placeholder="222 Arco Ave" pattern="[a-zA-Z0-9 ._%+-]{2,}$">
                <br>
                <label for="userCity">City</label>
                <input type="text" id="userCity" pattern="[a-zA-Z ]{2,}$" required placeholder="San Francisco">
                <br>
                <label for="userState">State</label>
                <input type="text" id="userState" required placeholder="CA" pattern="[a-zA-Z]{2}$" title="input two letter codes only">
                <br>
                <label for="userZipCode">Zip Code</label>
                <input required pattern="[0-9]{5}" id="userZipCode" placeholder="94111" title="input 5 digit zip code only">
                <br>
            </div>
        </div>
        <button type="submit" class="button fa">Update &#xf058;
        </button>
        <button class="cancel">Cancel</button>
    </fieldset>
</form>`

const newUserFormPart1 = `
<form class="newUserForm1">
    <fieldset>
        <legend>Set up new account</legend>
        <label for="newUserName">User Name</label>
        <input type="text" id="newUserName" required placeholder="" title="This will be your login name">
        <br>
        <div class="checkUserNameAvailbility iconFont" hidden></div>
        <br>
        <label for="userCompanyName">Company Name</label>
        <input type="text" id="userCompanyName" required placeholder="" title="Your company name">
        <br>
        <div class="checkCompanyNameAvailbility iconFont" hidden></div>
        <button type="submit" class="button newUserNext fa" disabled>Next &#xf35a;</button>
        <button class="cancel">Cancel</button>
    </fieldset>
</form>`

const newUserFormPart2 = `
<form class="newUserForm2">
    <fieldset>
        <div class="seperateForm">
            <div class="passwordForm">
                <div class="leftForm">
                    <label for="userPassword1">Password</label>
                    <input type="password" id="userPassword1" class="newPassword">
                    <br>
                </div>
                <div class="rightForm">
                    <label for="userPassword2">Re-enter password</label>
                    <input type="password" id="userPassword2" class="newPassword">
                    <br>
                </div>
                <div class="passwordCheck iconFont" hidden></div>
            </div>
            <div class="leftForm">
                <label for="userFirstName">First Name</label>
                <input type="text" id="userFirstName" required placeholder="John" pattern="[a-zA-Z ]{2,}$">
                <br>
                <label for="userLastName">Last Name</label>
                <input type="text" id="userLastName" required placeholder="William" pattern="[a-zA-Z ]{2,}$">
                <br>
                <label for="userPhoneNumber">Phone Number</label>
                <input type="tel" id="userPhoneNumber" placeholder="6501231234" pattern="[0-9]{10}" title="10 digital phone number without '-'">
                <br>
                <label for="userEmail">Email Address</label>
                <input type="email" id="userEmail" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" placeholder="jph.william@amazon.com">
                <br>
            </div>
            <div class="rightForm">
                <label for="userStreetAddress">Street</label>
                <input type="text" id="userStreetAddress" required placeholder="222 Arco Ave" pattern="[a-zA-Z0-9 ._%+-]{2,}$">
                <br>
                <label for="userCity">City</label>
                <input type="text" id="userCity" pattern="[a-zA-Z ]{2,}$" required placeholder="San Francisco">
                <br>
                <label for="userState">State</label>
                <input type="text" id="userState" required placeholder="CA" pattern="[a-zA-Z]{2}$" title="input two letter codes only">
                <br>
                <label for="userZipCode">Zip Code</label>
                <input required pattern="[0-9]{5}" id="userZipCode" placeholder="94111" title="input 5 digit zip code only">
                <br>
            </div>
        </div>
        <button type="submit" class="button submitNewUser fa">Submit &#xf234;</button>
        <button class="cancel">Cancel</button>
    </fieldset>
</form>`

const invoiceBox = `
<section role="region" class="invoice">
<div class="invoice-box">
    <table cellpadding="0" cellspacing="0">
        <tr class="top">
            <td colspan="2">
                <table>
                    <tr>
                        <td class="title">
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <tr class="information">
        </tr>
        
        <tr class="heading">
            <td>Item</td>
            <td>Price</td>
        </tr>
        
        <tr class="total">
        </tr>
    </table>
</div>
</section>`

function catchButtonsClick () {
    $('.main').on('click', '.mainPageRegister', event=>{
        event.preventDefault();
        $('.mainPageGreeting').prop('hidden', true);
        $('.mainHeader').addClass('hidden')
        $('.centerBody').append(newUserFormPart1)
    })
    $('.main').on('click', '.mainPageLogin', event=>{
        event.preventDefault();
        $('.mainPageGreeting').prop('hidden', true);
        $('.mainHeader').addClass('hidden')
        $('.logInForm').prop('hidden', false)
        $('.logInForm fieldset').prop('disabled', false)
    })
    $('.main').on('submit', '.logInForm', event=>{
        event.preventDefault();
        const userInfo = {
            userName : $('.logInForm #userName').val(),
            password : $('.logInForm #password').val()
        }
        fetch(loginENDPOINT, {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify(userInfo),
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        })
        .then(response=>{
            if (response.ok) {
                return response.json()
            }
            throw response.json()
        })
        .then(responseJSON=>{
            $('.centerBody').html(featureSelections);
            $('.navigation').removeClass('hidden')
            //check if user need more than before jwt
            setTimeout(sessionTimeCheck, 480000)
            return Promise.resolve()
        })
        .catch(err=>
            err.then(msg=>{
                console.log(msg.message)
            }  
            )
        )
    })
    $('.main').on('click', '.newInvoice', event=>{
        event.preventDefault();
        $('.centerBody').html(newInvoiceForm)
        fetch(customerENDPOINT)
        .then(response=>{
            if (response.ok) {
                return response.json()
            }
        })
        .then(responseJSON=>{
            console.log(responseJSON.companies)
            const optionsList = responseJSON.companies.map((company, idx)=>`<option value="${company}">${company} - ${responseJSON.customers[idx]}</option>`).join('')
            $(`<datalist id="customersList">${optionsList}</datalist>`).insertBefore('.invoiceTotal')
        })
    })
    $('.main').on('click', '.searchByCriteria', event=>{
        event.preventDefault();
        $('.centerBody').html(searchForm)
    })

    $('.main').on('click', '.newCustomer', event=>{
        event.preventDefault();
        $('.centerBody').html(addCustomerForm)
    })
    addMoreItem();
    removeItem();
    invoiceSubmit();
    addTotal();
    editProfile();
    cancelButton();
    trackChanges();
    addNewCustomer();
    addNewUser();
    passwordCheck();
    updateProfile()
}

//check if password start with space or if user input incorrect password
function passwordCheck(){
    $('.main').on('keyup change', '.newPassword', event=>{
        if ($('#userPassword1').val().trim() !== $('#userPassword1').val() || $('#userPassword2').val().trim() !== $('#userPassword2').val()) {
            $('.passwordCheck').prop('hidden', false)
            $('.passwordCheck').html(`&#xf071 Password can't start or end with space`)
            $('.button').prop('disabled', true)
        }
        else if ($('#userPassword1').val() !== $('#userPassword2').val()) {
            $('.passwordCheck').prop('hidden', false)
            $('.passwordCheck').html(`&#xf071 Both password must match`)
            $('.button').prop('disabled', true)
        }
        else {
            $('.passwordCheck').prop('hidden', true)
            $('.button').prop('disabled', false)
        }
    })
}
function addNewUser() {
    $('.main').on('change keyup', '.newUserForm1 #newUserName', event=>{
        event.preventDefault();
        if ($(event.currentTarget).val().trim()) {
            const checkName = {
                checkAvailability: {
                    name: "userName",
                    value: $(event.currentTarget).val()
                }
            }
            fetch(checkENDPOINT,{
                method: "POST",
                body: JSON.stringify(checkName),
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            })
            .then(response=>{
                if (response.status === 200) {
                    $('.checkUserNameAvailbility').prop('hidden', true)
                    $('.checkUserNameAvailbility').html(`available`)
                    if ($('.newUserForm1 .checkCompanyNameAvailbility')[0].hasAttribute('hidden') && $('.newUserForm1 #userCompanyName').val().trim()) {
                        $('.newUserNext').prop('disabled', false)
                    }
                }
                else {
                    $('.newUserForm1 .checkUserNameAvailbility').html(`&#xf071; already taken`)
                    $('.newUserForm1 .checkUserNameAvailbility').prop('hidden', false)
                    $('.newUserForm1 .newUserNext').prop('disabled', true)
                }
            })
        }
        else {
            $('.newUserForm1 .checkUserNameAvailbility').prop('hidden', true)
            $('.newUserForm1 .newUserNext').prop('disabled', true)
        }
    })
    $('.main').on('change keyup', '.newUserForm1 #userCompanyName', event=>{
        event.preventDefault();
        if ($(event.currentTarget).val().trim()) {
            const checkName = {
                checkAvailability: {
                    name: "companyName",
                    value: $(event.currentTarget).val()
                }
            }
            fetch(checkENDPOINT,{
                method: "POST",
                body: JSON.stringify(checkName),
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            })
            .then(response=>{
                if (response.status === 200) {
                    $('.newUserForm1 .checkCompanyNameAvailbility').prop('hidden', true)
                    $('.newUserForm1 .checkCompanyNameAvailbility').html(`available`)
                    if ($('.newUserForm1 .checkUserNameAvailbility')[0].hasAttribute('hidden') && $('.newUserForm1 #newUserName').val().trim()) {
                        $('.newUserForm1 .newUserNext').prop('disabled', false)
                    }
                }
                else {
                    $('.newUserForm1 .checkCompanyNameAvailbility').html(`&#xf071; already taken`)
                    $('.newUserForm1 .checkCompanyNameAvailbility').prop('hidden', false)
                    $('.newUserForm1 .newUserNext').prop('disabled', true)
                }
                
            })
        }
        else {
            $('.newUserForm1 .checkCompanyNameAvailbility').prop('hidden', true)
            $('.newUserForm1 .newUserNext').prop('disabled', true)
        }
    })
    $('.main').on('submit', '.newUserForm1', event=>{
        event.preventDefault();
        $('.newUserForm1').prop('hidden', true)
        $('.newUserForm1 fieldset').prop('disabled', true)
        $('.newUserForm1 .newUserNext').prop('disabled', true)
        $('.centerBody').append(newUserFormPart2)
    })
    $('.main').on('submit', '.newUserForm2', event=>{
        event.preventDefault();
        const newUserInfo = {
            companyName: $('.newUserForm1 #userCompanyName').val().trim(),
            firstName: $('#userFirstName').val().trim(),
            lastName: $('#userLastName').val().trim(),
            password: $('#userPassword1').val().trim(),
            userName: $('.newUserForm1 #newUserName').val().trim(),
            phoneNumber: $('#userPhoneNumber').val().trim(),
            email: $('#userEmail').val().trim(),
            address: {
                street: $('#userStreetAddress').val().trim(),
                city: $('#userCity').val().trim(),
                state: $('#userState').val().trim(),
                zipCode: $('#userZipCode').val().trim(),
            }
        }
        fetch(newUserENDPOINT, {
            method: "POST",
            body: JSON.stringify(newUserInfo),
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        })
        .then(response=>{
            if (response.ok) {
                alert("You are now registered, please login with your user name and password");
            $('.logInForm').prop('hidden', false)
            $('.logInForm fieldset').prop('disabled', false)
            $('.newUserForm1').remove()
            $('.newUserForm2').remove()
            }
            else {
                alert("Something is not right, please try again")
            }
        })
    })
}

function updateProfile() {
    $('.main').on('submit', '.editProfileForm', event=>{
        event.preventDefault();
        const userInfo = {
            firstName: $('#userFirstName').val().trim(),
            lastName: $('#userLastName').val().trim(),
            password: $('#userPassword1').val().trim(),
            phoneNumber: $('#userPhoneNumber').val().trim(),
            email: $('#userEmail').val().trim(),
            address: {
                street: $('#userStreetAddress').val().trim(),
                city: $('#userCity').val().trim(),
                state: $('#userState').val().trim(),
                zipCode: $('#userZipCode').val().trim(),
            }
        }
        fetch(editUserENDPOINT, {
            credentials: 'include',
            method: "PUT",
            body: JSON.stringify(userInfo),
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        })
        .then(response=>{
            if (response.ok) {
                alert("You profile had been updated, please re-login with your user name and password");
                window.location.assign('/')
            }
            else {
                console.log(response)
                alert("Something is not right, please try again")
            }
        })
    })
}

function addNewCustomer() {
    $('.main').on('submit', '.addCustomer', event=>{
        event.preventDefault();
        const newCustomerInfo = {
            companyName : $('#customerCompanyName').val(),
            firstName: $('#customerFirstName').val(),
            lastName: $('#customerLastName').val(),
            phoneNumber: $('#customerPhoneNumber').val(),
            email: $('#customerEmail').val(),
            address: {
                street: $('#customerStreetAddress').val(),
                city: $('#customerCity').val(),
                state: $('#customerState').val(),
                zipCode: $('#customerZipCode').val(),
            }
        }
        fetch(customerENDPOINT, {
            credentials: 'include',
            method: "POST",
            body: JSON.stringify(newCustomerInfo),
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        })
        .then(response=>{
            if (response.ok) {
                return response.json()
            }
            throw response
        })
        .then(responseJSON=>{
            alert("New customer added")
        })
        .catch(err=>err.text().then(errText=>alert(errText)))

    })
}

//invoice items
let itemNumber = 1;

function addMoreItem() {
    $('.main').on('click', '.addMoreItem', event=>{
        event.preventDefault();
        itemNumber +=1;
        const addMore = `
        <div id="item${itemNumber}">
            <label for="item${itemNumber}">Item</label>
            <input placeholder="What to charge?" class="item" required id="item${itemNumber}" list="itemsList${itemNumber}">
            <datalist id="itemsList${itemNumber}">
            <option value="Office supplies">Office supplies</option>
            <option value="Kitchen supplies">Kitchen supplies</option>
            <option value="VOIP">Voice over IP serve</option>
            </datalist>
            <label for="amount${itemNumber}">$</label>
            <input placeholder="0" class="amount" required id="amount${itemNumber}" type="number" step="0.01" >
            <button class="remove fas fa-minus"></button>
         </div>`
        $(addMore).insertBefore('.invoiceTotal')
    }
)}

function addTotal(){
    let updatTotal = function() {
        let total = 0;
        $('.amount').each(function(){
            if ($(this).val()) {
                total +=parseFloat($(this).val())
            }
        })
        $('.invoiceTotal').html(`Total $${total.toFixed(2)}`)
    }
    $('.main').on('change', '.amount', event=>{
        updatTotal()
    })
    $('.main').on('click', '.addMoreItem', event=>{
        updatTotal()
    })
    $('.main').on('click', '.remove', event=>{
        updatTotal()
    })
}

function trackChanges(){
    $('.main').on('change', 'input', event=>{
        $('.main').data("changed", true);
    })
}
function cancelButton() {
    $('.main').on('click', '.cancel', event=>{
        event.preventDefault();
        //alert user if they have unsaved data
        if ($('.main').data("changed")) {
            if (confirm('If you leave before saving, your changes will be lost')) {
                $('.centerBody').html(featureSelections);
                $('.main').data("changed", false);
            }
            else {
                // Do nothing!
            }
        }
        else {
            $('.centerBody').html(featureSelections);
        }
    })
}

function removeItem() {
    $('.main').on('click', '.remove', event=>{
        event.currentTarget.closest('div').remove();
    }
)}

function invoiceSubmit() {
    $('.main').on('submit', '.newInvoiceForm', event=>{
        event.preventDefault();
        const newInvoice = {
            "customer": $('#customer').val()
        }
        const items = [];
        const totalItems = $('fieldset .item').length;
        const inputItems = $('fieldset .item').map(function(){
            return $(this).val()
        })
        const inputCharges = $('fieldset .amount').map(function(){
            return $(this).val()
        })
        for (let i=0; i< totalItems; i++) {
            let item = {};
            if (inputItems[i]) {item.item = inputItems[i],
                item.charge = inputCharges[i];
                items.push(item)
            }
        }
        newInvoice["items"] = items;
        return fetch(invoiceENDPOINT, {
            credentials: 'include',
            method: "POST",
            body: JSON.stringify(newInvoice),
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json()
            } 
        })
        .then (responseJSON => {
            console.log(responseJSON)
            $('.top-box').after(`${invoiceBox}`);
            //add up the total
            let totalCharges = responseJSON.invoice.items.map(item=>item.charge).reduce((total, charge)=>total+=charge);
            for (let item of responseJSON.invoice.items) {
                $(`<tr class="item">
                <td>${item["item"]}</td>
                <td>$${item["charge"]}</td>
                </tr>`).insertBefore('.total')
            }
            
            //conver invoice generate time from unix timestamp to local format 
            const generteDate = new Date(responseJSON.invoice.generateDate);
            $('.title').html(responseJSON.user.companyName)
            $('.title').after(`<td>
                Invoice #: ${responseJSON.invoice.invoiceNumber}<br>
                Created: ${generteDate.getMonth()+1}/${generteDate.getDate()}/${generteDate.getFullYear()}
            </td>`);
            $('.centerBody').html(newInvoiceForm)
            $('head link[type="text/css"]').last().after('<link rel="stylesheet" type="text/css" media="screen,print" href="./invoice.css">')
            $('.total').html(`<td></td>
                <td>Total: $${totalCharges.toFixed(2)}</td>`)
            $('.information').html(`
                <td colspan="2">
                    <table>
                        <tr>
                            <td>
                                ${responseJSON.user.companyName}<br>
                                ${responseJSON.user.address.street}<br>
                                ${responseJSON.user.address.city}, ${responseJSON.user.address.state} ${responseJSON.user.address.zipCode}
                            </td>
                            <td>
                                ${responseJSON.customer.companyName}<br>
                                ${responseJSON.customer.firstName} ${responseJSON.customer.lastName}<br>
                                ${responseJSON.customer.address.street}<br>
                                ${responseJSON.customer.address.city}, ${responseJSON.customer.address.state} ${responseJSON.customer.address.zipCode}<br>
                                ${responseJSON.customer.email}
                            </td>
                        </tr>
                    </table>
                </td>`)
            $('html, body').animate({scrollTop: $('.invoice-box').offset().top
        }, 1000)
        })
    })
}

function editProfile() {
    $('.profile').on('click', event=>{
        event.preventDefault();
        $('.centerBody').html(editProfileForm)
        fetch(userENDPOINT)
        .then(response=>{
            if (response.ok) {
                return response.json()
            }
        })
        .then(responseJSON=>{
            $('#userFirstName').val(responseJSON.firstName);
            $('#userLastName').val(responseJSON.lastName)
            $('#userPhoneNumber').val(responseJSON.phoneNumber)
            $('#userEmail').val(responseJSON.email)
            $('#userStreetAddress').val(responseJSON.address.street)
            $('#userCity').val(responseJSON.address.city)
            $('#userState').val(responseJSON.address.state)
            $('#userZipCode').val(responseJSON.address.zipCode)
        })
    })
}

function sessionTimeCheck() {
    if(confirm("Your login session will be timed out soon, do you need more time?")) {
        keepJWTfresh()
    }
}

function keepJWTfresh() {
    fetch(refreshENDPOINT, {
        credentials: 'include',
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    })
    .then(response=>{
        if (response.ok) {
            console.log("updated jwt")
            setTimeout(sessionTimeCheck, 480000)
        }
        else {
            throw response.json()
        }
    })
    .catch(err=>
        err.then(msg=>{
            console.log("error?")
        }  
        )
    )
}
$(catchButtonsClick)