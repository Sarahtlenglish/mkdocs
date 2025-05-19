# Test

Her finder du information om forskellige typer af tests og hvordan de bruges i udviklingen.

=== "Unit Test"
    ## Unit Testing
    
    Unit tests er små, isolerede tests der tester enkelte komponenter eller funktioner.
    
    ### Hvorfor Unit Testing?
    - Finder fejl tidligt i udviklingen
    - Dokumenterer kodens forventet opførsel
    - Gør refaktorering sikrere
    
    ### Best Practices
    - Test én ting ad gangen
    - Følg AAA-mønsteret (Arrange, Act, Assert)
    - Hold tests simple og læsbare
    
    ### Eksempel (Jest)
    ```javascript
    describe('Calculator', () => {
      test('should add two numbers correctly', () => {
        // Arrange
        const a = 2;
        const b = 3;
        
        // Act
        const result = add(a, b);
        
        // Assert
        expect(result).toBe(5);
      });
    });
    ```

=== "End-2-end Test"
    ## End-to-end Testing
    
    E2E tests tester hele systemet fra start til slut, som en rigtig bruger ville bruge det.
    
    ### Hvorfor E2E Testing?
    - Validerer hele systemets flow
    - Finder integrationsproblemer
    - Tester brugeroplevelsen
    
    ### Populære E2E Værktøjer
    - Cypress
    - Playwright
    - Selenium
    
    ### Eksempel (Cypress)
    ```javascript
    describe('Login Flow', () => {
      it('should login successfully', () => {
        // Besøg login siden
        cy.visit('/login');
        
        // Udfyld login form
        cy.get('#email').type('user@example.com');
        cy.get('#password').type('password123');
        
        // Klik på login knap
        cy.get('#login-button').click();
        
        // Verificer at vi er logget ind
        cy.url().should('include', '/dashboard');
        cy.get('.welcome-message')
          .should('contain', 'Welcome back');
      });
    });
    ```
    
    ### Best Practices
    - Test kritiske brugerflows
    - Minimer eksterne afhængigheder
    - Brug stabile selectors
    - Håndter asynkrone operationer korrekt 