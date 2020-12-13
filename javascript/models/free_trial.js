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
    }

    displayFreeTrials(free_trial) {
        let familylist = document.getElementById("family-list");

        for (const child of familylist.children) {
            child.remove()
        }
        this.renderFreeTrials();


    }

    renderFreeTrials() {
        const free_trialHolder = document.getElementById("free-trial-list");
        const free_trialContainer = document.createElement(`div`);
        free_trialContainer.dataset.id = this.id;
        free_trialContainer.id = this.id;
        free_trialContainer.classList.add = "free-trial-display"
        free_trialContainer.innerHTML += this.freeTrialHTML()
        free_trialHolder.appendChild(free_trialContainer);
        // add form and button to add/edit free trials
        // free_trialContainer.addEventListener("click", e => {
        //     if (e.target.className === "free-trial-button") this.createFreeTrials(e)
        // })
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



}

        //link to 'homepage'
