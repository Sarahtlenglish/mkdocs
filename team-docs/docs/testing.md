# Test

Her finder du information om forskellige typer af tests og hvordan de bruges i udviklingen.

=== "Unit Test"
    ## Unit Testing
    
    Unit tests er små, isolerede tests der tester enkelte komponenter eller funktioner.
    
    ### Hvorfor Unit Testing?
    - Finder fejl tidligt i udviklingen
    - Dokumenterer kodens forventet opførsel
    - Gør refaktorering mere sikker
    
    ### Best Practices
    - Test én ting ad gangen
    - Hold tests simple og læsbare

    #### getStatusLabel
    Denne funktion konverterer status-værdier til læsbare labels i brugergrænsefladen. For eksempel konverterer den 'afvigelse' til 'Afvigelse'. Den bruges primært i status-visninger og badges gennem hele applikationen, hvor der skal vises en brugervenlig version af en status.

    === "Funktion"
        ```javascript
        export function getStatusLabel(status) {
          const labels = {
            'afvigelse': 'Afvigelse',
            'overskredet': 'Overskredet'
          }
          return labels[status] || status
        }
        ```
    === "Test"
        ```javascript
        describe('getStatusLabel', () => {
          test('should return correct label for afvigelse', () => {
            expect(getStatusLabel('afvigelse')).toBe('Afvigelse')
          })
          test('should return correct label for overskredet', () => {
            expect(getStatusLabel('overskredet')).toBe('Overskredet')
          })
        })
        ```
    === "Terminal Output"
        ```bash
        ✓ getStatusLabel > should return correct label for afvigelse
        ✓ getStatusLabel > should return correct label for overskredet
        Test Files  1 passed (1)
        Tests       2 passed (2)
        ```
    === "Anvendelse"
        ```javascript
        // I labelHelpers.js
        export const processCalendarTasks = (tasks) => {
          if (!tasks) return []
          return tasks.map((task) => {
            const historyEntry = task.historik?.find(entry => entry.dato === task.dato)
            const status = historyEntry?.status || 'inaktiv'
            return {
              ...task,
              location: getLocationLabel(task.location),
              type: getTypeLabel(task.type),
              status: status,
              statusLabel: getStatusLabel(status),
              enhedId: task.enhedId || task.details,
              ansvarligeBrugere: task.ansvarligeBrugere
            }
          })
        }
        ```


    #### getBannerType
    Denne funktion bestemmer hvilken type banner eller indikator der skal vises baseret på en status. For eksempel konverterer den 'udført' til 'completed', hvilket typisk vil vise en grøn banner. Den bruges til at style status-indikatorer i brugergrænsefladen med forskellige farver og typer, så brugeren nemt kan se status på et øjekast.

    === "Funktion"
        ```javascript
        export function getBannerType(status) {
          if (status === 'udført') return 'completed'
          if (status === 'inaktiv') return 'inactive'
          if (status === 'afvigelse') return 'deviation'
          if (status === 'overskredet') return 'overdue'
        }
        ```
    === "Test"
        ```javascript
        describe('getBannerType', () => {
          test('should return completed for udført', () => {
            expect(getBannerType('udført')).toBe('completed')
          })
          test('should return inactive for afvigelse', () => {
            expect(getBannerType('afvigelse')).toBe('deviation')
          })
        })
        ```
    === "Terminal Output"
        ```bash
        ✓ getBannerType > should return completed for udført
        ✓ getBannerType > should return inactive for afvigelse
        Test Files  1 passed (1)
        Tests       2 passed (2)
        ```
    === "Anvendelse"
        ```javascript
        // I CalendarDetailContent.vue
        const bannerType = computed(() => {
          if (!selectedTask.value) return null
          return getBannerType(selectedTask.value.status)
        })
        ```


    #### getRoleLabel
    Denne funktion konverterer roller fra databasen til læsbare labels i brugergrænsefladen. For eksempel konverterer den 'service_bruger' til 'Service Bruger'. Den bruges i bruger-tabeller og bruger-detaljer for at vise roller i et læsbart format, så brugerne nemt kan forstå hvilken rolle en person har i systemet.

    === "Funktion"
        ```javascript
        export function getRoleLabel(role) {
          const labels = {
            'service_bruger': 'Service Bruger',
            'facility_manager': 'Facility Manager',
            'administrator': 'Administrator',
            'visnings_bruger': 'Visnings Bruger'
          }
          return labels[role] || role
        }
        ```
    === "Test"
        ```javascript
        describe('getRoleLabel', () => {
          test('should return correct label for service_bruger', () => {
            expect(getRoleLabel('service_bruger')).toBe('Service Bruger')
          })
          test('should return correct label for facility_manager', () => {
            expect(getRoleLabel('facility_manager')).toBe('Facility Manager')
          })
          test('should return correct label for administrator', () => {
            expect(getRoleLabel('administrator')).toBe('Administrator')
          })
          test('should return correct label for visnings_bruger', () => {
            expect(getRoleLabel('visnings_bruger')).toBe('Visnings Bruger')
          })
          test('should return input value for unknown role', () => {
            expect(getRoleLabel('unknown')).toBe('unknown')
          })
        })
        ```
    === "Terminal Output"
        ```bash
        ✓ getRoleLabel > should return correct label for service_bruger
        ✓ getRoleLabel > should return correct label for facility_manager
        ✓ getRoleLabel > should return correct label for administrator
        ✓ getRoleLabel > should return correct label for visnings_bruger
        ✓ getRoleLabel > should return input value for unknown role
        Test Files  1 passed (1)
        Tests       5 passed (5)
        ```
    === "Anvendelse"
        ```javascript
        // I OpretBrugerView.vue - Bruges direkte i computed property til at vise rolle i preview
        const detailItem = computed(() => {
          const selectedLeader = formData.brugereRef && formData.brugereRef !== 'bruger_er_chef'
            ? leaderOptions.value.find(opt => opt.value === formData.brugereRef)
            : null

          return {
            id: 'preview',
            fuldeNavn: formData.fuldeNavn || 'Ny Bruger',
            rolle: getRoleLabel(formData.rolle) || 'Rolle ikke angivet',
            brugereRef: formData.brugereRef || '',
            lederNavn: selectedLeader ? selectedLeader.label : '',
            adresse: formData.adresse || 'Adresse ikke angivet',
            postnummer: formData.postnummer || 'By ikke angivet',
            by: formData.by || '',
            email: formData.email || 'Email ikke angivet',
            telefon: formData.telefon || 'Telefonnummer ikke angivet'
          }
        })
        ```


    #### formatDateToISO
    Denne funktion formaterer en dato til en ISO string (YYYY-MM-DD). Den bruges til at sikre ensartet datoformat i hele applikationen, især når data sendes til eller modtages fra backend eller formularer.

    === "Funktion"
        ```javascript
        export function formatDateToISO(date) {
          if (!date) return null
          return date.toISOString().split('T')[0]
        }
        ```
    === "Test"
        ```javascript
        describe('formatDateToISO', () => {
          test('should format current date to ISO string', () => {
            const today = new Date()
            const result = formatDateToISO(today)
            expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/) // Tjekker format YYYY-MM-DD
          })
          test('should format date from form input', () => {
            const formDate = new Date('2024-03-20T00:00:00')
            expect(formatDateToISO(formDate)).toBe('2024-03-20')
          })
          test('should return null for empty form input', () => {
            expect(formatDateToISO('')).toBeNull()
          })
        })
        ```
    === "Terminal Output"
        ```bash
        ✓ formatDateToISO > should format current date to ISO string
        ✓ formatDateToISO > should format date from form input
        ✓ formatDateToISO > should return null for empty form input
        Test Files  1 passed (1)
        Tests       3 passed (3)
        ```
    === "Anvendelse"
        ```javascript
        // I OpretEgenkontrolView.vue
        const detailItem = computed(() => ({
          navn: formData.navn || 'Ny egenkontrol',
          beskrivelse: formData.beskrivelse || 'Ingen beskrivelse angivet',
          type: 'Egenkontrol',
          status: 'normal',
          lokation: formData.selectedEnheder || formData.enhed || 'Enhed ikke angivet',
          checkliste: formData.selectedCheckliste || formData.tjekliste || 'Tjekliste ikke angivet',
          ansvarligeBrugere: [
            formData.selectedAnsvarlige
            || formData.ansvarligeBrugere
            || formData.ansvarlige
            || 'Bruger ikke angivet'
          ],
          påmindelser: [
            { frekvens: formData.påmindelseFørFrekvens || formData.reminderFrekvens, tidspunkt: formData.påmindelseFørTidspunkt || formData.reminderTidspunkt },
            { frekvens: formData.påmindelseEfterFrekvens || formData.deadlineFrekvens, tidspunkt: formData.påmindelseEfterTidspunkt || formData.deadlineTidspunkt }
          ],
          modtagere: [
            formData.kvitteringModtager || '',
            formData.afvigelseModtager || ''
          ],
          startDato: formatDateToISO(formData.startDato) || formatDateToISO(new Date())
        }))
        ```


    #### getDaysOverdue
    Denne funktion beregner hvor mange dage en given dato er overskredet i forhold til i dag. Den bruges til at vise hvor mange dage en opgave eller frist er overskredet i brugergrænsefladen.

    === "Funktion"
        ```javascript
        export function getDaysOverdue(date) {
          if (!date) return 0
          const today = new Date()
          const diffTime = today - new Date(date)
          const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
          return diffDays > 0 ? diffDays : 0
        }
        ```
    === "Test"
        ```javascript
        describe('getDaysOverdue', () => {
          test('should return 0 for today', () => {
            const today = new Date()
            expect(getDaysOverdue(today)).toBe(0)
          })
          test('should return 1 for yesterday', () => {
            const yesterday = new Date()
            yesterday.setDate(yesterday.getDate() - 1)
            expect(getDaysOverdue(yesterday)).toBe(1)
          })
          test('should return 7 for last week', () => {
            const lastWeek = new Date()
            lastWeek.setDate(lastWeek.getDate() - 7)
            expect(getDaysOverdue(lastWeek)).toBe(7)
          })
          test('should return 0 for future date', () => {
            const tomorrow = new Date()
            tomorrow.setDate(tomorrow.getDate() + 1)
            expect(getDaysOverdue(tomorrow)).toBe(0)
          })
        })
        ```
    === "Terminal Output"
        ```bash
        ✓ getDaysOverdue > should return 0 for today
        ✓ getDaysOverdue > should return 1 for yesterday
        ✓ getDaysOverdue > should return 7 for last week
        ✓ getDaysOverdue > should return 0 for future date
        Test Files  1 passed (1)
        Tests       4 passed (4)
        ```
    === "Anvendelse"
        ```javascript
        // I egenkontrolStore.js
        const overdueDays = computed(() => {
          if (!selectedTask.value || selectedTask.value.status !== 'overskredet') return 0
          return getDaysOverdue(selectedTask.value.dato)
        })

        <span class="detail-label">
          Deadline - overskredet {{ overdueDays }} dag{{ overdueDays === 1 ? '' : 'e' }}
        </span>
        ```


