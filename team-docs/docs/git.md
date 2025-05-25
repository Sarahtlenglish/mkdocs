# Vores Git Workflow

=== "Branching"
    ## Vores Branch Strategi
    
    Vi bruger en "Developer Branch Strategy", hvor hver udvikler har deres egen personlige branch. Dette giver os en simpel og effektiv måde at arbejde på i vores team.

    ### Vores Branch Struktur

    ```
    main
    ├── sarah-dev
    └── mette-dev
    ```
    
    * `main` - Her ligger vores produktionskode
    * `sarah-dev` - Sarahs personlige udviklingsbranch
    * `mette-dev` - Mettes personlige udviklingsbranch
    
    ### Sådan arbejder vi
    * Vi udvikler på vores egne branches
    * Al udvikling sker på vores personlige branches
    * Vi merger til main når koden er klar
    * Main holdes altid opdateret med nyeste stabile version
    * Efter merge til main opdaterer vi vores dev branches
    
=== "Commits"

    ### Eksempler fra vores repository

    ✅ God commit message:
    ```
    error handling datepicker and positioning adjustment
    ```

    - Den beskriver tydeligt hvad der er ændret
    - Den indeholder både hvad (error handling, positioning) og hvor (datepicker)
    - Står i nutid

    ❌ Mindre god commit message:
    ```
    fixed date
    ```

    - Den er for vag - hvilken date? hvad blev fixet?
    - Står i datid

    ### Forbedringspotentiale

    I løbet af projektet har vi lært at vi skulle have lavet flere commits.

    Store commits gør det sværere at:
    - Finde hvor fejl blev introduceret
    - Rulle enkelte ændringer tilbage
    - Forstå udviklingen i koden
    
    ❌ Eksempel på alt for stor commit:
    ```
    added create egencontrol view, component and added vue wizard
    ```

    ####Denne commit var særligt problematisk fordi:

    - Den ændrede 12 forskellige filer
    - Tilføjede +1201 linjer og fjernede -20 linjer
    - Blandede feature udvikling med dependency management:
        - Tilføjede nye npm packages (vue-step-wizard, vue3-form-wizard)
        - Opdaterede package-lock.json med nye dependencies
        - Tilføjede nye Vue komponenter
        - Implementerede ny funktionalitet
        - Opsatte mock data
        - Opdaterede router konfiguration
    
    ####Burde have været delt op i separate commits:

    Først dependencies:

    ```
    "add vue-step-wizard and vue3-form-wizard packages"
    "update package-lock.json"
    ```

    Så komponenter og funktionalitet:

    ```
    "create base egenkontrol component"
    "implement vue wizard in egenkontrol"
    "add mock data for egenkontrol"
    "update router with egenkontrol routes"

    ```

    ✅ Dette ville have givet os flere fordele:

    - Nemmere at rulle tilbage hvis de nye packages gav problemer
    - Bedre overblik over afhængigheder vs. faktisk kode
    - Lettere at teste hver del af implementeringen
    - Mere overskueligt code review process
    - Klarere historik over projektets udvikling


=== "Workflows"
    
    ### CI/CD
    Vi bruger GitHub Actions og Firebase Hosting til vores deployment pipeline:

    #### Deploy på merge til main
    ```yaml
    name: Deploy to Firebase Hosting on merge
    on:
      push:
        branches:
          - main
    jobs:
      build_and_deploy:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v4
          - run: npm ci && npm run build
          - uses: FirebaseExtended/action-hosting-deploy@v0
            with:
              repoToken: ${{ secrets.GITHUB_TOKEN }}
              firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT_DBI_EGENKONTROL_MFD_958B1 }}
              channelId: live
              projectId: dbi-egenkontrol-mfd-958b1
    ```

    #### Preview på Pull Requests
    ```yaml
    name: Deploy to Firebase Hosting on PR
    on: pull_request
    permissions:
      checks: write
      contents: read
      pull-requests: write
    jobs:
      build_and_preview:
        if: ${{ github.event.pull_request.head.repo.full_name == github.repository }}
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v4
          - run: npm ci && npm run build
          - uses: FirebaseExtended/action-hosting-deploy@v0
            with:
              repoToken: ${{ secrets.GITHUB_TOKEN }}
              firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT_DBI_EGENKONTROL_MFD_958B1 }}
              projectId: dbi-egenkontrol-mfd-958b1
    ```

    Dette setup giver os:
    
    - Automatisk build når vi merger til main
    - Preview builds på alle pull requests
    - Automatisk deployment til Firebase
    - Sikker håndtering af credentials via GitHub Secrets

    #### Forbedringspotentiale for CI/CD
    Vores nuværende setup kunne styrkes ved at tilføje:

    - Linting check (`npm run lint`)
    - Automatiske tests før deployment (`npm run test`)
    - End-to-end tests