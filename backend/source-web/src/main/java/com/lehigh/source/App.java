package com.lehigh.source;

import spark.Spark;

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
        
        //Create the Database that we will be using through our application
        Database db = Database.getDatabase();
        
        Spark.get("/", (req, res) -> {
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
