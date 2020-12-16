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
    }

    clearFamilies() {
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
    }

    cancelFreeTrials(e) {
        debugger
        let data = {'free_trial': {
            'active': this.active = "no"
        }}

        fetch(`http://localhost:3000/families/${this.family_id}/free_trials/${this.id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(free_trial => {
        const { id, service, link, username, password, expiration, active, family_id } = free_trial;
    })

    let freeTrialList = document.getElementById("free-trial-list");

        for (const child of freeTrialList.children) {
            child.remove()
        }
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
}

        //link to 'homepage'
