package com.lehigh.source;

import java.util.Comparator;

/**
 * Container for the clubs
 */

public class Club {
    public String name;
    public String occurence;
    public Double percentage;

    public Club(String name, String occurence, Double percentage) {
        this.name = name;
        this.occurence = occurence;
        this.percentage = percentage;
    }

    /**
     * Use this comparator to sort our clubs after retrieving them
     * @return the int of comparing the percentage of two clubs
     */
    public static Comparator<Club> sortClubs() {
        return new Comparator<Club>() {
            @Override
            public int compare(Club o1, Club o2) {
                return (int) - (o1.percentage - o2.percentage);
            }
        };
    }
}