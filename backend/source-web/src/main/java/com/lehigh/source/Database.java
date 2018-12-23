package com.lehigh.source;

import java.util.*;
import java.net.*;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;


/*
 * This will be our database, this is where we will be
 * sending our data to our database as well as querrying them
 */
public class Database {
    //We need a conncection to the database
    private Connection dConnection;

    //Prepared statement for inserting into the database
    private PreparedStatement pInsert;

    //Prepared statement for selecting from the database
    private PreparedStatement pSelectAll;

    //Prepared statemend for adding user to our database
    private PreparedStatement pUserInsert;

    //Prepared statement for getting user
    private PreparedStatement pUserRetrieve;


    //Private constructor for our database
    private Database() {
        //Empty
    }

    /*
     *  Create the Database that we will be using through out our application to connect to heroku
     */
    static Database getDatabase(Map<String, String> env) {
        //unconfigured database object;
        Database db = new Database();

        String db_url = env.get("DATABASE_URL");
    
        try {
            Class.forName("org.postgresql.Driver");
            URI dbURI = new URI(db_url);
            String username = dbURI.getUserInfo().split(":")[0];
            String password = dbURI.getUserInfo().split(":")[1];

            //Get the Url of the database on Heroku
            String dbURL = "jdbc:postgresql://" + dbURI.getHost() + ':' + dbURI.getPort() + dbURI.getPath();

            //Creating a connection to the database
            Connection con = DriverManager.getConnection(dbURL, username, password);

            //Print erro if null is returned and exit
            if (con == null) {
                System.err.println("Error connecting to the database with DriverManager");
                return null;
            }
            db.dConnection = con;
        } catch (Exception e) {
            //System.err.println(db_url);
            System.err.println("There was an error in the connection");
            e.printStackTrace();
        }

        try {
           db.pInsert = db.dConnection.prepareStatement("INSERT INTO print_jobs values(default, ?, ?, ?, default, ?, ?, ?, ?, ?)");
           db.pSelectAll = db.dConnection.prepareStatement("SELECT * from print_jobs");
           db.pUserInsert = db.dConnection.prepareStatement("INSERT INTO user_table values(default, ?, ?, ?, ?, ?, ?)");
           db.pUserRetrieve = db.dConnection.prepareStatement("SELECT * from user where user_id equals values(?)");
        } catch (SQLException e) {
            System.err.println("Error creating prepared statement");
            e.printStackTrace();
            return null;
        }

        return db;
    }

    /**
     * Creates a new Entry for the job request
     * @param firstName
     * @param lastName
     * @param club
     * @param file_upload
     * @param email
     * @param color
     * @param numCopies
     * @param done
     * @return
     */
    public synchronized int createJobEntry(String firstName, String lastName, String club, String file_upload,
                                           String email, int color, int numCopies, int done) {
        int res = 0;
        try {
            pInsert.setString(1, firstName);
            pInsert.setString(2, lastName);
            pInsert.setString(3, club);
            pInsert.setString(4, "file_upload");
            pInsert.setString(5, email);
            pInsert.setInt(6, color);
            pInsert.setInt(7, numCopies);
            pInsert.setInt(8, done);
            res += pInsert.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return res;
    }

    /**
     * get all of the jobs in the database
     * @return list of all jobs in the database
     */
    public synchronized ArrayList<PrintJobRes> selectAllPrintJobs() {
        ArrayList<PrintJobRes> data = new ArrayList<PrintJobRes>();

        try {
            ResultSet res = pSelectAll.executeQuery();
            while (res.next()) {
                data.add(new PrintJobRes(res.getInt("jobid"), 
                                        res.getString("firstname"), 
                                        res.getString("lastname"), 
                                        res.getString("club"), 
                                        res.getDate("submit_time"), 
                                        res.getString("file_upload"), 
                                        res.getString("email"), 
                                        res.getInt("color"), 
                                        res.getInt("numcopies"), 
                                        res.getInt("done")));
            }
            res.close();
            return data;
        } catch(SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * Inserting into a User into our database
     * @param uid
     * @param user
     * @param given_name
     * @param email
     * @param picture_url
     * @return
     */
    public synchronized int createUserEntry(String uid, String user, String given_name,
                                            String email, String picture_url, String family_name) {
        try {
            pUserInsert.setString(1, uid);
            pUserInsert.setString(2, user);
            pUserInsert.setString(3, given_name);
            pUserInsert.setString(4, family_name);
            pUserInsert.setString(5, email);
            pUserInsert.setString(6, picture_url);
            int res = pUserInsert.executeUpdate();
            return res;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return -1;
    }


    /**
     * Get the user based on the userId
     * @param id the id of the google user
     */
    public synchronized User getUser(String id) {
        User res = null;
        try {
            pUserRetrieve.setString(1, id);
            ResultSet querry = pUserRetrieve.executeQuery();
            querry.next();
            res = new User(querry.getString("user_id"), 
                           querry.getString("email"), 
                           querry.getString("username"), 
                           querry.getString("given_name"), 
                           querry.getString("picture_url"),
                           querry.getString("family_name"));
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return res;
    }
}