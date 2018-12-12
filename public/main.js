'use strict'

const userENDPOINT = '/api/users'
const newUserENDPOINT = '/api/users/newUser'
const editUserENDPOINT = 'api/users/editUser'
const loginENDPOINT = '/api/auth/login'
const checkENDPOINT = '/api/users/checkAvailability'
const customerENDPOINT = '/api/customers'
const invoiceENDPOINT = '/api/invoices'
const refreshENDPOINT = 'api/auth/refresh'
const logOutENDPOINT = 'api/auth/logOut'
const deleteMeENDPOINT = 'api/users/deleteMe'

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
        <select name="customer" id="customer">
        </select>
    </fieldset>
    <fieldset class="items">
        <legend>Items/Services</legend>
        <div id="item1">
            <label for="item1">Item</label>
            <input placeholder="What to charge?" required id="item1" class="item" type="text">
            <label for="amount1">$</label>
            <input placeholder="0" required class="amount" id="amount1" type="number" step="0.01">
            <button class="remove fas fa-minus"></button>
        </div>
        <div class="invoiceTotal">
        </div>
        <button class="addMoreItem fas fa-plus"></button>
    </fieldset>
    <fieldset class="buttons">
        <button class="button" type="submit"><span class="submit">Finish</span><i class="fas fas fa-vote-yea"></i></button>
        <button class="cancel">Cancel</button>
    </fieldset>
</form>`

const searchForm = `
<form class="searchInvoice">
    <fieldset>
        <legend>Search Invoices</legend>
        <div class="searchCriteria">
            <label for="searchInvoiceNumber">Invoice Number</label>
            <input type="radio" id="searchInvoiceNumber" name="criteria" value="searchInvoiceNumber" selected="selected">
            <br>
            <label for="searchInvoiceDate">Invoice Date</label>
            <input type="radio" id="searchInvoiceDate" name="criteria" value="searchInvoiceDate" title="Date format: MM/DD/YYYY)">
            <br>
            <label for="searchCustomerCompanyName">Company Name</label>
            <input type="radio" id="searchCustomerCompanyName" name="criteria" value="searchCustomerCompanyName">
            <br>
        </div>
        <label for="keyword">Keyword</label>
        <br>
        <input id="keyword" placeholder="" type="text">
        <br>
        <button type="submit" class="button search fa">Find &#xf002;
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
                    <input type="password" id="userPassword1" class="newPassword" placeholder="************" title="Leave blank if you don't want to change">
                    <br>
                </div>
                <div class="rightForm">
                    <label for="userPassword2">Re-enter password</label>
                    <input type="password" id="userPassword2" class="newPassword" placeholder="************" title="Leave blank if you don't want to change">
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
        <button class="deleteMe">Delete me</button>
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
    </fieldset>
</form>`

function catchButtonsClick () {
    $('.main').on('click', '.mainPageRegister', event=>{
        event.preventDefault();
        $('.mainPageGreeting').prop('hidden', true);
        $('.centerBody').append(newUserFormPart1)
    })
    $('.main').on('click', '.mainPageLogin', event=>{
        event.preventDefault();
        $('.mainPageGreeting').prop('hidden', true);
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
            else {
                throw new Error("The username or password is incorrect.")
            }
        })
        .then(responseJSON=>{
            $('.centerBody').html(featureSelections);
            $('.navigation').removeClass('hidden')
            //check if user need more time
            setTimeout(sessionTimeCheck, 480000)
            return Promise.resolve()
        })
        .catch(
            err=>
            alert(err.message) 
        )
    })
    $('.main').on('click', '.newInvoice', event=>{
        event.preventDefault();
        $('.centerBody').html(newInvoiceForm)
        $('.top-box').css("height",'unset')
        fetch(customerENDPOINT)
        .then(response=>{
            if (response.ok) {
                return response.json()
            }
            throw new Error("You must have at least one customer added before creating new invoice")
        })
        .then(responseJSON=>{
            const optionsList = responseJSON.companies.map((company, idx)=>`<option value="${company}">${company} - ${responseJSON.customers[idx]}</option>`).join('')
            $('#customer').html(optionsList)
        })
        .catch(err=>{
            $('.centerBody').html(addCustomerForm)
            alert(err.message)
        })
        //keep JWT fresh
        keepJWTfresh()
    })

    $('.main').on('click', '.searchByCriteria', event=>{
        event.preventDefault();
        $('.centerBody').html(searchForm);
        searchInvoices()
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
    homeButton();
    trackChanges();
    addNewCustomer();
    addNewUser();
    passwordCheck();
    updateProfile();
    logOut();
    deleteMe()
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

function formatQuery(query){
    return Object.keys(query).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`).join('&')
}

