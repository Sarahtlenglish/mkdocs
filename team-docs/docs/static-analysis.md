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
    
    ```javascript
    // DÅRLIG PRAKSIS: Gentager samme logik flere steder
    function getAdminName(user) {
      return user.firstName + ' ' + user.lastName;
    }
    function getManagerName(user) {
      return user.firstName + ' ' + user.lastName;
    }
    function getUserName(user) {
      return user.firstName + ' ' + user.lastName;
    }

    // GOD PRAKSIS: Én funktion der gør det samme
    function getFullName(user) {
      return user.firstName + ' ' + user.lastName;
    }
    ```

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

=== "Selvdokumenterende kode"
    ## Funktionsdokumentation
    
    
    ### JSDoc Format
    Vi dokumenterer vores funktioner med JSDoc, som vist i eksemplet nedenfor med en funktion der beregner næste dato baseret på frekvens.
    ```javascript
    /**
    * Beregn næste dato baseret på frekvens
    * @param {Date} currentDate - Den dato som funktionen skal beregne den næste dato fra
    * @param {string} frequency -('dagligt'|'ugentlig'|'manedlig'|'kvartal'|'årlig')
    * @returns {Date} Næste dato
    */
    export function getNextDateByFrequency(currentDate, frequency) {
    const nextDate = new Date(currentDate)
    nextDate.setHours(0, 0, 0, 0)

    switch (frequency) {
        case 'dagligt':
        nextDate.setDate(nextDate.getDate() + 1)
        break
        case 'ugentligt':
        nextDate.setDate(nextDate.getDate() + 7)
        break
        case 'manedligt':
        nextDate.setMonth(nextDate.getMonth() + 1)
        break
        case 'kvartal':
        nextDate.setMonth(nextDate.getMonth() + 3)
        break
        case 'årligt':
        nextDate.setFullYear(nextDate.getFullYear() + 1)
        break
        default:
        nextDate.setDate(nextDate.getDate() + 1)
    }

    return nextDate
    }
    ```
    ### Forklarende kommentering
    Nedenstående er et eksempel fra vores DatepickerComponent.vue, hvor forklarende kommentering er anvendt som en guide gennem kompleks logik og for at forklare formateringsprocessen.
    ```javascript
    const formatDate = (date) => {
    // Hvis der ikke er nogen dato, returner en tom streng
    if (!date) return ''
    // Konverter input til et Date objekt så vi kan bruge JavaScript's dato-metoder (2024-03-17)
    const d = new Date(date)
    // Array med danske månedsnavne (index 0 = januar, 1 = februar, osv.)
    const months = ['januar', 'februar', 'marts', 'april', 'maj', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'december']
    // Formater datoen til dansk format: "Fra d. 17. marts 2024"
    return `Fra d. ${d.getDate()}. ${months[d.getMonth()]} ${d.getFullYear()}`
    }
    ```
    ### Navngivning af variabler
    Nedenstående er et eksempel fra vores datehelpers, som viser 2 eksempler, på et godt og dårligt variabelnavn 
    ```javascript
    //Eksempel på godt variabelnavn
    export function getDaysOverdue(fromDate, toDate = new Date()) {
      if (!fromDate) return 0
      const from = new Date(fromDate)
      const to = new Date(toDate)
      // Sæt begge til lokal midnat
      from.setHours(0, 0, 0, 0)
      to.setHours(0, 0, 0, 0)
      const diff = Math.floor((to - from) / (1000 * 60 * 60 * 24))
      return diff > 0 ? diff : 0
      }

    //Eksempel på dårlig variabelnavn
    const d = new Date(date)
    ```
    
    ### Best Practices
    - Brug beskrivende variabel- og funktionsnavne
    - Dokumentér kun når koden ikke er selvforklarende
    - Hold kommentarer opdaterede
    - Undgå obvious kommentarer