=== "End-to-end Test"
    ## End-to-end Testing
    
    E2E tests tester flows i systemet, som en bruger rigtig ville bruge det.
    
    Vi har valgt at bruge Cypress som vores E2E testværktøj fordi det giver os mulighed for at teste vores Vue.js applikation direkte i browseren, med en intuitiv API og god debugging support. Det er særligt nyttigt for vores team da det giver os mulighed for at se testen køre i realtid og nemt kan identificere hvor fejl opstår.
    
    ### Hvorfor E2E Testing?
    - Validerer systemets flows
    - Finder integrationsproblemer
    - Tester brugeroplevelsen
    
    ### Eksempel (Cypress)
    
    #### Opret Egenkontrol
    Dette eksempel viser hvordan vi tester oprettelsen af en ny egenkontrol. Testen gennemgår hele processen fra start til slut, inklusiv udfyldelse af alle felter og validering af at egenkontrollen bliver oprettet korrekt. Vi har også inkluderet debugging tests.
    
    === "Test"
        ```javascript
        describe('Opret Egenkontrol', () => {
          beforeEach(() => {
            cy.visit('/egenkontrol/opret')
          })

          it('skal kunne oprette en ny egenkontrol', () => {
            cy.get('[data-test="selectedCheckliste"]').click()
            cy.get('.dropdown-menu button').first().click()
            cy.get('[data-test="navn"]').type('Test Egenkontrol')
            cy.get('[data-test="beskrivelse"]').type('Test beskrivelse')
            cy.get('[data-test="startDato"]').click()
            cy.get('.dp__menu').should('be.visible')
            cy.get('.dp__today').click()
            cy.get('[data-test="next-step"]').click()

            cy.get('#Enheder\\&Ansvarlige1').should('be.visible')
            cy.get('[data-test="selectedEnheder"]').should('be.visible')
            cy.get('[data-test="selectedEnheder"]').click()
            cy.get('.dropdown-menu button').first().click()
            cy.get('[data-test="selectedAnsvarlige"]').click()
            cy.get('.dropdown-menu button').first().click()
            cy.get('[data-test="next-step"]').click()

            cy.get('.step-heading').contains('Notifikations indstillinger for egenkontrollen').should('be.visible')
            cy.get('[data-test="reminderFrekvens"]').should('be.visible')
            cy.get('[data-test="reminderFrekvens"]').click()
            cy.get('.dropdown-menu button').first().click()
            cy.get('[data-test="reminderTidspunkt"]').click()
            cy.get('.dropdown-menu button').first().click()
            cy.get('[data-test="deadlineFrekvens"]').click()
            cy.get('.dropdown-menu button').first().click()
            cy.get('[data-test="deadlineTidspunkt"]').click()
            cy.get('.dropdown-menu button').first().click()
            cy.get('[data-test="kvitteringModtager"]').click()
            cy.get('.dropdown-menu button').first().click()
            cy.get('[data-test="afvigelseModtager"]').click()
            cy.get('.dropdown-menu button').first().click()

            cy.get('[data-test="gem-egenkontrol"]').click()
            cy.url().should('include', '/egenkontrol')
          })
        })
        ```
    === "Debug"
        ```javascript
        describe('Opret Egenkontrol debug', () => {
          beforeEach(() => {
            cy.visit('/egenkontrol/opret')
          })

          it('skal kunne se første input felt', () => {
            cy.get('h1').should('contain', 'Opret Egenkontrol')
            cy.get('[data-test="selectedCheckliste"]').should('be.visible')
          })

          it('skal kunne interagere med første input felt', () => {
            cy.get('[data-test="selectedCheckliste"]').click()
            cy.get('.dropdown-menu').should('be.visible')
            cy.get('.dropdown-menu button').should('have.length.greaterThan', 0)
            cy.get('.dropdown-menu button').first().click()
            cy.get('.dropdown-menu').should('not.exist')
          })

          it('skal kunne bruge datepickeren', () => {
            cy.get('[data-test="startDato"]').click()
            cy.get('.dp__menu').should('be.visible')
            cy.get('.dp__today').click()
            cy.get('[data-test="startDato"]').should('not.be.empty')
          })

          it('skal kunne udfylde første step og gå videre', () => {
            cy.get('[data-test="selectedCheckliste"]').click()
            cy.get('.dropdown-menu button').first().click()
            cy.get('[data-test="navn"]').type('Test Egenkontrol')
            cy.get('[data-test="beskrivelse"]').type('Test beskrivelse')
            cy.get('[data-test="startDato"]').click()
            cy.get('.dp__menu').should('be.visible')
            cy.get('.dp__today').click()
            cy.get('[data-test="next-step"]').click()
            cy.get('#Enheder\\&Ansvarlige1').should('be.visible')
            cy.get('[data-test="selectedEnheder"]').should('be.visible')
          })
        })
        ```
    === "Resultat"
        ```bash
        Running:  opret-egenkontrol.cy.js                                                         (1 of 1)

        Opret Egenkontrol
          ✓ skal kunne se første input felt (1093ms)
          ✓ skal kunne interagere med første input felt (545ms)
          ✓ skal kunne bruge datepickeren (504ms)
          ✓ skal kunne udfylde første step og gå videre (1396ms)
          ✓ skal kunne oprette en ny egenkontrol (2705ms)

          5 passing (6s)

        (Results)

        ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
        │ Tests:        5                                                                                │
        │ Passing:      5                                                                                │
        │ Failing:      0                                                                                │
        │ Pending:      0                                                                                │
        │ Skipped:      0                                                                                │
        │ Screenshots:  0                                                                                │
        │ Video:        false                                                                            │
        │ Duration:     6 seconds                                                                        │
        │ Spec Ran:     opret-egenkontrol.cy.js                                                          │
        └────────────────────────────────────────────────────────────────────────────────────────────────┘

        ========================================================================================

        (Run Finished)

             Spec                                              Tests  Passing  Failing  Pending  Skipped  
        ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
        │ ✔  opret-egenkontrol.cy.js                  00:06        5        5        -        -        - │
        └────────────────────────────────────────────────────────────────────────────────────────────────┘
          ✔  All specs passed!                        00:06        5        5        -        -        -  
        ```

    #### Opret Enhed (Gruppe)
    Her tester vi oprettelsen af en ny enhed med underenheder. Testen sikrer at alle trin i processen fungerer, fra valg af enhedstype til oprettelse af underenheder og finalisering.
    
    === "Test"
        ```javascript
        describe('Opret Enhed (Gruppe)', () => {
          it('skal kunne oprette en gruppe med underenheder', () => {
            cy.visit('/enheder/opret');

            // Step 1: Gruppe Information
            cy.get('.dropdown').first().click();
            cy.get('.dropdown-menu button').contains('Gruppe').click();

            cy.get('input[placeholder="Angiv gruppens titel"]').type('TestGruppe');
            cy.get('input[placeholder="Angiv beskrivelse af gruppen"]').type('Test beskrivelse');
            cy.get('.dropdown').eq(1).click();
            cy.get('.dropdown-menu button').first().click();

            cy.contains('button', 'Næste').click();

            // Step 2: Underenheder
            cy.get('input[type="number"]').clear().type('5');
            cy.get('.opret-button').click();

            // Tjek at der nu er 5 rækker i underenheder-tabellen (kun i formularen)
            cy.get('.form-container .underenheder-table .table-row').should('have.length', 5);

            // Submit form
            cy.get('[data-test="gem-enhed"]').click()

            // Verificer redirect
            cy.url().should('include', '/enheder');

            // Verificer at enheden er oprettet og vises i tabellen
            cy.contains('.data-table tr', 'TestGruppe').should('exist');
          });
        });
        ```
    === "Resultat"
        ```bash
        Running:  opret-enhed.cy.js                                                         (1 of 1)

        Opret Enhed (Gruppe)
          ✓ skal kunne oprette en gruppe med underenheder (2705ms)

          1 passing (3s)

        (Results)

        ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
        │ Tests:        1                                                                                │
        │ Passing:      1                                                                                │
        │ Failing:      0                                                                                │
        │ Pending:      0                                                                                │
        │ Skipped:      0                                                                                │
        │ Screenshots:  0                                                                                │
        │ Video:        false                                                                            │
        │ Duration:     3 seconds                                                                        │
        │ Spec Ran:     opret-enhed.cy.js                                                                │
        └────────────────────────────────────────────────────────────────────────────────────────────────┘

        ========================================================================================

        (Run Finished)

             Spec                                              Tests  Passing  Failing  Pending  Skipped  
        ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
        │ ✔  opret-enhed.cy.js                          00:03        1        1        -        -        - │
        └────────────────────────────────────────────────────────────────────────────────────────────────┘
          ✔  All specs passed!                        00:03        1        1        -        -        -  
        ```

    ### Best Practices
    - Test kritiske brugerflows
    - Brug stabile selectors