package com.lehigh.source;

import java.util.*;
/**
 * Class used to handle responses from the database
 */

 public class PrintJobRes {
    public String firstName;
    public String lastName;
    public String club;
    public String file_upload;
    public String email;
    //0 for black and white, 1 for color
    public String color;
    public int numCopies;
    public int done;
    public int jobId;
    public String timeStamp;

    public PrintJobRes(int jobId, String firstName, String lastName, String club,
     String timeStamp, String file_upload, String email, String color,
     int numCopies, int done) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.club = club;
        this.file_upload = file_upload;
        this.email = email;
        this.color = color;
        this.numCopies = numCopies;
        this.done = done;         
        this.jobId = jobId;
        this.timeStamp = timeStamp;
    } 

    public static Comparator<PrintJobRes> sort() {
        return new Comparator<PrintJobRes>() {
            @Override
            public int compare(PrintJobRes arg0, PrintJobRes arg1) {
                return arg0.timeStamp.compareTo(arg1.timeStamp);
            }

        };
    }



    @Override
    public String toString() {
        return "{" +
            " firstName='" + firstName + "'" +
            ", lastName='" + lastName + "'" +
            ", club='" + club + "'" +
            ", file_upload='" + file_upload + "'" +
            ", email='" + email + "'" +
            ", color='" + color + "'" +
            ", numCopies='" + numCopies + "'" +
            ", done='" + done + "'" +
            ", jobId='" + jobId + "'" +
            ", timeStamp='" + timeStamp + "'" +
            "}";
    }
}
