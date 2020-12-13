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
}