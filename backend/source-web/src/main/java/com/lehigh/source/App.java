package com.lehigh.source;
import spark.Spark;
import com.google.gson.*;
import java.util.*;

public final class App {
    private App() {
    }

    /**
     * Says hello to the world.
     * @param args The arguments of the program.
     */
    public static void main(String[] args) {

        Spark.port(getIntFromEnv("PORT", 4567));

        Spark.staticFileLocation("/frontend");
        
        final Gson gson = new Gson();

        //Create the Database that we will be using through our application
        Database db = Database.getDatabase();
        
        Spark.get("/", (req, res) -> {
            res.redirect("/index.html");
            return "";
        });

        //Test to see communication between frontend and backend
        Spark.post("/submit_request", (req, res) -> {
        	res.status(200);
        	String firstName = req.params("firstName");
        	String lastName = req.params("lastName");
        	String email = req.params("email");
        	String org = req.params("club_orgs");
            String color = req.params("color");
            String file_upload = "";
        	int col = 0;
        	if (color.equals("Color")) {
        		col = 1;
        	}
            int copies = Integer.parseInt(req.params("num_copies"));
        	int response = db.createJobEntry(firstName, lastName, org, file_upload, email, col, copies, 0);
        	if (response < 1) {
        		return "alert('There was an error creating your entry, Please try again later')";
        	}
            res.redirect("/index.html");
        	return "alert('Successfull submission to the source')";
        });

        //Return all thej jobs in the database in order of
        Spark.get("/getJobs", (req, res) -> {
            res.status(200);
            ArrayList<PrintJobRes> jobResponse = null;

            //Get all of the printjobs;
            jobResponse = db.selectAllPrintJobs();

            //Sort by the timestamp such that it is ordered from ealiest to latest
            jobResponse.sort(PrintJobRes.sort());
            return gson.toJson(new StructuredResponse("200", "No errors encountered", jobResponse));
        });

        //Update a particular post
        Spark.post("/done/:id", (req, res) -> {
            res.status(200);
            int id = Integer.parseInt(req.params("id"));
            //Code to alter table such that the value 0 now becomes 1 to repreent that work has been done on a particular request.
            //todo
            return null;
        });
    }

    /**
     * Get an integer environment variable 
     */
     static int getIntFromEnv(String envar, int defaultVal) {
         ProcessBuilder processBuilder = new ProcessBuilder();
         if (processBuilder.environment().get(envar) != null) {
             return Integer.parseInt(processBuilder.environment().get(envar));
         }
         return defaultVal;
     }
}