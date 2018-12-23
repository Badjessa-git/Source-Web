package com.lehigh.source;

import spark.Spark;
import com.google.gson.*;
import java.util.*;

import com.fasterxml.jackson.core.JsonFactory;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;

public final class App {
    private App() {
    }

    /**
     * Says hello to the world.
     * 
     * @param args The arguments of the program.
     */
    public static void main(String[] args) {

        Spark.port(getIntFromEnv("PORT", 4567));

        Map<String, String> env = System.getenv();

        Spark.staticFileLocation("/frontend");

        String cors_enabled = env.get("CORS_ENABLED");
        System.out.println(cors_enabled);
        if (cors_enabled.equals("True")) {
            final String acceptCrossOriginRequestsFrom = "*";
            final String acceptedCrossOriginRoutes = "GET,PUT,POST,DELETE,OPTIONS";
            final String supportedRequestHeaders = "Content-Type,Authorization,X-Requested-With,Content-Length,Accept,Origin";
            enableCORS(acceptCrossOriginRequestsFrom, acceptedCrossOriginRoutes, supportedRequestHeaders);
        }
        final Gson gson = new Gson();

        // Create the Database that we will be using through our application
        Database db = Database.getDatabase(env);

        Spark.get("/", (req, res) -> {
            res.redirect("/index.html");
            return "";
        });

        // Test to see communication between frontend and backend
        Spark.post("/submit/n_req", (req, res) -> {
            PrintJobRequest jobRequest = gson.fromJson(req.body(), PrintJobRequest.class);
            int response = db.createJobEntry(jobRequest.firstName, jobRequest.lastName, jobRequest.club,
                    jobRequest.file_upload, jobRequest.email, jobRequest.color, jobRequest.numCopies, jobRequest.done);
            if (response < 1) {
                return gson.toJson(new StructuredResponse("error", "there was an error adding to the database", null));
            }
            res.status(200);
            return gson.toJson(new StructuredResponse("ok", null, null));

        });

        // Verifying the integrity of the google token
        Spark.post("/oauth/callback", (req, res) -> {
            System.out.println("Got here");
            String idtoken = req.queryParams("idtoken");
            HttpTransport transport = new NetHttpTransport();
            com.google.api.client.json.JsonFactory jsonFactory = new com.google.api.client.json.jackson2.JacksonFactory();
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
                    // Specify the CLIENT_ID of the app that accesses the backend:
                    .setAudience(Collections.singletonList("463395064610-5k6r1ilnlg08qv18rkdp95fp4jadmsk1.apps.googleusercontent.com"
                    ))
                    // Or, if multiple clients access the backend:
                    // .setAudience(Arrays.asList(CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3))
                    .build();

            // (Receive idTokenString by HTTPS POST)

            GoogleIdToken idToken = verifier.verify(idtoken);
            if (idToken != null) {
                Payload payload = idToken.getPayload();

                // Print user identifier
                String userId = payload.getSubject();
                System.out.println("User ID: " + userId);

                // Get profile information from payload
                // String email = payload.getEmail();
                // boolean emailVerified = Boolean.valueOf(payload.getEmailVerified());
                // String name = (String) payload.get("name");
                // String pictureUrl = (String) payload.get("picture");
                // String locale = (String) payload.get("locale");
                // String familyName = (String) payload.get("family_name");
                // String givenName = (String) payload.get("given_name");
                if (db.getUser(userId) == null) {
                    String email = payload.getEmail();
                    //boolean emailVerified = Boolean.valueOf(payload.getEmailVerified());
                    String name = (String) payload.get("name");
                    String pictureUrl = (String) payload.get("picture");
                    //String locale = (String) payload.get("locale");
                    String familyName = (String) payload.get("family_name");
                    String givenName = (String) payload.get("given_name");
                    int resp = db.createUserEntry(userId, name, givenName, email, pictureUrl, familyName);
                    if (resp < 1) {
                        res.status(205);
                        return gson.toJson(new StructuredResponse("error", "there was an error adding to the database", null));
                    }
                } 
            } else {
                System.out.println("Invalid ID token.");
            }
            res.status(200);
            return gson.toJson(new StructuredResponse("ok", "received token", null));
        });

        Spark.post("/submit/g_req", (req, res) -> {
            res.status(200);
            return null;
        });
        // Return all thej jobs in the database in order of
        Spark.get("/getJobs", (req, res) -> {
            res.status(200);
            ArrayList<PrintJobRes> jobResponse = null;

            // Get all of the printjobs;
            jobResponse = db.selectAllPrintJobs();

            // Sort by the timestamp such that it is ordered from ealiest to latest
            jobResponse.sort(PrintJobRes.sort());
            return gson.toJson(new StructuredResponse("200", "No errors encountered", jobResponse));
        });

        // Update a particular post
        Spark.post("/done/:id", (req, res) -> {
            res.status(200);
            int id = Integer.parseInt(req.params("id"));
            // Code to alter table such that the value 0 now becomes 1 to repreent that work
            // has been done on a particular request.
            // todo
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

    /**
     * Set up CORS headers for the OPTIONS verb, and for every response that the
     * server sends. This only needs to be called once.
     * 
     * @param origin  The server that is allowed to send requests to this server
     * @param methods The allowed HTTP verbs from the above origin
     * @param headers The headers that can be sent with a request from the above
     *                origin
     */
    private static void enableCORS(String origin, String methods, String headers) {
        // Create an OPTIONS route that reports the allowed CORS headers and methods
        Spark.options("/*", (request, response) -> {
            String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
            if (accessControlRequestHeaders != null) {
                response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
            }
            String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
            if (accessControlRequestMethod != null) {
                response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
            }
            return "OK";
        });

        // 'before' is a decorator, which will run before any
        // get/post/put/delete. In our case, it will put three extra CORS
        // headers into the response
        Spark.before((request, response) -> {
            response.header("Access-Control-Allow-Origin", origin);
            response.header("Access-Control-Request-Method", methods);
            response.header("Access-Control-Allow-Headers", headers);
        });
    }
}