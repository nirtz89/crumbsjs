test('Create Cookies', () => {
    crumbs.set("name","Nir");
    crumbs.set("lname","Tzezana");
    expect(crumbs.getAll()).toHaveLength(2);
});