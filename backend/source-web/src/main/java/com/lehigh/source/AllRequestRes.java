package com.lehigh.source;

/**
 * response for allrequest
 */

 public class AllRequestRes {
    public int jobId;
    public String timeStamp;
    public String firstName;
    public String lastName;
    public String club;
    public String date;
    public String resource;

    public AllRequestRes(int jobId, String timeStamp, String firstName, String lastName, String club, String date, String resource) {
        this.jobId = jobId;
        this.timeStamp = timeStamp;
        this.firstName = firstName;
        this.lastName = lastName;
        this.club = club;
        this.date = date;
        this.resource = resource;
    }

    public int getJobId() {
        return this.jobId;
    }

    public String getTimeStamp() {
        return this.timeStamp;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public String getClub() {
        return this.club;
    }

    public String getDate() {
        return this.date;
    }

    public String getResource() {
        return this.resource;
    }

    @Override
    public String toString() {
         return "{" +
             " jobId='" + getJobId() + "'" +
             " timeStamp='" + getTimeStamp() + "'" +
             ", firstName='" + getFirstName() + "'" +
             ", lastName='" + getLastName() + "'" +
             ", club='" + getClub() + "'" +
             ", date='" + getDate() + "'" +
             ", resource='" + getResource() + "'" +
             "}";
    }
}
 