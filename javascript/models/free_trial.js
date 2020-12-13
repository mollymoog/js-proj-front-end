class FreeTrial {

    constructor(id, service, link, username, password, expiration, active, family_id) {
        this.id = id;
        this.service = service;
        this.link = link;
        this.username = username;
        this.password = password;
        this.expiration = expiration;
        this.active = active ? "yes" : "no";
        this.family_id = family_id;
        this.freeTrials()
    }

    freeTrials() {
        this.clearFamilies();
        this.renderFreeTrials();
        this.renderForm();
    }

    clearFamilies() {
        this.renderForm();
        //creates form for each free trial NOT GOOD
        let familylist = document.getElementById("family-list");

        for (const child of familylist.children) {
            child.remove()
        }
    }

    renderFreeTrials() {
        const free_trialHolder = document.getElementById("free-trial-list");
        const free_trialContainer = document.createElement(`div`);
        free_trialContainer.dataset.id = this.id;
        free_trialContainer.id = this.id;
        free_trialContainer.classList.add = "free-trial-display"
        free_trialContainer.innerHTML += this.freeTrialHTML() 
        if (this.active == "yes") {
            free_trialContainer.innerHTML += this.cancelButton();
            free_trialContainer.addEventListener("click", e => {
                    if (e.target.className === "cancel-button") this.cancelFreeTrials(e)
                })
        }
        free_trialHolder.appendChild(free_trialContainer);

        // add form and button to add/edit free trials
    }

    renderForm() {
        const formHolder = document.getElementById("form");
        const formContainer = document.createElement(`div`);
        formContainer.dataset.id = this.id;
        formContainer.id = this.id;
        formContainer.classList.add = "form-display"
        formContainer.innerHTML += this.formHTML() 
        formHolder.appendChild(formContainer);
        formContainer.addEventListener("click", e => {
            if (e.target.className === "submit") API.addFreeTrial(e)
        })

    }

    cancelFreeTrials(e) {
        fetch(`http://localhost:3000/families/${this.family_id}/free_trials/${this.id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({active: false})
    })
    // .then(resp => resp.json())
    //updates API, but doesnt reload page.
    this.freeTrials()

    }

    freeTrialHTML() {
        return `
        <h3 class="headline"><a href="${this.link}">${this.service}</a></h3>
        <p>Username: ${this.username}</p>
        <p>Password: ${this.password}</p>
        <p>Expiration: ${this.expiration}</p>
        <p>Active: ${this.active}</p>
        `
    }

    cancelButton() {
        return `
        <button type="button" class="cancel-button" data-id=${this.id}>Cancel</button>
        `
    }

    formHTML() {
        return `
        <form action="http://localhost:3000/families/${this.family_id}/free_trials" method="POST">
            <label> Service: <input type="text" name="service" id="service" /></label><br />
            <label> Link: <input type="text" name="link" id="link" /></label><br />
            <label> Username: <input type="text" name="username" id="username" /></label><br />
            <label> Password: <input type="text" name="password" id="password" /></label><br />
            <label> Expiration: <input type="datetime" name="expiration" id="expiration" /></label><br />
            <label> Active: 
                <input type="radio" id="active-yes" name="active" value="yes">
                <label for="active-yes">yes</label>
                <input type="radio" id="active-no" name="active" value="no">
                <label for="active-no">no</label>
            </label>
            <input type="submit" name="submit" id="submit" value="Submit" />
        </form>
        `
    }



}

        //link to 'homepage'