function searchInvoices() {
    $('.main').on('submit', '.searchInvoice', event=>{
        event.preventDefault();
        const selected = $('input[name="criteria"]:checked').val()
        const keyword = $('#keyword').val()
        const newQuery = {}
        
        if (selected === "searchInvoiceNumber") {
            newQuery.invoiceNumber = keyword
        }
        else if (selected === "searchInvoiceDate") {
            newQuery.generateDate = keyword
        }
        else if (selected === "searchCustomerCompanyName") {
            newQuery.customer = keyword
        }
        if(!(selected && keyword)) {
            alert("You must select one of the option and type the keyword to search")
        }
        else {const formattedQuery = formatQuery(newQuery)
            fetch(invoiceENDPOINT+"?"+formattedQuery, {
                credentials: 'include',
                method: 'GET'
            })
            .then(response=>{
                if (response.ok) {
                    return response.json()
                }
                throw response.json()
            })
            .then(responseJSON=>{
                if (responseJSON.invoices.length >0) {
                    const searchResult = responseJSON.invoices.map(invoice=>`<tr class="invoice">
                            <td>${invoice.customer}</td>
                            <td>${invoice.generateDate}</td>
                            <td>${invoice.invoiceNumber}</td>
                            <td>$${invoice.items.map(item=>item.charge).reduce((total, charge)=>total+=charge).toFixed(2)}</td>
                            <td><label for="${invoice.invoiceNumber}">Select this</label>
                            <input type="radio" id="${invoice.invoiceNumber}" name="selected" value="${invoice.invoiceNumber}"></td>
                        </tr>`
                    )
                    const resultRegion = `<section role="region" class="searchResult">
                                <h2>Search result:</h2>
                                <div class="results-box">
                                    <table cellpadding="0" cellspacing="0">
                                    <tr class="heading">
                                            <td class="invoiceCustomerName">Customer Name</td>
                                            <td class="invoiceDate">Invoice Date</td>
                                            <td class="invoiceNumber">Invoice Number</td>
                                            <td class="invoiceTotal">Invoice Total (USD)</td>
                                            <td class="invoiceSelectBox">Action:</td>
                                    </tr>
                                    <tbody>
                                        ${searchResult.join('')}
                                    </tbody>
                                    </table>
                                </div>
                                <div class="actionButton">
                                <button class="button fa openInvoice">View &#xf35d</button>
                                <button class="button fa editInvoice">Edit &#xf044</button>
                                <button class="button fa deleteInvoice">Delete &#xf2ed</button>
                    </section>`
                    if ($('.results-box').length === 0) {
                        $(resultRegion).insertAfter('.top-box')
                    }
                    else {
                        $('.searchResult').remove()
                        $(resultRegion).insertAfter('.top-box')
                    }
                    $('html, body').animate({scrollTop: $('.searchResult').offset().top}, 1000)
                }
                else {
                    alert("Nothing found, please try something else")
                    $('.searchResult').remove()
                }
                //keep JWT fresh
                keepJWTfresh()
            })
            .catch(err=>
                err.then(
                    errWithMessage=>{
                        $('.searchResult').remove()
                        alert(errWithMessage.message)
                    }
                )
            )
            searchResultActions()}
    })
}

