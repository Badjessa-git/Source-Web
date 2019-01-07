package com.lehigh.source;

import java.util.List;
import java.util.Objects;
/**
 * Response for graphic desing
 */

public class GraphicDesignRes {
    public int jobId;
    public String timeStamp;
    public String email;
    public String firstName;
    public String lastName;
    public String dateSubmitted;
    public String club;
    public String eventDetails;
    public String eventDeadline;
    public List<String> fileLinks;
    public String addInfo;

    

    public GraphicDesignRes() {
    }

    public GraphicDesignRes(int jobId, String timeStamp, String email, String firstName, String lastName, String dateSubmitted, String club, String eventDets, String eventDeadline, List<String> fileLinks, String addInfo) {
        this.jobId = jobId;
        this.timeStamp = timeStamp;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateSubmitted = dateSubmitted;
        this.club = club;
        this.eventDetails = eventDets;
        this.eventDeadline = eventDeadline;
        this.fileLinks = fileLinks;
        this.addInfo = addInfo;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof GraphicDesignRes)) {
            return false;
        }
        GraphicDesignRes graphicDesignRes = (GraphicDesignRes) o;
        return Objects.equals(timeStamp, graphicDesignRes.timeStamp) && Objects.equals(email, graphicDesignRes.email) && Objects.equals(firstName, graphicDesignRes.firstName) && Objects.equals(lastName, graphicDesignRes.lastName) && Objects.equals(dateSubmitted, graphicDesignRes.dateSubmitted) && Objects.equals(club, graphicDesignRes.club) && Objects.equals(eventDetails, graphicDesignRes.eventDetails) && Objects.equals(eventDeadline, graphicDesignRes.eventDeadline) && Objects.equals(fileLinks, graphicDesignRes.fileLinks) && Objects.equals(addInfo, graphicDesignRes.addInfo);
    }

    @Override
    public int hashCode() {
        return Objects.hash(timeStamp, email, firstName, lastName, dateSubmitted, club, eventDetails, eventDeadline, fileLinks, addInfo);
    }

    @Override
    public String toString() {
        return "{" +
            " jobId='" + jobId + "'" +
            ", timeStamp='" + timeStamp + "'" +
            ", email='" + email + "'" +
            ", firstName='" + firstName + "'" +
            ", lastName='" + lastName + "'" +
            ", dateSubmitted='" + dateSubmitted + "'" +
            ", club='" + club + "'" +
            ", eventDets='" + eventDetails + "'" +
            ", eventDeadline='" + eventDeadline + "'" +
            ", fileLinks='" + fileLinks.toString() + "'" +
            ", addInfo='" + addInfo + "'" +
            "}";
    }

}