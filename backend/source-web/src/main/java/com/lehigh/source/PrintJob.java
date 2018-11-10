package com.lehigh.source;


/**
 * This is the form used when sending a job request
 */

public class PrintJob {
    public String firstName;
    public String lastName;
    public String club;
    public String file_upload;
    public String email;
    //0 for black and white, 1 for color
    public int color;
    public int numCopies;
    public int done;

    PrintJob(String firstName, String lastName, String club, 
     String file_upload, String email, int color, int numCopies, int done) {
         this.firstName = firstName;
         this.lastName = lastName;
         this.club = club;
         this.file_upload = file_upload;
         this.email = email;
         this.color = color;
         this.numCopies = numCopies;
         this.done = done;
     }


}