function searchResultActions(){
    $('.main').on('click', '.openInvoice', event=>{
        event.preventDefault()
        if ($('input[name="selected"]:checked').val()) {
            const findInvoice = {
                invoiceNumber: $('input[name="selected"]:checked').val()
            }

            //prevent popup windows being blocked by browser
            let newInvoiceWindow;
            
            newInvoiceWindow = window.open("","New Invoice","resizable,scrollbars=yes,status=0,_blank");
            newInvoiceWindow.document.write('Loading invoice...');
            

            const formattedQuery = formatQuery(findInvoice)
            fetch(invoiceENDPOINT+"?"+formattedQuery, {
                credentials: 'include',
                method: 'GET'
            })
            .then(response=>{
                if (response) {
                    return response.json()
                }
                alert("Something wrong with your search, please try something else")
            })
            .then(responseJSON=>{
                viewInvoice(responseJSON, newInvoiceWindow)
                //keep JWT fresh
                keepJWTfresh()
            })
        }
        else {
            alert("Please select one invoice from search result")
        }
    })
    $('.main').on('click', '.editInvoice', event=>{
        event.preventDefault()
            if ($('input[name="selected"]:checked').val()) {
                $('.centerBody').html(newInvoiceForm)
                
                const findInvoice = {
                    invoiceNumber: $('input[name="selected"]:checked').val()
                }
                const formattedQuery = formatQuery(findInvoice)
                fetch(invoiceENDPOINT+"?"+formattedQuery, {
                    credentials: 'include',
                    method: 'GET'
                })
                .then(response=>{
                    if (response) {
                        return response.json()
                    }
                    alert("Something wrong with your search, please try something else")
                })
                .then(responseJSON=>{
                    //add back newInvoiceForm
                    $('.centerBody').html(newInvoiceForm)
                    
                    //fill the form with existing data from selected invoice
                    const chargesDetails = responseJSON.invoices[0].items.map(item=>`
                    <div id="item${item._id}">
                    <label for="item${item._id}">Item</label>
                    <input type="text" placeholder="What to charge?" class="item" required id="item${item._id}" value="${item.item}">
                    <label for="amount${item._id}">$</label>
                    <input placeholder="0" class="amount" required id="amount${item._id}" type="number" step="0.01" value="${item.charge}">
                    <button class="remove fas fa-minus"></button>
                    </div>`)
                    $(chargesDetails.join('')).insertAfter('.items legend')
                    fetch(customerENDPOINT)
                    .then(response=>{
                        if (response.ok) {
                            return response.json()
                        }
                    })
                    .then(customerResponseJSON=>{
                        const optionsList = customerResponseJSON.companies.map((company, idx)=>{
                            if (company === responseJSON.customer.companyName) {
                                return `<option selected="selected" value="${company}">${company} - ${customerResponseJSON.customers[idx]}</option>`
                            }
                            else {
                                return `<option value="${company}">${company} - ${customerResponseJSON.customers[idx]}</option>`
                            }
                        })
                        $('#customer').html(optionsList.join(''))
                        $('.newInvoiceForm').data("invoiceNumber", responseJSON.invoices[0].invoiceNumber);
                        //remove default item box 1
                        $('#item1').remove()
                        //remove search result from page
                        $('.searchResult').remove()
                        //keep JWT fresh
                        keepJWTfresh()
                    })
                })
            }
            else {
                alert("Please select one invoice from search result")
            }

})
    
    $('.main').on('click', '.deleteInvoice', event=>{
        event.preventDefault()
        if ($('input[name="selected"]:checked').val()) {
            if (confirm("Are you sure? We can't bring it back one deleted")) {
                const findInvoice = {
                    invoiceNumber: $('input[name="selected"]:checked').val()
                }
                const formattedQuery = formatQuery(findInvoice)
                fetch(invoiceENDPOINT+"?"+formattedQuery, {
                    credentials: 'include',
                    method: 'DELETE'
                })
                .then(response=>{
                    if (response.ok) {
                        $('.searchResult').remove()
                        alert(`invoice ${findInvoice.invoiceNumber} deleted`)
                    }
                    //keep JWT fresh
                    keepJWTfresh()
                    
                })
            }
        }
        else {
            alert("Please select one invoice from search result")
        }
    })
}
function addNewUser() {
    $('.main').on('change keyup', '.newUserForm1 #newUserName', event=>{
        event.preventDefault();
        if ($(event.currentTarget).val().trim() && ($(event.currentTarget).val() !== $(event.currentTarget).val().trim())) {
            $('.newUserForm1 .checkUserNameAvailbility').html(`&#xf071; User name can start or end with space`)
            $('.newUserForm1 .checkUserNameAvailbility').prop('hidden', false)
            $('.newUserForm1 .newUserNext').prop('disabled', true)
        }
        else if ($(event.currentTarget).val().trim()) {
            $('.newUserForm1 .checkUserNameAvailbility').prop('hidden', true)
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
        if ($(event.currentTarget).val().trim() && ($(event.currentTarget).val().trim() !== $(event.currentTarget).val())) {
            $('.newUserForm1 .checkCompanyNameAvailbility').html(`&#xf071; Company name can't start or end with space`)
            $('.newUserForm1 .checkCompanyNameAvailbility').prop('hidden', false)
            $('.newUserForm1 .newUserNext').prop('disabled', true)
        }
        else if ($(event.currentTarget).val().trim()) {
            $('.newUserForm1 .checkCompanyNameAvailbility').prop('hidden', true)
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
                alert("Something is not right, please try again")
            }
        })
    })
}

