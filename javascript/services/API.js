class API {
    //static class level fn that is a fetch request to back end index to load all families

    static addFamilies() {
        fetch("http://localhost:3000/families")
        .then(resp => resp.json())
        .then(families => {
            families.forEach(family => {
                const {id, name, email, phone} = family
                new Family(id, name, email, phone)
            })
        })
    }

    static addFreeTrial(e){
        debugger
        e.preventDefault()
        // capture our form data
        debugger

        let data = {'free_trial': {
            'service': e.target.service.value,
            'link': e.target.link.value,
            'username': e.target.username.checked,
            'password': e.target.password.value,
            'expiration': e.target.expiration.value,
            'active': e.target.active.value,
            'family_id': e.this.family_id 
        }
        };
        // write our fetch and send it to our back end
        fetch('http://localhost:3000/families/${this.family_id}/free_trials', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        // grab our fetch response
        .then(resp => resp.json())
        .then(free_trial => {
            const { id, service, link, username, password, expiration, active, family_id } = free_trial
            let freetrial = new FreeTrial(id, service, link, username, password, expiration, active, family_id)
            document.getElementById('free-trial-form').reset();
            document.getElementById("free-trial-list") += freetrial.renderFreeTrials();
            // freeTrials()
        })
        // create a new Hog object
        // clear our form
      }
}