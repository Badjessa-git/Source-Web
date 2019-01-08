package com.lehigh.source;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.sheets.v4.Sheets;
import com.google.api.services.sheets.v4.SheetsScopes;
import com.google.api.services.sheets.v4.model.ValueRange;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class GoogleSheets {
    private final String APPLICATION_NAME = "Google Sheets API Java";
    private final JsonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();
    //private final String TOKENS_DIRECTORY_PATH = "tokens";
    private Sheets service;
    public GoogleSheets(){   
        service = createService();
    }
    /**
     * Global instance of the scopes required by this quickstart.
     * If modifying these scopes, delete your previously saved tokens/ folder.
     */
    private final List<String> SCOPES = Collections.singletonList(SheetsScopes.SPREADSHEETS);
    private final String CREDENTIALS_FILE_PATH = "/source-web-226303-d47f6cf48e20.json";
    //private final String CLIENT_SECRET_FILE = "/client_secret.json";

    /**
     * Creates an authorized Credential object.
     * @param HTTP_TRANSPORT The network HTTP Transport.
     * @return An authorized Credential object.
     * @throws IOException If the credentials.json file cannot be found.
     */
    private synchronized Credential getCredentials(final NetHttpTransport HTTP_TRANSPORT) throws IOException {
        //Load client secrets.
        InputStream in = GoogleSheets.class.getResourceAsStream(CREDENTIALS_FILE_PATH);
        //GoogleClientSecrets clientSecrets = GoogleClientSecrets.load(JSON_FACTORY, new InputStreamReader(in));

        // Build flow and trigger user authorization request.
        // GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(
        //         HTTP_TRANSPORT, JSON_FACTORY, clientSecrets, SCOPES)
        //         .setDataStoreFactory(new FileDataStoreFactory(new java.io.File(TOKENS_DIRECTORY_PATH)))
        //         .setAccessType("offline")
        //         .build();

        // LocalServerReceiver receiver = new LocalServerReceiver.Builder().build();
        // return new AuthorizationCodeInstalledApp(flow, receiver).authorize("user");

        //Creating credential for a service account
        GoogleCredential credential = GoogleCredential.fromStream(in)
                                .createScoped(SCOPES);
                                
        
        return credential;
    }
    
    public synchronized List<PrintJobRes> getAllCurrentPrintJobs(final String sheetId) {
        final String range = "Form Responses 1";
        try {
            // final NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();        

            // Sheets service = new Sheets.Builder(HTTP_TRANSPORT, JSON_FACTORY, getCredentials(HTTP_TRANSPORT))
            //     .setApplicationName(APPLICATION_NAME)
            //     .build();

            ValueRange response = service.spreadsheets().values()
                                .get(sheetId, range)
                                .execute();
            
            List<List<Object>> values = response.getValues();
            List<PrintJobRes> res = new ArrayList<>();
            if (values == null || values.isEmpty()) {
                return res;
            } else {
                int count = 0;
                //Parse the values
                for (List row : values) {
                    if (count == 0) {
                        count++;
                        continue;
                    }
                    //System.out.println(count);
                    int jobId = count;
                    String timeStamp = (String) row.get(0);
                    String firstName = (String) row.get(1);
                    String lastName = (String) row.get(2);
                    String posClub = (String) row.get(4);
                    String other = (String) row.get(5);
                    String club = posClub.isEmpty() ? other : posClub;
                    String colors = (String) row.get(6);
                    int numCopies = Integer.valueOf((String) row.get(7));
                    String file = (String) row.get(8);
                    String email = (String) row.get(9);
                    int done = Integer.valueOf((String) row.get(10));
                    PrintJobRes curJob = new PrintJobRes(jobId, firstName, lastName, club, timeStamp, file, email, colors, numCopies, done);
                    //System.out.println(curJob.toString());
                    count++;
                    res.add(curJob);
                }
            }
            return res;
        } catch (Exception e) {
            e.printStackTrace();
        }
        //final String range = 
        
        return null;
    }

    /**
     * Returns the list of graphicReq in the database
     * @param sheetId id of the spreadsheet
     */
    public synchronized List<GraphicDesignRes> getAllGraphicDesignRes(final String sheetId) {
        final String range = "Form Responses 1";
        try {
            // final NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();        
            // Sheets service = new Sheets.Builder(HTTP_TRANSPORT, JSON_FACTORY, getCredentials(HTTP_TRANSPORT))
            //     .setApplicationName(APPLICATION_NAME)
            //     .build();

            ValueRange response = service.spreadsheets().values()
                                .get(sheetId, range)
                                .execute();
            
            List<List<Object>> values = response.getValues();
            List<GraphicDesignRes> res = new ArrayList<>();
            if (values == null || values.isEmpty()) {
                return res;
            } else {
                int count = 0;
                //Parse the values
                for (List row : values) {
                    if (count == 0) {
                        count++;
                        continue;
                    }
                    System.out.println(row.toString());
                    int jobId = count;
                    String timeStamp = (String) row.get(0);
                    String email = (String) row.get(1);
                    String firstName = (String) row.get(2);
                    String lastName = (String) row.get(3);
                    String dateSubmitted = (String) row.get(4);
                    String posClub = (String) row.get(5);
                    String other = (String) row.get(6);
                    String club = posClub.isEmpty() ? other : posClub;
                    String eventDetails = (String) row.get(7);
                    String eventDeadline = (String) row.get(8);
                    String stringLinks = (String) row.get(9);
                    List<String> fileLinks = convertToList(stringLinks);
                    String addInfo = "";
                    if (row.size() > 10) {
                        addInfo = (String) row.get(10);
                    }
                    GraphicDesignRes curReq = new GraphicDesignRes(jobId, timeStamp, email, firstName, lastName, 
                                dateSubmitted, club, eventDetails, eventDeadline, fileLinks, addInfo);
                    count++;
                    res.add(curReq);
                }
            }
            return res;
        } catch (Exception e) {
            e.printStackTrace();
        }
        //final String range = 
        
        return null;
    }
    
    /**
     * Returns the list of allrequest in the database
     * @param sheetId id of the spreadsheet
     */
    public synchronized List<AllRequestRes> getAllRequest(final String sheetId) {
            final String range = "Form Responses 1";
            try {
                ValueRange response = createService().spreadsheets().values()
                                    .get(sheetId, range)
                                    .execute();
                
                List<List<Object>> values = response.getValues();
                List<AllRequestRes> res = new ArrayList<>();
                if (values == null || values.isEmpty()) {
                    return res;
                } else {
                    int count = 0;
                    //Parse the values
                    for (List row : values) {
                        if (count == 0) {
                            count++;
                            continue;
                        }
                        //System.out.println(count);
                        int jobId = count;
                        String timeStamp = (String) row.get(0);
                        String firstName = (String) row.get(1);
                        String lastName = (String) row.get(2);
                        String date = (String) row.get(3);
                        String posClub = (String) row.get(4);
                        String other = (String) row.get(5);
                        String club = posClub.isEmpty() ? other : posClub;
                        String posRes = (String) row.get(6);
                        String otherRes = "";
                        String resource = "";
                        System.out.println(row.size());
                        if (row.size() > 7) {
                            otherRes = (String) row.get(7);
                            resource = otherRes;
                        } else {
                            resource = posRes;
                        }
                        AllRequestRes curReq = new AllRequestRes(jobId, timeStamp, firstName, lastName, club, date, resource);
                        count++;
                        res.add(curReq);
                    }
                }
                return res;
            } catch (Exception e) {
                e.printStackTrace();
            }
            //final String range = 
            
            return null;
    }

    public List<String> convertToList(String stringLinks) {
        if (stringLinks.isEmpty()) {
            return new ArrayList<>();
        }
        String[] links = stringLinks.split("\\s*(=>|,|\\s)\\s*");
        List<String> res = Arrays.asList(links);
        return res;
    }

    /**
     * Create one service to be used by the object
     * @return the sheets object created
     */
    private synchronized Sheets createService() {
        try {
            final NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
            Sheets service = new Sheets.Builder(HTTP_TRANSPORT, JSON_FACTORY, getCredentials(HTTP_TRANSPORT))
            .setApplicationName(APPLICATION_NAME)
            .build();

            return service;
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return null;
    }
}