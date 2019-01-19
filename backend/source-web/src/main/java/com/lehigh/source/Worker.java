package com.lehigh.source;

/**
 * Source Worker
 */
public class Worker {
    public String firstName;
    public String lastName;
    public String classYear;
    public String major;
    public String descript;
    public String imgUrl;
    public String email;

    public Worker(String firstName, String lastName, String classYear, String major, String descript, String imgUrl, String email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.classYear = classYear;
        this.major = major;
        this.descript = descript;
        this.imgUrl = imgUrl;
        this.email = email;
    }

}