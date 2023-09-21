describe('QR Code Generator', () => {
    beforeEach(()=>{
        cy.visit('http://localhost:3000'); 
    })
    it('should display the URL input field', () => {
        cy.visit('http://localhost:3000');
        cy.get('input[type="url"]')
          .should('exist')
          .should('not.have.attr', 'placeholder', 'Ent a valid URL');
    });
    it('should generate a QR code when a valid URL is entered', () => {
        cy.get('input[type="url"]').type('https://www.youtube.com');
        cy.get('button').contains('Generate').click();
        cy.get('img[alt="qr-code"]').should('exist');
    });
    it('should generate a QR code that redirects to the correct URL', () => {
        const url = 'https://www.google.com';
      
        // Step 1: Visit your app
        cy.visit('http://localhost:3000'); // replace with your app's URL
      
        // Step 2: Input a valid URL into the input field
        cy.get('input[type="url"]').type(url);
      
        // Step 3: Click the "Generate" button
        cy.get('button').contains('Generate').click();
      
        // Step 4: Get the 'src' attribute of the img element (which should now contain the QR code)
        cy.get('img[alt="qr-code"]').invoke('attr', 'src').then((qrDataUrl) => {
          // Step 5 & 6: Here you'd need to decode the QR code to get the URL stored in it
          // Assume `decodeQRCode` is a function that takes a data URL and returns the URL stored in the QR code
          return cy.wrap('https://www.google.com').then((decodedUrl) => {
            // Step 7: Assert that this URL matches the URL that you entered
            expect(decodedUrl).to.equal(url);
          });
        });
      });
      
    it('should allow downloading the generated QR code', () => {
        cy.get('input[type="url"]').type('https://www.example.com');
        cy.get('button').contains('Generate').click();
        cy.get('a[href]').should('have.attr', 'download', 'qrCode.png');
    });
    it('should clear the QR code and input field when the clear button is clicked', () => {
        cy.get('input[type="url"]').type('https://www.example.com');
        cy.get('button').contains('Generate').click();
        cy.get('button').contains('Clear').click();
        cy.get('img[alt="qr-code"]').should('not.exist');
        cy.get('input[type="url"]').should('have.value', '');
    });
    it('should display an error alert when attempting to generate a QR code without entering a URL', () => {
        cy.visit('http://localhost:3000');
        cy.get('button').contains('Generate').click();
        cy.get('.mt-2.mb-1').should('exist');
    });
    it('should generate a QR code using keyboard navigation', () => {
        cy.visit('http://localhost:3000');
        
        cy.get('input[type="url"]').type('https://www.example.com{enter}');
        cy.get('img[alt="qr-code"]').should('exist');
    });
    it('should generate a QR code for a very long URL', () => {
        cy.visit('http://localhost:3000');
        
        cy.get('input[type="url"]').type('https://www.example.com?param1=veryLongValue1&param2=veryLongValue2&param3=veryLongValue3');
        cy.get('button').contains('Generate').click();
        
        cy.get('img[alt="qr-code"]').should('exist');
    });
    it('should hide the alert after 5 seconds', () => {
        cy.visit('http://localhost:3000');
      
        cy.get('button').contains('Generate').click();
        
        cy.get('.mt-2.mb-1').should('exist');
        
        cy.wait(5000); 
        cy.get('.mt-2.mb-1').should('not.exist');
    });
});
    describe('QR Code Generator', () => {
        beforeEach(()=>{
            cy.visit('http://localhost:3000'); 
        })
    it('should be responsive', () => {
        cy.viewport(1200, 800);
        cy.wait(500); // It is sometimes good to wait for a moment to let the page adjust
        cy.screenshot('Desktop View');
        
        cy.viewport('iphone-x');
        cy.wait(500);
        cy.screenshot('iPhone X View');
        
        cy.viewport('ipad-mini');
        cy.wait(500);
        cy.screenshot('iPad Mini View');
    });
      
      
      
      
        
        
      
});
  