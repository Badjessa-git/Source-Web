package com.lehigh.source;

public class User {
    public String uid;
    public String email;
    public String name;
    public String pictureUrl;
    public String givenName;
    public String familyName;

    public User(String _uid, String _email, String _name, String _givenName,
                String _pictureUrl, String _familyName) {
        this.uid = _uid;
        this.name = _name;
        this.givenName = _givenName;
        this.familyName = _familyName;
        this.email = _email;
        this.pictureUrl = _pictureUrl;
    }
}