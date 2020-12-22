class Family {
    constructor(id, name, email, phone, free_trials) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.free_trials = free_trials

        this.renderFamily()
    }

    renderFamily() {
        const yellow = document.getElementById("yellow");
        yellow.addEventListener("click", e => {
            document.body.style.backgroundColor = "yellow"
        })
        const familyHolder = document.getElementById("family-list");
        const familyContainer = document.createElement(`div`);
        familyContainer.dataset.id = this.id;
        familyContainer.id = this.id;
        familyContainer.classList.add = "family-display"
        familyContainer.innerHTML += this.familyHTML()
        familyHolder.appendChild(familyContainer);
        familyContainer.addEventListener("click", e => {
            if (e.target.className === "free-trial-button") 
            this.renderForm()
            this.createFreeTrials(e);
        })
    }

    familyHTML() {
        debugger
        return `
        <h3 class="headline">${this.name}</h3>
        <p>Email: ${this.email}</p>
        <p>Phone: ${this.phone}</p>
        <p>${this.free_trials.filter(ft => ft.active == true).length
        } Active Free-Trial(s)</p>
        <button type="button" class="free-trial-button" data-id=${this.id}>Subscriptions</button>
        `
    }

    createFreeTrials(e) {
        fetch(`http://localhost:3000/families/${this.id}/free_trials`)
        .then(resp => resp.json())
        .then(free_trials => {

            
            free_trials.forEach(free_trial => {
                const {id, service, link, username, password, expiration, active, family_id
                } = free_trial;

                let freetrial = 
                new FreeTrial(id, service, link, username, password, expiration, active, family_id);
            })
        })
    }

    renderForm() {
        const formHolder = document.getElementById("form");
        const formContainer = document.createElement(`div`);
        formContainer.dataset.id = this.id;
        formContainer.id = this.id;
        formContainer.classList.add = "form-display"
        formContainer.innerHTML += this.formHTML() 
        formHolder.appendChild(formContainer);
        formContainer.addEventListener("submit", e => API.addFreeTrial(e))
    }

    formHTML() {
        return `
        <form id="free-trial-form">
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