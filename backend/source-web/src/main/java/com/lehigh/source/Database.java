package com.lehigh.source;

import java.util.*;

import com.google.api.client.util.Key;

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
    private PreparedStatement dGetKey;

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
           db.dGetKey = db.dConnection.prepareStatement("SELECT sheet_key from spreadsheets_keys where sheet_name = ?");
        } catch (SQLException e) {
            System.err.println("Error creating prepared statement");
            e.printStackTrace();
            return null;
        }

        return db;
    }

    /**
     * Retrieve the key of the spreadsheet needed
     */
    public synchronized String getSpreadsheetKey(String sheet_name) {
      try {
        dGetKey.setString(1, sheet_name);
        ResultSet res = dGetKey.executeQuery();
        if (res != null) {
          res.next();
          String key = res.getString(1).trim();
          return key;
        }
      } catch (SQLException e) {
        e.printStackTrace();
    }
      return null;
    }
}