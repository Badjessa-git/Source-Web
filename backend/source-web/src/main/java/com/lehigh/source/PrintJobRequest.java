package com.lehigh.source;


/**
 * This is the form used when sending a job request
 */

public class PrintJobRequest {
    public String firstName;
    public String lastName;
    public String club;
    public String file_upload;
    public String email;
    //0 for black and white, 1 for color
    public int color;
    public int numCopies;
    public transient int done = 0;

}