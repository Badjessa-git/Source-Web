package com.lehigh.source;

import java.util.*;
/**
 * Class used to handle responses from the database
 */

 public class PrintJobRes extends PrintJob {

    public int jobId;
    public Date timeStamp;

    public PrintJobRes(int jobId, String firstName, String lastName, String club,
     Date timeStamp, String file_upload, String email, int color,
     int numCopies, int done) {
         super(firstName, lastName, club, file_upload, email, color, numCopies, done);
         this.jobId = jobId;
         this.timeStamp =timeStamp;
    } 

    public static Comparator<PrintJobRes> sort() {
        return new Comparator<PrintJobRes>() {
            @Override
            public int compare(PrintJobRes arg0, PrintJobRes arg1) {
                return arg0.timeStamp.compareTo(arg1.timeStamp);
            }

        };
    }

}