package com.lehigh.source;
import spark.Spark;
import com.google.gson.*;


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
<<<<<<< HEAD
=======
        	String firstName = req.params("firstname");
        	String lastName = req.params("lastname");
        	String email = req.params("email");
        	String org = req.params("club_orgs");
        	String color = req.params("color");
        	int col = 0;
        	if (color.equals("Color")) {
        		col = 1;
        	}
        	int copies = Integer.parseInt(req.params("num_copies"));
        	int response = db.createJobEntry(firstName, lastName, org, "not", email, col, copies, 0);
        	if (response < 1) {
        		return "alert(There was an error creating your entry, Please try again later)";
        	}
>>>>>>> backend
        	res.redirect("/index.html");
        	return "";
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