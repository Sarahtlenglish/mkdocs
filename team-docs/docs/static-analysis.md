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
    rules: {
      ...stylistic.configs.recommended.rules,
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/comma-dangle': ['error', 'never'],
      '@stylistic/indent': ['error', 2],
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/brace-style': 'error',
      '@stylistic/space-before-blocks': 'error',
      '@stylistic/no-tabs': ['error', { allowIndentationTabs: true }]
    }
    ```

=== "Refaktorering og Principper"
    ## Kodeforbedrings Principper
    
    Vi har brugt forskellige principper til at forbedre vores kode gennem projektet:

    ### Single Responsibility (SRP)
    Hver del af koden skal kun have ét ansvar.
    
    ```javascript
    // God SRP - hver funktion har ét ansvar
    function validateEmail(email) { ... }
    function saveUser(user) { ... }
    
    // Dårlig SRP - blander ansvarsområder
    function saveUserAndSendEmail(user) { ... }
    ```

    ### Don't Repeat Yourself (DRY)
    Undgå at gentage den samme kode flere steder.
    
    ### Keep It Simple (KISS)
    Hold koden så simpel som mulig.

    ### Eksempel på Refaktorering
    Her er et eksempel fra vores kodebase hvor vi brugte KISS princippet til at forbedre koden:

    Før (mere kompleks end nødvendigt):
    ```javascript
    // Vælg banner baseret på status
    if (selectedTask.value.status === 'afvigelse') {
        return 'deviation' // Rød banner for afvigelser
    } else if (selectedTask.value.status === 'overskredet') {
        return 'overdue' // Gult banner for overskredet deadline
    }
    ```

    Efter (simpel og letlæselig):
    ```javascript
    if (status === 'udført') return 'completed'
    if (status === 'inaktiv') return 'inactive'
    if (status === 'afvigelse') return 'deviation'
    if (status === 'overskredet') return 'overdue'
    ```

    Forbedringer:

    - Fjernet unødvendige kommentarer
    - Gjort koden selvforklarende
    - Brugt en enklere if-struktur
    - Konsistent formatering
    

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