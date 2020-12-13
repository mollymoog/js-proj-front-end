class Family {
    constructor(id, name, email, phone) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        //redner this instance to the page
        this.renderFamily()
    }

    //render method that creates a div & append it to the page, add relevant classes and ids
    //possibly event delegation/listeners

    renderFamily() {
        const familyHolder = document.getElementById("family-list");
        const familyContainer = document.createElement(`div`);
        familyContainer.dataset.id = this.id;
        familyContainer.id = this.id;
        familyContainer.classList.add = "family-display"
        familyContainer.innerHTML += this.familyHTML()
        familyHolder.appendChild(familyContainer);
        familyContainer.addEventListener("click", e => {
            if (e.target.className === "free-trial-button") this.createFreeTrials(e)
        })
    }

    familyHTML() {
        return `
        <h3 class="headline">${this.name}</h3>
        <p>Email: ${this.email}</p>
        <p>Phone: ${this.phone}</p>
        <button type="button" class="free-trial-button" data-id=${this.id}>Subscriptions</button>
        `
    }

    createFreeTrials(e) {
        //fetch request
        fetch(`http://localhost:3000/families/${this.id}/free_trials`)
        .then(resp => resp.json())
        .then(free_trials => {

            
            free_trials.forEach(free_trial => {

                const {id, service, link, username, password, expiration, active, family_id
                } = free_trial;

                let freetrial = new FreeTrial(id, service, link, username, password, expiration, active, family_id);
                freetrial.displayFreeTrials();
            })
        })
        

        //return free trials for family
        //create new freetrial object
    }



}