
describe('Create Invoice', ()=>{

    beforeEach('Login by submiting form',() => {

        const email_address = 'milica.tiodor@gmail.com'
        const password = '12345678'
       
        cy.visit('https://invoicely.com/login')
        cy.get('#email_address').type(email_address)
        cy.get('#password').type(password)
        cy.get('form').submit()       
        cy.get('li').first().click()
        cy.contains('Add New').click()
        cy.get('.i_new_invoice').click()
        cy.get('.address > [data-validate="required"]')
        .type('r')
        cy.get('[data-index="1"]').click()

      })

      it('Quantity - Mandatory field does not filled',()=>
      {
        cy.get('.quantity_input > input').clear()
        .should('be.empty')
  
        cy.get('.save-button')
        .scrollIntoView().click()
  
        cy.get('.alert')
        .should('contain', 'Invoice added.')
  
      })
      it('Validate "Purchase order number" field',()=>
      {
        cy.get('.statement_details > :nth-child(3) > input')
        .type('Recommended to be number')
        .should('have.value','Recommended to be number')

        cy.get('.save-button')
        .scrollIntoView().click()
  
        cy.get('.alert')
        .should('contain', 'Invoice added.')

      })

     
      
      it('Select Custom on "Due Date" field', ()=>
      {
        cy.get('.statement_details > :nth-child(2) > select').select('Custom')
        .should('have.value','custom')
  
        cy.get('#datepicker_due_date').should('be.visible')     
      })
      it('New Client Form checking if link works',()=>
      {
        cy.get('.close_icon').click(0, 0, { force: true })
        cy.get('.address_to > .form_heading > .right').click().wait(1000)
        cy.get('.x_content > header').should('contain','New Client')
      })

      it('Edit Client Form checking if link works',()=>
      {
        
        cy.get('.address_to > .form_heading > .right').click().wait(1000)
        cy.get('.x_content > header').should('contain','Edit Client')
        
      })

      it('Adding new client - input spaces',()=>
      {
        cy.get('.close_icon').click(0, 0, { force: true })
        cy.get('.address_to > .form_heading > .right')
        .click().wait(1000)

        cy.get('.x_content > header')
        .should('contain','New Client')

        cy.get('.individual > .first')
        .type('  ')
        .should('have.value','  ')

        cy.get(':nth-child(12) > .form_row > .save_button').click()
      
        cy.get('.alert').should('contain','Client added.')
        
      })

      it('Adding new client',()=>
      {
        cy.get('.close_icon').click(0, 0, { force: true })
        cy.get('.address_to > .form_heading > .right')
        .click().wait(1000)

        cy.get('.x_content > header')
        .should('contain','New Client')

        cy.get('.individual > .first')
        .type('Client1')
        .should('have.value','Client1')

        cy.get(':nth-child(12) > .form_row > .save_button').click()
      
        cy.get('.alert').should('contain','Client added.')
        
      })
 
       it('Language field input validation',()=>
    {
        cy.get('.language_select > select')
        .select('English (US)')
        .should('have.value','en-us')

        cy.get('.language_select > select')
        .select('English (US)')
        .should('not.have.value','en-uk')

        cy.get('.save-button',)
        .scrollIntoView().click()
  
        cy.get('.alert')
        .should('contain', 'Invoice added.')   
     })
   
     it('Add description field validation',()=>
    {
        cy.get('.statement_description > textarea').clear()
        .should('to.be.empty')

        cy.get('.statement_description > textarea')
        .type('Description test')
        .should('have.value','Description test')

        cy.get('.statement_description > textarea').clear()
        .type('12345678/*!?')
        .should('have.value','12345678/*!?')

        cy.get('.statement_description > textarea').clear()
        .type('  ')
        .should('have.value','  ')

        cy.get('.save-button')
        .scrollIntoView().click()
  
        cy.get('.alert')
        .should('contain', 'Invoice added.')

     })

      it('"Invoice Settings, Payment & Delivery" button - succesfully redirection',()=>
  {
    cy.get('footer > .button').click()
    
    cy.contains('Invoice Settings')

    cy.get('.back_button').click()

    cy.get('.save-button')
    .scrollIntoView().click()

    cy.get('.alert')
    .should('contain', 'Invoice added.')

      })   

      it('Invoice No - existed',()=>
      {
        cy.get('.max_100').clear()
        .type('-209')
  
        cy.get('.save-button')
        .scrollIntoView().click()
  
        cy.get('.alert')
        .should('contain', 'A statement with this number already exists. Please enter a different statement number.')
  
      })
  
      it('Currency field - select none option ',()=>
      {
  
        cy.get('.currency_select > select')
        .select('----------------')
        .should('have.value','null')
  
        cy.get('.save-button')
        .scrollIntoView().click()
  
        cy.get('.alert')
        .should('contain', 'An error occurred. Please try again or contact support. (Error Reference: invalid_statement_currency)')
   
      })
  
   
       
    
      it('Validate Invoice Draft Title field',()=>
      {
  
        cy.get('.title > input').clear()
        .should('to.be.empty')
  
        cy.get('.title > input')
        .type('invoice test')
        .should('have.value','invoice test')
  
        cy.get('.title > input').clear()
        .type('INVOICE TEST')
        .should('have.value','INVOICE TEST')
  
        cy.get('.title > input').clear()
        .type('123!-@')
        .should('have.value','123!-@')
  
        cy.get('.title > input')
        .clear().type('Invoice test')
        .should('not.have.value','Invoice testt')
  
        cy.get('.save-button')
        .scrollIntoView().click()
  
        cy.get('.alert')
        .should('contain', 'Invoice added.')
      })
  
  
      it('Validate "Invoice No" field', ()=>
      {
            cy.get('.max_100').clear()
            .should('be.empty')
  
            cy.get('.max_100')
            .type('test no')
            .should('have.value','test no')
  
            cy.get('.max_100').clear()
            .type('test1 no')
            .should('not.have.value','test no')
         
      })
  
   
      it('Validate "Due date" field', ()=>
      {
          cy.get('.statement_details > :nth-child(2) > select')
          .should('have.value','0')
  
          cy.get('#datepicker_due_date').should('not.be.visible')
  
      })
  
  
       it('Validate "Currency select" field', ()=>
      {
              
              cy.get('.currency_select > select')
              .should('have.value','usd')
  
              cy.get('a > .input_addon').
              should('contain','USD')
  
              cy.get(':nth-child(4) > .statement_amount > div.col > strong > span')
              .should('contain','USD')
  
              cy.get('.td_currency')
              .should('contain','USD')
  
              cy.get('.currency_select > select')
              .should('not.have.value','eur')
  
              cy.get('.currency_select > select')
              .select('----------------')
              .should('have.value','null')
  
              cy.get('a > .input_addon').
              should('contain','NULL')
  
              cy.get(':nth-child(4) > .statement_amount > div.col > strong > span')
              .should('contain','NULL')
  
              cy.get('.td_currency')
              .should('contain','NULL')
  
            
       })

      it('Discount button',()=>
        {
          cy.get('.button_row > .right > :nth-child(3) > .attach_button').click()
  
           cy.get(':nth-child(1) > .statement_amount > .second > .inner > select')
           .should('be.visible')
  
           cy.get(':nth-child(1) > .statement_amount > .second > .inner > select')
           .should('have.attr','data-input-type','select')
           
           cy.get(':nth-child(1) > .statement_amount > .third')
           .should('have.class','col third no_input')
  
            cy.get('.save-button')
             .scrollIntoView().click()
       
             cy.get('.alert')
             .should('contain', 'Invoice added.')
   
        })
  
        it('Shipping button',()=>
        {
          cy.get('.right > :nth-child(4) > .attach_button').click()
          cy.get('.shipping > .statement_amount').should('be.visible')
  
          cy.get('.shipping > .statement_amount > .second > .inner > select')
          .should('have.attr','data-input-type','select')
           
          cy.get('.shipping > .statement_amount > .third')
          .should('have.class','col third no_input')
  
          cy.get('.save-button')
          .scrollIntoView().click()
       
          cy.get('.alert')
          .should('contain', 'Invoice added.')
        })

        it('Adding Expense',()=>
        {
         
          cy.get(':nth-child(8) > .new_item').click()//expense
          cy.get(':nth-child(8) > .dropdown-menu > :nth-child(2) > a').click()
          cy.get(':nth-child(8) > .dropdown-menu > :nth-child(2) > a')
          .should('contain', 'Expense') 
          
          cy.get('#item_textarea_2 > .item_textarea')
          .type('ExpenseDesc')
          .should('have.value','ExpenseDesc')
  
          cy.get('[data-id="2"] > .item_row > .amount > .inner > .total_input > .with_addon').clear()
          .type('9.99').should('have.value','9.99')
          cy.get('[data-id="2"] > .item_row > .action > .inner > .pull-right > .relative > .button').click()
          cy.get('[data-id="2"] > .item_row > .action > .inner > .pull-right > .relative > .dropdown-menu > :nth-child(2) > a').click()
          .wait(1000)
  
          cy.get('.x_content > header').should('contain','New Expense')
  
          cy.get(':nth-child(3) > .form_row > .save_button').click().wait(500)
          cy.get('.alert')
          .should('contain', 'Expense added.')  
        })
      
        it('Adding item',()=>   
        {
          cy.get('.item_textarea').click()
         .scrollIntoView().wait(500)
  
         cy.get('.item_autocomplete > [data-index="0"]').click()
  
          cy.get('.quantity_input > input').type('2')
  
          cy.get('[name="statement[item_rate]"]').clear().type('2')
  
          cy.get('.left > .date').click()
  
          cy.get('[data-day="12"] > .pika-button').click().wait(500)
  
          cy.get('.files_area').should('be.visible','#date_tag_1')
  
          cy.get('.left > :nth-child(4) > .attach_button')
          .scrollIntoView().click().wait(500)
  
          cy.get('.link_ttd').type('Link1')
  
          cy.get('.link_url').type('example.com')
  
          cy.get('.dropdown-menu > :nth-child(2) > .form_row > .save_button').click()
  
          cy.get('.item_textarea').should('contain','[Link1](http://example.com)').wait(500)
  
          cy.get(':nth-child(5) > .attach_button').click().wait(500)
  
          cy.get(':nth-child(5) > .dropdown-menu > .gray > .new_item').click()
        
          cy.get('#new_tag_1')
          .should('be.visible')
          
          cy.get('#new_tag_1').type('doll')
  
          cy.get('#remember_tag_1').click()
  
          cy.get(':nth-child(5) > .dropdown-menu > .gray > .new_tag_item_form > [style="margin-top: 14px;"] > .save_button')
          .click()
  
          cy.get('.item_textarea').should('be.visible','#tag_item_tag_1_2')
  
          cy.get(':nth-child(1) > .attach_button').click().wait(500)
  
          cy.get(':nth-child(1) > .dropdown-menu > .gray > .new_item').click()
  
          cy.get(':nth-child(1) > .dropdown-menu > .gray > .new_tag_item_form > .new_tag_item_input')
          .type('taxName')
  
          cy.get(':nth-child(1) > .dropdown-menu > .gray > .new_tag_item_form > .new_tag_item_rate_input')
          .type('0.00')
  
          cy.get(':nth-child(1) > .dropdown-menu > .gray > .new_tag_item_form > :nth-child(3)').click()
  
          cy.get(':nth-child(1) > .dropdown-menu > .gray > .new_tag_item_form > [style="margin-top: 14px;"] > .save_button').click()
  
          cy.get('.item_textarea').should('be.visible','#tag_item_tax_1_3')
  
          cy.get('.inner > .right > :nth-child(2) > .attach_button').click()
  
          cy.get(':nth-child(2) > .dropdown-menu > .gray > .new_item').click()
  
          cy.get(':nth-child(2) > .dropdown-menu > .gray > .new_tag_item_form > .new_tag_item_input')
          .type('discountName')
  
          cy.get(':nth-child(2) > .dropdown-menu > .gray > .new_tag_item_form > .new_tag_item_rate_input')
          .type(0.02)
  
          cy.get(':nth-child(2) > .dropdown-menu > .gray > .new_tag_item_form > :nth-child(3) > label').click()
  
          cy.get(':nth-child(2) > .dropdown-menu > .gray > .new_tag_item_form > [style="margin-top: 14px;"] > .save_button').click()
  
          cy.get('.item_textarea').should('be.visible','#tag_item_tag_1_4')
  
          cy.get('.inner > .right > :nth-child(3) > .attach_button').click()
  
          cy.get(':nth-child(3) > .dropdown-menu > .gray > .new_item').click()
  
          cy.get(':nth-child(3) > .dropdown-menu > .gray > .new_tag_item_form > .new_tag_item_input')
          .type('ShippingName')
  
          cy.get(':nth-child(3) > .dropdown-menu > .gray > .new_tag_item_form > .new_tag_item_rate_input')
          .type('0.003')
  
          cy.get(':nth-child(3) > .dropdown-menu > .gray > .new_tag_item_form > :nth-child(3) > label').click()
  
          cy.get(':nth-child(3) > .dropdown-menu > .gray > .new_tag_item_form > [style="margin-top: 14px;"] > .save_button')
          .click()
  
          cy.get('.item_textarea').should('be.visible','#tag_item_tag_1_5')
  
          cy.get('[data-id="1"] > .item_row > .action > .inner > :nth-child(1) > .relative > .button').click()
  
          cy.get('.inner > :nth-child(1) > .relative > .dropdown-menu > :nth-child(2) > a').click().wait(1000)
  
          cy.get('.x_content > header').should('contain', 'New Item')
  
         
  
          cy.get('.x_textarea_container > textarea').type('Description Item')
  
          cy.get('.page > :nth-child(2) > .form_row > input').clear()
          .type('Doll')
          cy.get(':nth-child(6) > .form_row > .save_button').click().wait(500)
  
          cy.get('.alert',{timeout:10000})
          .should('contain', 'Item added.')
  
  
        })
     
        it('Validate "Date" field ',()=>
        {
            cy.get('#datepicker').clear()
            .should('to.be.empty')
  
           cy.get('#datepicker')
            .type('Date format test')
            .should('have.value','Date format test')
    
             cy.get('#datepicker').clear()
             .type('Apr 15 2020')
             .should('not.have.value','15 Apr 2020')
    
             cy.get('#datepicker').clear()
             .type('Apr 15 2020')
             .should('have.value','Apr 15 2020').click()
  
             cy.get('.save-button',{timeout:10000})
             .scrollIntoView().click()
       
             cy.get('.alert',{timeout:10000})
             .should('contain', 'Invoice added.')
     
        })
        
        it('Validate "Custom due date" field',()=>
        {
          cy.get('.statement_details > :nth-child(2) > select').select('Custom')
          .should('have.value','custom')
          
            cy.get('#datepicker_due_date').clear()
            .should('to.be.empty')
    
            cy.get('#datepicker_due_date')
            .type('Date format test')
            .should('have.value','Date format test')
    
             cy.get('#datepicker_due_date').clear()
             .type('Apr 15 2020')
             .should('not.have.value','15 Apr 2020')
    
             cy.get('#datepicker_due_date').clear()
             .type('Apr 15 2020')
             .should('have.value','Apr 15 2020')
        })
        it('Tax button',()=>
        {
          cy.get('.button_row > .right > :nth-child(2) > .attach_button').click()
          cy.get('#tax_discount_shipping_wrapper > :nth-child(1) > .statement_amount')
          .should('be.visible')
  
          cy.get('.tds_name')
          .should('have.attr','name','tax_name_2')
  
          cy.get('#tax_rate_2').should('have.attr','data-input-restriction','percentage')
  
          cy.get(':nth-child(1) > .statement_amount > .second > [style=""] > label')
          .should('be.visible')
  
          cy.get('.save-button')
          .scrollIntoView().click()
       
          cy.get('.alert')
          .should('contain', 'Invoice added.')
        })
  
        it('New Business Profile Link ',()=>
        {
          cy.get('.address_from > .form_heading > .right').should('have.attr', 'href', '/settings/business')
          
        })
  
         it('Unit field - selected Custom option',()=>
      {
        
        cy.get('.unit_lower > .with_addon').select('Custom')
        .should('have.value','custom')
  
        cy.get('.unit_lower > .text_unit_input_css').should('be.visible').type('UnitTest')
        .should('have.value','UnitTest')
  
        cy.get('.save-button')
        .scrollIntoView().click()
       
        cy.get('.alert')
        .should('contain', 'Invoice added.')
        })
  
        it('Invoice No field - input decimal numbers',()=>
    {
      //input have to be changed in each testing iteration
      cy.get('.max_100').clear()
      .type('6.7654321')
      .should('have.value','6.7654321')

      cy.get('.save-button')
      .scrollIntoView().click()

      cy.get('.alert')
      .should('contain', 'Invoice added.')
     })

      it('Invoice No field - input negative numbers',()=>
    {
      //input have to be changed in each testing iteration
      cy.get('.max_100').clear()
      .type('-211111')
      .should('have.value','-211111')

      cy.get('.save-button')
      .scrollIntoView().click()

      cy.get('.alert')
      .should('contain', 'Invoice added.')
      })
      it('Successfully submission Create Invoice form',()=>
      {
        
        cy.get('.statement_description > textarea')
        .type('Description test')
        .should('have.value','Description test')
  
        cy.get('#datepicker').clear()
        .type('Apr 15 2020')
        .should('have.value','Apr 15 2020')
  
        cy.get('.language_select > select')
        .select('English (US)')
        .should('have.value','en-us')
  
        //input have to be changed in each testing iteration
        cy.get('.max_100').clear()
        .type('invoice1234').should('have.value','invoice1234')
  
        cy.get('.currency_select > select')
        .should('have.value','usd')
  
        cy.get('.statement_details > :nth-child(2) > select')
        .select('Due on Receipt').should('have.value','0')
  
        cy.get('.statement_details > :nth-child(3) > input')
        .type('Purchase order number test 1')
       
        cy.get('.item_textarea').type('Item description test')
        .should('have.value','Item description test')
  
        cy.get('.quantity_input > input').type('2')
        .should('have.value','2')
  
        cy.get('[name="statement[item_rate]"]').clear().type('2')
        .should('have.value','2')
  
        cy.get('.left > .date')
        .click()
        .should('be.visible','[style="position: absolute; left: 121.632px; top: 849.375px;"]')
  
        cy.get('.left > :nth-child(4) > .attach_button') 
        .click()
        .should('be.visible','.left > :nth-child(4) > .dropdown-menu')
  
        cy.get(':nth-child(5) > .attach_button').click()
        .should('be.visible',':nth-child(5) > .dropdown-menu') 
  
        cy.get(':nth-child(1) > .attach_button').click()
        .should('be.visible','.right > :nth-child(1) > .dropdown-menu')
  
  
        cy.get('.inner > .right > :nth-child(2) > .attach_button') 
        .click()
        .should('be.visible', ':nth-child(2) > .dropdown-menu')
  
  
        cy.get('.inner > .right > :nth-child(3) > .attach_button')//shipping
        .click()
        .should('be.visible', ':nth-child(3) > .dropdown-menu')
        
        
        cy.get('.unit_lower > .with_addon').select('pc')
        .should('have.value','pc') 
  
        cy.get('.relative > .button').click() 
        .should('be.visible','.inner > :nth-child(1) > .relative > .dropdown-menu')
  
        cy.get(':nth-child(8) > .new_item').click()
        .should('be.visible',':nth-child(8) > .dropdown-menu > :nth-child(1) > a')
        .and('be.visible',':nth-child(8) > .dropdown-menu > :nth-child(2) > a')
        .and('be.visible',':nth-child(8) > .dropdown-menu > :nth-child(3) > a')
        .and('be.visible',':nth-child(8) > .dropdown-menu > :nth-child(3) > a')
    
        cy.get(':nth-child(8) > .dropdown-menu > :nth-child(1) > a').should('contain', 'Item')
        cy.get(':nth-child(8) > .dropdown-menu > :nth-child(2) > a').should('contain', 'Expense')
        cy.get(':nth-child(8) > .dropdown-menu > :nth-child(3) > a').should('contain', 'Mileage')
        cy.get(':nth-child(8) > .dropdown-menu > :nth-child(4) > a').should('contain', 'Time')
  
        cy.get('.button_row > .right > :nth-child(2) > .attach_button').click() 
        .should('be.visible','#tax_discount_shipping_wrapper > .statement_amount_container > .statement_amount')
        
        cy.get('.button_row > .right > :nth-child(3) > .attach_button').click()
        .should('be.visible','.discount > .statement_amount')
  
        cy.get('.right > :nth-child(4) > .attach_button').click() 
        .should('be.visible','#tax_discount_shipping_wrapper > :nth-child(4) > .statement_amount')
        
        cy.get('.link > a')
        .should('have.attr','href','/settings/taxes') 
  
        cy.get('.normal > a')
        .should('have.attr','href','/settings/emails/edit/invoice_default_note')
  
        cy.get('.mt40 > textarea')
        .type('Invoice note test')
        .should('have.value','Invoice note test')
  
        cy.get('[style="color:#2676a5; position: absolute;bottom: 65px;"]')
        .should('have.attr','href','/settings/emails/edit/statement_footer')
       
        cy.get('footer > .button').scrollIntoView().click()     
       
        cy.get('.page > :nth-child(14)')
        .should('be.visible')
  
        cy.get('.back_button').click() 
        
        cy.get('.statement_logo_container > a > img')
        .should('be.visible', '/settings/graphics')
  
        cy.get('.address_from > .form_heading > .right')
        .click()
        .should('be.visible', '/settings/business') 
  
        cy.get('.address_to > .form_heading > .right') 
        .click()
        .should('be.visible', '.x_content > header')
  
        cy.get('.cancel_button').click() 
        
        cy.get('.business > img')
        .click()
       
  
        cy.get('.save-button',{timeout:10000})
       .scrollIntoView().click()
  
       cy.wait(3000)
  
        cy.get('.alert',{timeout:10000})
       .should('contain', 'Invoice added.')
  
        
      }) 
  
})

