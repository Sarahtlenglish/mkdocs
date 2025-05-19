# Statisk kodeanalyse

Her finder du information om forskellige aspekter af statisk kodeanalyse og best practices.

=== "ESLint"
    ## ESLint
    
    ESLint er et statisk analyseværktøj der hjælper med at finde problemer i JavaScript kode.
    
    ### Hvorfor bruge ESLint?
    - Finder fejl før koden kører
    - Sikrer konsistent kodestil
    - Forbedrer kodekvalitet
    
    ### Opsætning
    ```json
    {
      "extends": "eslint:recommended",
      "rules": {
        "indent": ["error", 2],
        "quotes": ["error", "single"],
        "semi": ["error", "always"]
      }
    }
    ```

=== "SRP, DRY og KISS"
    ## SRP, DRY og KISS Principper
    
    ### Single Responsibility Principle (SRP)
    - En klasse/modul skal kun have én grund til at ændre sig
    - Hver funktion bør kun gøre én ting
    - Eksempel på god SRP:
      ```javascript
      // God SRP - hver funktion har ét ansvar
      function validateEmail(email) { ... }
      function saveUser(user) { ... }
      
      // Dårlig SRP - blander ansvarsområder
      function saveUserAndSendEmail(user) { ... }
      ```

    ### DRY (Don't Repeat Yourself)
    - Undgå duplikeret kode
    - Udtræk gentaget logik til funktioner
    - Brug utilities og helpers
    
    ### KISS (Keep It Simple, Stupid)
    - Hold koden simpel og letforståelig
    - Undgå overkomplicerede løsninger
    - Prioriter læsbarhed over cleverness

=== "Refaktorering"
    ## Refaktorering
    
    ### Hvornår skal man refaktorere?
    - Når koden er svær at vedligeholde
    - Når der er meget duplikeret kode
    - Før man tilføjer ny funktionalitet
    
    ### Refaktorering Teknikker
    1. Extract Method
    2. Rename Variable/Method
    3. Move Method
    4. Replace Conditional with Polymorphism
    
    ### Best Practices
    - Skriv tests før refaktorering
    - Tag små skridt
    - Commit ofte

=== "Kommentar"
    ## Funktionsdokumentation
    
    ### JSDoc Format
    ```javascript
    /**
     * Beregner summen af to tal
     * @param {number} a - Det første tal
     * @param {number} b - Det andet tal
     * @returns {number} Summen af a og b
     */
    function add(a, b) {
      return a + b;
    }
    ```
    
    ### Best Practices
    - Dokumentér public API'er
    - Beskriv parametre og returværdier
    - Hold kommentarer opdaterede
    - Undgå obvious kommentarer 