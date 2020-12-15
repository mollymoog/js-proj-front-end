class API {

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

        const myFamilyId = document.getElementById("form").children[0].id;
        let data = {'free_trial': {
            'service': e.target.service.value,
            'link': e.target.link.value,
            'username': e.target.username.value,
            'password': e.target.password.value,
            'expiration': e.target.expiration.value,
            'active': e.target.active.value,
            'family_id': myFamilyId
        }
        };         debugger


        fetch(`http://localhost:3000/families/${myFamilyId}/free_trials`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })

        .then(resp => resp.json())
        .then(free_trial => {
            const { id, service, link, username, password, expiration, active, family_id } = free_trial;

            new FreeTrial(id, service, link, username, password, expiration, active, family_id)
            // document.getElementById("form").reset()
            //what is the doc id
        })
      }
}