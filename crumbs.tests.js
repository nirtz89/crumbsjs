test('Create a few cookies', () => {
    crumbs.set("name","Nir");
    crumbs.set("lname","Tzezana");
    expect(crumbs.getAll()).toHaveLength(2);
});

test('Create a single cookie', () => {
    crumbs.set("name","Nir");
    expect(crumbs.get("name")).toBe("Nir");
});

test('Delete a single cookie', () => {
    crumbs.set("name","Nir");
    crumbs.delete("name");
    expect(crumbs.get("name")).toBeFalsy;
})

test('Delete multiple cookies', () => {
    crumbs.set("name","Nir");
    crumbs.set("age",29);
    crumbs.delete(["name","age"]);
    expect(crumbs.getAll()).toBeFalsy;
})

test('Delete all cookies', () => {
    let my_cookies = [];
    my_cookies.push({"name":"Operating System","value":"Win10"});
    my_cookies.push({"name":"Age","value":"29"});

    crumbs.set(my_cookies);
    crumbs.deleteAll();
    expect(crumbs.getAll()).toBeFalsy;
})

test('Create a few cookies from object', () => {
    crumbs.deleteAll();
    let my_cookies = [];
    my_cookies.push({"name":"Operating System","value":"Win10"});
    my_cookies.push({"name":"Age","value":"29"});

    crumbs.set(my_cookies);
    expect(crumbs.getAll()).toHaveLength(2);
})