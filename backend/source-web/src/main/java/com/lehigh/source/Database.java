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

    //Private constructor for our database
    private Database() {
        //Empty
    }

    /*
     *  Create the Database that we will be using through out our application to connect to heroku
     */
    static Database getDatabase() {
        //unconfigured database object;
        Database db = new Database();
        Map<String, String> env = System.getenv();

        //String db_url = env.get("postgres://fjdfpctspidkxy:40d9a191d6db012d89caa8bb75d4ef8a56ef0e2073fc4e63bcd193b1c7e2d904@ec2-107-22-169-45.compute-1.amazonaws.com:5432/defqfeg6ruk335");
    
        try {
            Class.forName("org.postgresql.Driver");
            URI dbURI = new URI("postgres://fjdfpctspidkxy:40d9a191d6db012d89caa8bb75d4ef8a56ef0e2073fc4e63bcd193b1c7e2d904@ec2-107-22-169-45.compute-1.amazonaws.com:5432/defqfeg6ruk335");
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
           db.pInsert = db.dConnection.prepareStatement("INSERT INTO print_jobs values(default, ?, ?, ?, default, ?, ?, ?, ?, ?");
           db.pSelectAll = db.dConnection.prepareStatement("SELECT * from print_jobs");
        } catch (SQLException e) {
            System.err.println("Error creating prepared statement");
            e.printStackTrace();
            return null;
        }

        return db;
    }

    public synchronized int createJobEntry(String firstName, String lastName, String club, String file_upload,
    String email, int color, int numCopies, int done) {
        int res = 0;
        try {
            pInsert.setString(1, firstName);
            pInsert.setString(2, lastName);
            pInsert.setString(3, club);
            pInsert.setString(4, file_upload);
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

    public synchronized ArrayList<PrintJobRes> selectAllPrintJobs() {
        ArrayList<PrintJobRes> data = new ArrayList<>();

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
}