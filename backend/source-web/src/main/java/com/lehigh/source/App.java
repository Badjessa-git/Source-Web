package com.lehigh.source;
import java.util.*;
import spark.QueryParamsMap;
import spark.Spark                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          ;
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
            res.type("application/json");
            QueryParamsMap map = req.formdata;
            assert(Object != null);
            return gson.toJson(new StructuredResponse("ok", null, null));
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