function logOut() {
    $('.main').on('click', '.logOut', event=>{
        event.preventDefault();
        fetch(logOutENDPOINT, {
            credentials: 'include',
            method: 'GET',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        })
        .then(response=> {
            if (response.ok) {
                window.location.assign('/')
            }
            else {
                alert("Somehow can't log you out now. Please try again later")
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
            throw response.json()
        })
        .then(responseJSON=>{
            alert("New customer added")
            $('.addCustomer').trigger('reset')
            //keep JWT fresh
            keepJWTfresh()
        })
        .catch(errJSON=>
            errJSON.then(
                errWithMessage=>{
                    alert(errWithMessage.message)
                }
            )
        )
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
            <input type="text" placeholder="What to charge?" class="item" required id="item${itemNumber}">
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
    $('.main').on('change keyup', '.amount', event=>{
        updatTotal()
    })
    $('.main').on('click', '.addMoreItem', event=>{
        updatTotal()
    })
    $('.main').on('click keyup', '.remove', event=>{
        updatTotal()
    })
}

function trackChanges(){
    $('.main').on('change', 'input', event=>{
        $('.main').data("changed", true);
    })
}

function deleteMe() {
    $('.main').on('click', '.deleteMe', event=>{
        event.preventDefault()
        if (confirm("Are you sure? This cannot be undone")) {
            fetch(deleteMeENDPOINT, {
            credentials: 'include',
            method: "DELETE",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        })
        .then(response=>{
            if(response.ok) {
                alert("We have removed all your data~")
                window.location.assign('/')
            }
        })}
    })
}
function cancelButton() {
    $('.main').on('click', '.cancel', event=>{
        event.preventDefault();
        //alert user if they have unsaved data
        if ($('.main').data("changed")) {
            if (confirm('If you leave before saving, your changes will be lost')) {
                keepJWTfresh()
                $('.centerBody').html(featureSelections);
                $('.main').removeData("changed");
            }
            else {
                // Do nothing!
            }
        }
        else {
            keepJWTfresh();
            $('.centerBody').html(featureSelections);
        }
    })
}

function homeButton(){
    $('.main').on('click', '.home', event=>{
        event.preventDefault();
        keepJWTfresh()
        $('.centerBody').html(featureSelections)
        $('.searchResult').remove()
    }
)}

function removeItem() {
    $('.main').on('click', '.remove', event=>{
        event.currentTarget.closest('div').remove();
    }
)}

function invoiceSubmit() {
    $('.main').on('submit', '.newInvoiceForm', event=>{
        event.preventDefault();

        if($('#customer').val()) {
            //prevent popup windows being blocked by browser
            let newInvoiceWindow;
            if (confirm("Do you want to open new invoice once created?")) {
                newInvoiceWindow = window.open("","New Invoice","resizable,scrollbars=yes,status=0,_blank");
                newInvoiceWindow.document.write('Loading invoice...');
            }
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

            const now = new Date()
            const invDate = `${now.getMonth().toString()}/${now.getDate().toString()}/${now.getFullYear().toString()}`

            newInvoice.generateDate = invDate;
            newInvoice["items"] = items;
            

            if ($('.newInvoiceForm').data("invoiceNumber")) {
                newInvoice["invoiceNumber"] = $('.newInvoiceForm').data("invoiceNumber")
                return fetch(invoiceENDPOINT, {
                    credentials: 'include',
                    method: "PUT",
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
                    viewInvoice(responseJSON, newInvoiceWindow)
                })
            }
            else {
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
                viewInvoice(responseJSON, newInvoiceWindow)
            })
            }
        }
        else {
            alert("You must have at least one customer added before you can create new invoice")
        }
    })
}

function viewInvoice(responseJSON, newInvoiceWindow) {
    if(newInvoiceWindow) {
        let totalCharges = responseJSON.invoices[0].items.map(item=>item.charge).reduce((total, charge)=>total+=charge).toFixed(2);
        let items = responseJSON.invoices[0].items.map(item=>`<tr class="item"><td>${item["item"]}</td><td>$${item["charge"]}</td></tr>`)
        let invoiceHtml =
        `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title>Invoice# ${responseJSON.invoices[0].invoiceNumber}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="stylesheet" type="text/css" media="screen,print" href="./invoice.css">
        </head>
        <body>
            <main role="main" class="main">
                <section role="region" class="invoice">
                    <div class="invoice-box">
                        <table cellpadding="0" cellspacing="0">
                            <tbody>
                                <tr class="top">
                                    <td colspan="2">
                                        <table>
                                            <tbody>
                                            <tr>
                                                <td class="title">${responseJSON.user.companyName}</td>
                                                <td>Invoice #: ${responseJSON.invoices[0].invoiceNumber}<br>
                                                Created: ${responseJSON.invoices[0].generateDate}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr class="information">
                                        <td colspan="2">
                                            <table>
                                                <tbody><tr>
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
                                            </tbody></table>
                                        </td></tr>
                                
                                <tr class="heading">
                                    <td>Item</td>
                                    <td>Price</td>
                                </tr>
                                ${items}
                                <tr class="total"><td></td>
                                        <td>Total: $${totalCharges}</td></tr>
                                </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </body>
        </html>`
        $(newInvoiceWindow.document.body).html(invoiceHtml);
    }
    else {
        alert(`Invoice created, invoice# ${responseJSON.invoices[0].invoiceNumber}`)
    }
    //remove all input value
    $('.newInvoiceForm input').val('')
    //remove data set previously for invoice update if any
    
    if($('.newInvoiceForm').data("invoiceNumber")) {
        $('.centerBody').html(searchForm);
        $('.newInvoiceForm').removeData("invoiceNumber")
    }
    $('.invoiceTotal').empty()
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
    else {
        //check if user need more time
        setTimeout(keepJWTfresh, 120001)
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
            setTimeout(sessionTimeCheck, 480000)
        }
        else {
            alert("You are not login or have been logged out due to inactivity")
            window.location.assign('/')
            // throw response.json()
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