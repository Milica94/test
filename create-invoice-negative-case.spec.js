describe('Create Invoice Negative Cases', ()=>{
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

      it('Quantity field - input text',()=>
      {
        cy.get('.quantity_input > input')
        .should('have.attr','data-input-restriction','number')
        
        cy.get('.quantity_input > input')
        .type('!-*ahshkal123')
        .should('have.value','!-*ahshkal123')
 
        cy.get('.save-button',{timeout:1000})
        .scrollIntoView().click().wait(500)
      
        cy.url().should('contain','invoices').wait(500)

        cy.get('.alert',{timeout:1000})
        .should('contain', 'Invoice added.')
      
      })
    it('Adding new client - empty name field',()=>
    {
      cy.get('.close_icon').click(0, 0, { force: true })
      cy.get('.address_to > .form_heading > .right')
      .click().wait(1000)
    
      cy.get('.x_content > header')
      .should('contain','New Client')
    
      cy.get('.individual > .first').clear()        
      .should('have.value','')
    
      cy.get(':nth-child(12) > .form_row > .save_button').click()    
    
      cy.get('.info_strip').should('contain','There were errors. Please try again.')
      
    })
    
    it('Add link form - empty fields',()=>
    {
      cy.get('.left > :nth-child(4) > .attach_button').click()
    
      cy.get('.link_ttd').clear()
      cy.get('.link_url').clear()
      cy.get('.dropdown-menu > :nth-child(2) > .form_row > .save_button').click()
    
      cy.get('.link_ttd').should('have.class','link_ttd error')
      cy.get('.link_url').should('have.class','link_url error')
    
    })
    
    it('New Shipping form (Item Description form) - Input negative number',()=>
    {
        cy.get('.inner > .right > :nth-child(3) > .attach_button').click()
    
        cy.get(':nth-child(3) > .dropdown-menu > .gray > .new_item').click()
        
        cy.get(':nth-child(3) > .dropdown-menu > .gray > .new_tag_item_form > .new_tag_item_input')
        .type('Shipping1')
    
        cy.get(':nth-child(3) > .dropdown-menu > .gray > .new_tag_item_form > .new_tag_item_rate_input')
        .type('-2414234')
        .should('have.value','-2414234')
    
        cy.get(':nth-child(3) > .dropdown-menu > .gray > .new_tag_item_form > [style="margin-top: 14px;"] > .save_button')
        .click()
    
        cy.get('.save-button').click()
    
        cy.get('.alert',).wait(200)
        .should('contain', 'Invoice added.')
    })
    it('New Shipping form (Item Description form) - Input text',()=>
    {
        cy.get('.inner > .right > :nth-child(3) > .attach_button').click()
    
        cy.get(':nth-child(3) > .dropdown-menu > .gray > .new_item').click()
    
        cy.get(':nth-child(3) > .dropdown-menu > .gray > .new_tag_item_form > .new_tag_item_input')
        .type('Shipping1')
    
        cy.get(':nth-child(3) > .dropdown-menu > .gray > .new_tag_item_form > .new_tag_item_rate_input')
        .type('abcdewt12314??#$%#')
        .should('have.value','abcdewt12314??#$%#')
    
        cy.get(':nth-child(3) > .dropdown-menu > .gray > .new_tag_item_form > [style="margin-top: 14px;"] > .save_button')
        .click()
    
        cy.get('.save-button').click()
    
        cy.get('.alert')
        .should('contain','An error occurred. Please try again or contact support. (Error Reference: invalid_pricing_item_amount)')
    
    })
    
      
    it('Rate field (Item Description form) input negative number',()=>
    {
      cy.get('[name="statement[item_rate]"]')
      .should('have.attr','data-input-restriction','number')
    
      cy.get('[name="statement[item_rate]"]').clear()
      .type('-5543')
      .should('have.value','-5543')
    
      cy.get('.save-button')
      .scrollIntoView().click()
    
      cy.get('.alert',).wait(200)
      .should('contain', 'Invoice added.')
    })
    
    it('Rate field (Item Description form) input text',()=>//pao
    {
      cy.get('[name="statement[item_rate]"]')
      .should('have.attr','data-input-restriction','number')
    
      cy.get('[name="statement[item_rate]"]').clear()
      .type('!-*1?2fdgsg')
      .should('have.value','!-*1?2fdgsg')
    
      cy.get('.save-button')
      .scrollIntoView().click()
    
      cy.get('.alert')
      .should('contain', 'An error occurred. Please try again or contact support. (Error Reference: invalid_line_item_unit_price)')
    })
    
    it('Tax rate field (Item Description form) - Input negative number',()=>
    {
      cy.get(':nth-child(1) > .attach_button').click()
    
      cy.get(':nth-child(1) > .dropdown-menu > .gray > .new_item').click()
      
      cy.get(':nth-child(1) > .dropdown-menu > .gray > .new_tag_item_form > .new_tag_item_input')
      .type('tax2')
    
      cy.get(':nth-child(1) > .dropdown-menu > .gray > .new_tag_item_form > .new_tag_item_rate_input').clear()
      .type('-103').should('not.have.value','-103')
    
      cy.get(':nth-child(1) > .dropdown-menu > .gray > .new_tag_item_form > [style="margin-top: 14px;"] > .save_button')
      .click()
    
    })
    
    it('Tax rate field (Item Description form) - Input text',()=>
    {
      cy.get(':nth-child(1) > .attach_button').click()
    
      cy.get(':nth-child(1) > .dropdown-menu > .gray > .new_item').click()
      
      cy.get(':nth-child(1) > .dropdown-menu > .gray > .new_tag_item_form > .new_tag_item_input')
      .type('tax2')
    
      cy.get(':nth-child(1) > .dropdown-menu > .gray > .new_tag_item_form > .new_tag_item_rate_input')
      .type('abc0.3').should('not.have.value','abc0.3')
    
      cy.get(':nth-child(1) > .dropdown-menu > .gray > .new_tag_item_form > [style="margin-top: 14px;"] > .save_button')
      .click()
    
    })
    
    it('New Tax form - empty fields',()=>
    {
      cy.get(':nth-child(1) > .attach_button').click()
    
      cy.get(':nth-child(1) > .dropdown-menu > .gray > .new_item').click()
      
      cy.get(':nth-child(1) > .dropdown-menu > .gray > .new_tag_item_form > [style="margin-top: 14px;"] > .save_button').click()
    
      cy.get(':nth-child(1) > .dropdown-menu > .gray > .new_tag_item_form > .new_tag_item_input')
      .should('have.class','new_tag_item_input error')
    
      cy.get(':nth-child(1) > .dropdown-menu > .gray > .new_tag_item_form > .new_tag_item_rate_input')
      .should('have.class','new_tag_item_rate_input error')
    
    })
    
    it('New Tag form - empty name of tag',()=>
    {
      cy.get(':nth-child(5) > .attach_button').click()
    
      cy.get(':nth-child(5) > .dropdown-menu > .gray > .new_item').click()
    
      cy.get(':nth-child(5) > .dropdown-menu > .gray > .new_tag_item_form > [style="margin-top: 14px;"] > .save_button')
      .click()  
    
      cy.get('#new_tag_1')
      .should('have.attr','class','new_tag_item_input error')
    
    })
    it('Unsuccessfully create Invoice form  - empty form',()=>
    {
    
      cy.get('.close_icon').click(0, 0, { force: true })
    
      cy.get('.title > input').clear()
      .should('to.be.empty')
    
      cy.get('.title > input').clear()
      .should('to.be.empty')
    
      cy.get('.max_100').clear()
      .should('be.empty')
    
      cy.get('.currency_select > select')
      .select('----------------')
      .should('have.value','null')
    
      cy.get('.quantity_input > input').clear()
      .should('be.empty')
    
      cy.get('.save-button')
      .scrollIntoView().click()
    
      cy.get('.alert')
      .should('contain', 'Please specify a client/vendor.')
    
    })

 
    it('Mandatory field does not filled - Enter Client Name',()=>
        {
        
        cy.get('.close_icon').click(0, 0, { force: true })
          cy.get('.save-button')
          .scrollIntoView().click()
    
          cy.get('.alert')
          .should('contain', 'Please specify a client/vendor.')
    
        })
        it('Invoice No - Mandatory field does not filled',()=>
        {
    
          cy.get('.max_100').clear()
          .should('be.empty')
    
          cy.get('.quantity_input > input').clear()
          .should('be.empty')
    
          cy.get('.save-button')
          .scrollIntoView().click()
    
          cy.get('.alert',{timeout:10000})
          .should('contain', 'An error occurred. Please try again or contact support. (Error Reference: missing_statement_id)')
    
        })
      it('Adding new client - required name input is empty',()=>
          {
            cy.get('.close_icon').click(0, 0, { force: true })
            cy.get('.address_to > .form_heading > .right')
            .click().wait(1000)
    
            cy.get('.x_content > header')
            .should('contain','New Client')
    
            cy.get('.individual > .first').clear()        
            .should('have.value','')
    
            cy.get(':nth-child(12) > .form_row > .save_button').click()
          
           
            
          })
    it('Add link form - empty fields',()=>
    {
      cy.get('.left > :nth-child(4) > .attach_button').click()
    
      cy.get('.link_ttd').clear()
      cy.get('.link_url').clear()
      cy.get('.dropdown-menu > :nth-child(2) > .form_row > .save_button').click()
    
      cy.get('.link_ttd').should('have.class','link_ttd error')
      cy.get('.link_url').should('have.class','link_url error')
    
    })
    })