'use strict'

const newUserENDPOINT = '/newUser'
const userENDPOINT = '/users'
const checkENDPOINT = '/checkAvailability'
const customerENDPOINT = '/customers'
const invoiceENDPOINT = '/invoices'

const fakeInvoice = {
    customer: 123123,
    item: [{item: "textbook1",charge: "11"},{item: "textbook2",charge: "22"}]
}
const fakeCustomer = {
    _id: 123123,
    companyName: "APEX",
    firstName: "Eshter",
    lastName: "Smith",
    phone: "415-123-1234",
    email: "esther.smith@apex.com",
    address: {
        street: "411 Airport Ave",
        City: "South San Francisco",
        State: "CA",
        zipCode: "94080"
    }
}

const fakeUser = {
    _id: 11,
    companyName: "APEX",
    firstName: "Eshter",
    lastName: "Smith",
    phone: "415-123-1234",
    email: "esther.smith@apex.com",
    address: {
        street: "411 Airport Ave",
        City: "South San Francisco",
        State: "CA",
        zipCode: "94080"
    }
}

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
        <datalist id="customersList">
            <option value="APEC World LLC">APEC World LLC</option>
            <option value="The Kitchen">The Kitchen</option>
            <option value="Italian Pizza House">Italian Pizza House</option>
        </datalist>
        <div class="invoiceTotal">
        </div>
    </fieldset>
    <fieldset class="items">
        <legend>Items/Services</legend>
        <div id="item1">
            <label for="item1">Item 1</label>
            <input placeholder="What to charge?" id="item1" class="item" list="itemsList" type="text">
            <datalist id="itemsList">
            <option value="Office supplies">Office supplies</option>
            <option value="Kitchen supplies">Kitchen supplies</option>
            <option value="VOIP">Voice over IP serve</option>
            </datalist>
            <label for="amount1">amount</label>
            <input placeholder="0" class="amount" id="amount1" type="number" step="0.01">
            <button class="remove fas fa-minus"></button>
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
    <input type="text" id="customerCompanyName" placeholder="Amazon Inc">
    <br>
    <label for="customerFirstName">First Name</label>
    <input type="text" id="customerFirstName" required placeholder="John" pattern="[a-zA-Z ]{2,}$">
    <br>
    <label for="customerLastName">Last Name</label>
    <input type="text" id="customerLastName" required placeholder="William" pattern="[a-zA-Z ]{2,}$">
    <br>
    <label for="customerStreetAddress">Street</label>
    <input type="text" id="customerStreetAddress" required placeholder="222 Arco Ave" pattern="[a-zA-Z0-9 ._%+-]{2,}$">
    <br>
    <label for="customerCity">City</label>
    <input type="text" id="customerCity" pattern="[a-zA-Z ]{2,}$" required placeholder="San Francisco">
    <br>
    <label for="customerState">State</label>
    <input type="text" id="customerState" required placeholder="California" pattern="[a-zA-Z ]{2}$">
    <br>
    <label for="customerZipCode">Zip Code</label>
    <input required pattern="[0-9]{5}" id="customerZipCode" placeholder="" title="input 5 digit zip code">
    <br>
    <label for="customerPhoneNumber">Phone Number</label>
    <input type="tel" id="customerPhoneNumber" placeholder="6501231234" pattern="[0-9]{10}" title="10 digital phone number without '-'">
    <br>
    <label for="customerEmail">Email Address</label>
    <input type="email" id="customerEmail" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" placeholder="jph.william@amazon.com">
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
        <label for="userOldPassword">Current Password</label>
        <input type="password" required id="userOldPassword" placeholder="">
        <br>
        <br>
        <label for="userPassword1">Password</label>
        <input type="password" id="userPassword1" class="newPassword" placeholder="">
        <br>
        <label for="userPassword2">Re-enter password</label>
        <input type="password" id="userPassword2" class="newPassword" placeholder="">
        <br>
        <br>
        <label for="userCompanyName">Company Name</label>
        <input type="text" id="custouserCompanyNamemerCompanyName" placeholder="Amazon Inc">
        <br>
        <label for="userFirstName">First Name</label>
        <input type="text" id="userFirstName" required placeholder="John" pattern="[a-zA-Z ]{2,}$">
        <br>
        <label for="userLastName">Last Name</label>
        <input type="text" id="userLastName" required placeholder="William" pattern="[a-zA-Z ]{2,}$">
        <br>
        <label for="userStreetAddress">Street</label>
        <input type="text" id="customerStreetAddress" required placeholder="222 Arco Ave" pattern="[a-zA-Z0-9 ._%+-]{2,}$">
        <br>
        <label for="userCity">City</label>
        <input type="text" id="userCity" pattern="[a-zA-Z ]{2,}$" required placeholder="San Francisco">
        <br>
        <label for="userState">State</label>
        <input type="text" id="userState" required placeholder="California" pattern="[a-zA-Z]{2}$" title="Two letter codes only">
        <br>
        <label for="userZipCode">Zip Code</label>
        <input type="number" required pattern="[0-9]{5}" id="userZipCode" placeholder="94111" title="5 digit zip code only">
        <br>
        <label for="userPhoneNumber">Phone Number</label>
        <input type="tel" id="userPhoneNumber" placeholder="6501231234" pattern="[0-9]{10}" title="10 digital phone number without '-'">
        <br>
        <label for="userEmail">Email Address</label>
        <input type="email" id="userEmail" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" placeholder="jph.william@amazon.com">
        <br>
        <button class="button fa">Update &#xf058;
        </button>
        <button class="cancel">Cancel</button>
    </fieldset>
