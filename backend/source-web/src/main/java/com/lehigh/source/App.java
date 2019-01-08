package com.lehigh.source;

import spark.Spark;
import com.google.gson.*;
import java.util.*;

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

        Map<String, String> cache = new HashMap<>();

        Database db = Database.getDatabase(env);

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

        // Verifying the integrity of the google token
        Spark.post("/oauth/callback", (req, res) -> {
            // System.out.println("Got here");
            String idtoken = req.queryParams("idtoken");

            HttpTransport transport = new NetHttpTransport();
            com.google.api.client.json.JsonFactory jsonFactory = new com.google.api.client.json.jackson2.JacksonFactory();
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
                    // Specify the CLIENT_ID of the app that accesses the backend:
                    .setAudience(Collections
                            .singletonList("463395064610-5k6r1ilnlg08qv18rkdp95fp4jadmsk1.apps.googleusercontent.com"))
                    // Or, if multiple clients access the backend:
                    // .setAudience(Arrays.asList(CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3))
                    .build();

            // (Receive idTokenString by HTTPS POST)
            GoogleIdToken idToken = verifier.verify(idtoken);

            if (idToken != null) {
                Payload payload = idToken.getPayload();
                // Print user identifier
                String userId = payload.getSubject();
                // System.out.println("User ID: " + userId);
                String generatedId = getSaltString();
                while (cache.containsKey(generatedId))
                    generatedId = getSaltString();

                cache.put(generatedId, userId);
                if (payload.getHostedDomain().contains("lehigh.edu")) {
                    res.status(200);
                    return gson.toJson(new StructuredResponse("ok", "received token, success sign in", generatedId));
                }

            } else {
                System.out.println("Invalid ID token.");
            }
            res.status(200);
            return gson.toJson(new StructuredResponse("not allowed", "user not allowed", null));
        });

        /**
         * Spark get that returns a json with all the printInformation
         * @param requestType [ printrequest, graphicrequest, allrequest ]
         */
        Spark.get("/getJobs/:requestType/:id", (req, res) -> {
            String userCode = req.params("id");
            String reqType = req.params("requestType");
            if (!cache.containsKey(userCode)) {
                res.status(200);
                return gson.toJson(new StructuredResponse("nok", "User not allowed", null));
            }
            GoogleSheets curJob = new GoogleSheets();
            switch (reqType) {
            case "printrequest":
                final String printId = db.getSpreadsheetKey("printrequest");
                List<PrintJobRes> res1 = curJob.getAllCurrentPrintJobs(printId);
                if (res1 != null) {
                    res.status(200);
                    res.type("application/json");
                    return gson.toJson(new StructuredResponse("ok", null, res1));
                }
                res.status(200);
                res.type("application/json");
                return gson.toJson(new StructuredResponse("ok", "No job found", null));

            case "graphicrequest":
                final String graphicId = db.getSpreadsheetKey("graphicrequest");
                List<GraphicDesignRes> res2 = curJob.getAllGraphicDesignRes(graphicId);
                if (res2 != null) {
                    res.status(200);
                    res.type("application/json");
                    return gson.toJson(new StructuredResponse("ok", null, res2));
                }
                res.status(200);
                res.type("application/json");
                return gson.toJson(new StructuredResponse("ok", "No job found", null));

            case "allrequest":
                final String allReqId = db.getSpreadsheetKey("allrequest");
                List<AllRequestRes> res3 = curJob.getAllRequest(allReqId);
                if (res3 != null) {
                    res.status(200);
                    res.type("application/json");
                    return gson.toJson(new StructuredResponse("ok", null, res3));
                }
                res.status(200);
                res.type("application/json");
                return gson.toJson(new StructuredResponse("ok", "No job found", null));

            default:
                res.status(200);
                res.type("application/json");
                return gson.toJson(new StructuredResponse("ok", "No job found", null));
            }
        });

        /**
         * Remove user from cache
         */
        Spark.post("/signout/:id", (req, res) -> {
            String generatedId = req.queryParams("id");
            cache.remove(generatedId);
            res.status(200);
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

    private static String getSaltString() {
        String SALTCHARS = "_$abcdefghijklmnopqrstuvxwyz1234567890";
        StringBuilder salt = new StringBuilder();
        Random rnd = new Random();
        while (salt.length() < 18) { // length of the random string.
            int index = (int) (rnd.nextFloat() * SALTCHARS.length());
            salt.append(SALTCHARS.charAt(index));
        }
        String saltStr = salt.toString();
        return saltStr;    }
}