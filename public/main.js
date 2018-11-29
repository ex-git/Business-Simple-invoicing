'use strict'

const userENDPOINT = '/users'
const customerENDPOINT = '/customers'
const invoiceENDPOINT = '/invoices'

const featureSelections =
`<div class="featureSelections">
    <div class="mainFeature">
        <button class="button newInvoice"><i class="fas fa-file-invoice-dollar"></i><span class="feature">Create Invoice</span></button>
    </div> 
    <button class="button newCustomer"><i class="fas fa-plus"></i><span class="feature">Add Customer</span></button>
    <button class="button searchInvoice"><i class="far fa-user"></i><span class="feature">Edit Customer</span></button>
    <button class="button searchInvoice"><i class="fas fa-search"></i><span class="feature">Search</span></button>
</div>`

const newInvoiceForm = 
`<form action="" class="newInvoiceForm">
    <fieldset class="customerInfo">
        <legend>Customer Info</legend>
        <label for="customer">Customer</label>
        <input placeholder="Customer Name" id="customer" list="customersList" required="yes">
        <datalist id="customersList">
            <option value="APEC World LLC">APEC World LLC</option>
            <option value="The Kitchen">The Kitchen</option>
            <option value="Italian Pizza House">Italian Pizza House</option>
        </datalist>
    </fieldset>
    <fieldset class="items">
        <legend>Items/Services</legend>
        <datalist id="itemsList">
                <option value="Office supplies">Office supplies</option>
                <option value="Kitchen supplies">Kitchen supplies</option>
                <option value="VOIP">Voice over IP serve</option>
        </datalist>
        <fieldset id="item1">
            <label for="item1">Item 1</label>
            <input placeholder="What to charge?" id="item1" list="itemsList" type="text">
            <label for="amount1">amount</label>
            <input placeholder="$?" id="amount1" type="number">
            <button class="remove fas fa-minus"></button>
        </fieldset>
        <button class="addMoreItem fas fa-plus"></button>
    </fieldset>
    <fieldset class="buttons">
        <button class="button" type="submit"><span class="submit">Finish</span><i class="fas fas fa-vote-yea"></i></button>
    </fieldset>
</form>`


function catchButtonsClick () {
    $('.main').on('click', '.mainPageLogin', event=>{
        event.preventDefault();
        $('.mainPageGreeting').prop('hidden', true);
        $('.mainHeader').addClass('hiden')
        $('.logInForm').prop('hidden', false)
    })
    $('.main').on('click', '.logInAuth', event=>{
        event.preventDefault();
        const data = {
            userName : $('.logInForm #userName').val(),
            password : $('.logInForm #password').val()
        }
        fetch(userENDPOINT, {
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then(response=>{
            if (response.ok) {
                $('.centerBody').html(featureSelections)
            }
        })
    })
    $('.main').on('click', '.newInvoice', event=>{
        event.preventDefault();
        $('.featureSelections').addClass('hiden')
        $('.centerBody').append(newInvoiceForm)
    })
    addMoreItem();
    removeItem();
    invoiceSubmit()
}


//invoice items
let itemNumber = 1;

function addMoreItem() {
    $('.main').on('click', '.addMoreItem', event=>{
        event.preventDefault();
        itemNumber +=1;
        const addMore = `
        <fieldset id="item${itemNumber}">
            <label for="item${itemNumber}">Item ${itemNumber}</label>
            <input placeholder="What to charge?" id="item${itemNumber}" list="itemsList">
            <label for="amount${itemNumber}">amount</label>
            <input placeholder="$?" id="amount${itemNumber}">
            <button class="remove fas fa-minus"></button>
         </fieldset>`
        $(addMore).insertBefore('.addMoreItem')
    }
)}

function removeItem() {
    $('.main').on('click', '.remove', event=>{
        event.currentTarget.closest('fieldset').remove();
    }
)}

function invoiceSubmit() {
    $('.main').on('submit', '.newInvoiceForm', event=>{

        event.preventDefault();
        console.log("ok")
    })
}

$(catchButtonsClick)