</form>`

const newUserFormPart1 = `
<form class="newUserForm1">
    <fieldset>
        <legend>Set up new account</legend>
        <label for="userName">User Name</label>
        <input type="text" id="userName" required placeholder="" title="This will be your login name">
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
                    <input type="password" id="userPassword1" class="newPassword" placeholder="" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters">
                    <br>
                </div>
                <div class="rightForm">
                    <label for="userPassword2">Re-enter password</label>
                    <input type="password" id="userPassword2" class="newPassword" placeholder="" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters">
                    <br>
                </div>
                <div class="passwordCheck iconFont" hidden>&#xf071 Both password must match</div>
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
                <input type="text" id="userState" required placeholder="California" pattern="[a-zA-Z]{2}$" title="input two letter codes only">
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
                            SONY Electronic
                        </td>
                        
                        <td>
                            Invoice #: 123<br>
                            Created: January 1, 2015
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <tr class="information">
            <td colspan="2">
                <table>
                    <tr>
                        <td>
                            Sparksuite, Inc.<br>
                            12345 Sunny Road<br>
                            Sunnyville, CA 12345
                        </td>
                        
                        <td>
                            Acme Corp.<br>
                            John Doe<br>
                            john@example.com
                        </td>
                    </tr>
                </table>
            </td>
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
        fetch(userENDPOINT, {
            method: 'POST',
            body: JSON.stringify(userInfo),
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        })
        .then(response=>{
            if (response.status === 200) {
                $('.centerBody').html(featureSelections);
                $('.navigation').removeClass('hidden')
            }
        })
    })
    $('.main').on('click', '.newInvoice', event=>{
        event.preventDefault();
        $('.centerBody').html(newInvoiceForm)
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
    addNewUser()
}

function addNewUser() {
    $('.main').on('change keyup', '.newUserForm1 #userName', event=>{
        event.preventDefault();
        if ($('.newUserForm1 #userName').val().trim()) {
            fetch(checkENDPOINT,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "checkname": "userName",
                    "checkvalue" : $('.newUserForm1 #userName').val(),
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
        if ($('.newUserForm1 #userCompanyName').val().trim()) {
            fetch(checkENDPOINT,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "checkname": "companyName",
                    "checkvalue" : $('.newUserForm1 #userCompanyName').val()
                }
            })
            .then(response=>{
                if (response.status === 200) {
                    $('.newUserForm1 .checkCompanyNameAvailbility').prop('hidden', true)
                    $('.newUserForm1 .checkCompanyNameAvailbility').html(`available`)
                    if ($('.newUserForm1 .checkUserNameAvailbility')[0].hasAttribute('hidden') && $('.newUserForm1 #userName').val().trim()) {
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
    $('.main').on('keyup change', '.newPassword', event=>{
        if ($('.newUserForm2 #userPassword1').val() !== $('.newUserForm2 #userPassword2').val()) {
            $('.passwordCheck').prop('hidden', false)
        }
        else {
            $('.passwordCheck').prop('hidden', true)
        }
    })
    $('.main').on('submit', '.newUserForm2', event=>{
        event.preventDefault();
        const newUserInfo = {
            companyName: $('.newUserForm1 #userCompanyName').val().trim(),
            firstName: $('#userFirstName').val().trim(),
            lastName: $('#userLastName').val().trim(),
            password: $('#userPassword1').val().trim(),
            userName: $('.newUserForm1 #userName').val().trim(),
            phoneNumber: $('#userPhoneNumber').val().trim(),
            email: $('#userEmail').val().trim(),
            address: {
                street: $('#userStreetAddress').val().trim(),
                city: $('#userCity').val().trim(),
                State: $('#userState').val().trim(),
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
                State: $('#customerState').val(),
                zipCode: $('#customerZipCode').val(),
            }
        }
        fetch(customerENDPOINT, {
            method: "POST",
            body: JSON.stringify(newCustomerInfo),
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        })
        .then(response=>{
            if (response.ok) {
                return response.json()
            }
            throw response
        })
        .then(responseJSON=>{
            console.log(responseJSON)
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
            <label for="item${itemNumber}">Item ${itemNumber}</label>
            <input placeholder="What to charge?" class="item" id="item${itemNumber}" list="itemsList${itemNumber}">
            <datalist id="itemsList${itemNumber}">
            <option value="Office supplies">Office supplies</option>
            <option value="Kitchen supplies">Kitchen supplies</option>
            <option value="VOIP">Voice over IP serve</option>
            </datalist>
            <label for="amount${itemNumber}">amount</label>
            <input placeholder="0" class="amount" id="amount${itemNumber}" type="number" step="0.01">
            <button class="remove fas fa-minus"></button>
         </div>`
        $(addMore).insertBefore('.addMoreItem')
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
        $('.invoiceTotal').html(`Total ${total.toFixed(2)}`)
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
        newInvoice["items"] = items
        return fetch(invoiceENDPOINT, {
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
        .then (responseJson => {
            $('.top-box').after(`${invoiceBox}`);
            let totalCharges = 0;
            for (let item of items) {
                totalCharges += parseFloat(item["charge"]);
                $(`<tr class="item">
                <td>${item["item"]}</td>
                <td>$${item["charge"]}</td>
                </tr>`).insertBefore('.total')
            }
            $('.centerBody').html(newInvoiceForm)
            $('head link[type="text/css"]').last().after('<link rel="stylesheet" type="text/css" media="screen,print" href="./invoice.css">')
            $('.total').html(`<td></td>
                <td>Total: $${totalCharges.toFixed(2)}</td>`)
            $('html, body').animate({scrollTop: $('.invoice-box').offset().top
        }, 1000)
        })
    })
}

function editProfile() {
    $('.profile').on('click', event=>{
        event.preventDefault();
        $('.centerBody').html(editProfileForm)
    } )
}

$(catchButtonsClick)